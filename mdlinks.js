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
    const dataHtml = marked.parse(data);
    const $ = cheerio.load(dataHtml);
    const linksObjects = $("a");

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

    let baseDataLink = {
      href: url,
      text: linkText,
      file: filename,
    };

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
      })
     
    fetchingLinks.push(linkAx);
  });
  return Promise.all(fetchingLinks);
};
//validateStatus("./demo/demo1.md").then(console.log);

// Getting all the files from directory - recursion - to be able to go through folders and subfolders
const getAllFiles = (dirPath, filesArr) => {
  const files = fs.readdirSync(dirPath, "utf8");

  filesArr = filesArr || [];

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      filesArr = getAllFiles(dirPath + "/" + file, filesArr);
    } else {
      filesArr.push(path.join(__dirname, dirPath, "/", file));
    }
  });
  return filesArr;
};
/* const funt = getAllFiles("./demo");
console.log(funt, "estoy en getAllMdFiles func");  */

module.exports = {
  validateStatus,
  getAllFiles,
};
