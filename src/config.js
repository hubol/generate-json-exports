const path = require("path");

const args = process.argv.slice(2);

const jsonSourceDirectoryPath = path.resolve(args[0]);
const definitionDestFilePath = path.resolve(args[1]);
const runImmediately = args.filter(x => x === "--build").length > 0;

const config = {
    jsonSourceDirectoryPath,
    definitionDestFilePath,
    runImmediately
};

module.exports = { config };