const fs = require("fs");

exports.getConfigFile = () => {
    return JSON.parse(fs.readFileSync('tdt.config.json'));
};

exports.convertToFileName = (value) => {
    return value.replace(' ', '-').toLowerCase();
}