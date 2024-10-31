const fs = require('node:fs');
const exit = require('node:process').exit;

let page_title = `${process.argv[2]}`;
let page_filename = `${page_title}.html`;
// Description is either argv[3] or a default
let page_description =
    process.argv[3] || 'CHANGEME: A default description you forgot to change';

console.log(
    `Creating new page titled "${page_filename}" with description "${page_description}"`
);

let file_template = `<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${page_title}</title>
        <meta name="robots" content="index, follow" />
        <meta
            name="description"
            content="${page_description}" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="${page_title}" />
        <meta
            property="og:url"
            content="https://www.theresnotime.co.uk/${page_title}" />
        <meta
            property="og:description"
            content="${page_description}" />
        <meta property="og:image" content="https://www.theresnotime.co.uk/img/fox_header.png" />
        <link href="css/base.css" rel="stylesheet" />
        <link href="css/monokai.css" rel="stylesheet" />
        <link href="css/overrides.css" rel="stylesheet" />
    </head>
    <body>
        <main>
            <div id="profile-picture-container">
                <img
                    alt="A fox emoji"
                    id="profile-picture"
                    src="/img/pfp.png" />
            </div>
            <h1 id="CHANGEME">${page_title}</h1>
            <div id="footer" class="foot">
            <p class="pt-1"
                >Opinions expressed are my own,
                <a href="/disclaimers">etc.</a></p
            >
            <p>
                <a
                    rel="license"
                    href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                    <img
                        alt="Creative Commons Licence"
                        style="border-width: 0"
                        src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" />
                </a>
            </p>
        </div>
    </main>
</body>
</html>`;

if (fs.existsSync(`public/${page_filename}`)) {
    console.log(`public/${page_filename} already exists, skipping creation.`);
} else {
    fs.writeFile(`public/${page_filename}`, file_template, (err) => {
        if (err) {
            console.error(err);
            exit(1);
        } else {
            console.log(`Successfully created public/${page_filename}`);
            exit(0);
        }
    });
}
