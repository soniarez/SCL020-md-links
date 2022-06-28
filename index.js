// module.exports = () => {
//   // ...
// };

var file = require("file-system");
var fs = require("fs");

file.readFile === fs.readFile;

// Reading file and check if file includes links - https
// const strHttps = "https"

fs.readFile("demo1.md", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const separateStr = data.split(/\r?\n/);
  const linksArr = [];

  const lines = separateStr.forEach((line) => {
    const conditions = /https|http/.test(line);
    
    if (conditions) {
      linksArr.push(line);
    } 
  });

  console.log(linksArr);
  return linksArr;
});

