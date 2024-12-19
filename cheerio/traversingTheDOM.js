// methods to move around the DOM tree/ selection. You do this after selecting and element
// find - finds specific elements within a seleciton
const cheerio = require("cheerio");
let $ = cheerio.load(`<ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>`);

let listItems = $("ul").find("li");
console.log(listItems.length);

// children - returns the direct children nodes
listItems = $("ul").children("li");
console.log(listItems.length);

// contents - select all children - including comments and text
$ = cheerio.load(
  `<div>
    Text <p>Paragraph</p>
  </div>`
);

const contents = $("div").contents();
console.log(contents.length); // 3

// eq lets you select a selection at a specific index
$ = cheerio.load(
  `<ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>`
);

const secondItem = $("li").eq(1);
console.log(secondItem.text());

// filter and not - filter allows you to filter a Cheerio obj by a selector. Only the matching nodes will return. not does the opposite of filter

$ = cheerio.load(
  `<ul>
    <li class="item">Item 1</li>
    <li>Item 2</li>
  </ul>`
);

let matchingItems = $("li").filter(".item");
const nonMatchingItems = $("li").not(".item");

console.log(matchingItems.text(), nonMatchingItems.text());

// has - select element that have children matching the selector

$ = cheerio.load(
  `<ul>
    <li>Item 1</li>
    <li>
      <strong>Item 2</strong>
    </li>
  </ul>`
);

matchingItems = $("li").has("strong"); // this will only select the second li

console.log(matchingItems.text());

// first and last - return the first and last elements in a selection
