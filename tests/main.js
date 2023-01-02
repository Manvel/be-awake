const puppeteer = require("puppeteer");
const assert = require("assert");
const extensionPath = `src`;

/** @type puppeteer.Browser */
let browser;
describe("Generic tests", () =>
{
  before(async() =>
  {
    browser = await puppeteer.launch({
      headless: false, // extension are allowed only in the head-full mode
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`
      ]
    });
    // The extension target is not ready at this point, so we wait a bit.
    await sleep(500);
  
  });

  it("The extension has been loaded and background page is available", async() => {
    assert.ok(await getBackgroundPageTarget());
  });

  it("Clicking on extension icon should change the icon to active and inactive", async() => {
    await clickOnExtensionIcon();
    
  });

  after(async() => {
    // await browser.close();
  });
});

async function getBackgroundPageTarget() {
  const targets = await browser.targets();
  return extensionTarget = targets.find((target) =>
    target.url().startsWith("chrome-extension://") && target.type() === "background_page"
  );
}

async function clickOnExtensionIcon() {
  const extBackgroundTarget = await getBackgroundPageTarget();
  const extBackgroundPage = await extBackgroundTarget.page();
  await extBackgroundPage.evaluate(() => {
    chrome.tabs.query({ active: true }, tabs => {
      chrome.browserAction.onClicked.dispatch(tabs[0]);
    })
  })
}

// async function getPowerRecord() {
//   const extBackgroundTarget = await getBackgroundPageTarget();
//   const extBackgroundPage = await extBackgroundTarget.page();
//   extBackgroundPage.evaluate(() => {
//     return new Promise((resolve,reject)=>{
//       resolve(true);
//    });
  
//   })
// }

function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}
