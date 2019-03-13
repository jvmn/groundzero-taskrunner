const Jasmine = require('jasmine');
const rootPath = process.env.PROJECT_CWD || process.env.PWD;
const jasmine = new Jasmine({ projectBaseDir: rootPath });

module.exports = (args) => {

    if ( args.config ) {
        jasmine.loadConfigFile( rootPath + "/" + args.config );
    } else {
        let config = {
            spec_dir: 'develop',
            spec_files: [
                "**/*[sS]pec.js"
            ],
            helpers: [
                "jasmine/helpers/**/*.js"
            ]
        }
        jasmine.loadConfig(config);
    }

    jasmine.configureDefaultReporter({
        showColors: false
    });

    jasmine.execute();
}
