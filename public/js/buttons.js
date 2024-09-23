window.addEventListener('load', function () {
    console.log('meow');
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
    };
    // Loop through the JSON object
    for (let key in buttons) {
        let buttonArray = buttons[key];
        let href = buttonArray['href'];
        let src = buttonArray['src'];
        let alt = key + ' button';

        let a = document.createElement('a');
        a.href = href;
        let img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        a.appendChild(img);
        document.getElementById('inner-buttons').appendChild(a);
    }
});
