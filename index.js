const puppeteer = require("puppeteer");

(async () => {
  // launch a browser
  const browser = await puppeteer.launch({ headless: false });
  // const browser = await puppeteer.launch();

  const page = await browser.newPage();
  // await preparePageForTests(page);
  await page.goto("https://www.indeed.com");
  // job title
  await page.type("#text-input-what", "Architect");

  // location
  await clearText("#text-input-where", page);
  await page.type("#text-input-where", "San Francisco, CA");

  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  await page.waitForSelector('.jobsearch-ResultsList li');

  const elements =await page.$$eval('.jobsearch-ResultsList li', options => {
    return options.map(option => option.textContent);
  });
  // const detail = await getJobDetails(page)

  console.log(elements);
  await browser.close();
})();

const clearText = async (selector, page) => {
  await page.focus(selector);
  await page.keyboard.down("Control");
  await page.keyboard.press("A");
  await page.keyboard.up("Control");
  await page.keyboard.press("Backspace");
};

const preparePageForTests = async (page) => {

  // Pass the User-Agent Test.
  const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
  await page.setUserAgent(userAgent);
  }
  

const getJobElements = async (page) => {
  const elements = await page.evaluate(() => {
    // Use querySelectorAll to select all elements with the class "jobtitle"
    const jobTitles = document.querySelectorAll(".jobsearch-ResultsList li");

    //Use the map method to extract the inner text of each job title element
    // return Array.from(jobTitles).map(jobTitle => jobTitle);
    return Array.from(jobTitles);
  });
  return elements;
};

const getJobDetails = async (page) => {
  const description = await page.evaluate(() => {
    const details = document.querySelectorAll(".jobsearch-ResultsList li");

    return details;
  });
  return description;
};
