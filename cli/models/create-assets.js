const fs = require('fs');
const colors = require('colors');
const {createThemePostTypesImporter, functionsHasCustomPostTypesImport} = require('./file-tools');
exports.createCustomPostType = (data) => {
    fs.readFile('functions.php', function read(err, data) {
        if (err) throw err;
        if (functionsHasCustomPostTypesImport(data.toString())) {
            createThemePostTypesImporter();
            fs.appendFile('functions.php', '\nrequire_once __DIR__ . \'/includes/theme-post-types.php\';', (err) => {
                if (err) throw err;
                console.log('functions.php updated successfully'.green);
            });
        } else {

        }
    });

}