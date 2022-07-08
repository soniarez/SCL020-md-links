#!/usr/bin/env node
const process = require("process");
const { mdLinks } = require("./index.js");
const { hello } = require("./hello.js");
const ora = require("ora");

const cliArg = () => {
  hello(); 

  let path = process.argv[2]; //user input, file or directory path they want to check

  let options = {
    validate: false,
    stats: false,
  };

  if (process.argv[3] === "--validate") {
    options.validate = true;
  } else if (process.argv[3] === "--stats") {
    options.stats = true;
  }

  //styling the console, adding a spinner
  const spinner = ora("Loading unicorns").start();

  {
    spinner.color = "yellow";
    spinner.text = "Loading rainbows";
  }

  //calling md links with its arguments
  mdLinks(path, options).then((result) => {
    console.log(result);
    spinner.stop();
  });
};

cliArg();
