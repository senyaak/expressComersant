import {Player} from "./player";
import {PlayerItems} from "./player";
import {NotificationService} from "./../services/notification";

export class Field {
  private that: Field;
  private fields: Cell[];
  constructor() {
    this.that = this;
    this.fields = [];
    this.fields.push(
      new EmptyStep(), // start
      new FirmaCell(30000, [400, 1500, 5200, 11000], [900, 15000, 54000, 120000], "Гастроном", 21000),
      new FirmaCell(32000, [800, 1500, 6000, 13000], [900, 15000, 58000, 124000], "Кондитерский", 24000),
      new FirmaCell(34000, [300, 1600, 6100, 14000], [1000, 17000, 61500, 130000], "Хлебный", 26000),
      new Card(mailArray),
      new ChangeBallanceEvent(new MoneyEvent("Штраф", "Вас оштрафовали на 25 000", -25000)),
      new AreaCell(15000, "Участок земли"),
      new Card(surprizeArray),
      new FirmaCell(40000, [500, 2000, 7000, 15000], [5300, 20000, 70000, 150000], "Фабрика игрушек", 32000, true),
      new ChangeBallanceEvent(new MoneyEvent("Прибыль", "Неожиданная прибыль 15 000", 15000)),
      new FirmaCell(29000, [400, 1300, 5300, 11000], [3800, 14500, 52000, 111000], "Галантерея", 21000),
      new FirmaCell(30000, [400, 1500, 5500, 12000], [3900, 15000, 54000, 120000], "Детский мир", 22000),
      new FirmaCell(28000, [400, 1400, 5100, 10000], [3700, 14000, 50400, 110000], "ЦУМ", 20000),
      new Card(mailArray),
      new EmptyStep(), // in
      new AreaCell(25000, "Участок земли"),
      new FirmaCell(14000, [300, 700, 2500, 5800], [1800, 7000, 25200, 56000], "Столовая", 25000),
      new FirmaCell(16000, [300, 800, 3000, 6500], [2200, 8000, 28800, 64000], "Кафе", 30000),
      new FirmaCell(18000, [300, 900, 3300, 7500], [2300, 9000, 32000, 72000], "Ресторан", 35000),
      new FirmaCell(58000, [700, 2800, 9000, 21000], [7000, 29000, 104000, 230000], "Консвервный комбинат", 50000, true),
      new Card(surprizeArray),
      new Card(racketArr),
      new FirmaCell(41000, [500, 2000, 7000, 16000], [5000, 20000, 73500, 162000], "Ларёк", 35000),
      new FirmaCell(49000, [600, 2500, 8700, 19500], [6400, 25000, 88500, 195000], "Овощной магазин", 42000),
      new FirmaCell(48000, [600, 2400, 8600, 18000], [6200, 24000, 86000, 180000], "Рынок", 40000),
      new ChangeBallanceEvent(new MoneyEvent("Прибыль", "Неожиданная прибыль 40 000", 40000)),
      new FirmaCell(80000, [1000, 4000, 12000, 30000], [10000, 40000, 130000, 310000], "Совхоз", 60000, true),
      new Card(mailArray),
      new AreaCell(20000, "Участок земли"),
      new Card(racketArr),
      new FirmaCell(15000, [300, 700, 1500, 6000], [1900, 7600, 15200, 60000], "Спартак", 15000),
      new FirmaCell(18000, [300, 700, 1500, 6000], [2300, 9000, 32000, 72000], "Торпедо", 15000),
      new FirmaCell(20000, [300, 1000, 3600, 7800], [2600, 10000, 36000, 78000], "Лужники", 20000),
      new Card(sleepArr),
      new Card(riskArray),
      new EmptyStep(), // in
      new FirmaCell(31000, [400, 1500, 5600, 12400], [4000, 15500, 55800, 124000], "Концертный зал", 26000),
      new FirmaCell(29000, [300, 1500, 5200, 11600], [3700, 14500, 52000, 116000], "Дворец спорта", 24000),
      new FirmaCell(30000, [400, 1500, 5400, 12000], [3900, 15000, 54000, 120000], "СК Олимпийский", 25000),
      new EmptyStep(), // comin
      new Card(racketArr),
      new Card(surprizeArray),
      new ChangeBallanceEvent(new MoneyEvent("Прибыль", "Неожиданная прибыль 11 000", 11000)),
      new FirmaCell(48000, [700, 2400, 8600, 20000], [6200, 24000, 86400, 192000], "Кондитерская фабрика", 40000, true),
      new FirmaCell(13000, [300, 700, 2400, 5600],  [1600, 7500, 23500, 52000], "Театр кукол", 10000),
      new FirmaCell(19000, [300, 1000, 3500, 7500], [2400, 10000, 34000, 76000], "Тюз", 16000),
      new FirmaCell(18000, [300, 900, 3200, 8000],  [2600, 9000, 32400, 72000], "Театр оперы и балета", 15000),
      new AreaCell(12000, "Участок земли"),
      new Card(mailArray),
      new Card(taxArr),
      new FirmaCell(40000, [500, 2000, 7200, 16000], [5200, 20000, 72000, 150000], "Институт культуры", 35000, true),
      new EmptyStep(), // in
      new Card(racketArr),
      new ChangeBallanceEvent(new MoneyEvent("Прибыль", "Неожиданная прибыль 14 000", 14000)),
      new FirmaCell(46000, [900, 2400, 8100, 19000], [5900, 23000, 82500, 184000], "Овощесклад", 35000),
      new FirmaCell(49000, [600, 2400, 8700, 19500], [6300, 24000, 88000, 196000], "Пром. база", 38000),
      new FirmaCell(52000, [600, 2500, 9300, 21000], [6600, 26000, 93600, 208000], "Прод. база", 40000),
      new Card(riskArray),
      new FirmaCell(49000, [600, 2300, 8900, 19500], [6300, 24000, 88200, 190000], "Обувная фабрика", 45000, true),
      new Card(mailArray),
      new AreaCell(60000, "Участок земли"),
      new Card(sleepArr)
    );
  };
  public callEvent(player: Player) {
    this.fields[player.getPosition()].onStep(player, this.that);
  };
  public removeRandomProperty(player: Player, grade: number) {
    var props: number[] = [];
    this.fields.forEach((value: Cell, index: number) => {
      if(value instanceof FirmaCell && (<FirmaCell>value).getGrade() === grade) {
        props.push(index);
      }
    });
    var randomIndex = props[Math.floor(Math.random() * props.length)];
    (<FirmaCell>this.fields[randomIndex]).removeOwner();
    player.removeProperty(randomIndex);
  };
  public getLength(): number {
    return this.fields.length;
  };
  public getDividends(id: number): number {
    var field = this.fields[id];
    if (field.isPurchasable()) {
      var propField: PropertyCell = <PropertyCell>field;
      return propField.getDividens();
    } else {
      throw new Error('Wrong id for dividends');
    }
  };
  public canPurchase(player: Player, propId: number): boolean {
    if(this.fields[propId].isPurchasable()) {
      var field:PropertyCell = <PropertyCell>this.fields[propId];
      return !field.isSold() && (player.getBallance() >=  field.getPrice());
    } else {
      return false;
    }
  };
  public purchaseProp(player: Player, propId: number) {
    var property: PropertyCell = <PropertyCell>this.fields[propId];
    if(this.fields[propId].isPurchasable() && player.getBallance() >= property.getPrice()) {
      player.buyProperty(propId, property.getPrice());
      property.setOwner(player.getId());
      console.log('Bought', property.getName())
    } else {
      throw new Error('WRONG PROPERTY TO BUY');
    }
  };
  public getFieldId(name: string) {
    return this.fields.indexOf(this.fields.filter((val) => {
      return val.getName().toLowerCase() === name.toLowerCase();
    })[0]);
  };
  public changeOwner(player: Player, propId: number, oldPlayer: Player = null) {
    /* TODO */
  };
  public removePlayer(playerId: number) {
    this.fields.forEach((value: Cell, index: number, array: Cell[]) => {
      if(value.isPurchasable()) {
        var field = <PropertyCell>value;
        if(field.getOwner() === playerId) {
          field.removeOwner();
        }
      }
    });
  }
}

