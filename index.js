const path = require("path");
const fs = require("fs");
const chalk = require('chalk');
const {
  extractLinks,
  validateStatus,
  statsLink,
  getAllFiles
} = require("./mdlinks.js");
const log = console.log;

const mdLinks = (userFilePath, options) => {
  //Behaviour when working with a directory
  if (fs.statSync(userFilePath).isDirectory()) {
    log(chalk.cyan("Check the results from your directory:"));
    let filesArr = [];

    const allFilesArr = getAllFiles(userFilePath);
    allFilesArr.map((file) => {
      if (path.extname(file) === ".md") {
        if (options.validate) {
          const validatingStatus = validateStatus(file);
          filesArr.push(validatingStatus);
        } else if (options.stats) {
          const readingAllFiles = statsLink(file);
          filesArr.push(readingAllFiles);
        } else {
          const readingAllFiles = extractLinks(file);
          filesArr.push(readingAllFiles);
        }
      }
    });

    return Promise.all(filesArr);
    //Behaviour when working with a file
  } else { 
    log(chalk.cyan("Check the results from your file:"));
    if (options.validate) {
      return validateStatus(userFilePath);
    } else if (options.stats) {
      return new Promise((resolve) => {
        resolve(statsLink(userFilePath));
      });
    } else {
      return new Promise((resolve) => {
        resolve(extractLinks(userFilePath));
      });
    }
  }
};
//mdLinks("./demo/demo1.md").then(console.log)

module.exports = {
  mdLinks
};
