import {test} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const base=process.env.ATLAS_TEST_URL||'http://127.0.0.1:3000';
for(const width of [360,390,1440])test(`Confirmation and VIP access pages at ${width}px`,async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width,height:900}});const errors=[];page.on('pageerror',error=>errors.push(error.message));
  for(const name of ['gracias','gracias-vip']){
   const response=await page.goto(`${base}/${name}`);assert.equal(response.status(),200);
   assert.equal(await page.locator('html').getAttribute('lang'),'es');
   assert.equal(await page.locator('[role="progressbar"]').getAttribute('aria-valuenow'),'100');
   assert.equal(await page.locator('.thanks-step').count(),3);
   for(const button of await page.locator('[data-members-access]').all())assert.equal(await button.getAttribute('href'),'https://consumer.hotmart.com');
   assert.match(await page.locator('main').innerText(),/7 días/);
   assert.equal(await page.locator('nav,iframe,script').count(),0);
   assert.equal(await page.locator('.thanks-summary li').count(),name==='gracias-vip'?3:0);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   const firstCTA=await page.locator('[data-members-access]').first().boundingBox();assert(firstCTA.y+firstCTA.height<900);
   if(name==='gracias-vip')assert.match(await page.locator('.thanks-summary').innerText(),/4 clases/);
  }
  assert.deepEqual(errors,[]);
 }finally{await browser.close();}
});
