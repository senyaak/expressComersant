module Client {
  enum TurnState {
    start,
    roll,
    finish,
  };

  function StateToString(state: TurnState) {
    console.log("StateToString", state);
    switch(state) {
      case TurnState.start: return "Start";
      case TurnState.roll: return "Roll";
      case TurnState.finish: return "Finish";
    }
  }

  export class Game {

    private static mainElement: svgjs.Element;
    private static absoluteElement: JQuery;
    private static playersInfo: PlayerInfo;
    private static nextActionBtn: JQuery;
    private static players: Player[];
    private static playerNumber: number;
    private static playerCount: number;
    private static turnState: any;

    public static InitGame() {
      $("#game").css("width", "1px");
      $("#game").prepend(`<div id="fixed-content"></div>`);
      Game.absoluteElement = $("#fixed-content");
      Game.absoluteElement.css("position", "fixed").css("width", "100%").css("height", "100%");

      Game.mainElement = Game.initField();
      Game.nextActionBtn = Game.initActionBtn();

      this.InitEvents();
    }

    private static initField(): svgjs.Element {
      /*create field*/
      var mainSvg: svgjs.Element = SVG('game').size(
        field.length*(CELL_WIDTH+INNERBORDER_WIDTH)+100,
        CELL_HEIGHT
      );
      //initMoveByClick(mainSvg);
      var mainGroup = mainSvg.group();

      field.forEach((f,i) => {
        f.createElement(mainGroup, i);
      });

      return mainGroup;
    }

    private static InitBuyButton

    private static initActionBtn(): JQuery {
      this.turnState = TurnState.finish;

      var nextStep = () => {
        socket.emit("nextStep");
        nextActionBtn.off("click", nextStep);
        setTimeout(() => {
          nextActionBtn.on("click", nextStep);
        }, 1000);
      };

      this.absoluteElement.append(`<div id="next-step"></div>`);
      var nextActionBtn = $("#next-step");
      nextActionBtn.append(`<div id="next-button" class="label">waiting...</div>`);

      nextActionBtn.on("click", nextStep);
      return nextActionBtn;
    }

    public static StartGame(players: string[]) {
      Game.playerCount = players.length;
      Game.playerNumber = players.indexOf(socket.id);
      Game.players = [];
      console.log("playerNumber", Game.playerNumber)
      Game.AddPlayers(Game.playerNumber);

    }

    private static AddPlayers(player: number) {
      for(var i = 0; i < Game.playerCount; i++) {
        console.log("add player", i);
        Game.players.push(new Player(i, player, Game.mainElement, Game.absoluteElement));
      }
    }

    private static InitEvents() {
      socket.on("updatePlayerPosition", (player: PlayerStats) => {
        Game.players[player.id].Position = player.position;
      });

      socket.on("updatePlayer", (player: PlayerStats) => {
        Game.players[player.id].PlayerStats = player;
      });
      socket.on("newTurn", () => {
        this.nextActionBtn.find("#next-button").css("background-color", "green");
        this.nextActionBtn.find(".label").html("next");
      });
      socket.on("endTurn", () => {
        this.nextActionBtn.find("#next-button").css("background-color", "grey");
        this.nextActionBtn.find(".label").html("waiting...");
      });

      // TODO turn phase event
      socket.on("set_turn_state", () => {
        // TODO set turn state
      });
    }
  }
}
