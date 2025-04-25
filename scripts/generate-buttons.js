const fs = require('fs');
const exit = require('node:process').exit;

let buttons = {
    'theresnotime.co.uk': {
        href: 'https://www.theresnotime.co.uk/button.png',
        src: 'https://www.theresnotime.co.uk/button.png',
    },
    'beehive.gay': {
        href: 'https://beehive.gay',
        src: 'https://beehive.gay/button.png',
    },
    'k4m1.net': {
        href: 'https://k4m1.net',
        src: 'https://k4m1.net/button.gif',
    },
    'seirdy.one': {
        href: 'https://seirdy.one',
        src: 'https://seirdy.one/sticker_88x31.png',
    },
    'vea.st': {
        href: 'https://vea.st',
        src: 'https://vea.st/button.png',
    },
    'xaselgio.net': {
        href: 'https://xaselgio.net',
        src: 'https://xaselgio.net/88x31_xaselgio.gif',
    },
    'slonk.ing': {
        href: 'https://slonk.ing',
        src: 'https://slonk.ing/img/88x31.apng',
    },
    'arch.dog': {
        href: 'https://arch.dog',
        src: 'https://arch.dog/arch.dog.png',
    },
    'maia.crimew.gay': {
        href: 'https://maia.crimew.gay',
        src: 'https://maia.crimew.gay/badges/maia.crimew.gay.png',
    },
    'teamakes.games': {
        href: 'https://teamakes.games',
        src: 'https://teamakes.games/rsrc/img/88x31/tea.gif',
    },
    'winter.entities.org.uk': {
        href: 'https://winter.entities.org.uk',
        src: 'https://winter.entities.org.uk/buttons/self.png',
    },
    'taavi.wtf': {
        href: 'https://taavi.wtf',
        src: 'https://taavi.wtf/img/buttons/me/taavi.png',
    },
    'softkittypa.ws': {
        href: 'https://softkittypa.ws',
        src: 'https://softkittypa.ws/assets/buttons/softkittypaws.png',
    },
    'astrid.tech': {
        href: 'https://astrid.tech',
        src: 'https://s3.us-west-000.backblazeb2.com/nyaabucket/a313cf12a8c46d0262c69cdf8a3accc3b6a2d159b8e1211b7abe30886a212884/astriddottech.png',
    },
    '~thermia': {
        href: 'https://girlthi.ng/~thermia/',
        src: 'https://girlthi.ng/~thermia/img/88x31/thermia.gif',
    },
    'catwithaclari.net': {
        href: 'https://betablog.catwithaclari.net',
        src: 'https://betablog.catwithaclari.net/images/button.png',
    },
    'oli.pages.gay': {
        href: 'https://oli.pages.gay',
        src: '/img/btn/oli.svg',
    },
    'famfo.xyz': {
        href: 'https://famfo.xyz',
        src: 'https://famfo.xyz/banner/famfo_anim.gif',
    },
    'filmroellchen.eu': {
        href: 'https://filmroellchen.eu',
        src: 'https://filmroellchen.eu/img/kleines_filmroellchen.png',
    },
    'volpeon.ink': {
        href: 'https://volpeon.ink',
        src: '/img/btn/volpeon.svg',
    },
    'servfail.network': {
        href: 'https://beta.servfail.network',
        src: 'https://beta.servfail.network/servfail-88_31.png',
    },
    'eep.wtf': {
        href: 'https://eep.wtf',
        src: 'https://eep.wtf/static/88x31/eep.gif',
    },
    'sophari.org': {
        href: 'https://sophari.org',
        src: 'https://sophari.org/img/sophari.gif',
    },
    'shift.gay': {
        href: 'https://shift.gay',
        src: 'https://shift.gay/88x31.png',
    },
    'sdomi.pl': {
        href: 'https://sdomi.pl',
        src: 'https://sdomi.pl/img/button.bmp',
        alt: 'An 88x31 button. Witch hat on the left, text "sdomi" on the right. The background is procedurally generated every 30 or so seconds.',
    },
    'smolderg.xyz': {
        href: 'https://smolderg.xyz',
        src: '/img/btn/theysosmall_by_liah.png',
        comment:
            'please host a copy of the image yourself instead of hotlinking',
    },
    'damcraft.de': {
        href: 'https://damcraft.de',
        src: 'https://damcraft.de/assets/88x31/dam.gif',
    },
    'fungal.locahlo.st': {
        href: 'https://fungal.locahlo.st',
        src: 'https://fungal.locahlo.st/medias/88x31/fungal.locahlo.st.png',
    },
};
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
