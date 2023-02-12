const delay = (time) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

const rollDice = (lower, upper) => {
  return lower + (upper - lower) * Math.random();
};

const preparePageForTests = async (page) => {
  // Pass the User-Agent Test.
  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64)" +
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
  await page.setUserAgent(userAgent);
};

module.exports = {
  delay,
  rollDice,
  preparePageForTests,
}