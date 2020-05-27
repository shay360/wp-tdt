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

exports.createThemePostTypesImporter = () => {
    fs.mkdir('post-types/', {recursive: true}, (err) => {
        if (err) throw err;
        console.log('post-types folder generated'.green);
        fs.writeFile('post-types/theme-post-types.php',
            ``
            , function (err) {
                if (err) throw err;
                console.log('theme-post-types.php generated'.green);
            });
    });

}