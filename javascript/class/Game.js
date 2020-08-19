class Game {
    /**
     * @public
     * @param  {object} obj
     * @description Parses the consoles output into an instance's state
     */
    update(obj) {
        if (typeof obj == 'undefined') {
            return;
        }
        this.state = obj.board;
        this.isFinished = obj.isFinished;
        this.turn = obj.currentPlayer.color;
        console.log(`It is ${this.turn} turn.`);
        console.table(this.state);
        if (this.isFinished) {
            console.log('\n Game Over! \n');
        }
    }
}
module.exports = Game;
//# sourceMappingURL=Game.js.map