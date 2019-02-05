const fs = require('fs');
const sass = require('node-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const csso = require('csso');

module.exports = {
    process: function (cssPath) {
        // get the scss file
        var file = fs.readFileSync(cssPath).toString('utf8')
        // convert scss to css
        var cssStream = sass.renderSync({
            includePaths: process.env.PROJECT_CWD,
            data: file,
        });
        // autoprefix it 
        var postCss = postcss([autoprefixer]).process(cssStream.css, { from: undefined }).css
        // minify it
        var minifiedCss = csso.minify(postCss).css;
        // return string
        return '/* critical css injection */\n' + minifiedCss
    }
};