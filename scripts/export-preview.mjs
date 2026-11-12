import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {config} from '../config.js';
const root=new URL('../',import.meta.url);
let html=await readFile(new URL('index.html',root),'utf8');
let css=await readFile(new URL('styles.css',root),'utf8');
for(const match of [...css.matchAll(/url\('(assets\/fonts\/[^']+)'\)/g)]){
  const bytes=await readFile(new URL(match[1],root));
  css=css.replace(match[0],`url('data:font/woff2;base64,${bytes.toString('base64')}')`);
}
const previewImages = {};
const manifest=JSON.parse(await readFile(new URL('assets/image-manifest.json',root),'utf8'));
const responsiveSources=Object.values(manifest).flatMap(image=>[image.fallback,...image.variants.map(variant=>variant.src)]);
for (const src of [...new Set([...responsiveSources,config.guarantee.seal, ...Object.values(config.images), ...config.samples.map(item=>item.src), ...(config.practiceImages || []).map(item=>item.src), ...(config.conversationMockups || []).map(item=>item.src), ...(config.feedbackScreenshots || []).map(item=>item.src)])]) {
  if (src && src.startsWith('assets/')) {
    const bytes = await readFile(new URL(src,root));
    const extension = src.split('.').pop();
    const mime = {svg:'image/svg+xml',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp'}[extension];
    if(mime) previewImages[src] = `data:${mime};base64,${bytes.toString('base64')}`;
  }
}
let js=await readFile(new URL('app.js',root),'utf8');
const start=js.indexOf('const esc =');
js=js.replaceAll('esc(url(displaySrc))', 'esc(previewImages[displaySrc] || url(displaySrc))');
const imageData=Object.fromEntries(Object.entries(manifest).map(([key,image])=>[key,{...image,variants:[]} ]));
js=`const previewImages = ${JSON.stringify(previewImages)};\nconst imageData = ${JSON.stringify(imageData)};\nconst c = ${JSON.stringify(config)};\nconst data = ${await readFile(new URL('content.json',root),'utf8')};\n`+js.slice(start);
html=html.replace('<link rel="stylesheet" href="styles.css">',`<style>${css}</style>`).replace('<script type="module" src="app.js"></script>',`<script type="module">${js.replaceAll('</script','<\\/script')}</script>`);
await mkdir(new URL('artifacts/',root),{recursive:true});
await writeFile(new URL('artifacts/atlas-preview.html',root),html);
console.log('Standalone preview: artifacts/atlas-preview.html');
