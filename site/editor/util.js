const fs = require("fs");
const util = require("util");

module.exports = {
    readDirectory: util.promisify(fs.readdir),
    readFile: util.promisify(fs.readFile),
    stat: util.promisify(fs.stat)
};
