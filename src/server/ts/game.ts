export default class Game {
  /* TODO add fields
    private fields: Field[];
  */
  /* TODO add players
    private players: Player[];
  */
  private gameIsRunning: boolean;

  public constructor() {};

  public startGame() {};
  private nextTurn() {};
  public isGameRunning(): boolean {
    return this.gameIsRunning;
  };


  public test() {
    console.log('test');
    var a = 4;
    while(--a > 0) {
      console.log('Roll:', Dices.rollDices());
    }
  };
}


/* little help classes */

class Dices {
  private static dicesCounter: number = 2;
  public static rollDices(): number {
    var rolled: number = 0;
    for(var i = 0;i < Dices.dicesCounter; i++) {
      rolled += (Math.floor(Math.random() * 6) + 1);
    }
    return rolled;
  };
  public static setDicesCounter(newCounter: number): void {
    if(newCounter > 0) {
      Dices.dicesCounter = newCounter;
    } else {
      throw new Error("New dices counter isn't correct!");
    }
  };
}
