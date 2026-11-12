import {test} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const baseURL = process.env.ATLAS_TEST_URL || 'http://127.0.0.1:3000';
for(const width of [390,1440]) test(`Full sales page: layout and interactions at ${width}px`,async()=>{
  const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  try {
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto(baseURL);await page.waitForSelector('#grupos details');await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('#grupos details').count(),6);
    for(const details of await page.locator('#grupos details').all()) {
      const summary=details.locator('summary');await summary.focus();await page.keyboard.press('Enter');
      await page.waitForFunction(el=>el.getAttribute('aria-expanded')==='true',await summary.elementHandle());
      assert.equal(await details.getAttribute('open'),'');assert.ok((await details.locator('li').count())>=4);
      await page.keyboard.press('Enter');await page.waitForFunction(el=>el.getAttribute('aria-expanded')==='false',await summary.elementHandle());
      assert.equal(await details.getAttribute('open'),null);
    }
    for(const details of await page.locator('#faq details').all()) {
      const initial=await details.getAttribute('open');await details.locator('summary').click();assert.notEqual(await details.getAttribute('open'),initial);
      await details.locator('summary').click();assert.equal(await details.getAttribute('open'),initial);
    }
    assert.equal(await page.locator('.gallery').count(),4);
    const sequences=await page.locator('#por-dentro .gallery').evaluateAll(tracks=>tracks.map(track=>track.dataset.sampleOrder.split(',').map(Number)));
    assert.deepEqual(sequences[1],[...sequences[0]].reverse());
    assert.equal(await page.locator('#muestras [data-sample]').first().getAttribute('data-sample'),'0');
    assert.equal(await page.locator('.button').first().evaluate(el=>getComputedStyle(el).textTransform),'uppercase');

    assert.equal(await page.locator('.gallery-controls,.sample-caption,.notice').count(),0);
    assert.equal(await page.locator('.button svg,.button span').count(),0);
    for(const card of await page.locator('.sample').all()) assert.equal(await card.innerText(),'');
    for(const gallery of await page.locator('.gallery-shell').all()) {
      const track=gallery.locator('.gallery');assert.ok(await track.locator('.sample').first().evaluate(el=>el.dataset.sample!==undefined||el.dataset.feedback!==undefined||el.dataset.practice!==undefined));
      assert.equal(await gallery.locator('.gallery-pause').textContent(),'Reanudar movimiento');
      await gallery.locator('.gallery-pause').focus();await page.keyboard.press('Enter');assert.equal(await gallery.locator('.gallery-pause').textContent(),'Detener movimiento');
      await gallery.locator('.gallery-pause').focus();await page.keyboard.press('Enter');assert.equal(await gallery.locator('.gallery-pause').textContent(),'Reanudar movimiento');
    }
    for(const sample of await page.locator('[data-sample]').all()) {
      await sample.click();assert.equal(await page.locator('dialog').evaluate(el=>el.open),true);
      const title=await page.locator('#lightbox-title').innerText();assert.ok((await sample.getAttribute('aria-label')).endsWith(title));await page.locator('.lightbox-next').click();assert.notEqual(await page.locator('#lightbox-title').innerText(),title);
      await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('#lightbox-title').innerText(),title);
      await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').evaluate(el=>el.open),false);
      assert.equal(await sample.evaluate(el=>el===document.activeElement),true);
    }
    assert.equal(await page.locator('#en-practica h2').textContent(),'Mecánicos usando el Atlas Visual en la práctica');
    assert.equal(await page.locator('#en-practica .button').textContent(),'Quiero recibir los 70 mapas visuales');
    assert.equal(await page.locator('#en-practica .button').getAttribute('href'),'#oferta');
    const practice=page.locator('[data-practice]').first();await practice.click();
    await page.locator('#lightbox-content img').evaluate(el=>el.decode());
    assert.equal(await page.locator('dialog .illustration-note').textContent(),'Imagen ilustrativa generada con IA.');
    await page.locator('.lightbox-next').click();await page.keyboard.press('Escape');
    assert.equal(await page.locator('#experiencias .eyebrow').textContent(),'Ejemplos ilustrativos');
    assert.equal(await page.locator('#experiencias .gallery').count(),0);
    assert.equal(await page.locator('#experiencias .feedback-grid [data-feedback]').count(),4);
    assert.equal(await page.locator('#experiencias img').count(),4);
    await page.locator('[data-feedback]').first().click();assert.ok((await page.locator('#lightbox-title').innerText()).includes('WhatsApp'));await page.locator('#lightbox-content img').evaluate(el=>el.decode());assert.ok((await page.locator('dialog .illustration-note').textContent()).includes('conversación ficticia'));await page.keyboard.press('Escape');
    assert.ok(!(await page.locator('#muestras h2').innerText()).includes('vista previa'));
    assert.equal(await page.locator('.cta-card .button').textContent(),'Quiero garantizar mi Atlas ahora');
    assert.equal(await page.locator('.seal img').count(),1);
    assert.equal(await page.locator('.price-card').count(),2);
    assert.deepEqual(await page.locator('.price').allTextContents(),['US$ 9.90','US$ 14.90']);
    assert.equal(await page.locator('.plan-basic [data-included=false]').count(),3);
    assert.equal(await page.locator('.plan-complete [data-included=false]').count(),0);
    assert.equal(await page.locator('.plan-basic .offer-image').count(),0);
    assert.equal(await page.locator('.plan-complete .offer-image img').count(),1);
    assert.equal(await page.locator('.cta-card h2').textContent(),'Oferta por tiempo limitado');
    assert.equal(await page.locator('#entregables h2').textContent(),'Del primer al último recurso');
    assert.equal(await page.locator('#oferta .price').count(),2);
    for(const purchase of await page.locator('.purchase').all()) assert.equal(await purchase.isDisabled(),true);
    assert.equal(await page.locator('#experiencias').isVisible(),true);
    assert.equal(await page.locator('#bonos .bonus').count(),3);
    assert.equal(await page.locator('#bonos .bonus img').count(),3);
    for (const image of await page.locator('#bonos .bonus img, #entregables .bundle-image img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(el=>el.decode());
      assert.ok(await image.evaluate(el=>el.naturalWidth>0 && el.currentSrc.includes('/assets/optimized/')));
    }
    assert.ok(!(await page.locator('body').innerText()).includes('Atlas Visual de Datos en Vivo del Escáner'));

    assert.equal(await page.locator('.hero-product-image img').getAttribute('loading'),'eager');
    assert.equal(await page.locator('.hero-product-image img').getAttribute('fetchpriority'),'high');
    assert.ok((await page.locator('.hero-product-image img').getAttribute('srcset')).includes('480w'));
    assert.equal(await page.locator('.plan-complete').getByText('Bono 3 · Guía de Diagnóstico sin Códigos de Falla.').count(),1);
    assert.equal(await page.locator('#acceso li').count(),5);
    for(const a of await page.locator('a.button:not(.secondary)').all()) {
      assert.equal(await a.getAttribute('href'),'#oferta');await a.click();
      assert.equal(new URL(page.url()).hash,'#oferta');
      assert.ok(await page.locator('#oferta').evaluate(el=>Math.abs(el.getBoundingClientRect().top)<80));
    }
    await page.locator('.secondary').click();assert.equal(new URL(page.url()).hash,'#muestras');
    const visual=await page.locator('.mockup-stage,.hero-product-image').boundingBox();const actions=await page.locator('.hero-actions').boundingBox();assert.ok(visual.y+visual.height<=actions.y);
    const planPositions=await page.locator('.price-card').evaluateAll(els=>els.map(el=>el.getBoundingClientRect().toJSON()));
    if(width>700) assert.equal(planPositions[0].y,planPositions[1].y);
    else assert.ok(planPositions[1].y>planPositions[0].y);
    const sampleSize=await page.locator('#muestras .sample').first().boundingBox();assert.equal(sampleSize.width,260);assert.equal(sampleSize.height,342);
    const insideSize=await page.locator('#por-dentro .sample').first().boundingBox();assert.equal(insideSize.width,width>700?260:220);
    const groupPositions=await page.locator('.group').evaluateAll(els=>els.map(el=>({x:el.offsetLeft,y:el.offsetTop})));
    if(width>700) {assert.equal(groupPositions[0].y,groupPositions[2].y);assert.ok(groupPositions[1].x>groupPositions[0].x)}
    else {assert.ok(groupPositions[1].y>groupPositions[0].y)}
    assert.equal(await page.locator('html').getAttribute('lang'),'es');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    assert.equal(await page.evaluate(()=>document.fonts.check('700 20px Inter')&&document.fonts.check('600 20px "Barlow Condensed"')),true);
    assert.equal(await page.locator('.preview').count(),0);
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex,nofollow');
    assert.deepEqual(errors,[]);
    await page.evaluate(()=>{document.querySelectorAll('.gallery').forEach(el=>el.scrollTo({left:0,behavior:'instant'}));scrollTo(0,0)});await page.screenshot({path:`artifacts/atlas-${width}.png`,fullPage:true});
    await page.screenshot({path:`artifacts/atlas-top-${width}.png`});
  } finally { await browser.close(); }
});

test('Portable preview runs without external assets',async()=>{
  const {readFile}=await import('node:fs/promises');
  const html=await readFile(new URL('../artifacts/atlas-preview.html',import.meta.url),'utf8');
  const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  try {
    const page=await browser.newPage();const unexpected=[];
    await page.route('**/*',async route=>{
      if(route.request().url()==='https://atlas-preview.test/') await route.fulfill({contentType:'text/html',body:html});
      else {unexpected.push(route.request().url());await route.abort();}
    });
    await page.goto('https://atlas-preview.test/');await page.waitForSelector('#grupos details');
    assert.equal(await page.locator('#grupos details').count(),6);assert.deepEqual(unexpected,[]);
    await page.locator('[data-sample]').first().click();assert.equal(await page.locator('dialog').evaluate(el=>el.open),true);
    await page.locator('.close').click();assert.equal(await page.locator('dialog').evaluate(el=>el.open),false);
    for(const purchase of await page.locator('.purchase').all()) assert.equal(await purchase.isDisabled(),true);
  } finally {await browser.close();}
});
