const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const getProjectJsonPath = () => `${ process.env.PROJECT_CWD }/package.json`;
const VERSION = require(getProjectJsonPath()).version;
const FULLBUILD = new Date();
const distPath = path.join(process.env.PROJECT_CWD, './release/assets/js/min');

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
                parallel: true,
                extractComments: {
                    banner: (licenseFile) => {
                        return `Release version: ${JSON.stringify(VERSION)}, Build date: ${JSON.stringify(FULLBUILD)}\n License information can be found in ${licenseFile}`;
                    },
                }
            })
        ]
    },

    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
        // don't create too small chunks here..
        // if you only want one large chunk you can set this to higher values
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 10000
        })
    ],
});