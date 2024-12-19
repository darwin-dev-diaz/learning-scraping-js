const cheerio = require("cheerio");
const $ = cheerio.load();
// this is how you get the attributes and properties

const href = $("a").atrr("href");
const isDisabled = $("button").prop("disabled");

// this is how you get and elements text
const text = $("p").text();

// this is how you get the inner html of an element
const html = $("div").html();


