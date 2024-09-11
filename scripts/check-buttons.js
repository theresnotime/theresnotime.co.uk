const fs = require('node:fs');
const { request } = require('node:http');
const https = require('node:https');
const { hostname } = require('node:os');
const path = require('node:path');
const exit = require('node:process').exit;

const temp_skip = ['https://k4m1.net/button.gif'];

async function checkImageExists(url) {
    return new Promise((resolve, reject) => {
        requestOptions = {
            hostname: new URL(url).hostname,
            path: new URL(url).pathname,
            protocol: new URL(url).protocol,
            method: 'HEAD',
            headers: {
                'User-Agent': 'check-buttons.js, from theresnotime.co.uk :3',
            },
        };
        https.get(requestOptions, (res) => {
            if (res.statusCode === 200) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
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
        const re = /src: '(?<src_url>https?:\/\/.*?.(png|gif|jpg|apng))/gm;
        for (const match of data.matchAll(re)) {
            let img_url = match.groups.src_url;
            if (temp_skip.includes(img_url)) {
                console.log(`Skipping ${img_url}`);
                continue;
            }
            total_images++;
            // http request to check if the image exists
            await checkImageExists(img_url).then((exists) => {
                if (!exists) {
                    errors = true;
                    missing_images.push(img_url);
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

doCheck('public/js/buttons.js');
