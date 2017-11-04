import {Field, FirmaCell} from "./field";
import {Player, PlayerItems} from "./player";
import {NotEnoughMoneyError} from "./player";
import {io} from "./../app";

class Steps {
  private currStep: number;
  private static maxStep = 3;
  constructor() {
    this.currStep = 1;
  };
  public nextStep(): number {
    if(++this.currStep > Steps.maxStep) {
      this.currStep = 1;
    }
    return this.currStep;
  };
  public getStep(): number {
    return this.currStep;
  }
  public resetSteps(): void {
    this.currStep = 1;
  }
}

export class Game {
  public static Games: Game[] = [];

  private field: Field;
  private currentPlayer: number;
  private players: Player[];
  private gameIsRunning: boolean;
  private stepsObject: Steps;
  private gameId: string;

  private roomId: string;

  private get CurrentPlayerSocket() {
    return io.to(this.players[this.currentPlayer].SocketId);
  }

  public set GameId(value: string) {
    if(!this.gameId) {
      this.gameId = value;
    }
  }

  public constructor(socketIds: string[], roomId) {
    if (socketIds.length < 1) {
      throw new Error("Not enought players");
    }
    this.field = new Field();
    this.players = [];
    this.stepsObject = new Steps();
    socketIds.forEach((id, i) => {
      this.addPlayer(`Player${i}`, id);
    });
    this.startGame();

    Game.Games.push(this);

    // TODO init socket events
    this.roomId = roomId;
    // io.to(this.).on("", this.nextAction);
  };

  private addPlayer(name: string, socketId: string) {
    if(!this.gameIsRunning) {
      this.players.push(new Player(name, this.players, socketId));

      // TODO init possible players actions
      io.sockets.connected[socketId].on("nextStep", () => {
        console.log("next step")
        this.nextAction(socketId);
      });
      io.sockets.connected[socketId].on("trade", (params) => {
        console.log("Try to sell card or property")
        // TODO implement method
      });

      io.sockets.connected[socketId].on(`buy_property`, () => {
        if(this.buyCell(socketId)) {
          // TODO get cell name
          var name = "";// this.field.
          io.to(socketId).emit(`notification`, `You bought - ${name}`);
        }
      });
      // TODO impl events: [buy, upgrade, credit.....]
      // io.sockets.connected[socketId].on("", () => {
      //
      // });
    }
  }

  public startGame() {
    this.gameIsRunning = true;
    this.currentPlayer = 0;
    this.CurrentPlayerSocket.emit("newTurn");
  };

  protected getCurrPlayer(): Player {
    return this.players[this.currentPlayer];
  }
  public getPosOfPlayer(playerId: number = this.currentPlayer): number {
    return this.players[playerId].getPosition();
  }
  public buyCell(socketId: string): boolean {
    var currPlayer: Player = this.getCurrPlayer();
    var cellId = this.getPosOfPlayer();
    if(currPlayer.isThatPlayer(socketId) && this.field.canPurchase(currPlayer, cellId)) {
      this.field.purchaseProp(currPlayer, cellId);
      return true;
    } else {
      return false;
    }
  };
  public nextAction(playerSocket: string, action?: Function): void {
    var currentPlayer = this.currentPlayer;

    try {
      if(playerSocket === this.players[this.currentPlayer].getSocket()) {
        let currStep = this.stepsObject.getStep();
        console.log(currStep)

        if(currStep === 1) {
          this.prepareDices();
        } else if(currStep === 2){
          this.playerRollDice();
        } else if(currStep === 3) {
          this.playerEndTurn();
        }
        io.to(playerSocket).emit("set_turn_state", currStep);
        this.stepsObject.nextStep();
      } else {
        /* TODO new error class*/
        throw Error("Wrong Player");
      }
    } catch(e) {
      if(e instanceof NotEnoughMoneyError) {
        // this.getCurrPlayer().playerLose
        this.field.removePlayer(this.currentPlayer);
        this.players.splice(this.currentPlayer, 1);
      } else if(e.message === "Wrong Player") {
        console.log("Wrong Player");
      }
    }
  };

  /* probably only for tests */
  public getCurrPlayerNumber(): number {
    return this.currentPlayer;
  };
  public getCurrPlayerId(): string {
    return this.players[this.currentPlayer].getSocket();
  };
  public getCurrStep(): number {
    return this.stepsObject.getStep();
  };

  private prepareDices() { /* what to do if u have Prop/Events */
    var currPlayer = this.getCurrPlayer();
    var currField = this.field[currPlayer.getPosition()];
    if (currField instanceof FirmaCell && (<FirmaCell>currField).isStateProp()) {
      // add Г if u stood on gavermant property cell
      currPlayer.addItem(PlayerItems.purchaseAllowance);
    } else if(currPlayer.haveToRest()) {
      // skip turn if player have to
      // TODO emit event with notification
      this.stepsObject.resetSteps();
      this.playerEndTurn();
    }
  };
  private playerRollDice() {
    var currPlayer = this.getCurrPlayer();
    var currPosition = currPlayer.getPosition();
    var roll = Dices.rollDices().reduce((sum, val) => val+sum);
    while(roll-- > 0) {
      if(currPlayer.setPosition(currPlayer.getPosition() + 1) === (this.field.getLength())) {
        currPlayer.setPosition(0);
      }
    }
    // notify clients about new position
    io.to(this.roomId).emit("updatePlayerPosition", this.players[this.currentPlayer]);

    try {
      this.field.callEvent(currPlayer);
      // TODO emit event
    } catch (e) {
      if(e instanceof NotEnoughMoneyError) {
        /* TODO player loose */
      } else {
        console.log('ERROR! Unexpected extension');
      }
    }
  };
  private playerEndTurn() {
    this.CurrentPlayerSocket.emit("endTurn");
    if(++this.currentPlayer >= this.players.length) {
      this.currentPlayer = 0;
    }
    this.CurrentPlayerSocket.emit("newTurn");
  };

  public purchaseProp() {
    var currPlayer = this.getCurrPlayer();
    var position = this.getCurrPlayer().getPosition()
    if(this.field.canPurchase(currPlayer, position)) {
      this.field.purchaseProp(currPlayer, position);
    } else {
      console.log('cannot purchase')
    }
  }
  public isGameRunning(): boolean {
    return this.gameIsRunning;
  };

  public destroy() {
    this.players.forEach((player: Player) => {
      io.to(player.SocketId).emit('leave_game');
    });

    var index = Game.Games.indexOf(this);
    delete Game.Games[index];
  }
}


/* little help classes */

class Dices {
  private static dicesCounter: number = 3;
  public static rollDices(count: number = Dices.dicesCounter): number[] {
    var rolled: number[] = [];
    for(var i = 0;i < Dices.dicesCounter; i++) {
      rolled.push(Math.floor(Math.random() * 6) + 1);
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
