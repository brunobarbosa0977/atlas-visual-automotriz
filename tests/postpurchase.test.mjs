import {test} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const base=process.env.ATLAS_TEST_URL||'http://127.0.0.1:3000';
for(const width of [390,1440])test(`Postpurchase pages: responsive navigation and inactive widget at ${width}px`,async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width,height:900}});const errors=[];page.on('pageerror',error=>errors.push(error.message));
  for(const offer of ['upsell','downsell']){
   const response=await page.goto(`${base}/${offer}`);assert.equal(response.status(),200);
   assert(await page.locator(`#hotmart-${offer}-widget button`).isDisabled());
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   assert.match(await page.locator('.pp-price').innerText(),offer==='upsell'?/29,90/:/12,90/);
   assert.equal(await page.locator('nav').count(),0);
  }
  await page.goto(`${base}/upsell`);await page.locator('.pp-decline').click();assert.equal(new URL(page.url()).pathname,'/downsell');
  await page.locator('a[href="#oferta-downsell"]').click();assert.equal(new URL(page.url()).hash,'#oferta-downsell');
  assert.equal(await page.locator('[data-access]').getAttribute('href'),'https://consumer.hotmart.com/');assert.deepEqual(errors,[]);
 }finally{await browser.close();}
});
