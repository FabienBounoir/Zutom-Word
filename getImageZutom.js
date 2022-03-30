const { getWord } = require("./dico.js")
const puppeteer = require('puppeteer');

const fs = require('fs');

const dico = getWord()

let nombrelettre = 0;
let firstLettre = "";

let nbLine = 6;

let motTest = "";

let arrayWord = [];

let nbWord = 1383;

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    for (let o = 1; o < nbWord; o++) {
        await page.goto('https://zutom.z-lan.fr/infinit?w1=' + o);

        for (let j = 0; j < dico[o].length; j++) {
            await page.keyboard.type(dico[o][j]);
        }
        await page.keyboard.press('Enter');

        await page.screenshot({ path: './imageWord/word[' + o + '].png' });
    }

    await browser.close();
})();
