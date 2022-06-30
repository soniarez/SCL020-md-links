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
    const markdown = readFileSync(filename).toString();
    const links = markdownLinkExtractor(markdown);
    //console.log(links[0].text, "links en readingfile");
    const linksArr = [];
    //console.log(links, "links en readingFile func");
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

  files.map((url) => {
    //const  text  = url.text;
    //console.log(text)
    axios.get(url)
      .then((response) => {
        //console.log(response.data);
        const successLinks = {
          link: url,
          status: response.status,
          statusText: response.statusText,
        };
        //console.log(successLinks, "hola estoy aca");
        fetchingLinks.push(successLinks);
        return successLinks;
        //console.log(fetchingLinks.length, files.length);
      })
      .catch((error) => {
        if (error.response) {
          const failLinks = {
            link: url,
            status: error.response.status,
            statusText: error.response.statusText,
          };
          fetchingLinks.push(failLinks);
          return failLinks;
        }
      })
      .finally(() => {
        if (fetchingLinks.length === files.length) {
          console.log(fetchingLinks);
         }
      });
  });
};
httpReq("demo1.md");
 
// Getting md files from a directory
const readingDir = (__dirname) => {
  files = fs.readdirSync(__dirname);
  console.log("/Filenames with the .md extension:");

  files.forEach((file) => {
    if (path.extname(file) == ".md") console.log(file);
  });
};
readingDir("C:/Users/carolina.briones/Desktop/COPY-SCL020-memory-match"); 
