const cheerio = require("cheerio");

// load is the most basic way to load something. Takes an html string and gives us a cheerio obj
// by default it includes the <html> and <head> tag. use third arg to disable this
// let $ = cheerio.load("<h1>Hello, world!</h1>", null, false);
// console.log($.html());


// this is how you load from buffer
const fs = require("fs");
const buffer = fs.readFileSync("document.html");
$ = cheerio.loadBuffer(buffer);

console.log($("title").text());


// this is how you load from URL
const run = async () => {
  $ = await cheerio.fromURL("https://example.com");
  console.log($.html());
};

run();
