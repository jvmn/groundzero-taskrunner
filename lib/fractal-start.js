const path = require('path');
const fractal = require(path.resolve(process.env.PWD + '/fractal-config.js'));
const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

const server = fractal.web.server({
    sync: true
});

server.on('error', err => logger.error(err.message));

fractal.components.load().then(() => {
    let modules = []
    let components = []
    let objects = []
    let pages = []

    fractal.components.flatten().forEach(function (item) {
        if (item.hasTag('module')) { 
            item.variants().forEach(function (item, i) {
                modules.push(i)
            });
        }
        if (item.hasTag('component')) { 
            item.variants().forEach(function (item, i) {
                components.push(i)
            });
        }
        if (item.hasTag('object')) { 
            item.variants().forEach(function (item, i) {
                objects.push(i)
            });
        }
        if (item.hasTag('page')) { 
            item.variants().forEach(function (item, i) {
                pages.push(i)
            });
        }
    });

    fractal.set('project.stats', `${objects.length} Objects, ${components.length} Components, ${modules.length} Modules, ${pages.length} Pages`);

    startServer()
});

function startServer() {
    server.start().then(() => {
        logger.success(`Server running...
        ----------------------------- fractal ------------------------------
        Local: ${server.url}
        External: ${server.urls.sync.external}
        --------------------------- browser-sync ---------------------------
        UI: ${server.urls.sync.ui}
        `);
    });
}
