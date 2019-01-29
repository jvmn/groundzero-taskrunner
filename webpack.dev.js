const webpack = require('webpack');
const merge = require('webpack-merge');
const fs = require('fs');

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
    mode: 'development',
    // devtool: '#inline-source-map', // for speed
    devtool: 'source-map', // for debugging
});