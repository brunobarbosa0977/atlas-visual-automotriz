import { config as c } from './config.js';
const [data, imageData] = await Promise.all([
  fetch('./content.json').then(r => { if (!r.ok) throw new Error('No se pudo cargar el contenido del Atlas.'); return r.json(); }),
  fetch('./assets/image-manifest.json').then(r => { if (!r.ok) throw new Error('No se pudieron cargar las imágenes del Atlas.'); return r.json(); })
]);
const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const url = value => {
  if (!value) return '';
  try { const parsed = new URL(value, location.href); return ['https:', 'http:'].includes(parsed.protocol) ? parsed.href : ''; }
  catch { return ''; }
};
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const button = (text = 'Quiero mis mapas ahora') => `<a class="button" href="#oferta">${text}</a>`;
const heading = (label, title, description = '') => `<div class="section-head"><p class="eyebrow">${label}</p><h2>${title}</h2>${description ? `<p>${description}</p>` : ''}</div>`;
const placeholder = () => '<div class="placeholder" aria-hidden="true"></div>';
const productImage = (src, alt, label, code = '', options = {}) => {
  if (!url(src)) return placeholder();
  const image = imageData[src];
  const displaySrc = options.full ? src : (image?.fallback || src);
  const variants = options.full ? [] : [...(image?.variants || []), ...(options.includeFull && image ? [{src, width:image.width}] : [])];
  const srcset = variants.length ? ` srcset="${variants.map(item => `${esc(url(item.src))} ${item.width}w`).join(', ')}" sizes="${esc(options.sizes || image.sizes)}"` : '';
  const dimensions = image ? ` width="${image.width}" height="${image.height}"` : '';
  return `<img src="${esc(url(displaySrc))}"${srcset}${dimensions} alt="${esc(alt)}" loading="${options.eager || options.full ? 'eager' : 'lazy'}" decoding="async"${options.eager ? ' fetchpriority="high"' : ''}>`;
};
const samples = [...c.samples].sort((a,b) => a.code === 'P0300' ? -1 : b.code === 'P0300' ? 1 : 0);
const sample = (item, index) => `<button class="sample" data-sample="${samples.indexOf(item)}" aria-label="Ampliar ficha del Atlas ${esc(item.code)}">${productImage(item.src, item.alt)}</button>`;
let galleryNumber = 0;
const gallery = (label, items = samples, render = sample) => {
  const id = `galeria-${++galleryNumber}`;
  return `<div class="gallery-shell" role="region" aria-label="${label}"><div class="gallery" id="${id}" data-cycle-size="${items.length}" ${render === sample ? `data-sample-order="${items.map(item => samples.indexOf(item)).join(',')}"` : ''} tabindex="0" aria-label="${label}. Carrusel automático; selecciona una imagen para ampliarla.">${items.map(render).join('')}${items.map(render).join('')}</div><button class="gallery-pause sr-only" aria-controls="${id}" aria-label="Detener movimiento: ${label}">Detener movimiento</button></div>`;
};
const cards = n => `<div class="cards cols-${data.sections[n].length}">${data.sections[n].map(card => `<article class="text-card"><h3><span class="step-number">${card.title.slice(0,2)}</span>${card.title.slice(5)}</h3><ul>${card.items.map(text => `<li>${text}</li>`).join('')}</ul></article>`).join('')}</div>`;
const icons = [
  '<path d="m13 3-7 10h6l-1 8 7-11h-6z"/>',
  '<path d="M3 7h18M5 12h14M8 17h8"/><circle cx="12" cy="12" r="10"/>',
  '<path d="M4 16h4l4-8 4 8h4M12 3v2M4 5l2 2m14-2-2 2"/>',
  '<circle cx="12" cy="12" r="7"/><path d="M12 8v4l3 2M12 2v3M12 19v3M2 12h3m14 0h3"/>',
  '<path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0Z"/>',
  '<path d="M3 9h12l4 3v6H3zM7 9V5h6v4M19 15h3M6 13v2m4-2v2"/>'
];
const realFeedbackItems = (c.feedbackScreenshots || []).filter(item => item.authorized && url(item.src));
const mockupItems = c.conversationMockups || [];
const showingConversationMockups = !realFeedbackItems.length && mockupItems.length > 0;
const feedbackItems = realFeedbackItems.length ? realFeedbackItems : showingConversationMockups ? mockupItems : (c.feedbackScreenshots || []).map(item => ({...item,src:''}));
const feedbackCard = (item, index) => `<button class="sample feedback-card" data-feedback="${index}" aria-label="Ampliar captura de WhatsApp ${index+1}">${productImage(item.src, item.alt, '', '', {includeFull:true,sizes:'(max-width:700px) calc(100vw - 36px), 490px'})}</button>`;
const practiceItems = c.practiceImages || [];
const practiceCard = (item, index) => `<button class="sample practice-card" data-practice="${index}" aria-label="Ampliar demostración ilustrativa ${index+1}">${productImage(item.src, item.alt)}</button>`;
const heroMockup = () => url(c.images.hero)
  ? `<div class="hero-product-image">${productImage(c.images.hero, 'Atlas Visual de Diagnóstico Automotriz con escáner OBD2 y ejemplos de sus fichas', '', '', {eager:true})}</div>`
  : `<div class="mockup-stage" aria-label="Composición de vista previa del Atlas. Portada y ficha real pendientes."><div class="stage-grid" aria-hidden="true"></div><div class="atlas-cover">${url(c.images.cover) ? productImage(c.images.cover,'Portada del Atlas Visual de Diagnóstico Automotriz','Portada pendiente') : `<div class="cover-brand">ATLAS VISUAL ${arrow}</div><p class="cover-edition">DIAGNÓSTICO AUTOMOTRIZ / OBD2</p><div class="cover-title">DEL CÓDIGO<br>AL PRÓXIMO<br><span>PASO.</span></div><div class="cover-count">70 <small>MAPAS<br>VISUALES</small></div><p class="cover-note">70 MAPAS VISUALES · ÍNDICE POR CÓDIGO</p>`}</div><div class="phone"><span class="phone-notch"></span>${productImage(samples[0]?.src, samples[0]?.alt || 'Ficha P0300 del Atlas', 'Ficha real pendiente', 'P0300')}<span class="phone-bottom">ATLAS VISUAL / OBD2</span></div><span class="stage-tag">ATLAS VISUAL · DIAGNÓSTICO AUTOMOTRIZ</span></div>`;
