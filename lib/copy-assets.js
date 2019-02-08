const path = require('path');
const projectPath = require(path.resolve(process.env.PWD + '/paths.config.js'));
const copydir = require('copy-dir');
const minimist = require('minimist')
const args = minimist(process.argv.slice(2))
const assetsPath = projectPath.dev + '/assets/';
const dest = args.release ? projectPath.release + '/assets/' : projectPath.webui + '/assets/';

/**
 * Copy assets directory from develop/assets, ignore js folder that complies via webpack
 */

try {
    (async () => {
        await copydir(assetsPath, dest, function (stat, filepath, filename) {
            if (stat === 'directory' && filename === 'js') {
                return false;
            }
            return true;
        },function (err) {
            if (err) {
                console.log(err);
            } else {
                return console.log('assets folder copied');
            }
        });
    })();
} catch (e) {
    console.log(e);
}