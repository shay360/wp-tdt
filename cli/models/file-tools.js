const fs = require("fs");
const colors = require('colors');

exports.getConfigFile = () => {
    return JSON.parse(fs.readFileSync('tdt.config.json'));
};

exports.convertToFileName = (value) => {
    return value.replace(' ', '-').toLowerCase();
}

exports.functionsHasCustomPostTypesImport = (functionsContent) => {
    return functionsContent.search('./includes/theme-post-types.php') < 0;
}