const puppeteer = require("puppeteer");
const fs = require('fs');
const utils = require('./utils.js');

(async () => {
    //go to archinect salaries page
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await utils.preparePageForTests(page);
    await page.goto("https://salaries.archinect.com/poll/results/all/view-all");
    await page.waitForSelector('.dataTables_info')
    //select the next button
    let nextButton = await page.$('#salary-listing_wrapper > div:nth-child(3) > div.pull-right > div > ul > li.next > a');
    let pageCount = 904
    
    let results = [];
    //while there are more pages
    while(pageCount > 0) {
        // scrape jobs on current page
        let entries = await page.$$('tr > td')
        let parsedEntries = await Promise.all(entries.map(parser));
        results.push(...parsedEntries)
       
        // go to next page
        await nextButton.click();
        // new next button is button on next page
        nextButton = await page.$('#salary-listing_wrapper > div:nth-child(3) > div.pull-right > div > ul > li.next > a');
        pageCount--
    }
    //save to file
    await fs.writeFile(`./data/results.json`, JSON.stringify({jobs:results}), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('File has been created');
      });
    
    await browser.close();
})();

const parser = async (element) => {

    let title = await element.$('h3');
    const titleText = title ? await title.evaluate((e) => e.innerHTML) : null;
    let bits = await element.$$('ul > li');
    const bitsText = bits ? await Promise.all(bits.map(async b => await b.evaluate((e) => e.innerText))) : null;
    let date = await element.$('.date-stamp')
    let dateText = date ? await date.evaluate((e) => e.innerText) : null

    return {
        titleText,
        dateText,
        bitsText
    };
}
