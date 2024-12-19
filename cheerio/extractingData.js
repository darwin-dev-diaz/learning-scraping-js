const cheerio = require("cheerio");
const { ChromiumWebDriver } = require("selenium-webdriver/chromium");

// the extract method lets you take data from the html and put it into an obj

const $ = cheerio.load(`
  <ul>
    <li>One</li>
    <li>Two</li>
    <li class="blue sel">Three</li>
    <li class="red">Four</li>
    <li class="red">Four</li>
    <li class="red">Four</li>
    <a href="lol.com">This is a test</a>
    <a href="lol.com">This is a test</a>
    <a href="lol.com">This is a test</a>
  </ul>
`);

// just pass in a key and a selector, this is a genious feature
let data = $.extract({
  red: ".red", // extracts the first .red object
  reds: [".red"], // gets all the .red objects, returns an array of all the text content
});

console.log(data);

// how to be more specific
data = $.extract({
  red: ".red",
  links: {
    selector: "a", // this is the selected elemend
    value: "href", // this is the value you want to get from the selected element
  },
});

console.log(data);

data = $.extract({
  red: [{ selector: ".red", value: "outerHTML" }],
});
console.log(data);

data = $.extract({
  links: [
    {
      selector: "a",
      value: (element, key) => {
        const href = $(element).attr("href");
        return `${key}=${href}`;
      },
    },
  ],
});

console.log(data);

const run = async () => {
  const $ = await cheerio.fromURL(
    "https://github.com/cheeriojs/cheerio/releases"
  );

  const data = $.extract({
    releases: [
      {
        // First, we select individual release sections.
        selector: "section",
        // Then, we extract the release date, name, and notes from each section.
        value: {
          // Selectors are executed within the context of the selected element.
          name: "h2",
          date: {
            selector: "relative-time",
            // The actual release date is stored in the `datetime` attribute.
            value: "datetime",
          },
          notes: {
            selector: ".markdown-body",
            // We are looking for the HTML content of the element.
            value: "innerHTML",
          },
        },
      },
    ],
  });

  console.log(data);
};

run();
