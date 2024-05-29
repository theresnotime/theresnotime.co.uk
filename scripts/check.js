const fs = require('node:fs');
const exit = require('node:process').exit;

fs.readdir('./public/', (err, files) => {
    files.forEach((file) => {
        if (file.endsWith('.html')) {
            fs.readFile(`./public/${file}`, function (err, data) {
                if (err) throw err;
                if (data.includes('CHANGEME')) {
                    console.log(file + ' contains CHANGEME');
                    exit(1);
                }
            });
        }
    });
});
