const cheerio = require("cheerio");


const $ = cheerio.load("<h1>Hello, world!</h1>");
console.log($("h1").text());
