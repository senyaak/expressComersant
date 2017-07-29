module Client {
  export class Game {
    private static mainElement: svgjs.Element;
    private static absoluteElement: JQuery;
    private static playersInfo: PlayerInfo;
    private static nextActionBtn: JQuery;
    private static players: Player[];
    private static playerNumber: number;
    private static playerCount: number;

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

    private static initActionBtn(): JQuery {
      this.absoluteElement.append(`<div id="next-step"></div>`);
      var nextActionBtn = $("#next-step");
      nextActionBtn.css("background-color", "grey");
      nextActionBtn.append(`<div class="label">waiting...</div>`);
      nextActionBtn.css("bottom", "20px");
      nextActionBtn.css("width", "200px");
      nextActionBtn.css("display", "inline");
      nextActionBtn.css("position", "absolute");
      nextActionBtn.find(".label").css("padding", "5px");

      nextActionBtn.on("click", () => {
        console.log("CLICKED");
        socket.emit("nextStep")
      });

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
        // TODO update players
        console.log(player);
        Game.players[player.id].Position = player.position;
      });

      socket.on("newTurn", () => {
        this.nextActionBtn.css("background-color", "green");
        this.nextActionBtn.find(".label").html("next");
      });
      socket.on("endTurn", () => {
        this.nextActionBtn.css("background-color", "grey");
        this.nextActionBtn.find(".label").html("waiting...");
      });
    }
  }
}
