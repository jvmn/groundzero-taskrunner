const path = require('path');
const projectPath = require(path.resolve(process.env.PWD + '/paths.config.js'));
const copydir = require('copy-dir');
const minimist = require('minimist')
const args = minimist(process.argv.slice(2))
const assetsPath = projectPath.dev + '/assets/img/sprite-icons/';
const dest = args.release ? projectPath.release + '/assets/img/sprite-icons/' : projectPath.webui + '/assets/img/sprite-icons/';

/**
 * Copy assets directory from develop/assets, ignore js folder that complies via webpack
 */

try {
    (async () => {
        await copydir(assetsPath, dest,function (err) {
            if (err) {
                console.log(err);
            } else {
                return console.log('icon assets folder copied');
            }
        });
    })();
} catch (e) {
    console.log(e);
}