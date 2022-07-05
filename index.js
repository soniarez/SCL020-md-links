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
    //console.log(linksObjArr, "linksArr in extractLink func");
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

    // Object containining basic info if user does not use options
    let baseDataLink = {
      href: url,
      text: linkText,
      file: filename,
    }

    // http request with axios
    axios
      .get(url)
      .then((response) => {
        if (process.argv[2] === "--validate") {
          baseDataLink.status =  response.status,
          baseDataLink.statusText = response.statusText
          fetchingLinks.push(baseDataLink);
          //console.log(fetchingLinks.length, files.length);
        }  else {
          fetchingLinks.push(baseDataLink);
        } 
        return baseDataLink;
      })
      .catch((error) => {
        if (error.response) {
          if (process.argv[2] === "--validate") {
            baseDataLink.status = error.response.status
            baseDataLink.statusText = error.response.statusText
          };
          fetchingLinks.push(baseDataLink);
          return baseDataLink;
        };
      })
      .finally(() => {
       //console.log(fetchingLinks.length, files.length);
        if (fetchingLinks.length === files.length) {
          // Checking for unique links  --> PREGUNTAR MAURO ESTO
        const uniqueArr = fetchingLinks.filter((value, index, self) => {
          return self.findIndex(v => v.href === value.href) === index;
        })
        //console.log(uniqueArr, "soy uniqueArr"); 
        console.log(fetchingLinks); 
        
         if (process.argv[2] === "--stats") {
          const stats  = {
            total: fetchingLinks.length,
            unique: uniqueArr.length
          }
          console.log(stats);
          return stats;
         }
        }
        return fetchingLinks;
      });
  });
};
//validateStatus("./demo/subDemo/subFile.md");


// Getting all the files from directory - recursion - to be able to go through folders and subfolders
const getAllFiles = (dirPath, filesArr) => {
  const files = fs.readdirSync(dirPath);

  filesArr = filesArr || [];

  files.forEach((file) => {
    // Going recursevely into each directory and subdirectory to add files into filesArr
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      // If it is a directory, the function recursevely call itself to get all files and subdirectories
      filesArr = getAllFiles(dirPath + "/" + file, filesArr);
    } else {
      filesArr.push(path.join(__dirname, dirPath, "/", file));
    }
  });
  return filesArr;
};
//const funt = getAllFiles("./demo");
//console.log(funt, "estoy en getAllMdFiles func");


module.exports = {
  extractLinks,
  validateStatus,
  getAllFiles
}