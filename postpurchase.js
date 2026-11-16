import {postPurchaseConfig as config} from './postpurchase-config.js';
const kind=document.body.dataset.offer;
const offer=config[kind];
const httpsUrl=value=>{try{const url=new URL(value);return url.protocol==='https:'?url.href:'';}catch{return '';}};
const checkout=httpsUrl(offer?.checkoutUrl);
const widget=document.querySelector(`#hotmart-${kind}-widget`);
const fallback=widget?.querySelector('[data-checkout-fallback]');
if(checkout && fallback){
  const link=document.createElement('a');
  link.className='button';link.href=checkout;link.textContent='CONTINUAR EN EL CHECKOUT DE HOTMART →';
  fallback.replaceWith(link);
  const status=widget.querySelector('[data-widget-status]');
  if(status)status.textContent='Revisa y confirma esta compra adicional en el checkout de Hotmart.';
}
const embed=httpsUrl(offer?.videoEmbedUrl);
if(embed && kind==='upsell'){
 const allowed=['www.youtube.com','www.youtube-nocookie.com','player.vimeo.com','player.hotmart.com'];
 if(allowed.includes(new URL(embed).hostname)){
  const iframe=document.createElement('iframe');iframe.src=embed;iframe.title='Presentación del Sistema Avanzado Multi-Sistemas';
  iframe.allow='fullscreen; encrypted-media; picture-in-picture';iframe.allowFullscreen=true;
  document.querySelector('.pp-video').replaceChildren(iframe);
  document.querySelector('[data-video-caption]').textContent='🔊 Activa el sonido para ver la presentación.';
 }
}
const access=document.querySelector('[data-access]');
if(access)access.href=httpsUrl(config.accessUrl)||'https://consumer.hotmart.com/';
