// cheerio uses css selectors, xpath isn't supported
const cheerio = require("cheerio");

const run = async () => {
  let $ = await cheerio.fromURL("https://example.com");

  // this selects all the p tags in the document
  // convention is to use $ to indicate that it is a cheerio obj
  const $p = $("p");
  console.log($p.html());

  // this selects all elements with a selected class
  let $selected = $(".selected");

  // you can combine selectors, just like in css selectors
  $selected = $("p.selected");

  // selecting descendants. Here we select p that are children of divs

  const 
};

run();
