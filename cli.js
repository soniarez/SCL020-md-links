#!/usr/bin/env node
const process = require("process");
const { mdLinks } = require("./index.js");

const cliArg = () => {
let path = process.argv[2];
let options = process.argv[3];
let validate = false;
let stats = false;

if (options === "--validate") {
    validate = true;
    return validate;

}

console.log(path, "soy path");
mdLinks(path).then((result) => console.log(result));

    /* if (process.argv[2] === "--validate") {
        const validation = validateStatus(filename);
       return  validation.then(console.log);
    } else {
        const readFile = extractLinks(filename) 
         return console.log(readFile)

    } */
}
cliArg();
//cliArg("./demo/demo1.md");

/* validateFile(filename).then((result) => {
    console.log(result);
    });
     */
module.exports = {
    cliArg,
}