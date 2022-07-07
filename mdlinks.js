const fs = require("fs");
const marked = require("marked");
const cheerio = require("cheerio");
const path = require("path");
const axios = require("axios").default;

// EXTRACTING LINKS, TEXT AND PATH FROM A FILE
const extractLinks = (filename) => {
  const data = fs.readFileSync(filename, "utf8");
  const dataHtml = marked.parse(data); //using marked to transform md to html
  const $ = cheerio.load(dataHtml); //using cheerio to traverse the file to extract <a> tags
  const linksObjects = $("a"); //this is a mass object, not an array 

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

// HTTP REQUEST - CHECKING LINK STATUS
const validateStatus = (filename) => {
  const files = extractLinks(filename);

  const fetchingLinks = [];

  files.map((urlObj) => {
    const url = urlObj.href;
    const linkText = urlObj.text;
    const file = urlObj.file;

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

// STATS - GETTING TOTAL NUMBER OF LINKS AND WHICH ONES ARE UNIQUE
const statsLink = (filename) => {
  const files = extractLinks(filename);
  //Filtering to get unique links
  const uniqueArr = files.filter((link, index, self) => {
    return self.findIndex((l) => l.href === link.href) === index;
  });
  //Stats object
  const stats = {
    total: files.length,
    unique: uniqueArr.length,
  };
  return stats;
};
//console.log(statsLink("./demo/subDemo/subFile.md"));

// GETTING ALL FILES FROM A DIRECTORY - RECURSION - TO BE ABLE TO GO THROUGH FOLDERS AND SUBFOLDERS 
const getAllFiles = (dirPath, filesArr) => {
  const files = fs.readdirSync(dirPath, "utf8");
  
  filesArr = filesArr || [];

  files.forEach((file) => {
    //Going recursevely into each directory and subdirectory to add files into filesArr
    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      //If it is a directory, the function recursevely call itself to get all files and subdirectories
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
  statsLink,
  getAllFiles
};
