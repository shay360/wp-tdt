const fs = require("fs");
let configData;
exports.getConfigFile = () => {
    return JSON.parse(fs.readFileSync('tdt.config.json'));
};