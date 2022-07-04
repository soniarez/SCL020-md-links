// module.exports = () => {
//   // ...
// };
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
  //console.log(files, "files in validateStatus func");

  const fetchingLinks = [];
  files.forEach((urlObj) => {
    const url = urlObj.href;
    const linkText = urlObj.text;

    let baseObj = {
      href: url,
      text: linkText,
      file: filename,
    }

    axios
      .get(url)
      .then((response) => {
         
        //console.log(response);
        if (process.argv[2] === "--validate") {
          const dataLinks = {
            href: url,
            text: linkText,
            file: filename,
            status: response.status,
            statusText: response.statusText,
          };
          fetchingLinks.push(dataLinks);
          //console.log(fetchingLinks.length, files.length);
        } else if (process.argv[2] === "--stats") {
          const dataLinks = {
            total: "falta que me hagas",
            unique: "falta que me hagas"
          };
          fetchingLinks.push(dataLinks);
        } else {
          const dataLinks = {
            href: url,
            text: linkText,
            file: filename,
          };
          fetchingLinks.push(dataLinks);
        } 
        return dataLinks;
      })
      .catch((error) => {
        if (error.response) {
          if (process.argv[2] === "--validate") {
            baseObj.status = error.response.status
            baseObj.text = error.response.statusText
          };
          fetchingLinks.push(baseObj);
          return fetchingLinks;
        };
      })
      .finally(() => {
       //console.log(fetchingLinks.length, files.length);
       //console.log(fetchingLinks);
        if (fetchingLinks.length === files.length) {
         console.log(fetchingLinks);
          return fetchingLinks;
        }
      });
  });
};
validateStatus("./demo/subDemo/subFile.md");



// Getting all the files in directory - recursion - to be able to go through subdirectories
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

const mdLinks = (dirPath, options) => {
  let filesArr = [];
  getAllFiles(dirPath, filesArr);

  filesArr.forEach((file) => {
    const validatingStatus = validateStatus(file);
    if (path.extname(file) === ".md") {
      console.log(validatingStatus);
    }
  });
  //console.log(filesArr);
};
//mdLinks("./demo");


