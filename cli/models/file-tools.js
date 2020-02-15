const fs = require("fs");
let configData;
exports.getConfigFile = () => {
    fs.readFile('tdt.config.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Error while loading config file'.red);
            throw err;
        }
        configData = data;
    });
    return configData;
};