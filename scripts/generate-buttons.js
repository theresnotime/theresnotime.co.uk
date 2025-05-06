const fs = require('fs');
const exit = require('node:process').exit;
// Button config is in a JSON file now
const buttons = require('./buttons.json');

let buttonLinks = '';
for (let key in buttons) {
    const buttonArray = buttons[key];
    const href = buttonArray['href'];
    const src = buttonArray['src'];
    let alt = '';
    if (buttonArray['alt']) {
        alt = buttonArray['alt'];
    } else {
        alt = key + ' button';
    }

    const buttonLink =
        "<a href='" + href + "'><img src='" + src + "' alt='" + alt + "'></a>";
    buttonLinks += buttonLink + '\n';
}

console.log(buttonLinks);
fs.readFile('./public/index.html', 'utf8', async (err, data) => {
    if (err) {
        console.error(err);
        exit(1);
    }
    data = data.toString();
    const replacementString =
        '<p id="inner-buttons">\n' +
        '<!-- start of generated buttons -->\n' +
        buttonLinks +
        '<!-- end of generated buttons -->\n</p>';
    data = data.replace(/<p id="inner-buttons">.*?<\/p>/gms, replacementString);
    fs.writeFile('./public/index.html', data, function (err) {
        err || console.log('Data replaced \n', data);
    });
});
