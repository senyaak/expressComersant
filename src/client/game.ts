module Client {
  export class Game {
    private static mainElement: svgjs.Element;
    private static nextActionBtn: svgjs.Element;

    private static playerNumber: number;

    public static InitGame() {
      Game.mainElement = Game.initField();
      Game.nextActionBtn = Game.initActionBtn();
    }

    private static initField(): svgjs.Element {
      /*create field*/
      var mainSvg: svgjs.Element = SVG('game').size(
        9000,//window.innerWidth,
        window.innerHeight
      );
      var mainGroup = mainSvg.group();

      field.forEach((f,i) => {
        f.createElement(mainGroup, i);
      });

      return mainGroup;
    }

    private static initActionBtn(): svgjs.Element {
      var nextActionBtn = this.mainElement.rect(20,20).y(window.innerHeight- 30);
      nextActionBtn.node.onclick = () => {
        console.log("CLICKED");
        socket.emit('nextStep')
      };
      return nextActionBtn;
    }

    public static StartGame(playersCount: number, playerNumber: number) {
      Game.playerNumber = playerNumber;
    }
  }
}
