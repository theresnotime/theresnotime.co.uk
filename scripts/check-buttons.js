const fs = require('node:fs');
const { request } = require('node:http');
const https = require('node:https');
const { hostname } = require('node:os');
const path = require('node:path');
const exit = require('node:process').exit;

const temp_skip = [''];

async function checkImageExists(url) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const options = {
            method: 'HEAD',
            rejectUnauthorized: false, // Allow self-signed certs
            headers: {
                'User-Agent': 'check-buttons.js, from theresnotime.co.uk :3',
            },
            servername: parsedUrl.hostname, // SNI fix
        };
        const req = https.request(parsedUrl, options, (res) => {
            if (res.statusCode === 200) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
        req.on('error', (err) => {
            resolve(false); // treat errors as missing image
        });
        req.end();
    });
}

async function doCheck(file) {
    console.log(`Checking images from ${file} — please wait...`);
    let total_images = 0;
    let errors = false;
    let missing_images = [];
    fs.readFile(`./${file}`, 'utf8', async (err, data) => {
        if (err) {
            console.error(err);
            exit(1);
        }
        let json;
        try {
            json = JSON.parse(data);
        } catch (e) {
            console.error('Could not parse JSON:', e);
            exit(1);
        }
        for (const [key, value] of Object.entries(json)) {
            if (!value.src || !value.src.match(/^https?:\/\//)) continue;
            let img_url = value.src;
            if (temp_skip.includes(img_url)) {
                console.log(`Skipping ${img_url}`);
                continue;
            }
            total_images++;
            await checkImageExists(img_url).then((exists) => {
                if (!exists) {
                    errors = true;
                    let msg = img_url + ' (button: ' + key + ')';
                    if (value.hidden) {
                        msg += ' [hidden: true]';
                    }
                    missing_images.push(msg);
                }
            });
        }
        console.log(`Checked ${total_images} images`);
        if (errors) {
            console.warn('[:(] Some images do not exist:');
            missing_images.forEach((img) => {
                console.warn(img);
            });
            exit(1);
        } else {
            console.log('[:)] All images exist');
            exit(0);
        }
    });
}

doCheck('scripts/buttons.json');
