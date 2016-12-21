#!/usr/bin/env node

import chalk from "chalk";
import yargs from "yargs";
import pkg from "../package.json";
import googleapisAuth from "./";

const { argv } =
  yargs
  .usage(`Usage: ${chalk.cyan(pkg.name, chalk.underline("CLIENT SECRET PATH"), chalk.underline("CREDENTIALS PATH"))}`)
  .option("h", { alias: "help", describe: "Show help", type: "boolean" })
  .option("v", { alias: "version", describe: "Show version", type: "boolean" });

if (argv.help || argv.h) {
  yargs.showHelp();
  process.exit();
}

if (argv.version || argv.v) {
  console.log(pkg.version);
  process.exit();
}

if (argv._.length !== 2) {
  yargs.showHelp();
  console.error(chalk.red("Client secret path and credentials path must be specified."));
  process.exit(1);
}

const [ clientSecretPath, credentialsPath ] = argv._;

googleapisAuth(
  clientSecretPath,
  credentialsPath
).then(() => {
  console.log(chalk.green("Done!"));
  process.exit();
}).catch(error => {
  console.error(chalk.red(error.message || "An unexpected error occurred."));
  process.exit(1);
});
