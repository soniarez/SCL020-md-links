// module.exports = () => {
//   // ...
// };
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
    // console.log(linksArr, "linksArr in extractLink func");
    return linksObjArr;
  } catch (err) {
    console.error(err);
  }
};
//extractLinks("./demo/demo1.md");

// Http Request - Checking Link Status
const validateStatus = (filename) => {
  const files = extractLinks(filename);
  //console.log(files, "files in validateStatus func");

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
          file: "path of file: I need resolve path first",
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
            file: "path of file. I need resolve path first",
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
          return fetchingLinks;
        }
      });
  });
};
//validateStatus("./demo/demo1.md");


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
const funt = getAllFiles("./demo");
//console.log(funt, "estoy en getAllMdFiles func");





const mdLinks = (dirPath) => {
  let filesArr = [];
  getAllFiles(dirPath,filesArr);

  filesArr.forEach((file) => {
    const validatingStatus = validateStatus(file);
      if (path.extname(file) === ".md") {
        console.log(validatingStatus);
      }
  })
 // console.log(filesArr);
}

mdLinks("./demo");






