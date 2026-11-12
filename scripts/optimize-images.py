"""Generate responsive WebP assets; the deployed build uses the generated files directly."""
from PIL import Image
from pathlib import Path
import hashlib,json,argparse
parser=argparse.ArgumentParser()
parser.add_argument('--source-dir',type=Path,required=True,help='Directory with the extracted bonus and bundle PNGs (2.png through 5.png)')
args=parser.parse_args()
root=Path(__file__).resolve().parent.parent
out=root/'assets/optimized'
out.mkdir(exist_ok=True)
manifest={}
report=[]
def export(source,name,widths,sizes,full_source=None):
    image=Image.open(source).convert('RGB')
    variants=[]
    for width in widths:
        width=min(width,image.width)
        resized=image.resize((width,round(image.height*width/image.width)),Image.Resampling.LANCZOS)
        import io
        buf=io.BytesIO();resized.save(buf,format='WEBP',quality=84 if full_source else 82,method=6)
        content=buf.getvalue();digest=hashlib.sha256(content).hexdigest()[:10]
        target=out/f'{name}-{width}-{digest}.webp';target.write_bytes(content)
        variants.append({'src':str(target.relative_to(root)),'width':width})
    canonical=full_source or variants[-1]['src']
    manifest[canonical]={'width':image.width,'height':image.height,'variants':variants,'fallback':variants[min(1,len(variants)-1)]['src'],'sizes':sizes}
    report.append({'name':name,'original':Path(source).stat().st_size,'largest':(root/variants[-1]['src']).stat().st_size,'mobile':(root/variants[0]['src']).stat().st_size,'src':canonical})
    return canonical
export(root/'assets/atlas-hero.png','hero',[480,768,1200],'(max-width: 700px) calc(100vw - 36px), 760px')
for number,name in [(2,'bonus-tests'),(3,'bonus-checklist'),(4,'bonus-guide')]:
    export(args.source_dir/f'{number}.png',name,[400,720],'(max-width: 700px) calc(100vw - 36px), 400px')
export(args.source_dir/'5.png','bundle',[480,768,1200],'(max-width: 700px) calc(100vw - 36px), (max-width: 1264px) calc(100vw - 64px), 1200px')
for source in sorted((root/'assets/samples').glob('*.webp')):
    export(source,source.stem,[360,600],'242px',str(source.relative_to(root)))
(root/'assets/image-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,separators=(',',':'))+'\n')
Path('/tmp/atlas-image-optimization.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
