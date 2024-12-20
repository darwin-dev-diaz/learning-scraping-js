const playwright = require("playwright");
const random_useragent = require("random-useragent");
const cheerio = require("cheerio");
const fs = require("fs");

const BASE_URL = "https://github.com/topics/playwright";
(async () => {
  try {
    // create user agent
    const agent = random_useragent.getRandom();

    // setup browser
    const browser = await playwright.chromium.launch({ headless: true }); // this is kinda like installing the chrome app on your pc
    const context = await browser.newContext({ userAgent: agent }); // this is like opening a new browser window
    const page = await context.newPage({ bypassCSP: true });
    await page.setDefaultTimeout(30000);
    await page.setViewportSize({ width: 800, height: 600 });
    await page.goto(BASE_URL);

    // get data from website
    const $ = cheerio.load(await page.content());
    const $repos = $("article.border");
    const data = $repos
      .map((i, element) => {
        const data = $(element).extract({
          users: "h3 > a:first-of-type",
          repos: "h3 > a:last-of-type",
          url: {
            selector: "h3 > a:last-of-type",
            value: (element) => "https://github.com" + $(element).attr("href"),
          },
        });

        return data;
      })
      .get();

    // put data into file
    const logger = fs.createWriteStream("data.txt", { flag: "w" });
    logger.write(JSON.stringify(data, null, " "));

    // close browser
    await context.close();
    await browser.close();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
