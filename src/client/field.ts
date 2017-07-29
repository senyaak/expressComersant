module Client {
  export const CELL_WIDTH = 90;
  export const CELL_HEIGHT = 125;
  export const LINE_HEIGHT = 10;
  export const INNERBORDER_WIDTH = 0.3;
  export const PROP_GRADES = ["У", "Ф", "О", "П"];

  export enum CardType {
    RISK,
    MAIL,
    SURPRIZE,
    RACKET,
    TAX,
    SLEEP
  };

  export function CardToString(type: CardType): string {
    switch(type) {
      case CardType.RISK: return "Риск";
      case CardType.MAIL: return "Письмо";
      case CardType.SURPRIZE: return "Сюрприз";
      case CardType.RACKET: return "Рэкет";
      case CardType.TAX: return "Налоговая Служба";
      case CardType.SLEEP: return "Отпуск";
    }
    throw new TypeError();
  }

  export abstract class Cell {
    protected cellNumber: number;

    protected createRect(draw: svgjs.Element, index: number): svgjs.Element {
      return draw.rect(CELL_WIDTH, CELL_HEIGHT);
    };
    public abstract createElement(draw: svgjs.Element, index: number): svgjs.Element;
  }

  export class EmptyStep extends Cell {
    private text: string;
    constructor(text: string) {
      super();
      this.text = text;
    }
    public createElement(draw: svgjs.Element, index: number): svgjs.Element {
      var mainElement = draw.group();
      mainElement.transform({x: (CELL_WIDTH+1)*index});
      var rect: any = this.createRect(mainElement, index).fill('#fff').stroke('#000');
      mainElement.text(this.text).y(CELL_HEIGHT/2 - 10).x(CELL_WIDTH/2).font({anchor: 'middle'});
      this.cellNumber = index;
      return mainElement;
    }
  };

  export class FirmaCell extends Cell {
    private price: number;
    private dividends: number[];
    private tax: number[];
    private name: string;
    private upgrade: number;
    private gos: boolean;
    constructor(price: number, dividends: number[], tax: number[], name: string, upgrade: number, gos: boolean = false) {
      super();
      this.price = price;
      this.dividends = dividends
      this.tax = tax
      this.name = name
      this.upgrade = upgrade
      this.gos = gos
    }
    public createElement(draw: svgjs.Element, index: number): svgjs.Element {
      this.cellNumber = index;
      // init main element
      var mainElement = draw.group();
      mainElement.transform({x: (CELL_WIDTH+1)*index});
      var rect = this.createRect(mainElement, index).fill('#fff').stroke('#000');

      // init header: size 4x LINE_HEIGHT
      var topElm = mainElement.group();
      this.name.split("\\n").forEach((text: string, i: number, arr) => {
        topElm.text(text).y(2 + ((LINE_HEIGHT+1)*i)).x(CELL_WIDTH/2).font({anchor: 'middle', size: LINE_HEIGHT});
        if(i+1 == arr.length) {
          mainElement.text(`${Utils.withThousandSeparateDots(this.price)}`).y(2 + (LINE_HEIGHT+1)*(i+1)).x(CELL_WIDTH/2).font({anchor: 'middle', size: LINE_HEIGHT});
        }
      });
      var headerBP = (LINE_HEIGHT+1)*3;
      mainElement.line(0, headerBP, CELL_WIDTH, headerBP).stroke({width: INNERBORDER_WIDTH});

      // init footer: size 3x LINE_HEIGHT
      var footerBP = CELL_HEIGHT-(LINE_HEIGHT*3);
      mainElement.line(0, footerBP, CELL_WIDTH, footerBP).stroke({width: INNERBORDER_WIDTH});
      mainElement.text(`Улучшение:`)
                 .y(CELL_HEIGHT - (LINE_HEIGHT+1)*(2))
                 .x(CELL_WIDTH/2)
                 .font({anchor: 'middle', size: LINE_HEIGHT});
      mainElement.text(`${Utils.withThousandSeparateDots(this.upgrade)}`)
                 .y(CELL_HEIGHT - (LINE_HEIGHT+1))
                 .x(CELL_WIDTH/2).font({anchor: 'middle', size: LINE_HEIGHT});

      // init body
      mainElement.line(CELL_WIDTH/2, headerBP, CELL_WIDTH/2, footerBP).stroke({width: INNERBORDER_WIDTH});

      var bodyStart = LINE_HEIGHT*4;

      for(var i = 0; i < 4; i++) {
        var lnElm = mainElement.group().attr("id", `Firma_${index}_${i}`);
        lnElm.text(`${PROP_GRADES[i]}-${this.dividends[i]}`)
             .font({size: LINE_HEIGHT})
             .y(bodyStart + (LINE_HEIGHT+1)*i)
             .x(2);
        lnElm.text(`${this.tax[i]}`)
             .font({size: LINE_HEIGHT})
             .y(bodyStart + (LINE_HEIGHT+1)*i)
             .x(CELL_WIDTH/2 + 2);
      }

      return mainElement;
    }
  };

  export class Card extends Cell {
    private type: CardType;
    constructor(type: CardType) {
      super();
      this.type = type;
    }

    public createElement(draw: svgjs.Element, index: number): svgjs.Element {
      this.cellNumber = index;
      // init main element
      var mainElement = draw.group();
      mainElement.transform({x: (CELL_WIDTH+1)*index});
      var rect = this.createRect(mainElement, index).fill('#fff').stroke('#000');
      // init footer: size 3x LINE_HEIGHT
      var footerBP = CELL_HEIGHT-(LINE_HEIGHT*3);
      mainElement.line(0, footerBP, CELL_WIDTH, footerBP).stroke({width: INNERBORDER_WIDTH});
      mainElement.text(CardToString(this.type))
                 .y(CELL_HEIGHT - (LINE_HEIGHT+1)*(2))
                 .x(CELL_WIDTH/2)
                 .font({anchor: 'middle', size: LINE_HEIGHT});

      // init body: size = footerBP
      /// TODO load different images
      mainElement.image('./keriyo-emoticons-32.png', CELL_WIDTH/2, CELL_WIDTH/2)
                 .cy(footerBP/2)
                 .cx(CELL_WIDTH/2);


      return mainElement;
    }
  };

  export class AreaCell extends Cell {
    private price;
    constructor(price: number) {
      super();
      this.price = price;
    };
    public createElement(draw: svgjs.Element, index: number): svgjs.Element {
      this.cellNumber = index;
      // init main element
      var mainElement = draw.group();
      mainElement.transform({x: (CELL_WIDTH+1)*index});
      var rect = this.createRect(mainElement, index).fill('#fff').stroke('#000');
      // init footer: size 5x LINE_HEIGHT
      var footerBP = CELL_HEIGHT - (LINE_HEIGHT*5);
      var lineMargin = 4;
      this.drowLines(mainElement, footerBP, lineMargin);
      mainElement.text(Utils.withThousandSeparateDots(this.price))
                 .y(footerBP + (CELL_HEIGHT - footerBP)/2)
                 .x(CELL_WIDTH/2)
                 .font({anchor: 'middle', size: LINE_HEIGHT});

      // init body
      this.drowLines(mainElement, LINE_HEIGHT, lineMargin);
      mainElement.text('Участок земли')
                 .y(LINE_HEIGHT + footerBP/2)
                 .x(CELL_WIDTH/2)
                 .font({anchor: 'middle', size: LINE_HEIGHT});

      return mainElement;
    }

    private drowLines(mainElement: svgjs.Element, startPoint: number, margin: number, count: number = 3) {
      for(var i = 0; i < count; i++) {
        var y = startPoint + i*margin;
        mainElement.line(0, y, CELL_WIDTH, y).stroke({width: INNERBORDER_WIDTH, color: "#000"});
      }

    }
  };

  export class MoneyCell extends Cell {
    private money;
    constructor(money: number) {
      super();
      this.money = money;
    }
    public createElement(draw: svgjs.Element, index: number): svgjs.Element {
      this.cellNumber = index;
      // init main element
      var mainElement = draw.group();
      mainElement.transform({x: (CELL_WIDTH+1)*index});
      var rect = this.createRect(mainElement, index).fill('#fff').stroke('#000');

      if(this.money> 0) {
        this.positiv(mainElement);
      } else {
        this.negativ(mainElement);
      }
      return mainElement;
    }

    private negativ(mainElement: svgjs.Element) {
      mainElement.line(0, CELL_HEIGHT/2, CELL_WIDTH, CELL_HEIGHT/2).stroke({width: INNERBORDER_WIDTH, color: "#000"});
      mainElement.text('Штраф')
                 .y(CELL_HEIGHT*3/4)
                 .x(CELL_WIDTH/2)
                 .font({anchor: 'middle', size: LINE_HEIGHT});
      mainElement.text(Utils.withThousandSeparateDots(Math.abs(this.money)))
                 .y(CELL_HEIGHT/4)
                 .x(CELL_WIDTH/2)
                 .font({anchor: 'middle', size: LINE_HEIGHT});
    }

    private positiv(mainElement: svgjs.Element) {
      mainElement.line(0, CELL_HEIGHT - LINE_HEIGHT, CELL_WIDTH, CELL_HEIGHT - LINE_HEIGHT).stroke({width: INNERBORDER_WIDTH, color: "#f00"});
      mainElement.line(0, CELL_HEIGHT - LINE_HEIGHT*3.5, CELL_WIDTH, CELL_HEIGHT - LINE_HEIGHT*3.5).stroke({width: INNERBORDER_WIDTH, color: "#f00"});
      mainElement.text(Utils.withThousandSeparateDots(Math.abs(this.money)))
                 .y(CELL_HEIGHT - LINE_HEIGHT*2.5)
                 .x(CELL_WIDTH/2)
                 .font({anchor: 'middle', size: LINE_HEIGHT});
      mainElement.text("Прибыль")
                 .y(CELL_HEIGHT/2 - LINE_HEIGHT*2)
                 .x(CELL_WIDTH/2)
                 .font({anchor: 'middle', size: LINE_HEIGHT});
    }
  };
}
