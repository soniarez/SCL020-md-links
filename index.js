// module.exports = () => {
//   // ...
// };
const fs = require("fs");
const { readFileSync } = require("fs");
const markdownLinkExtractor = require("markdown-link-extractor");
const path = require("path");
const axios = require('axios').default;



// Extracting links from markdown file
const readingFile = (filename) => {
  try {
    const markdown = readFileSync(filename, { encoding: "utf8" });
    const links = markdownLinkExtractor(markdown);
    const linksArr = [];

    links.forEach((link) => linksArr.push(link));
    // console.log(linksArr);
    return linksArr;

  } catch (err) {
    console.error(err);
  }
};
readingFile("demo1.md");

// Http Request - Checking Link Status
const httpReq = (url) => {
  axios.get(url)
  .then((response) => {
    // handle success
    console.log(`File status: ${response.status} | Status Message: ${response.statusText}`);
  })
  .catch((error) => {
    // console.log("hola")
    if (error.response) {
      // handle error
      console.log(`File status: ${error.response.status} | Status Message: ${error.response.statusText}`);
    }
  });
};
httpReq("https://bobbyhadz.com/blog/node-js-check-if-file-contains-string");

// Getting the extension of a file
const ext = path.extname("README.md");
//console.log(ext, "soy la extensión del archivo");

// init function
const init = (filename) => {
  const files = readingFile(filename);
  
  files.forEach((link) => {
    console.log(link);
  });
};
init("demo1.md");
