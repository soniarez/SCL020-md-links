const path = require("path");
const fs = require("fs");
const { validateStatus, getAllFiles } = require("./mdlinks.js");

const mdLinks = (userFilePath, options) => {
  console.log("hola1")

  if (fs.statSync(userFilePath).isDirectory()) {
    console.log("hola2")
    let filesArr = []; //Im getting all files from GetAllFiles (not just .md)
    console.log("hola3")
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
mdLinks("./demo/demo1.md").then(console.log);
