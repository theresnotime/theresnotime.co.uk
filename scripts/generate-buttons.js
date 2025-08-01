const fs = require('fs');
const exit = require('node:process').exit;
// Button config is in a JSON file now
const buttons = require('./buttons.json');

let buttonLinks = '';
let seenSrcs = {};
for (let key in buttons) {
    const buttonArray = buttons[key];
    const href = buttonArray['href'];
    const src = buttonArray['src'];
    if (buttonArray['dng']) {
        // Skip this button if 'dng' is true
        continue;
    }
    let alt = '';
    if (buttonArray['alt']) {
        alt = buttonArray['alt'];
    } else {
        alt = key + ' button';
    }
    let comment = '';
    if (buttonArray['comment']) {
        comment = buttonArray['comment'];
    }

    // Add src to seen image srcs to avoid duplicates
    if (seenSrcs[src]) {
        console.warn(
            '[WARN] Duplicate link found:',
            src,
            'for key:',
            key,
            ' — ignoring'
        );
        continue; // Skip this button if the src is already seen
    } else {
        seenSrcs[src] = true; // Mark this src as seen
    }

    let buttonLink =
        "href='" +
        href +
        '\'><img loading="lazy" src=\'' +
        src +
        "' alt='" +
        alt +
        "'></a>";
    if (buttonArray['hidden']) {
        console.info('[INFO] Hiding button for:', key);
        // Hide the button
        buttonLink =
            "<a data-comment='" +
            comment +
            "' style='display:none;' " +
            buttonLink;
    } else {
        buttonLink = '<a ' + buttonLink;
    }
    buttonLinks += buttonLink + '\n';
    console.info('[INFO] Generated button link for:', key, '-->', buttonLink);
}

// Make a backup of the original index.html file
fs.copyFile('./public/index.html', './public/index.bak.html', (err) => {
    if (err) {
        console.error('[ERROR] Could not create backup of index.html:', err);
        exit(1);
    } else {
        console.log('[OK] Backup of index.html created successfully.');
    }
});

// Update index.html with the generated buttons
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
        err || console.log('[OK] Data replaced :-)');
    });
});
