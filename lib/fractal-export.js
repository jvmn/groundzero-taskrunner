const path = require('path');
const fractal = require(path.resolve(process.env.PWD + '/fractal-config.js'));
const critical = require('./critical-css.js');
const fs = require('fs');
const mkdirp = require('mkdirp');
const pretty = require('pretty');
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
                            const prettyHtml = pretty(html, { ocd: true });
                            fs.writeFile(fractal.get('project.release')+'/render/modules/' + filename + '.html', prettyHtml, function(err){
                                if (err) {
                                    console.log('file could not be written!');
                                }
                            });
                        });
                    }
                });
            } else if (item.status.label === 'Ready' && item.hasTag('page')) {
                pages.push('1')
                if (item.config.criticalCss === true) {
                    // if no custom "glb-html-header" object found in the page.config create one
                    if (item.config.context['glb-html-header'] === undefined) {
                        item.config.context['glb-html-header'] = {}
                    }
                    item.config.context['glb-html-header'].critical = critical.process(path.join(item.viewDir, `/${item.viewName}.critical.scss`))
                }
                mkdirp(fractal.get('project.release') + '/render/pages/', function () {
                    for (let variant of item.variants()) {
                        let filename = variant.handle.replace(/--default$/, '');
                        variant.render(item.config.context).then(function (html) {
                            const prettyHtml = pretty(html, { ocd: true });
                            fs.writeFile(fractal.get('project.release')+'/render/pages/' + filename + '.html', prettyHtml, function(err){
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
