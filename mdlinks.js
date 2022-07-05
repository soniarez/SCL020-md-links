const fs = require("fs");
const marked = require("marked");
const cheerio = require("cheerio");
const path = require("path");
const axios = require("axios").default;
const process = require("process");

// Extracting Links and text from link
const extractLinks = (filename) => {
  try {
    const data = fs.readFileSync(filename, "utf8");
    const dataHtml = marked.parse(data); // using marked to transform md to html
    const $ = cheerio.load(dataHtml); // using cheerio to extract <a> tags
    const linksObjects = $("a"); // this is a mass object, not an array
    //console.log(linksObjects in extractLinks func);

    const linksObjArr = [];
    linksObjects.each((index, link) => {
      linksObjArr.push({
        text: $(link).text(),
        href: $(link).attr("href"),
      });
    });

    return linksObjArr;
  } catch (err) {
    console.error(err);
  }
};
//extractLinks("./demo/subDemo/subFile.md");

// Http Request - Checking Link Status
const validateStatus = (filename, options) => {
  const files = extractLinks(filename);

  const fetchingLinks = [];

  files.map((urlObj) => {
    const url = urlObj.href;
    const linkText = urlObj.text;

    //Object containing basic infor ir user noes not use options
    let baseDataLink = {
      href: url,
      text: linkText,
      file: filename,
    };

    // http request with axios
    const linkAx = axios
      .get(url)
      .then((response) => {
        if (process.argv[2] === "--validate") {
          (baseDataLink.status = response.status),
            (baseDataLink.statusText = response.statusText);
          return baseDataLink;
        } else {
          return baseDataLink;
        }
      })
      .catch((error) => {
        if (error.response) {
          if (process.argv[2] === "--validate") {
            (baseDataLink.status = error.response.status),
              (baseDataLink.statusText = error.response.statusText);
          }
          return baseDataLink;
        }
      });
    fetchingLinks.push(linkAx);
  });
  return Promise.all(fetchingLinks);
};
validateStatus("./demo/demo1.md").then(console.log);
