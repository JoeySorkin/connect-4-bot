type Turn = 'red' | 'blue' | '';
type Objcurrent = { color: Turn; id: string };
interface ConsoleObject {
	board: Array<Array<Turn>>;
	currentPlayer: Objcurrent;
	id: string;
	isFinished: boolean;
}
type GameType = {
	turn: Turn;
	state: Array<Array<String>>;
	isFinished: boolean;
	update(obj: object): void;
};
interface GameInterface {
	turn: Turn;
	state: Array<Array<String>>;
	isFinished: boolean;
	update(obj: ConsoleObject): void;
}

class Game implements GameInterface {
	turn: Turn;
	state: Array<Array<String>>;
	isFinished: boolean;
	/**
	 * @public
	 * @param  {object} obj
	 * @description Parses the consoles output into an instance's state
	 */
	update(obj: any | undefined) {
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
