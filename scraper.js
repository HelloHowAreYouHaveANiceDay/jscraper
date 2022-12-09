const { scrapeAllJobs } = require('jse-scrape-jobs')



scrapeAllJobs( "https://www.indeed.com/jobs?q=Front+end+engineer&sc=0kf%3Ajt%28internship%29%3B").then(res => console.log(res))