/* Main Super-Class */
abstract class Cell {
  public getName(): string {
    return null;
  }
  public isPurchasable(): boolean {
    return this.purchasable;
  }
  protected purchasable: boolean;
  public abstract onStep(player: Player, field: Field);
  constructor() {
    this.purchasable = false;
  };
}
/* Card and Events */
abstract class EventCell extends Cell {
  public abstract onStep(player: Player, field: Field);
}

class EmptyStep extends EventCell {
  public onStep(player: Player, field: Field) {
    return;
  }
}

class Card extends EventCell {
  events: CardEvent[];
  constructor(events: CardEvent[]) {
    super();
    this.events = events;
  };
  public onStep(player: Player, field: Field) {
    this.events[Math.floor(Math.random()) * this.events.length].dispatch(player, field);
  };
}

class ChangeBallanceEvent extends EventCell {
  private event: StepEvent;
  public onStep(player: Player, field: Field){
    console.log('some money event');
    this.event.dispatch(player, null);
  };
  constructor(event: StepEvent) {
    super();
    this.event = event;
  };
}
/* Events */
abstract class StepEvent {
  public abstract dispatch(player: Player, field: Field);
}

class CardEvent extends StepEvent {
  private event: (player: Player, field: Field) => void;
  constructor(event: (player: Player, field: Field) => void) {
    super();
    this.event = event;
  };
  public dispatch(player: Player, field: Field) {
    this.event(player, field);
  }
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
  public dispatch(player: Player, field: Field) {
    /* TODO SEND MESSAGE */
    // showMessageFn();
    player.changeBallance(this.deltaBallance);
    NotificationService.sendNotification(player, this.headLine, this.message);
  };
}

