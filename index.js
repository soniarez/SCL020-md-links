/* const path = require("path");
const fs = require("fs");
const { validateStatus, getAllFiles } = require("./mdlinks.js");

const mdLinks = (userFilePath) => {
  
  if (fs.statSync(userFilePath).isDirectory()) {
    
    let filesArr = []; //Im getting all files from GetAllFiles (not just .md)
    getAllFiles(userFilePath, filesArr);
    filesArr.forEach((file) => {
      const validatingStatus = validateStatus(file);
      if (path.extname(file) === ".md") {
        console.log(validatingStatus);
        return validateStatus;
      }
    });
  } else {
    const isFile = validateStatus(userFilePath);
    console.log(isFile);
    return isFile;
  }
}; 
mdLinks("./demo/demo1.md"); */
