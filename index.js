// module.exports = () => {
//   // ...
// };
const fs = require("fs");
const { readFileSync } = require("fs");
const markdownLinkExtractor = require("markdown-link-extractor");
const path = require("path");
const axios = require("axios").default;

// Extracting links from file
const readingFile = (filename) => {
  try {
    const markdown = readFileSync(filename, { encoding: "utf8" });
    const links = markdownLinkExtractor(markdown);
    const linksArr = [];

    links.forEach((link) => linksArr.push(link));
    //console.log(linksArr);
    return linksArr;
  } catch (err) {
    console.error(err);
  }
};
readingFile("demo1.md");

// Http Request - Checking Link Status
const httpReq = (filename) => {
  const files = readingFile(filename);
  const fetchingLinks = [];

  const linkStatus = files.map((url) => {
    //console.log(url);
    return new Promise((resolve, reject) => {
      const ax = axios.get(url)
        .then((response) => {
          const successLinks = {
            link: url,
            status: response.status,
            statusText: response.statusText,
          };
          console.log(successLinks);
          fetchingLinks.push(successLinks);
          return successLinks;
        })
        .catch((error) => {
          if (error.response) {
            const failLinks = {
              link: url,
              status: error.response.status,
              statusText: error.response.statusText,
            };
            console.log(failLinks);
            fetchingLinks.push(failLinks);
            return failLinks;
          }
        });
        resolve(ax);
        reject((error) => console.log("fallo promesa"), error);
    });
  });
  Promise.all(linkStatus);
   return fetchingLinks;
};
console.log(httpReq("demo1.md"));

// Getting the extension of a file
const ext = path.extname("README.md");
//console.log(ext, "soy la extensión del archivo");
