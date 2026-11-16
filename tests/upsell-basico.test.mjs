import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {chromium} from 'playwright';
const base=process.env.ATLAS_TEST_URL||'http://127.0.0.1:3000';
const widgetScript='https://checkout.hotmart.com/lib/hotmart-checkout-elements.js';
test('Basic-plan upsell duplicates original outside its widget integration',async()=>{
 const original=await readFile(new URL('../upsell.html',import.meta.url),'utf8');
 const copy=await readFile(new URL('../upsell-basico.html',import.meta.url),'utf8');
 const normalize=s=>s.replace(/<!-- HOTMART - Sales Funnel Widget -->[\s\S]*?<!-- HOTMART - Sales Funnel Widget -->/,'WIDGET');
 assert.equal(normalize(copy),normalize(original));
});
for(const width of [390,1440])test(`Basic-plan upsell mounts its official widget and loads assets at ${width}px`,async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width,height:900}});const failures=[],errors=[];page.on('pageerror',error=>errors.push(error.message));page.on('response',response=>{if(response.url().startsWith(base)&&response.status()>=400)failures.push(response.url());});
  await page.route('https://**/*',route=>route.request().url()===widgetScript?route.fulfill({contentType:'application/javascript',body:"window.widgetMounts=[];window.checkoutElements={init(type){return {mount(selector){window.widgetMounts.push({type,selector});const iframe=document.createElement('iframe');iframe.style.minWidth='320px';document.querySelector(selector).append(iframe);}}}};"}):route.abort());
  for(const path of ['/upsell-basico','/upsell-basico.html']){
   const response=await page.goto(base+path);assert.equal(response.status(),200);assert.equal(await page.locator('#hotmart-sales-funnel').count(),1);assert.equal(await page.locator(`script[src="${widgetScript}"]`).count(),1);assert.deepEqual(await page.evaluate(()=>widgetMounts),[{type:'salesFunnel',selector:'#hotmart-sales-funnel'}]);assert.equal(await page.locator('[data-checkout-fallback],.pp-decline').count(),0);assert.equal(await page.locator('#vid-6afa81db504e9e302adfc2de').count(),1);assert.match(await page.locator('.pp-price').innerText(),/29,90/);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.locator('a[href="#oferta-upsell"]').click();assert.equal(new URL(page.url()).hash,'#oferta-upsell');
  }
  assert.deepEqual(failures,[]);assert.deepEqual(errors,[]);
 }finally{await browser.close();}
});
