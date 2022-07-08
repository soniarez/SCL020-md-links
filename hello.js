const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

const hello = () => {
  clear();

  console.log(
    chalk.yellow(figlet.textSync("md-Links", { horizontalLayout: "full" }))
  );
 
};

module.exports = {
  hello,
}; 
