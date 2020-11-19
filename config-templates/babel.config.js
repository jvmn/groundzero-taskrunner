console.log('using babel.config.js from project')
module.exports = function (api) {
    api.cache(true);

    const presets = [
        [process.env.PWD + "/node_modules/@babel/preset-env"],
    ];
    const plugins = [];

    return {
        presets,
        plugins
    };
}