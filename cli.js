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
