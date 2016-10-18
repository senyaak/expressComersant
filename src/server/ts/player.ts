export default class Player {
  private name: string;
  private position: number;
  private haveToRest: boolean;
  private momey: number;
  private propertiesList: number[];
  private static idCounter: number = 0;
  private id: number;
  private socketId: number;
  /* TODO add: Status(ENUM: racket, underProtection, basic?)
   *           properties: number[](cellsIndexes)
   *           credit: {remainingTime: number, credit}
   *           CollectableItems: {ENUM: "Г(buy city firma)", "Free from TAX-Visit", "Anti-racket"}[]
   *           events: {event: Function(MB), remainTurns: number}[]
   */
  constructor(name: string, socket: number = null) {
    this.name = name;
    this.position = 0;
    this.haveToRest = false;
    this.momey = 250000;
    this.id = Player.idCounter++;
    this.propertiesList = [];
  };

  public getId() {
    return this.id;
  }
  public getName() {
    return this.name;
  }
  public buyProperty(propId: number, costs: number) {
    /* to be sure */
    if(this.momey >= costs && this.propertiesList.indexOf(propId) !== -1) {
      this.propertiesList.push(propId);
      this.changeBallance(costs);
    }
  }
  public getPropertiesList(): number[] {
    return this.propertiesList;
  }
  public getPosition(): number {
    return this.position;
  };
  public setPosition(position: number): number {
    return this.position = position;
  }

  public setHaveToRest() {
    this.haveToRest = true;
  }
  public isSleeping() {
    var sleep = this.haveToRest;
    if(this.haveToRest) {
      this.haveToRest = false;
    }
    return sleep;
  }
  public changeBallance(delta: number) {
    var newBallance = this.momey + delta;
    if(newBallance < 0) {
      throw new NotEnoughMoneyError(newBallance);
    } else {
      this.momey = newBallance;
    }
  }
  public getBallance(): number {
    return this.momey;
  }
}


class NotEnoughMoneyError extends Error {
  need: number;
  constructor(need: number, msg?: string) {
    super(msg);
    this.need = need;
  }
}
