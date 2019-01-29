console.log('using babel default')
module.exports = function (api) {
    api.cache(true);

    const presets = [
        ["@babel/env", {
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