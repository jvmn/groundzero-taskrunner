const fs = require('fs-extra')
const path = require('path');
const projectPath = require(path.resolve(process.env.PWD + '/paths.config.js'));
const minimist = require('minimist')
const args = minimist(process.argv.slice(2))

let dest = undefined;

if (args.webui) {
    dest = projectPath.webui
} else if (args.build) {
    dest = projectPath.build
} else if (args.release) {
    dest = projectPath.release
}

/**
 * delets a directory
 */
try {
    fs.remove(dest).then(() => {
        console.log(dest + ' deleted')
    })
} catch (e) {
    console.log(e)
    throw e
}
