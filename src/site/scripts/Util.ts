import { promises } from "fs";
import * as path from "path";
const toArray = require("async-iterator-to-array");

async function* _internal_walk(dir: string): any {
    for await (const d of await promises.opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) yield* _internal_walk(entry);
        else if (d.isFile()) yield entry;
    }
}

export async function walk(directory: string) {
    return await toArray(await _internal_walk(directory));
}
