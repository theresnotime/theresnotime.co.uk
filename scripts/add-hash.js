const fs = require('node:fs');
const exit = require('node:process').exit;

revision = require('child_process')
    .execSync('git rev-parse HEAD')
    .toString()
    .slice(0, 7)
    .trim();

console.log(revision);
fs.readFile('./public/index.html', 'utf8', async (err, data) => {
    if (err) {
        console.error(err);
        exit(1);
    }
    data = data.toString();
    const replacementString = 'id="commit">' + revision + '</span>';
    data = data.replace(/id="commit">.*?<\/span>/gms, replacementString);
    fs.writeFile('./public/index.html', data, function (err) {
        err || console.log('Data replaced \n', data);
    });
});
