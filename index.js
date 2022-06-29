// module.exports = () => {
//   // ...
// };
const fs = require("fs");
const { readFileSync } = require("fs");
const markdownLinkExtractor = require("markdown-link-extractor");
const path = require("path");

// Extracting links from markdown file
const readingFile = () => {
  try {
    const markdown = readFileSync("README.md", { encoding: "utf8" });
    const links = markdownLinkExtractor(markdown);
    const linksArr = [];

    links.forEach((link) => linksArr.push(link));
    console.log(linksArr);

  } catch (err) {
    console.error(err);
  }
};
readingFile();


// Getting the extension of a file
const ext = path.extname("README.md");
console.log(ext, "soy la extensión del archivo");



/* var file = require("file-system");
var fs = require("fs");

file.readFile === fs.readFile; */

// Reading file and check if file includes links - https
// const strHttps = "https"

/* fs.readFile("demo1.md", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const separateStr = data.split(/\r?\n/);
  const linksArr = [];

  const lines = separateStr.forEach((line) => {
    const conditions = /https|http/.test(line);
    
    if (conditions) {
      linksArr.push(line);
    } 
  });

  console.log(linksArr);
  return linksArr;
}); */
