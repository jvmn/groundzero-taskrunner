const path = require('path');
const fractal = require(path.resolve(process.env.PWD + '/fractal-config.js'));
const copydir = require('copy-dir');
const assetsPath = fractal.components.get('path') + '/assets/';
const minimist = require('minimist')
const args = minimist(process.argv.slice(2))
const dest = args.release ? fractal.get('project.release') + '/assets/' : fractal.web.get('static.path') + '/assets/';

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