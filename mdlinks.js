const fs = require("fs");
const marked = require("marked");
const cheerio = require("cheerio");
const path = require("path");
const axios = require("axios").default;

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
const validateStatus = (filename) => {
  const files = extractLinks(filename);

  const fetchingLinks = [];

  files.map((urlObj) => {
    const url = urlObj.href;
    const linkText = urlObj.text;

    // http request with axios
    const linkAx = axios
      .get(url)
      .then((response) => {
        const dataLink = {
          href: url,
          text: linkText,
          file: filename,
          status: response.status,
          statusText: response.statusText
        };
        return dataLink;
      })
      .catch((error) => {
        if (error.response) {
          const dataLink = {
            href: url,
            text: linkText,
            file: filename,
            status: error.response.status,
            statusText: error.response.statusText
          };
          return dataLink;
        }
      });
      fetchingLinks.push(linkAx);
  });
  return Promise.all(fetchingLinks);
};
validateStatus("./demo/demo1.md").then(console.log);

