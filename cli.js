#!/usr/bin/env node
const process = require("process");
const { mdLinks } = require("./index.js");
const chalk = require('chalk');
const log = console.log;

const cliArg = () => {
 
  let path = process.argv[2]; //user input, file or directory path they want to check

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