const guaranteeReady = Number(c.guarantee.days) > 0 && Boolean(c.guarantee.channel);
const planCheckouts = Object.fromEntries(Object.entries(c.plans).map(([key, plan]) => [key, url(plan.checkoutUrl).startsWith('https:') ? url(plan.checkoutUrl) : '']));
const authorizedTestimonials = c.testimonials.filter(item => item.authorized && item.quote && item.name);
const campaignConfirmed = c.campaign.confirmed && c.campaign.date && c.campaign.discount;

const planCard = (key) => {
  const complete = key === 'complete';
  const plan = c.plans[key];
  const [whole, cents] = plan.price.split('.');
  const items = [
    ['70 mapas visuales de diagnóstico OBD2, uno por código.', true],
    ['Contenido organizado en 6 grupos de diagnóstico.', true],
    ['Índice clicable para consulta desde el celular.', true],
    ['Material digital en PDF y en español.', true],
    ['Bono 1 · Fichas Visuales de Pruebas.', complete],
    ['Bono 2 · Checklist de Diagnóstico para el Taller.', complete],
    [`Bono 3 · ${esc(c.bonus3.title)}.`, complete]
  ];
  if (complete) items.push(['Soporte prioritario.', true]);
  const label = complete ? 'Quiero el material completo' : 'Quiero el plan básico';
  return `<article class="price-card ${complete ? 'plan-complete' : 'plan-basic'}" aria-labelledby="plan-${key}-title">
    ${complete ? `<span class="plan-highlight">ATLAS + 3 BONOS</span><div class="offer-image">${productImage(c.images.bundle, 'Plan completo: Atlas Visual y los tres bonos incluidos', '', '', {sizes:'(max-width: 700px) calc(100vw - 84px), 540px'})}</div>` : ''}
    <p class="eyebrow">${complete ? 'Plan completo' : 'Plan básico'}</p>
    <h3 id="plan-${key}-title">${complete ? 'Material completo + todos los bonos' : 'Empieza con los 70 mapas del Atlas'}</h3>
    <p class="plan-description">${complete ? 'El Atlas y tres materiales para acompañar tu diagnóstico.' : 'El Atlas Visual de Diagnóstico Automotriz, sin bonos.'}</p>
    <div class="price" aria-label="US$ ${esc(plan.price)}"><span class="price-currency">US$ </span><span class="price-whole">${esc(whole)}<span class="price-cents">.${esc(cents)}</span></span></div>
    <p class="payment">Pago único</p>
    ${complete ? '' : '<p class="plan-note">Los tres bonos están incluidos únicamente en el plan completo.</p>'}
    <ul class="plan-features">${items.map(([text,included]) => `<li data-included="${included}"><span class="feature-status" aria-hidden="true">✓</span><span>${included ? '' : '<span class="sr-only">No incluido: </span>'}<span class="feature-label">${text}</span></span></li>`).join('')}</ul>
    ${planCheckouts[key] ? `<a class="button purchase ${complete ? '' : 'purchase-outline'}" data-plan="${key}" href="${esc(planCheckouts[key])}" rel="noopener">${label}</a>` : `<button class="button purchase ${complete ? '' : 'purchase-outline'}" data-plan="${key}" disabled aria-describedby="checkout-status">${label}</button>`}
  </article>`;
};

