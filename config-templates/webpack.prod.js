const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const VERSION = require("./package.json").version;
const FULLBUILD = new Date();
const distPath = path.join(__dirname, './release/assets/js/min');
const fs = require('fs');
console.log('using webpack.prod from project')
let baseConfig;
// check if we have a webpack.config in project root
try {
    fs.accessSync(`${ process.env.PROJECT_CWD }/webpack.config.js`, fs.constants.R_OK | fs.constants.W_OK);
    const getConfigPath = () => `${ process.env.PROJECT_CWD }/webpack.config.js`;
    baseConfig = require(getConfigPath());
    console.error('use webpack.base project config!');
} catch (err) {
    const getConfigPath = () => `${ process.env.PWD }/webpack.config.js`;
    baseConfig = require(getConfigPath());
    console.error('use webpack.base package config!');
}

module.exports = merge(baseConfig, {
    mode: 'production',

    output: {
        path: distPath,
        chunkFilename: 'jvm-[name].min.bundle.js',
        filename: 'jvm-[name].min.bundle.js'
    },
    
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                }
            })
        ]
    },

    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
        new webpack.BannerPlugin({
            // print comments on top of each bundle file
            banner: `Release version: ${JSON.stringify(VERSION)}, Build date: ${JSON.stringify(FULLBUILD)}, hash:[hash], chunkhash:[chunkhash], name:[name]`
        }),
        // don't create too small chunks here..
        // if you only want one large chunk you can set this to higher values
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 10000
        })
    ],
});