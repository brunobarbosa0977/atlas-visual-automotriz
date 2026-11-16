import {test} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const base=process.env.ATLAS_TEST_URL||'http://127.0.0.1:3000';
const widgetScript='https://checkout.hotmart.com/lib/hotmart-checkout-elements.js';
for(const width of [390,1440])test(`Postpurchase official widget only mounts on upsell at ${width}px`,async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width,height:900}});const errors=[];page.on('pageerror',error=>errors.push(error.message));
  // Mock the vendor API: verify integration without creating a checkout or a charge.
  await page.route('https://**/*',route=>route.request().url()===widgetScript?route.fulfill({contentType:'application/javascript',body:"window.widgetMounts=[];window.checkoutElements={init(type){return {mount(selector){window.widgetMounts.push({type,selector});document.querySelector(selector).textContent='Widget de Hotmart';}}}};"}):route.abort());
  for(const offer of ['upsell','downsell']){
   const response=await page.goto(`${base}/${offer}`);assert.equal(response.status(),200);
   if(offer==='upsell'){
   assert.equal(await page.locator('#hotmart-sales-funnel').count(),1);
   assert.equal(await page.locator(`script[src="${widgetScript}"]`).count(),1);
   assert.deepEqual(await page.evaluate(()=>widgetMounts),[{type:'salesFunnel',selector:'#hotmart-sales-funnel'}]);
   assert.equal(await page.locator('[data-checkout-fallback],.pp-decline').count(),0);
   }else{
    assert.equal(await page.locator('#hotmart-sales-funnel').count(),0);
    assert.equal(await page.locator(`script[src="${widgetScript}"]`).count(),0);
    assert(await page.locator('[data-checkout-fallback]').isDisabled());
    assert.equal(await page.locator('.pp-decline').count(),1);
   }
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   assert.match(await page.locator('.pp-price').innerText(),offer==='upsell'?/29,90/:/12,90/);
   assert.equal(await page.locator('nav').count(),0);
  }
  assert.deepEqual(errors,[]);
 }finally{await browser.close();}
});
