const fs = require("fs");

exports.getConfigFile = () => {
    return JSON.parse(fs.readFileSync('tdt.config.json'));
};

exports.convertToFileName = (value) => {
    return value.replace(' ', '-').toLowerCase();
}

exports.getFunctionsFile = () => {
    let functionsFile = fs.readFileSync('functions.php');
    console.log(functionsFile);
}