module Client {
  export enum PlayerItems {
    purchaseAllowance,
    sequrityCard,
    freeTax
  }

  function PlayerItemToString(value: PlayerItems) {
    switch(value) {
      case PlayerItems.purchaseAllowance: return "Allow purchase";
      case PlayerItems.sequrityCard: return "Sequrity";
      case PlayerItems.freeTax: return "Taxfree";
    }
  }

  export interface PlayerStats {
    name: string;
    position: number;
    rest: boolean;
    payTax: boolean;
    momey: number;
    propertiesList: number[];
    idCounter: number;
    id: number;
    socketId: string;
    items: PlayerItems[];
    isRacketir: number;
  }

  export class Player {
    private number: number;
    private elmGroup: svgjs.Element;

    private money: number;
    private properies: string[];
    private cards: PlayerItems[];
    private position: number;
    private info: PlayerInfo;

    public get Number () {
      return this.number;
    }

    public get Money() {
      return this.money;
    }

    public get Properties() {
      return this.getPropertyAsString(this.properies);
    };

    private get CardsAsStringArray() {
      return this.cards.map((card) => {
        return PlayerItemToString(card);
      })
    }

    public get Cards() {
      return this.getPropertyAsString(this.CardsAsStringArray);
    };

    private getPropertyAsString(value: string[]) {
      var result = "";
      if (value.length < 1) {
        result = " --- ";
      } else {
        value.join(", ");
      }
      return result;
    }

    constructor(playerCounter: number, numberOfThePlayer: number, container: svgjs.Element, fixedContainer: JQuery) {
      this.elmGroup = container.group();
      this.elmGroup.transform({x: 10, y: 10*playerCounter});

      // TODO some color variations??
      var color;
      switch(playerCounter) {
        case 0: color = "red"; break;
        case 1: color = "blue"; break;
        case 2: color = "yellow"; break;
        case 3: color = "pink"; break;
        default: color = "black"
      }

      // TODO add tooltip  with tooltipster
      this.number = playerCounter;
      this.position = 0;
      this.money = 50000;
      this.properies = [];
      this.cards = [];

      // Creating player chip
      this.elmGroup.circle(10).fill({color: color, opacity: 0.6});

      // Creating Player info element
      this.info = new PlayerInfo(fixedContainer, this, numberOfThePlayer === playerCounter);
    }

    public set Position(value: number) {
      var y = this.elmGroup.y();
      if (this.position < value) {
        this.elmGroup.animate().move(value + value*CELL_WIDTH + 10, y);
      } else {
        this.elmGroup.animate().move(10, y);
        this.elmGroup.animate().move(value + value*CELL_WIDTH + 10, y);
      }
      this.position = value
    }

    public set PlayerStats (value: PlayerStats) {
      this.PlayerStats = value;
      this.cards = value.items;
      // this.cards = value.items;
    }
  }

  export class PlayerInfo {
    private mainContainer: JQuery;
    private playerNumber: number;

    constructor(container: JQuery, player: Player, isPlayer?: boolean) {
      this.playerNumber = player.Number;

      this.mainContainer = container.append(`
        <button class="${isPlayer?"player-button":""}" id="player-button-toggler-${player.Number}">
          Player ${player.Number}
        </button>

        <div id="player-info-${player.Number}">
          <div>
            Name: <span class="info-name">Player ${player.Number}</span>
          </div>
          <div>
            Money: <span class="info-money">${player.Money}</span>
            <br>
            Properties: <span class="info-properties">${player.Properties}</span>
            <br>
            Cards: <span class="info-cards">${player.Cards}</span>
          </div>
        </div>
      `);

      $(`#player-button-toggler-${player.Number}`).css({
        position: "fixed",
        right: "10px",
        bottom: `${10 + 20*player.Number}px`,
        width: "100px",
        height: "20px",
      }).click(() => {
        var visible = $(`#player-info-${player.Number}`).is(`:visible`);
        $(`[id*=player-info-]`).hide();
        if(!visible) {
          $(`#player-info-${player.Number}`).show();
        }
      });

      $(`#player-info-${player.Number}`).css({
        display: "none",
        position: "fixed",
        right: "110px",
        bottom: `2%`,
      });
    }

    public set Player(value: Player) {
      this.mainContainer.find("span.info-name").html(`Player ${value.Number}`);
      this.mainContainer.find("span.info-money").html(`${value.Money}`);
      this.mainContainer.find("span.info-properties").html(`${value.Properties}`);
      this.mainContainer.find("span.info-cards").html(`${value.Cards}`);
    }
  }
}
