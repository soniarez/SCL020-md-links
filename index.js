// module.exports = () => {
//   // ...
// };
const fs = require("fs");
const { readFileSync } = require("fs");
const marked = require("marked");
const cheerio = require('cheerio');
const path = require("path");
const axios = require("axios").default;


// Extracting Links
const extractLinks = (filename) => {
  try {
    const data = fs.readFileSync(filename, "utf8");
    const dataHtml = marked.parse(data); // using marked to transform md to html
    const $ = cheerio.load(dataHtml); // using cheerio to extract <a> tags
    const linksObjects = $('a');  // this is a mass object, not an array
    //console.log(linksObjects);

    const linksArr = [];
    linksObjects.each((index, link) => {
      linksArr.push({
      text: $(link).text(),
      href: $(link).attr('href')
      })  
    });
    //console.log(linksArr, "linksArr in extractLink func");
    return linksArr;
  } catch (err) {
    console.error(err);
  }
};
extractLinks("demo1.md");


// Http Request - Checking Link Status
 const validateStatus = (filename) => {
  const files = extractLinks(filename);
  //console.log(files, "files in validateStatus");

  const fetchingLinks = []; 

  files.forEach((urlObj) => {
    const url = urlObj.href;
    const linkText = urlObj.text;
    axios
      .get(url)
      .then((response) => {
        const successLinks = {
          href: url,
          text: linkText,
          status: response.status,
          statusText: response.statusText,
        };
        fetchingLinks.push(successLinks);
        return successLinks;
        //console.log(fetchingLinks.length, files.length);
      })
      .catch((error) => {
        if (error.response) {
          const failLinks = {
            href: url,
            text: linkText,
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
validateStatus("demo1.md");  

// Getting md files from a directory
const readingDir = (__dirname) => {
  files = fs.readdirSync(__dirname);
  console.log("/Filenames with the .md extension:");

  files.forEach((file) => {
    if (path.extname(file) == ".md") console.log(file);
  });
};
readingDir("C:/Users/carolina.briones/Desktop/COPY-SCL020-memory-match");
