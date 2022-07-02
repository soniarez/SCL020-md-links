// module.exports = () => {
//   // ...
// };
const fs = require("fs");
//const { readFileSync } = require("fs");
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

    const linksArr = [];
    linksObjects.each((index, link) => {
      linksArr.push({
        text: $(link).text(),
        href: $(link).attr("href"),
      });
    });
    // console.log(linksArr, "linksArr in extractLink func");
    return linksArr;
  } catch (err) {
    console.error(err);
  }
};
extractLinks("./demo/demo1.md");

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
const getAllMdFiles = (dirPath, filesArr) => {
  const files = fs.readdirSync(dirPath);

   filesArr = filesArr || [];

  files.forEach((file) => {
    // Going recursevely into each directory and subdirectory to add files into filesArr
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      filesArr = getAllMdFiles(dirPath + "/" + file, filesArr);
    } else {
      filesArr.push(path.join(__dirname, dirPath, "/", file));
      
    }
  });

  const mdFilesArr = filesArr.filter((file) => {
    return path.extname(file) === ".md";
  });
  //console.log(filesArr, "filesArr in getAllFiles func");
  //console.log(mdFilesArr);
  return mdFilesArr;
};
const funt = getAllMdFiles("./demo");
console.log(funt);


// Checking if its directory or file
const getFiles = (path) => {
  const stats = fs.statSync(path);

  if (stats.isFile()) {
    console.log("is file ? " + stats.isFile());
  } else if (stats.isDirectory()) {
    console.log("is directory? " + stats.isDirectory());
  }
};
// getFiles("./demo");


const mdLinks = (dirPath) => {
  let filesArr = [];
  getAllMdFiles(dirPath,filesArr);

  filesArr.forEach((file) => {
    const allLinksArr = extractLinks(file);
    console.log(allLinksArr);
  })
  console.log(filesArr);
}

//mdLinks("./demo");

















// Joining path segments
const joinPath = (folderPath) => {
  fs.readdirSync(folderPath).map((filename) => {
    const fullPath = path.join(folderPath, filename);
    console.log(fullPath, "fullPath in joinPath Func");
    return fullPath;
  });
};
// joinPath("./demo");

// Getting md files from a directory
const readDir = (__dirname) => {
  try {
    const files = fs.readdirSync(__dirname);
    console.log("/Filenames with the .md extension:");

    files.forEach((file) => {
      if (path.extname(file) === ".md")
        console.log(file, ".md files in readDir func");
    });
  } catch (err) {
    console.error(err);
  }
};
// readDir("./demo");
