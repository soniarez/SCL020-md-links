// module.exports = () => {
//   // ...
// };

var file = require('file-system');
var fs = require('fs');
 
// file.readFile === fs.readFile

fs.readFile('demo1.md', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
