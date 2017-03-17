module Client {
  export class Game {
    private GameId: string;
    private mainElement: svgjs.Element;
    private nextActionBtn: svgjs.Element;

    public constructor(gameID: string) {
      this.GameId = gameID;

      this.mainElement = this.initField();
      this.nextActionBtn = this.initActionBtn();
    }

    private initField(): svgjs.Element {
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

    private initActionBtn(): svgjs.Element {
      var nextActionBtn = this.mainElement.rect(20,20).y(window.innerHeight- 30);
      nextActionBtn.node.onclick = () => {
        console.log("CLICKED");
        socket.emit('nextStep')
      };
      return nextActionBtn;
    }
  }
}
