const { getDico } = require("./dico.js")
const puppeteer = require('puppeteer');
const dico = getDico()
const fs = require('fs');

let nbLine = 6;
let arrayWord = [];
let nbWord = 1383;

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    for (let o = 1; o < nbWord; o++) {
        //charger la page
        await page.goto('https://zutom.z-lan.fr/infinit?w1=' + o);

        //recupere le nombre de lettre du mot
        let nombrelettre = await page.evaluate(() => {
            const tr = document.querySelectorAll('tr');
            const td = tr[0].querySelectorAll('td');

            return td.length;
        });

        //recupere la premiere lettre du mot
        const firstLetter = await page.evaluate(() => {
            const tr = document.querySelectorAll('tr');
            const td = tr[0].querySelectorAll('td');

            return td[0].innerHTML;
        });

        //Recupere un mot avec la meme premiere lettre + la taille du mot
        const Word = dico.filter(word => word.length == nbLi && word.startsWith(firstLetter));

        let motTest = Word[0];

        //enter word in the page
        for (let i = 0; i < nbLine; i++) {
            for (let j = 0; j < nombrelettre; j++) {
                await page.keyboard.type(motTest[j]);
            }
            await page.keyboard.press('Enter');
        }

        const popupText = await page.evaluate(() => {
            const popup = document.querySelector('.popup');
            const p = popup.querySelectorAll('p');
            return p[0].innerHTML;
        });

        console.log(popupText);
        const splitPopup = popupText.split(" ");

        //ajoute mot à l'array
        arrayWord.push(splitPopup[splitPopup.length - 1])
        console.log(arrayWord);

    }
    //save l'array dans un fichier
    // fs.writeFileSync('wordZutom.json', JSON.stringify(arrayWord));

    //Fermer le navigateur
    await browser.close();
})();