/* Properties */
abstract class PropertyCell extends Cell {
  protected price: number;
  protected ownerId: number;
  protected name: string;
  constructor(price: number, name: string) {
    super();
    this.price = price;
    this.ownerId = null;
    this.purchasable = true;
    this.name = name;
  };
  public isSold() {
    return this.ownerId !== null;
  };
  public getOwner() {
    return this.ownerId;
  };
  public removeOwner() {
    this.ownerId = null;
  }
  public getName() {
    return this.name;
  };
  public setOwner(newOwnerId: number): number {
    return this.ownerId = newOwnerId;
  };
  public getPrice() {
    return this.price;
  };
  public abstract onStep(player: Player);
  public abstract getDividens();
  public abstract getTax();
  public abstract getTaxForRacket();
}

export class FirmaCell extends PropertyCell {
  private static gradeMultipliese: number[] = [1, 3, 12.5, 30];
  private static maxGrade: number = 4;
  private grade: number;
  private upgradePrice: number;
  private dividend: number[];
  private tax: number[];
  private isStateProperty: boolean;

  constructor(price: number, dividend: number[], tax: number[], name: string, uPrice: number, isStateProperty: boolean = false) {
    super(price, name);
    if(dividend.length !== tax.length && tax.length !== 4) {
      throw new Error('wrong array length');
    }
    this.dividend = dividend;
    this.tax = tax;
    this.grade = 0;
    this.upgradePrice = uPrice;
    this.isStateProperty = isStateProperty;
  };
  public isStateProp() {
    return this.isStateProperty;
  }
  public onStep(player: Player) {
    if (this.isSold()) {
      var foe = player.getFoe(this.getOwner())
      var tax
      if (!player.isRacket()) {
        tax = -this.getTax();
      } else {
        tax = this.getTaxForRacket();
      }
      player.makeDeal(tax, foe);
      NotificationService.sendNotification(player.getSocket(), "Аренда", `Заплатите игроку ${foe.getName()} ${Math.abs(tax)}`);
      NotificationService.sendNotification(foe.getSocket(), "Аренда", `${player.getName()} платит вам ${Math.abs(tax)}`);
    } else {
      NotificationService.sendNotification(player.getSocket(), "Покупка", `Приобрести ${this.name}`);
    }
    /* TODO use NotificationService */
    console.log('if no owner, offer to buy,/ else getTax');
  };
  public upgrade(player: Player) {
    if (this.grade >= 3) {
      throw new Error('WRONG UPGRADE!!!');
    }
    player.changeBallance(this.upgradePrice);
    this.grade++;
  };
  public downgrade() {
    if(this.grade > 1) {
      throw new Error("UNABLE TO DOWNGRADE!");
    }
    this.grade--;
  };
  public getGrade(): number {
    return this.grade;
  }
  public getDividens(): number {
    return this.dividend[this.grade];
  };
  public getTax(): number {
    return this.tax[this.grade];
  };
  public getTaxForRacket(): number {
    var grade = (this.grade / 2) === 1? 3: 1;
    return this.tax[grade]/2;
  };
}

