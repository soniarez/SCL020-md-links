#!/usr/bin/env node
const process = require("process");
const { mdLinks } = require("./index.js");

const cliArg = () => {
  let path = process.argv[2];

  let options = {
    validate: false,
    stats: false
  }
 
  if (process.argv[3] === "--validate") {
    options.validate = true;
  } else if(process.argv[3] === "--stats") {
    options.stats = true;
  }

  mdLinks(path, options).then((result) => console.log(result));
};
cliArg();
//cliArg("./demo/demo1.md");

/* mdLinks("ruta").then()

let stats = false
if(proces…… === --stats)  {
stats = true
}

mdLInks(ruta, stats) */
