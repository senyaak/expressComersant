/// <reference path="./player.ts"/>
import Player from "./player";

export default class Field {
  private fields: Cell[];
  constructor() {
    this.fields = [];
    this.fields.push(
      new FirmaCell(30000, 200, "Гастроном", 21000),
      new FirmaCell(32000, 250, "Кондитерский", 24000),
      new FirmaCell(34000, 300, "Хлебный", 26000),
      new ChangeBallanveEvent(new MoneyEvent("Прибыль", "Поздравляем! Вы выйграли в лотерею 10 000", 10000)),
      new ChangeBallanveEvent(new MoneyEvent("Штраф", "Вас оштрафовали на 12 000", 12000)),
      new ChangeBallanveEvent(new MoneyEvent("Прибыль", "Поздравляем! Вы выйграли в лотерею 10 000", 10000))
    );
  };
  public callEvent(player: Player) {
    this.fields[player.getPosition()].onStep(player);
  };
  public getLength(): number {
    return this.fields.length;
  }
  public isPurchasable(player: Player, propId: number): boolean {
    if(this.fields[propId].isPurchasable()) {
      var field:PropertyCell = <PropertyCell>this.fields[propId];
      return !field.isSold() && (player.getBallance() >=  field.getPrice());
    } else {
      return false;
    }
  }
  public purchaseProp(player: Player, propId: number) {
    var property: PropertyCell = <PropertyCell>this.fields[propId];
    if(this.fields[propId].isPurchasable() && player.getBallance() >= property.getPrice()) {
      player.buyProperty(propId, property.getPrice());
      property.setOwner(player.getId());
      console.log('Bought', property.getName())
    } else {
      throw new Error('WRONG PROPERTY TO BUY');
    }
  }
  public changeOwner(player: Player, propId: number) {

  }
}
/* Main Super-Class */
abstract class Cell {
  public isPurchasable(): boolean {
    return this.purchasable;
  }
  protected purchasable: boolean;
  public abstract onStep(player: Player);
  constructor() {
    this.purchasable = false;
  };
}
/* Card and Events */
abstract class EventCell extends Cell {
  public abstract onStep(player: Player);
}

class CardEvent extends EventCell {
  public onStep(player: Player) {};
}

class ChangeBallanveEvent extends EventCell {
  private event: StepEvent;
  public onStep(player: Player){
    console.log('some money event');
    this.event.dispatch(player);
  };
  constructor(event: StepEvent) {
    super();
    this.event = event;
  };
}
/* Events */
abstract class StepEvent {
  public abstract dispatch(player: Player);
}

class MoneyEvent extends StepEvent {
  message: string;
  headLine: string;
  deltaBallance: number;
  constructor(headLine: string, message: string, deltaBallance: number) {
    super();
    this.message = message;
    this.headLine = headLine;
    this.deltaBallance = deltaBallance;
  };
  public dispatch(player: Player) {
    /* TODO SEND MESSAGE */
    // showMessageFn();
    player.changeBallance(this.deltaBallance);
  };
}

/* Properties */
abstract class PropertyCell extends Cell {
  private price: number;
  private ownerId: number;
  private dividend: number;
  private name: string;
  constructor(price: number, dividend: number, name: string) {
    super();
    this.price = price;
    this.ownerId = null;
    this.dividend = dividend;
    this.purchasable = true;
    this.name = name;
  };
  public isSold() {
    return this.ownerId !== null;
  }
  public getOwner() {
    return this.ownerId;
  }
  public getName() {
    return this.name;
  }
  public setOwner(newOwnerId: number): number {
    return this.ownerId = newOwnerId;
  }
  public getPrice() {
    return this.price;
  }
  public abstract onStep();
}

class FirmaCell extends PropertyCell {
  private static gradeMultipliese: number[] = [1, 3, 12.5, 30];
  private static maxGrade: number = 4;
  private grade: number;
  private upgradePrice: number;
  private owner: number; /* Player id */
  constructor(price: number, dividend: number, name: string, uPrice: number) {
    super(price, dividend, name);
    this.grade = 0;
    this.upgradePrice = uPrice;
  };
  public onStep() {
    console.log('if no owner, offer to buy,/ else getTax');
  };
}

class AreaCell extends PropertyCell {
  constructor(price: number, dividend: number, name: string) {
    super(price, dividend, name);
  };
  public onStep() {
    console.log('if no owner, offer to buy');
  };
}
