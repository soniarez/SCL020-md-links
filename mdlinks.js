const fs = require("fs");
const marked = require("marked");
const cheerio = require("cheerio");
const path = require("path");
const axios = require("axios").default;

// Extracting Links and text from link
const extractLinks = (filename) => {
  const data = fs.readFileSync(filename, "utf8");
  const dataHtml = marked.parse(data);
  const $ = cheerio.load(dataHtml);
  const linksObjects = $("a");

  const linksObjArr = [];
  linksObjects.each((index, link) => {
    linksObjArr.push({
      href: $(link).attr("href"),
      text: $(link).text(),
      file: filename,
    });
  });

  return linksObjArr;
};
//extractLinks("./demo/subDemo/subFile.md");

// Http Request - Checking Link Status
const validateStatus = (filename) => {
  const files = extractLinks(filename);

  const fetchingLinks = [];

  files.map((urlObj) => {
    const url = urlObj.href;
    const linkText = urlObj.text;
    const file = urlObj.file;

    /*     let baseDataLink = {
      href: url,
      text: linkText,
      file: filename,
    }; */

    const linkAx = axios
      .get(url)
      .then((response) => {
        const linkInfo = {
          href: url,
          text: linkText,
          file: file,
          status: response.status,
          statusText: response.statusText,
        };
        return linkInfo;
      })
      .catch((error) => {
        if (error.response) {
          const linkInfo = {
            href: url,
            text: linkText,
            file: file,
            status: error.response.status,
            statusText: error.response.statusText,
          };
          return linkInfo;
        }
      });

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
    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      filesArr = getAllFiles(dirPath + "/" + file, filesArr);
    } else {
      filesArr.push(path.join(__dirname, dirPath, "/", file));
    }
  });
  return filesArr;
};

module.exports = {
  extractLinks,
  validateStatus,
  getAllFiles,
};
