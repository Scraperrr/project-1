// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const fs = require('fs');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    on('task', {
        fileExists(url) {
            if (fs.existsSync(url)) {
                return true;
            }
            return false;
        },
        writeGameData({ filePath, data }) {
            fs.writeFile(filePath, data, { flag: 'wx' }, () => {
                console.log('Wrote: ' + data);
            });
            return null;
        },
        log(msg) {
            console.log(msg);
            return null;
        },
    });
};
