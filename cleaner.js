const { mapEntry } = require("./jobParser");
const dfd = require("danfojs-node");

const rNyc = require("./data/20221212-New York, NY-Architect.json");
const rLa = require("./data/20221212-Los Angeles, CA-Architect.json");
const rChi = require("./data/20221212-Chicago-Architect.json");
const rHou = require("./data/20221212-Houston, TX-Architect.json");
const rPho = require("./data/20221212-Phoenix, AZ-Architect.json");
const rSa = require("./data/20221213-San Antonio, TX-Architect.json");
const rPhi = require("./data/20221212-Philadelphia, PA-Architect.json");
const rSd = require("./data/20221213-San Diego, CA-Architect.json");
const rDa = require("./data/20221213-Dallas, TX-Architect.json");
const rSj = require("./data/20221213-San Jose, CA-Architect.json");

const topTenCities = [rNyc, rLa, rChi, rHou, rPho, rSa, rPhi, rSd, rDa, rSj];

// const jobsList = []

// for (let i = 0; i < topTenCities.length; i++) {
//     const element = topTenCities[i];
//     console.log(element.length)
//     jobsList.concat(element.map(mapEntry))
// }

const jobsList = topTenCities.map((r) => r.map(mapEntry)).flat(1);

console.log("parsedJobs " + jobsList.length);

df = new dfd.DataFrame(jobsList);

dfd.toCSV(df, { filePath: "./data/arch-jobs.csv" });
