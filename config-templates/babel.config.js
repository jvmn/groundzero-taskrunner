console.log('using babel.config.js from project')
module.exports = function (api) {
    api.cache(true);

    const presets = [
        [process.env.PWD + "/node_modules/@babel/preset-env", {
            // modules: false,
            targets: {
                "browsers": [
                    "defaults", //(> 0.5%, last 2 versions, Firefox ESR, not dead)
                    "ie 10",
                    "ie 11"
                ]
            },
            // for uglifyjs...
            forceAllTransforms: process.env === "production"
        }],
    ];
    const plugins = [];

    return {
        presets,
        plugins
    };
}