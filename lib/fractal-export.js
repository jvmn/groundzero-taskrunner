const path = require('path');
const fractal = require(path.resolve(process.env.PWD + '/fractal-config.js'));
const fs = require('fs');
const mkdirp = require('mkdirp');
let modules = []
let modulesVars = []
let pages = []

/*
 * Run a static HTML export of modules and pages
 */
try {
    fractal.components.load().then(() => {
        for (let item of fractal.components.flatten()) {
            if (item.status.label === 'Ready' && item.hasTag('module') ) {
                modules.push('1')
                mkdirp(fractal.get('project.release') + '/render/modules/', function () {  
                    for (let variant of item.variants()) {
                        let filename = variant.handle.replace(/--default$/, '');
                        variant.render().then(function (html) {
                            fs.writeFile(fractal.get('project.release')+'/render/modules/' + filename + '.html', html, function(err){
                                if (err) {
                                    console.log('file could not be written!');
                                }
                            });
                        });
                    }
                });
            } else if (item.status.label === 'Ready' && item.hasTag('page')) {
                pages.push('1')
                mkdirp(fractal.get('project.release') + '/render/pages/', function () {
                    for (let variant of item.variants()) {
                        let filename = variant.handle.replace(/--default$/, '');
                        variant.render().then(function (html) {
                            fs.writeFile(fractal.get('project.release')+'/render/pages/' + filename + '.html', html, function(err){
                                if (err) {
                                    console.log('file could not be written!');
                                }
                            });
                        });
                    }
                });
            }
        }
        console.log(`Exported ${modules.length + modulesVars} modules and ${pages.length} pages`)
    });
} catch (e) {
    console.log(e)
}
