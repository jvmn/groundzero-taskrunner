const del = require( 'del' );
const path = require('path');
const fractal = require(path.resolve(process.env.PWD + '/fractal-config.js'));
const minimist = require('minimist')
const args = minimist(process.argv.slice(2))

let dest = undefined;

if (args.webui) {
    dest = [fractal.web.get('static.path')]
} else if (args.build) {
    dest = [fractal.web.get('builder.dest')]
} else if (args.release) {
    dest = [fractal.get('project.release')]
}

/**
 * delets a directory
 */
try {
    del(dest, {force: true}).then(function() {
        return console.log(dest + ' deleted')
    });
} catch (e) {
    console.log(e)
}
