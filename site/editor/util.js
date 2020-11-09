const fs = require("fs");
const path = require("path");
const util = require("util");

module.exports = {
    readDirectory: util.promisify(fs.readdir),
    readFile: util.promisify(fs.readFile),
    stat: util.promisify(fs.stat),
    walk: async (dir) => {
        return await (require('async-iterator-to-array'))(await (async function* walk() {
            for await (const d of await fs.promises.opendir(dir)) {
                const entry = path.join(dir, d.name);
                if (d.isDirectory()) yield* walk(entry);
                else if (d.isFile()) yield entry;
            }
        })())
    }
};