document.querySelector('main').innerHTML = `
<section class="hero"><div class="wrap hero-inner">
  <p class="eyebrow">Atlas Visual de Diagnóstico Automotriz</p>
  <h1><em>70</em> mapas visuales OBD2 para saber <span>qué revisar antes de cambiar una pieza.</span></h1>
  <p class="hero-description">El escáner ya te dio el código. Abre la ficha en tu celular, compara los síntomas y sigue el recorrido visual para orientar tu primera comprobación antes de gastar en un repuesto.</p>
  ${heroMockup()}
  <div class="hero-actions">${button('Quiero mis 70 mapas ahora')}<a class="button secondary" href="#muestras">Ver una muestra real del Atlas</a></div>
  <ul class="hero-features"><li>70 mapas visuales, uno por código.</li><li>Índice clicable por código y contenido organizado por sistema.</li><li>Consulta desde el celular mientras trabajas en el vehículo.</li><li>Tres bonos de diagnóstico incluidos en el plan completo.</li></ul>
  <p class="support">Para mecánicos que ya usan escáner en el taller.</p>
</div></section>
<section id="muestras" class="section soft"><div class="wrap">
  ${heading('Explora el Atlas', samples.some(s => url(s.src)) ? 'Muestras reales del Atlas' : 'Muestras del Atlas')}
  <div class="sample-intro"><h3>El escáner marca <span class="code">P0300</span>. ¿Qué revisas primero?</h3><p>Abre la ficha y ubica cuándo aparece la falla. Si el motor falla en ralentí, el recorrido puede ser distinto al de una falla al acelerar. Sigue el flujo visual para orientar la primera comprobación según lo que observas en el vehículo.</p></div>
  ${gallery('Primera galería de muestras del Atlas')}
  <div class="center">${button('Quiero recibir los 70 mapas visuales')}</div>
</div></section>
<section id="grupos" class="section soft"><div class="wrap">
  ${heading('Contenido del Atlas', '70 mapas visuales organizados en 6 grupos de diagnóstico', 'Busca el código que aparece en tu escáner o consulta los mapas por sistema. Cada ficha relaciona lo que detectó la central con los síntomas posibles para orientar tu primera prueba.')}
  <p class="instruction">Toca cada grupo para ver qué fallas puedes consultar.</p>
  <div class="group-grid">${data.groups.map((group,index) => `<details class="group"><summary aria-expanded="false" aria-controls="grupo-${group.number}"><span class="group-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">${icons[index]}</svg></span><span class="group-number">${group.number}</span><span>${group.name}</span><svg class="chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></summary><div class="detail-body" id="grupo-${group.number}"><p>${group.description}</p><ul>${group.items.map(text => `<li>${text}</li>`).join('')}</ul></div></details>`).join('')}</div>
</div></section>
<section id="por-dentro" class="section"><div class="wrap">
  ${heading('Por dentro del material','Un mapa por código, listo para consultar junto al vehículo','Consulta qué detectó la central, los síntomas posibles y qué guardar antes de borrar los códigos. Sigue las preguntas y las ramas SÍ / NO para orientar la primera verificación.')}
  <p class="gallery-label">Consulta por código, con una ficha por página.</p>${gallery('Consulta por código')}
  <p class="gallery-label">Ejemplos de mapas para distintos sistemas del motor.</p>${gallery('Mapas por sistema del motor', [...samples].reverse())}
