import {postPurchaseConfig as config} from './postpurchase-config.js';
const kind=document.body.dataset.offer;
const offer=config[kind];
const httpsUrl=value=>{try{const url=new URL(value);return url.protocol==='https:'?url.href:'';}catch{return '';}};
const embed=httpsUrl(offer?.videoEmbedUrl);
if(embed && kind==='upsell' && !document.querySelector('vturb-smartplayer')){
 const allowed=['www.youtube.com','www.youtube-nocookie.com','player.vimeo.com','player.hotmart.com'];
 if(allowed.includes(new URL(embed).hostname)){
  const iframe=document.createElement('iframe');iframe.src=embed;iframe.title='Presentación del Sistema Avanzado Multi-Sistemas';
  iframe.allow='fullscreen; encrypted-media; picture-in-picture';iframe.allowFullscreen=true;
  document.querySelector('.pp-video').replaceChildren(iframe);
  document.querySelector('[data-video-caption]').textContent='🔊 Activa el sonido para ver la presentación.';
 }
}
