const path = require("path");
const fs = require("fs");
const { validateStatus, getAllFiles } = require("./mdlinks.js");

const mdLinks = (userFilePath, options) => {


  if (fs.statSync(userFilePath).isDirectory()) {
  
    let filesArr = []; 
    
    const allFilesArr = getAllFiles(userFilePath, filesArr);
    allFilesArr.forEach((file) => {
      if (path.extname(file) === ".md") {
        const validatingStatus = validateStatus(file);
        filesArr.push(validatingStatus);
      }
    });

    return Promise.all(filesArr);

  } else {
    const isFile = validateStatus(userFilePath);
    return isFile;
  }
}; 
mdLinks("./demo").then(console.log)