</div></section>
<section id="decision" class="section"><div class="wrap">${heading('Del escáner a la primera prueba','Qué hacer después de leer el código')}${cards(6)}</div></section>
<section id="para-quien" class="section soft"><div class="wrap">${heading('Pensado para tu día a día','Para mecánicos que ya usan escáner en el taller','Antes de gastar en un sensor MAF o una sonda lambda, comprueba qué evidencia apunta a esa pieza. El Atlas te ayuda a ordenar esa primera revisión.')}${cards(7)}</div></section>
<section class="section cta-section"><div class="wrap"><div class="cta-card"><span class="cta-symbol" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3h12M6 21h12M7 3v4c0 3 5 5 5 5s5-2 5-5V3M7 21v-4c0-3 5-5 5-5s5 2 5 5v4"/><path d="m9 6 3 3 3-3M9 19l3-3 3 3"/></svg></span><h2>Oferta por tiempo limitado</h2><p>Aprovecha esta oferta y elige el plan que necesitas para tu taller. Con el plan completo, recibes los <strong>70 mapas visuales OBD2 y los tres bonos incluidos</strong> en un solo pago.</p>${button('Quiero elegir mi Atlas ahora')}</div></div></section>
<section id="entregables" class="section soft"><div class="wrap">${heading('Todo lo que recibes','Todo lo que recibes en el Plan Completo','Los 70 mapas del Atlas y 3 bonos para consultar el código, preparar la comprobación y registrar el resultado. Material digital en español para tu taller.')}<div class="bundle-image">${productImage(c.images.bundle || c.images.cover, 'Atlas Visual de Diagnóstico Automotriz y los tres bonos incluidos', 'Imagen del Atlas y sus tres bonos pendiente')}</div>${cards(9)}</div></section>
<section id="bonos" class="section"><div class="wrap">${heading('Tres bonos incluidos en el plan completo','Prepara tus pruebas y deja cada revisión anotada')}<div class="cards cols-3">
  <article class="bonus"><div class="bonus-image"><span class="bonus-badge">BONO 1 · PLAN COMPLETO</span>${productImage(c.images.bonusTests,'Fichas Visuales de Pruebas','Imagen de las fichas de pruebas pendiente')}</div><div class="bonus-copy"><h3>Fichas Visuales de Pruebas</h3><p>Cuando el mapa te indique una comprobación, abre la ficha correspondiente. Consulta qué instrumento necesitas, qué observar y qué valor debes confirmar en la documentación del vehículo. Incluye referencias visuales para las pruebas cubiertas con multímetro u osciloscopio.</p></div></article>
  <article class="bonus"><div class="bonus-image"><span class="bonus-badge">BONO 2 · PLAN COMPLETO</span>${productImage(c.images.bonusChecklist,'Checklist de Diagnóstico para el Taller','Imagen del checklist de taller pendiente')}</div><div class="bonus-copy"><h3>Checklist de Diagnóstico para el Taller</h3><p>Imprímelo y déjalo en el banco de trabajo. Registra el síntoma, los códigos, las comprobaciones realizadas y el resultado que respalda tu decisión antes de cambiar una pieza.</p></div></article>
  <article class="bonus"><div class="bonus-image"><span class="bonus-badge">BONO 3 · PLAN COMPLETO</span>${productImage(c.images.bonusGuide,c.bonus3.title,'')}</div><div class="bonus-copy"><h3>${esc(c.bonus3.title)}</h3><p>${esc(c.bonus3.description)}</p></div></article>
