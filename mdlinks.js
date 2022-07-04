const path = require("path");
const { validateStatus, getAllFiles } = require("./index.js");

const mdLinks = (dirPath, options) => {
    //Im getting all files from GetAllFiles (not just .md)
    let filesArr = []; 
    getAllFiles(dirPath, filesArr);
  
    filesArr.forEach((file) => {
      const validatingStatus = validateStatus(file);
      if (path.extname(file) === ".md") {
        console.log(validatingStatus);
        return validateStatus;
      }
    });
  };
  mdLinks("./demo/demo1.md");