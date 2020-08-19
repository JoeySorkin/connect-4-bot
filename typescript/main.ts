const SCRAPER = require('./class/Scraper');
const GAME = require('./class/Game');
const c = require('colors/safe');

const game: any = new GAME();
const scraper: any = new SCRAPER(game);

async function scrape() {
	await scraper.init();
	let link: string = await scraper.getlink();
	console.log(c.bold.green('\nLINK: '), c.green(link), '\n');
	await scraper.waitforStart();
}
async function main() {
	await scrape();
	while (!scraper.isFinished) {
		game.update(scraper.readConsole());
		await scraper.playRandom();
	}
	process.exit();
}
//RUN THE MAIN FUNCTION -->
main();
