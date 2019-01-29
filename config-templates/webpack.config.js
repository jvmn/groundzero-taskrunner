const path = require('path');
const fs = require('fs');
const srcPath = path.join(process.env.PROJECT_CWD, './develop/assets/js');
const distPath = path.join(process.env.PROJECT_CWD, './web-ui/assets/js');
const webpack = require('webpack');
console.log('using webpack.config from project')
let babelConfig;

try {
    fs.accessSync(`${ process.env.PROJECT_CWD }/babel.config.js`, fs.constants.R_OK | fs.constants.W_OK);
    babelConfig = `${process.env.PROJECT_CWD}/babel.config.js`
    console.error('use babel project config!');
} catch (err) {
    console.error('use babel package config!');
    babelConfig = `./babel.config.js`
}

/**
 * Resources for lazy loading:
 * https://medium.com/front-end-hacking/webpack-and-dynamic-imports-doing-it-right-72549ff49234
 * https://webpack.js.org/guides/public-path/
 */

module.exports = {
    context: srcPath,

    resolveLoader: {
        modules: [process.env.PWD + '/node_modules']
    },

    entry: {
        app: './app.js'
    },

    output: {
        path: distPath,
        chunkFilename: 'jvm-[name].bundle.js',
        filename: 'jvm-[name].bundle.js'
    },

    resolve: {
        alias: {
            base: path.resolve(process.env.PROJECT_CWD),
            dev: path.resolve(process.env.PROJECT_CWD, 'develop/'),
            glb: path.resolve(process.env.PROJECT_CWD, 'develop/00-globals/'),
            functions: path.resolve(process.env.PROJECT_CWD, 'develop/00-globals/04-glb-functions/'),
            objects: path.resolve(process.env.PROJECT_CWD, 'develop/01-objects/'),
            components: path.resolve(process.env.PROJECT_CWD, 'develop/02-components/'),
            modules: path.resolve(process.env.PROJECT_CWD, 'develop/03-modules'),
            styleguide: path.resolve(process.env.PROJECT_CWD, 'develop/05-styleguide'),
        }
    },

    module: {
        rules: [
            {
                test: /^(?!.*\.config\.js$).*\.js$/,
                exclude: /(node_modules)/,
                /* if you decide to bundle GSAP and not use the umd verion you would need to
                 * use include instead of exclude to properly babelify GSAP or it fails on older browsers.
                 */
                // include: [
                //     srcPath,
                //     /(node_modules\/gsap)/
                // ],
                use: {
                    // https://github.com/babel/babel-loader
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['@babel/plugin-syntax-dynamic-import'],
                        configFile: babelConfig
                    }
                }
            }
        ]
    },

    /** Externals
     *  In case you want to include external plugins and they need dependencies that are part of the bundle.
     *  Useful for some GSAP plugins like DrawSVGPlugin which are not yet optimized for Webpack.
     **/
    // externals: {
    //     'TweenLite': 'TweenLite'
    // },
};
