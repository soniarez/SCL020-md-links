const path = require("path");
const fs = require("fs");
const { validateStatus, getAllFiles, extractLinks } = require("./mdlinks.js");

const mdLinks = (userFilePath, options) => {
  if (fs.statSync(userFilePath).isDirectory()) {
    let filesArr = [];

    const allFilesArr = getAllFiles(userFilePath);
    allFilesArr.map((file) => {
      if (path.extname(file) === ".md") {
        if (options.validate) {
          const validatingStatus = validateStatus(file);
          filesArr.push(validatingStatus);
        } else {
          const readingAllFiles = extractLinks(file);
          filesArr.push(readingAllFiles);
        }
      }
    });

    return Promise.all(filesArr);
  } else {
    if (options.validate) {
      return validateStatus(userFilePath);
    } else {
      return new Promise((resolve) => {
        resolve(extractLinks(userFilePath));
      });
    }
  }
};
//mdLinks("./demo/demo1.md").then(console.log)

module.exports = {
  mdLinks,
};

/* mdLinks("ruta").then()

let stats = false
if(proces…… === --stats)  {
stats = true
}

mdLInks(ruta, stats) */
