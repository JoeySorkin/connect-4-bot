const Scraper = require('./class/Scraper');
const c = require('colors/safe');
const scraper = new Scraper();
async function scrape() {
    await scraper.init();
    let link = await scraper.getlink();
    console.log(c.bold.green('\nLINK: '), c.green(link), '\n');
    await scraper.waitforStart();
}
async function main() {
    await scrape();
    while (!scraper.isFinished) {
        scraper.readConsole();
        await scraper.playRandom();
    }
    process.exit();
}
//RUN THE MAIN FUNCTION -->
main();
