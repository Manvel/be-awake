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
    await sleep(1000);
  });

  it("The extension has been loaded and background page is available", async() => {
    assert.ok(await getBackgroundPageTarget());
  });

  it("Clicking on extension icon should update the record to active and inactive", async() => {
    assert.equal(Object.keys(await getPowerRecord()).length, 0);
    await clickOnExtensionIcon();
    assert.deepEqual(await getPowerRecord(), {power: true})
    await clickOnExtensionIcon();
    assert.deepEqual(await getPowerRecord(), {power: false})
  });

  after(async() => {
    await browser.close();
  });
});

async function getBackgroundPageTarget() {
  const targets = await browser.targets();
  return extensionTarget = targets.find((target) =>
    target.url().startsWith("chrome-extension://") && target.type() === "service_worker"
  );
}

async function clickOnExtensionIcon() {
  const extBackgroundTarget = await getBackgroundPageTarget();
  const extBackgroundPage = await extBackgroundTarget.worker();
  await extBackgroundPage.evaluate(() => {
    chrome.tabs.query({ active: true }, tabs => {
      chrome.action.onClicked.dispatch(tabs[0]);
    })
  });
  await sleep(100);
}

async function getPowerRecord() {
  const extBackgroundTarget = await getBackgroundPageTarget();
  const extBackgroundPage = await extBackgroundTarget.worker();
  return extBackgroundPage.evaluate(() => {
    return chrome.storage.local.get("power");
  })
}

function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}
