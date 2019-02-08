const globby = require('globby');
const concat = require('concat');
const fs = require('fs');
const path = require('path');
const projectPath = require(path.resolve(process.env.PWD + '/paths.config.js'));
const sass = require('node-sass');
const orderBy = require('natural-orderby');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const cssnano = require('cssnano');
const minimist = require('minimist')
const args = minimist(process.argv.slice(2))

/**
 * @ CLI Arguments
 * 
 * @param -styleguide = output styleguide
 * @param -minify = use minify
 * @param -release = output path release
 */
// only global vars
const globalVars =  `${ projectPath.dev }/00-globals/00-glb-vars/glb-vars.scss`;
// only globals without vars
const globals = `${ projectPath.dev }/00-globals/!(00-glb-vars)/*.scss`;
// all scss files without globals, styleguide or critical
const components = `${ projectPath.dev }/!(00-globals)/**/!(*.critical|*.styleguide)*.scss`;
// only styleguide files
const styleguide = `${ projectPath.dev }/**/*.styleguide.scss`;

const outputDir = args.release ? `${ projectPath.release }/assets/css/` : `${ projectPath.webui }/assets/css/`;
const outputFileName = args.styleguide ? 'styleguide' : 'global';

const outputPath = outputDir + outputFileName;

async function getScssFiles() {
    try {
        const paths = args.styleguide ? [globalVars, globals, styleguide] : [globalVars, globals, components];
        args.styleguide ? console.log('fetched all styleguide files') : console.log('fetched all style files')
        const files = await globby(paths);
        const sortedFiles = await orderBy.orderBy(files);
        return sortedFiles;
    } catch (err) {
        console.error(err)
    }
}

async function concatScss(files) {
    try {
        return await concat(files).then(result => {
            console.log('merged all scss files', true)
            return result
        })
    } catch (err) {
        console.error(err)
    }
}

function convertToCss(file) {
    return new Promise(function (resolve, reject) {
        try {
            // added includePaths to be able to resolve @import statments relative to the develop folder
            sass.render({ includePaths: [process.env.PROJECT_CWD + '/develop/'], data: file, sourceMap: true, outFile: outputDir + outputFileName + '.css' }, function (err, result) {
                console.log('converted sass to css')
                // return result
                resolve(result)
            })
        } catch (e) {
            reject(e)
        }
    })
}

function postCss() {
    return new Promise(function (resolve, reject) {
        try { 
            fs.readFile(outputPath + '.css', (err, css) => {
                postcss([autoprefixer])
                    .process(css, { from: outputPath + '.css', to: outputPath + '.css', map: { inline: false } })
                    .then(result => {
                        console.log('postcss with autoprifix finished')
                        console.log(outputFileName +'.css.map generated')
                        fs.writeFile(outputPath + '.css', result.css, () => resolve())
                        if (result.map) {
                            fs.writeFile(outputPath + '.css.map', result.map, () => true)
                        }
                    })
            })
        } catch (e) {
            reject(e)
        }
    })
}

function minifyCss() {
    return new Promise(function (resolve, reject) {
        try {
            fs.readFile(outputPath + '.css', (err, css) => {
                postcss([cssnano])
                    .process(css, { from: outputPath + '.css', to: outputPath + '.min.css', map: { inline: false } })
                    .then(result => {
                        console.log('minify finished')
                        console.log(outputFileName +'.min.css and .min.map generated')
                        fs.writeFile(outputPath + '.min.css', result.css, () => resolve())
                        if (result.map) {
                            fs.writeFile(outputPath + '.min.map', result.map, () => true)
                        }
                    })
            })
        } catch (e) {
            reject(e)
        }
    })
}

function saveCss(file) {
    return new Promise(function (resolve, reject) {
        try {
            fs.mkdir(outputDir, { recursive: true }, () => {
                fs.writeFile(
                    outputPath + '.css',
                    file.css.toString(),
                    'utf8',
                    function (errWritingOptimized) {
                        if (errWritingOptimized) reject(errWritingOptimized)
                        console.log(outputFileName + '.css file saved successfully')
                        resolve()
                    }
                )
            });
        } catch (e) {
            reject(e)
        }
    })
}

getScssFiles()
    .then(files => concatScss(files))
    .then(file => convertToCss(file))
    .then(file => saveCss(file))
    .then(() => postCss())
    .then(() => {
        if (args.minify) minifyCss();
    })
    .catch((err) => console.error(err))