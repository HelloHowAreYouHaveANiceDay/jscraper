const puppeteer = require("puppeteer");
const fs = require('fs');

const JOB_TITLE = "Architect";
const CITY = "Houston, TX";

(async () => {
  // launch a browser
  // const browser = await puppeteer.launch({ headless: false });
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await preparePageForTests(page);
  await page.goto("https://www.indeed.com");

  // Search Page
  // job title
  await page.type("#text-input-what", JOB_TITLE);

  // location
  await clearText("#text-input-where", page);
  await page.type("#text-input-where", CITY);
  await page.keyboard.press("Enter");
  await page.waitForNavigation();

  // await page.goto(
  //   "https://www.indeed.com/jobs?q=Architect&l=San%20Francisco%2C%20CA&from=searchOnHP"
  // );

  let more = await page.$('[aria-label="Next Page"]');

  const results = [];
  // Search Result Page

  while (more) {
    // Get List
    // const elements = await page.$$(".jobsearch-ResultsList li");
    const elements = await page.$$(".jobsearch-ResultsList .job_seen_beacon")
    // For each element

    for (const e of elements) {
      const titleElement = await e.$(".jcs-JobTitle");

      // not all elements are valid
      if (titleElement) {
        // click the job card
        // 1. Click element
        await titleElement.click();
        // await page.waitForNavigation({waitUntil: 'networkidle2'});
        await delay(rollDice(500, 1000))

        const job_title = titleElement
          ? await titleElement.evaluate((e) => e.innerText)
          : null;

        const companyNameElement = await e.$(".companyName");
        const company_name = companyNameElement
          ? await companyNameElement.evaluate((e) => e.innerText)
          : null;

        const companyLocationElement = await e.$(".companyLocation");
        const company_location = companyLocationElement
          ? await companyLocationElement.evaluate((e) => e.innerText)
          : null;

        const salaryElement = await e.$(".salary-snippet-container");
        const salary_range = salaryElement
          ? await salaryElement.evaluate((e) => e.innerText)
          : null;

        const datePostedElement = await e.$(".date");
        const days_ago_posted = datePostedElement
          ? await datePostedElement.evaluate((e) => e.innerText)
          : null;

        // 2. Extract detail description
        const jobDElement = await page.$(".jobsearch-JobComponent-description");
        const job_description = jobDElement
          ? await jobDElement.evaluate((e) => e.innerText)
          : null;

        results.push({
          job_title,
          company_name,
          company_location,
          salary_range,
          days_ago_posted,
          job_description,
        });

        console.log(`${job_title} parsed`)
      }
      
      await delay(rollDice(1250, 5000))
    }

    console.log(`logged: ${results.length}`)
    await delay(rollDice(2000, 10000))

    // paginate
    await more.click();
    await page.waitForNavigation({waitUntil: 'networkidle2'});
    more = await page.$('[aria-label="Next Page"]');
  }


  // const detail = await getJobDetails(page)

  console.log(`parsed ${results.length} jobs`);
  const print = JSON.stringify(results)
  await fs.writeFile(`./data/20221212-${CITY}-${JOB_TITLE}.json`, print, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File has been created');
  });

  await browser.close();
})();

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

function rollDice(lower, upper){
  return lower + (upper - lower) * Math.random()
}

const clearText = async (selector, page) => {
  await page.focus(selector);
  await page.keyboard.down("Control");
  await page.keyboard.press("A");
  await page.keyboard.up("Control");
  await page.keyboard.press("Backspace");
};

const preparePageForTests = async (page) => {
  // Pass the User-Agent Test.
  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64)" +
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
  await page.setUserAgent(userAgent);
};