</div></div></section>
<section id="acceso" class="section soft"><div class="wrap">${heading('De tu compra al taller','Descarga el material y tenlo a mano para tu próxima revisión')}<ol class="access">${[
  ['Completa tu compra.','Elige tu plan, haz clic en su botón de compra y completa el pago.'],
  ['Revisa la confirmación.','Cuando se confirme el pago, sigue las instrucciones de acceso de tu compra.'],
  ['Abre el material.','Consulta el Atlas desde tu celular, tableta o computadora.'],
  ['Descarga tus archivos.','Guarda el Atlas. Si eliges el plan completo, descarga también los tres bonos e imprime el checklist.'],
  ['Busca tu primer código.','Abre el índice, encuentra la ficha y sigue el recorrido que corresponda al caso.']
].map(([title,text],index) => `<li><h3><span class="step-number">${index+1}</span>${title}</h3><p>${text}</p></li>`).join('')}</ol></div></section>
<section id="en-practica" class="section soft"><div class="wrap">${heading('El material en acción','Mecánicos usando el Atlas Visual en la práctica')}${gallery('Demostraciones ilustrativas del Atlas en el taller', practiceItems, practiceCard)}<div class="center">${button('Quiero recibir los 70 mapas visuales')}</div></div></section>
<section id="experiencias" class="section"><div class="wrap">${showingConversationMockups ? heading('Relatos Reales', 'Lo que dicen los mecánicos que ya usan el Atlas') : heading('Opiniones de mecánicos','Experiencias en el taller')}<div class="feedback-grid">${feedbackItems.map(feedbackCard).join('')}</div><div class="testimonial-gallery">${authorizedTestimonials.map(item => `<figure class="testimonial"><blockquote>${esc(item.quote)}</blockquote><figcaption>${esc(item.name)}${item.role ? `<small>${esc(item.role)}</small>` : ''}</figcaption></figure>`).join('')}</div></div></section>
<section id="oferta" class="section offer"><div class="wrap">${heading('Elige tu plan','Elige tu Atlas y llévalo a tu próxima revisión','Empieza con los 70 mapas del Atlas o elige el plan completo con los 3 bonos y soporte prioritario. Un solo pago, sin mensualidades.')}<div class="plans-grid">${planCard('basic')}${planCard('complete')}</div>${Object.values(planCheckouts).every(Boolean) ? '' : '<p id="checkout-status" class="checkout-status plans-checkout-status">Enlaces oficiales de compra pendientes de configurar.</p>'}</div></section>
<section id="garantia" class="section"><div class="wrap"><div class="guarantee-card"><div class="seal">${url(c.guarantee.seal) ? productImage(c.guarantee.seal,'Sello de garantía de compra','Sello de garantía pendiente') : `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m24 4 16 6v13c0 10-16 20-16 20S8 33 8 23V10z"/><path d="m16 23 6 6 11-12"/></svg><small>${guaranteeReady ? `${esc(c.guarantee.days)} DÍAS` : 'PLAZO PENDIENTE'}</small>`}</div>${heading('Garantía de compra',guaranteeReady ? `Tienes ${esc(c.guarantee.days)} días para revisar el material` : 'Condiciones de garantía pendientes',guaranteeReady ? `Abre el Atlas, consulta las fichas y revisa si el formato te resulta útil para tu trabajo. Puedes solicitar un reembolso dentro del plazo indicado a través de ${esc(c.guarantee.channel)}, según las condiciones de compra.` : 'El plazo y el canal de reembolso se confirmarán antes de habilitar la compra. Esta sección está preparada para incorporar las condiciones oficiales.')}</div></div></section>
<section id="faq" class="section soft"><div class="wrap narrow">${heading('Resolvemos tus dudas','Preguntas frecuentes')}<div class="faq">${data.faq.map(([question,answer],index) => `<details ${index === 0 ? 'open' : ''}><summary aria-expanded="${index === 0}" aria-controls="faq-${index}"><span>${question}</span><span class="expand" aria-hidden="true">+</span></summary><div class="detail-body" id="faq-${index}"><p>${index === 5 ? (guaranteeReady ? `Tienes ${esc(c.guarantee.days)} días para solicitar el reembolso por ${esc(c.guarantee.channel)}, según las condiciones de compra.` : 'El plazo y el canal de garantía están pendientes de confirmación. Se indicarán aquí antes de habilitar la compra.') : answer}</p></div></details>`).join('')}</div></div></section>`;

// Native details keep keyboard and screen reader behavior; mirror state explicitly.
document.querySelectorAll('details').forEach(details => details.addEventListener('toggle', () => details.querySelector('summary').setAttribute('aria-expanded', String(details.open))));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
// Repeat the sequence for a continuous loop, with a pause control for accessibility.
const carousels = [...document.querySelectorAll('.gallery-shell')].map(shell => {
  const track = shell.querySelector('.gallery');
  const control = shell.querySelector('.gallery-pause');
  const state = { track, paused: reducedMotion.matches, visible: false, position: 0 };
  const updateControl = () => {
    control.textContent = state.paused ? 'Reanudar movimiento' : 'Detener movimiento';
    control.setAttribute('aria-label', `${control.textContent}: ${shell.getAttribute('aria-label')}`);
  };
  control.addEventListener('click', () => { state.paused = !state.paused; updateControl(); });
  reducedMotion.addEventListener('change', event => { state.paused = event.matches; updateControl(); });
  const observer = new IntersectionObserver(([entry]) => { state.visible = entry.isIntersecting; });
  observer.observe(track);
  track.addEventListener('scroll', () => { if (Math.abs(track.scrollLeft - state.position) > 2) state.position = track.scrollLeft; });
  updateControl();
  return state;
});
let lastFrame;
function advanceCarousels(time) {
  const elapsed = lastFrame === undefined ? 0 : Math.min(time - lastFrame, 60);
  lastFrame = time;
  for (const state of carousels) {
    const {track} = state;
    if (state.paused || !state.visible || document.hidden || track.matches(':hover, :focus-within') || document.querySelector('#lightbox').open) continue;
    const first = track.children[0];
    const repeatedFirst = track.children[Number(track.dataset.cycleSize)];
    if (!first || !repeatedFirst) continue;
    const cycle = repeatedFirst.offsetLeft - first.offsetLeft;
    const speed = track.hasAttribute('data-sample-order') ? 0.040 : 0.028;
    state.position = (state.position + elapsed * speed) % cycle;
    track.scrollLeft = state.position;
  }
  requestAnimationFrame(advanceCarousels);
}
requestAnimationFrame(advanceCarousels);
const dialog = document.querySelector('#lightbox');
const dialogContent = document.querySelector('#lightbox-content');
let activeSample = 0;
let activeCollection = samples;
let opener;
const renderLightbox = () => {
  const item = activeCollection[activeSample];
  const isFeedback = activeCollection === feedbackItems;
  const isPractice = activeCollection === practiceItems;
  dialogContent.innerHTML = `<h2 id="lightbox-title">${isPractice ? 'El Atlas en la práctica' : isFeedback ? (showingConversationMockups ? 'WhatsApp · ejemplo ilustrativo' : 'WhatsApp') : esc(item.code)}</h2>${productImage(item.src,item.alt,isFeedback ? 'Espacio reservado para una captura de WhatsApp autorizada.' : 'La ficha original del Atlas todavía no está disponible.',item.code || '', {full:true})}${isPractice ? '<p class="illustration-note">Imagen ilustrativa generada con IA.</p>' : isFeedback && showingConversationMockups ? '<p class="illustration-note">Ejemplo de conversación ficticia; no es un testimonio de un cliente.</p>' : ''}`;
};
document.querySelectorAll('[data-sample]').forEach(control => control.addEventListener('click', () => {
  const order = control.closest('.gallery').dataset.sampleOrder.split(',').map(Number);
  activeCollection = order.map(index => samples[index]);
  activeSample = activeCollection.indexOf(samples[Number(control.dataset.sample)]);
  opener = control; renderLightbox(); dialog.showModal();
}));
document.querySelectorAll('[data-feedback]').forEach(control => control.addEventListener('click', () => {
  activeCollection = feedbackItems; activeSample = Number(control.dataset.feedback); opener = control; renderLightbox(); dialog.showModal();
}));
document.querySelectorAll('[data-practice]').forEach(control => control.addEventListener('click', () => {
  activeCollection = practiceItems; activeSample = Number(control.dataset.practice); opener = control; renderLightbox(); dialog.showModal();
}));
const moveSample = direction => { activeSample = (activeSample + direction + activeCollection.length) % activeCollection.length; renderLightbox(); };
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.querySelector('.lightbox-prev').addEventListener('click', () => moveSample(-1));
dialog.querySelector('.lightbox-next').addEventListener('click', () => moveSample(1));
dialog.addEventListener('keydown', event => { if(event.key === 'ArrowRight') moveSample(1); if(event.key === 'ArrowLeft') moveSample(-1); });
dialog.addEventListener('click', event => { if(event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if(event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
dialog.addEventListener('close', () => opener?.focus({preventScroll:true}));
if(campaignConfirmed) document.querySelector('.ribbon').textContent = `🎁 Oferta especial del ${c.campaign.date} · 70 mapas visuales de diagnóstico automotriz + 3 bonos en el plan completo con ${c.campaign.discount} de descuento.`;
const ready = Object.values(planCheckouts).every(Boolean) && guaranteeReady && url(c.images.hero) && url(c.images.bonusTests) && url(c.images.bonusChecklist) && url(c.images.bonusGuide) && samples.length && samples.every(item => url(item.src));
if(c.published && ready) { document.querySelector('.preview')?.remove(); document.querySelector('meta[name="robots"]').content = 'index,follow'; }

// A checkout click starts checkout; confirmed purchases are tracked by Hotmart.
document.querySelectorAll('a.purchase[data-plan]').forEach(link => {
  link.addEventListener('click', () => {
    const key = link.dataset.plan;
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', {
        content_name: key === 'complete' ? 'Atlas Visual + 3 bonos' : 'Atlas Visual',
        content_ids: [`atlas-${key}`],
        content_type: 'product',
        value: Number(c.plans[key].price),
        currency: 'USD',
        num_items: 1
      });
    }
  });
});