class AreaCell extends PropertyCell {
  private dividend: number;
  constructor(price: number, name: string) {
    super(price, name);
  };
  public onStep(player: Player) {
    console.log('if no owner, offer to buy');
  };
  public getDividens(): number {
    return this.price * 0.1;
  };
  public getTax(): number {
    return 1000;
  };
  public getTaxForRacket(): number {
    return 500;
  };
}


/* */
var mailArray: CardEvent[] = [
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-1000);
    NotificationService.sendNotification(player, "Письмо", "Оплатите телефонные переговоры 1 000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-20000);
    NotificationService.sendNotification(player, "Письмо", "Ремонт предприятий обходиться вам в 20 000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.addItem(PlayerItems.purchaseAllowance);
    NotificationService.sendNotification(player, "Письмо", "Вам разрешено купить государственное предприятие");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(8000);
    NotificationService.sendNotification(player, "Письмо", "Доход региональныйх фелиалов 8000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(25000);
    NotificationService.sendNotification(player, "Письмо", "Получите наследство 25000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setPosition(field.getFieldId("Тюз"));
    NotificationService.sendNotification(player, "Письмо", "Вам купили билеты на спектакль в тюз");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-15000);
    NotificationService.sendNotification(player, "Письмо", "Регистрация организаций обходиться вам в 15000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-24000);
    NotificationService.sendNotification(player, "Письмо", "Штраф за сокрытие доходов 24000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setPosition(field.getFieldId("Театр оперы и балета"));
    NotificationService.sendNotification(player, "Письмо", "Вам купили билеты в театр оперы и балета");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-5000);
    NotificationService.sendNotification(player, "Письмо", "Штраф пожнадзору 5000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(15000);
    NotificationService.sendNotification(player, "Письмо", "Вы выгодно сбыли товар 15000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(10000);
    NotificationService.sendNotification(player, "Письмо", "Получите годовой % 10000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-8000);
    NotificationService.sendNotification(player, "Письмо", "Оплатите штраф гаи 8000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-12000);
    NotificationService.sendNotification(player, "Письмо", "Расходы на модернизаию производства 12000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-10000);
    NotificationService.sendNotification(player, "Письмо", "Штраф за неуплату налогов 10000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(10000);
    NotificationService.sendNotification(player, "Письмо", "Доход аренды приносит 10000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.addItem(PlayerItems.freeTax);
    NotificationService.sendNotification(player, "Письмо", "Вы освобождены от посещения налоговой службы");
  }),
  new CardEvent((player: Player, field: Field) => {
    surprizeArray[Math.floor(Math.random() * surprizeArray.length)].dispatch(player, field);
    NotificationService.sendNotification(player, "Письмо", "Тащите карту сюрприз");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-18000);
    NotificationService.sendNotification(player, "Письмо", "Канкуренты нанесли вам убыток 18000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setTax();
    NotificationService.sendNotification(player, "Письмо", "Вас вызывают в налоговую службу");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-11000);
    NotificationService.sendNotification(player, "Письмо", "Оплатите счёт 11000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setTax();
    NotificationService.sendNotification(player, "Письмо", "Вас вызывают в налоговую службу");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.addItem(PlayerItems.freeTax);
    NotificationService.sendNotification(player, "Письмо", "Вы освобождены от посещения налоговой службы");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-5000);
    NotificationService.sendNotification(player, "Письмо", "Оплатите счёт 5000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(12000);
    NotificationService.sendNotification(player, "Письмо", "Получите годовой % 12000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.addItem(PlayerItems.purchaseAllowance);
    NotificationService.sendNotification(player, "Письмо", "Вам разрешено купить государственное предприятие");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-5000);
    NotificationService.sendNotification(player, "Письмо", "Оплатите авиабилеты 5000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-10000);
    NotificationService.sendNotification(player, "Письмо", "Заплатите налог на экспорт 10000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-8000);
    NotificationService.sendNotification(player, "Письмо", "Оплатите ремонт служебного транспорта 8000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setPosition(field.getFieldId("Ресторан"));
    NotificationService.sendNotification(player, "Письмо", "Поситите банкет в ресторане");
  }),
  new CardEvent((player: Player, field: Field) => {
    riskArray[Math.floor(Math.random() * surprizeArray.length)].dispatch(player, field);
    NotificationService.sendNotification(player, "Письмо", "Тащите карту риск");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(10000);
    NotificationService.sendNotification(player, "Письмо", "Получите дивиденты от прибыли 10000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(15000);
    NotificationService.sendNotification(player, "Письмо", "Получите проценты по вкладам 15000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(25000);
    NotificationService.sendNotification(player, "Письмо", "Вам предоставлен президентский гранд 25000");
  })
];

var surprizeArray: CardEvent[] = [
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(12000);
    NotificationService.sendNotification(player, "Сюрприз", "Вы примеруетесь на 12000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setTax();
    NotificationService.sendNotification(player, "Сюрприз", "Вас вызывают в налоговую службу");
  }),
  new CardEvent((player: Player, field: Field) => {
    var newPosition = player.getPosition() - 5;
    if(newPosition < 0) {
      newPosition = field.getLength() + newPosition;
    }
    player.setPosition(newPosition);
    NotificationService.sendNotification(player, "Сюрприз", "Вернитесь на 5 клеток назад");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setTax();
    NotificationService.sendNotification(player, "Сюрприз", "Вас вызывают в налоговую службу");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(10000);
    NotificationService.sendNotification(player, "Сюрприз", "Вы выйграли в 'Спринт' 10000");
  }),
  // new CardEvent((player: Player, field: Field) => {
  //   NotificationService.sendNotification(player, "Сюрприз", "Определите клетку куда должен встать игрок справа");
  // }),
  new CardEvent((player: Player, field: Field) => {
    player.setPosition(field.getFieldId("Концертный зал"));
    NotificationService.sendNotification(player, "Сюрприз", "Вам подарили билет в концертный зал");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setRest();
    NotificationService.sendNotification(player, "Сюрприз", "Лечение в санатории 'Геленджик'");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(12000);
    NotificationService.sendNotification(player, "Сюрприз", "Вы выйграли приз в телевикторине 12000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(25000);
    NotificationService.sendNotification(player, "Сюрприз", "Вы примеруетесь на 25000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(25000);
    NotificationService.sendNotification(player, "Сюрприз", "Вы примеруетесь на 25000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-8000);
    NotificationService.sendNotification(player, "Сюрприз", "Заплатите штраф 8000");
  }),
  new CardEvent((player: Player, field: Field) => {
    var newPosition = player.getPosition() - 10;
    if(newPosition < 0) {
      newPosition = field.getLength() + newPosition;
    }
    player.setPosition(newPosition);
    NotificationService.sendNotification(player, "Сюрприз", "Вернитесь на 10 клеток назад");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.makeDeal(8000, null);
    NotificationService.sendNotification(player, "Сюрприз", "У вас родилась дочь. Все игроки дарят по 8000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-40000);
    NotificationService.sendNotification(player, "Сюрприз", "Ограбленна касса на сумму 40000");
  }),
  new CardEvent((player: Player, field: Field) => {
    var newPosition = player.getPosition() + 5;
    if(newPosition >= field.getLength()) {
      newPosition = field.getLength() - newPosition;
    }
    player.setPosition(newPosition);
    NotificationService.sendNotification(player, "Сюрприз", "Подвиньтесь на 5 клеток вперёд");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setPosition(field.getFieldId("Лужники"));
    NotificationService.sendNotification(player, "Сюрприз", "Вы приглашены на концерт в лужниках");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(5000);
    NotificationService.sendNotification(player, "Сюрприз", "Вам отдали карточный долг 5000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(5000);
    NotificationService.sendNotification(player, "Сюрприз", "Вам отдали карточный долг 5000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(20000);
    NotificationService.sendNotification(player, "Сюрприз", "Помощь от неизвестного доброжелателя 20000");
  }),
  // new CardEvent((player: Player, field: Field) => {
  //   NotificationService.sendNotification(player, "Сюрприз", "Определите клетку куда должен встать игрок справа");
  // }),
  new CardEvent((player: Player, field: Field) => {
    var newPosition = player.getPosition() + 10;
    if(newPosition >= field.getLength()) {
      newPosition = field.getLength() - newPosition;
    }
    player.setPosition(newPosition);
    NotificationService.sendNotification(player, "Сюрприз", "Подвиньтесь на 10 клеток вперёд");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.makeDeal(10000, null);
    NotificationService.sendNotification(player, "Сюрприз", "У вас юбилей. Все игроки дарят по 10000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(12000);
    NotificationService.sendNotification(player, "Сюрприз", "Вы выйграли в 'Спортлото' 12000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(15000);
    NotificationService.sendNotification(player, "Сюрприз", "Вам перевод 15000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-5000);
    NotificationService.sendNotification(player, "Сюрприз", "Заплатите штраф 5000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setPosition(field.getFieldId("Институт культуры"));
    NotificationService.sendNotification(player, "Сюрприз", "Посетите семинар в институте культуры");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(10000);
    NotificationService.sendNotification(player, "Сюрприз", "Скачок курса акции приносит 10000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(8000);
    NotificationService.sendNotification(player, "Сюрприз", "Прибыль с участия в аукционе 8000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-12000);
    NotificationService.sendNotification(player, "Сюрприз", "Премируйте лучших сотрудников 12000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-8000);
    NotificationService.sendNotification(player, "Сюрприз", "Расходы на корпоротив 8000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-10000);
    NotificationService.sendNotification(player, "Сюрприз", "Неудачные инвестиции, убыток 10000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-5000);
    NotificationService.sendNotification(player, "Сюрприз", "Упал курс доллара убытки 5000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-5000);
    NotificationService.sendNotification(player, "Сюрприз", "Переезд в новый офис обходиться в 12000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-8000);
    NotificationService.sendNotification(player, "Сюрприз", "Оплатите аренду офиса 8000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setRest();
    NotificationService.sendNotification(player, "Сюрприз", "Отпуск на курортах краснодарского края");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(15000);
    NotificationService.sendNotification(player, "Сюрприз", "Вы удачно сбыли антиквариат 15000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setPosition(field.getFieldId("Кафе"));
    NotificationService.sendNotification(player, "Сюрприз", "Партнёры предложили вам встречу в кафе");
  })
];

var riskArray: CardEvent[] = [
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-5000);
    NotificationService.sendNotification(player, "Риск", "Сожалению вы рисковали и проиграли 5000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-8000);
    NotificationService.sendNotification(player, "Риск", "У вас затопило склад убытки 8000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setPosition(field.getFieldId("Рынок"));
    NotificationService.sendNotification(player, "Риск", "Посетите рынок");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(15000);
    NotificationService.sendNotification(player, "Риск", "Теневой бизнес приносит прибыль 15000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-10000);
    NotificationService.sendNotification(player, "Риск", "Штраф 10000");
  }),
  new CardEvent((player: Player, field: Field) => {
    field.removeRandomProperty(player, 3);
    NotificationService.sendNotification(player, "Риск", "Одна из ваших организаций признана банкротом");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.addItem(PlayerItems.sequrityCard);
    NotificationService.sendNotification(player, "Риск", "Ваше предприятие взято под охрану милиции");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(12000);
    NotificationService.sendNotification(player, "Риск", "Прибыль 12000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setPosition(0);
    NotificationService.sendNotification(player, "Риск", "Идите на старт");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(8000);
    NotificationService.sendNotification(player, "Риск", "Ваш выйгрыш на скачках составил 8000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-25000);
    NotificationService.sendNotification(player, "Риск", "Пожар на територии предприятия, убытки 25000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(15000);
    NotificationService.sendNotification(player, "Риск", "Вы получили взятку 15000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-8000);
    NotificationService.sendNotification(player, "Риск", "Вы подкупаете арбитражного судью 8000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(12000);
    NotificationService.sendNotification(player, "Риск", "Серый импорт приносит доход 12000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-5000);
    NotificationService.sendNotification(player, "Риск", "Ремонт автомобиля после ДТП 5000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setRest();
    NotificationService.sendNotification(player, "Риск", "Вы переутомились, пора в отпуск");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setRest();
    NotificationService.sendNotification(player, "Риск", "Необходимо срочное личение в следствии стресса");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setPosition(field.getFieldId("Совхоз"));
    NotificationService.sendNotification(player, "Риск", "На утро после юбилея вы очнулись в совхозе");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(-20000);
    NotificationService.sendNotification(player, "Риск", "Вас уличили в мошенничестве, замять дело 20000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(12000);
    NotificationService.sendNotification(player, "Риск", "Вложения в рекламу принесли доход 12000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(5000);
    NotificationService.sendNotification(player, "Риск", "Прибыль 5000");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.addItem(PlayerItems.sequrityCard);
    NotificationService.sendNotification(player, "Риск", "Ваше предприятие взято под охрану милиции");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.changeBallance(15000);
    NotificationService.sendNotification(player, "Риск", "Банк ошибся в вашу пользу 15000");
  }),
  new CardEvent((player: Player, field: Field) => {
    field.removeRandomProperty(player, 1);
    NotificationService.sendNotification(player, "Риск", "Сгорел один из ваших фелиалов");
  })
];

var racketArr = [
  new CardEvent((player: Player, field: Field) => {
    player.becomeRacketir(field.getLength() * 2);
    NotificationService.sendNotification(player, "Рэкет", "Желаете заняться рэкетом?");
  })
];

var sleepArr = [
  new CardEvent((player: Player, field: Field) => {
    player.setRest();
    NotificationService.sendNotification(player, "Лечение", "Вас положили в больницу");
  }),
  new CardEvent((player: Player, field: Field) => {
    player.setRest();
    NotificationService.sendNotification(player, "Отпус", "Отпуск на курортах краснодарского края");
  })
];

var taxArr = [
  new CardEvent((player: Player, field: Field) => {
    player.setTax();
    NotificationService.sendNotification(player, "Налоговая служба", "Вас вызвали в налоговую службу");
  })
]
