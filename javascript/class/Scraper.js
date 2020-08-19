const c = require('colors/safe');
const puppeteer = require('puppeteer');
const selectors = {
    btn: {
        invite: '/html/body/app-root/app-main-menue/md-card/md-card-content/button[2]'
    },
    field: {
        link: '//*[@id="invitionLinkInput"]',
        turn: '/html/body/app-root/app-game-field/div[1]/div/div/p'
    }
};
class Scraper {
    constructor(game) {
        //Variable Declaration
        this.turns = 0;
        this.isFinished = false;
        this.boardstate = [];
        this.turn = '';
        this.game = game;
    }
    /* PRIVATE FUNCTIONS */
    /**
     * @private
     * @param  {number} column
     * @param  {number} row defualt = 0
     * @returns {string} JSPath to cell
     */
    getcell(column, row = 0) {
        return `body > app-root > app-game-field > div.board-container > table > tbody > tr:nth-child(${6 -
            row}) > td:nth-child(${column}) > div`;
    }
    /**
     * @private
     * @param  {number} time
     * @return {Promise} delay program
     */
    delay(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        });
    }
    /* PUBLIC FUNCTIONS */
    /**
     * @public @async
     * @description Launches a puppeteer browser, opens connect4 website
     */
    async init() {
        const browser = await puppeteer.launch();
        this.page = await browser.newPage();
        await this.page.goto('http://connect-4.org/');
    }
    /**
     * @public @async
     * @returns {string} link
     * @description returns the link needed to join the connect 4 match
     */
    async getlink() {
        const [invitebtn] = await this.page.$x(selectors.btn.invite);
        const boundingBox = await invitebtn.boundingBox();
        await this.page.mouse.click(boundingBox.x, boundingBox.y, { delay: 20 });
        await this.delay(700);
        //STAGE 3: COPY INVITE LINK
        this.invitelink = await this.page.$eval('#invitionLinkInput', (el) => el.value);
        return this.invitelink;
    }
    /**
     * @async @public
     * @description Waits until the DOM element revealing the color in which the current turn belongs to appears on the page.
     */
    async waitforStart() {
        await this.page.waitForXPath(selectors.field.turn);
    }
    /**
     * @async @public
     * @description Double clicks a random column.
     */
    async playRandom() {
        let targetCell = await this.page.$(this.getcell(Math.floor(Math.random() * 7) + 1, 0));
        await targetCell.click({ clickCount: 2 });
    }
    /**
     *	@public
     *  @description If the website has data shown up in its console, this function detects it, parses it, and updates the objects state
     */
    readConsole() {
        this.shouldreturn = false;
        this.curobj = {};
        this.page.on('console', msg => {
            for (let i = 0; i < msg.args().length; ++i) {
                msg
                    .args()[i].jsonValue()
                    .then((obj) => {
                    this.isFinished = obj.isFinished;
                    if (this.turn != obj.currentPlayer.color) {
                        this.turn = obj.currentPlayer.color;
                        // console.log(`It is ${this.turn} turn.`);
                        this.turns++;
                        this.shouldreturn = true;
                        this.game.update(obj);
                    }
                })
                    .catch(err => {
                    console.log(c.red(err));
                }); //lmao error handling
            }
        });
    }
}
module.exports = Scraper;
//# sourceMappingURL=Scraper.js.map