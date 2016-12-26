var field: Cell[] = [
  new EmptyStep("Start"), // start
  new FirmaCell(30000, [400, 1500, 5200, 11000], [900, 15000, 54000, 120000], "Гастроном", 21000),
  new FirmaCell(32000, [800, 1500, 6000, 13000], [900, 15000, 58000, 124000], "Кондитерский", 24000),
  new FirmaCell(34000, [300, 1600, 6100, 14000], [1000, 17000, 61500, 130000], "Хлебный", 26000),
  new Card(CardType.MAIL),
  new MoneyCell(-25000),
  new AreaCell(15000),
  new Card(CardType.SURPRIZE),
  new FirmaCell(40000, [500, 2000, 7000, 15000], [5300, 20000, 70000, 150000], "Фабрика\\nигрушек", 32000, true),
  new MoneyCell(15000),
  new FirmaCell(29000, [400, 1300, 5300, 11000], [3800, 14500, 52000, 111000], "Галантерея", 21000),
  new FirmaCell(30000, [400, 1500, 5500, 12000], [3900, 15000, 54000, 120000], "Детский мир", 22000),
  new FirmaCell(28000, [400, 1400, 5100, 10000], [3700, 14000, 50400, 110000], "ЦУМ", 20000),
  new Card(CardType.MAIL),
  new EmptyStep('Nothing'), // in
  new AreaCell(25000),
  new FirmaCell(14000, [300, 700, 2500, 5800], [1800, 7000, 25200, 56000], "Столовая", 25000),
  new FirmaCell(16000, [300, 800, 3000, 6500], [2200, 8000, 28800, 64000], "Кафе", 30000),
  new FirmaCell(18000, [300, 900, 3300, 7500], [2300, 9000, 32000, 72000], "Ресторан", 35000),
  new FirmaCell(58000, [700, 2800, 9000, 21000], [7000, 29000, 104000, 230000], "Консвервный\\nкомбинат", 50000, true),
  new Card(CardType.SURPRIZE),
  new Card(CardType.RACKET),
  new FirmaCell(41000, [500, 2000, 7000, 16000], [5000, 20000, 73500, 162000], "Ларёк", 35000),
  new FirmaCell(49000, [600, 2500, 8700, 19500], [6400, 25000, 88500, 195000], "Овощной\\nмагазин", 42000),
  new FirmaCell(48000, [600, 2400, 8600, 18000], [6200, 24000, 86000, 180000], "Рынок", 40000),
  new MoneyCell(40000),
  new FirmaCell(80000, [1000, 4000, 12000, 30000], [10000, 40000, 130000, 310000], "Совхоз", 60000, true),
  new Card(CardType.MAIL),
  new AreaCell(20000),
  new Card(CardType.RACKET),
  new FirmaCell(15000, [300, 700, 1500, 6000], [1900, 7600, 15200, 60000], "Спартак", 15000),
  new FirmaCell(18000, [300, 700, 1500, 6000], [2300, 9000, 32000, 72000], "Торпедо", 15000),
  new FirmaCell(20000, [300, 1000, 3600, 7800], [2600, 10000, 36000, 78000], "Лужники", 20000),
  new Card(CardType.SLEEP),
  new Card(CardType.RISK),
  new EmptyStep('nothing'), // in
  new FirmaCell(31000, [400, 1500, 5600, 12400], [4000, 15500, 55800, 124000], "Концертный\\nзал", 26000),
  new FirmaCell(29000, [300, 1500, 5200, 11600], [3700, 14500, 52000, 116000], "Дворец\\nспорта", 24000),
  new FirmaCell(30000, [400, 1500, 5400, 12000], [3900, 15000, 54000, 120000], "СК\\nОлимпийский", 25000),
  new EmptyStep('nothing'), // comin
  new Card(CardType.RACKET),
  new Card(CardType.SURPRIZE),
  new MoneyCell(11000),
  new FirmaCell(48000, [700, 2400, 8600, 20000], [6200, 24000, 86400, 192000], "Кондитерская\\nфабрика", 40000, true),
  new FirmaCell(13000, [300, 700, 2400, 5600],  [1600, 7500, 23500, 52000], "Театр кукол", 10000),
  new FirmaCell(19000, [300, 1000, 3500, 7500], [2400, 10000, 34000, 76000], "Тюз", 16000),
  new FirmaCell(18000, [300, 900, 3200, 8000],  [2600, 9000, 32400, 72000], "Театр оперы\\nи балета", 15000),
  new AreaCell(12000),
  new Card(CardType.MAIL),
  new Card(CardType.TAX),
  new FirmaCell(40000, [500, 2000, 7200, 16000], [5200, 20000, 72000, 150000], "Институт\\nкультуры", 35000, true),
  new EmptyStep('nothing'), // in
  new Card(CardType.RACKET),
  new MoneyCell(14000),
  new FirmaCell(46000, [900, 2400, 8100, 19000], [5900, 23000, 82500, 184000], "Овощесклад", 35000),
  new FirmaCell(49000, [600, 2400, 8700, 19500], [6300, 24000, 88000, 196000], "Пром. база", 38000),
  new FirmaCell(52000, [600, 2500, 9300, 21000], [6600, 26000, 93600, 208000], "Прод. база", 40000),
  new Card(CardType.RISK),
  new FirmaCell(49000, [600, 2300, 8900, 19500], [6300, 24000, 88200, 190000], "Обувная\\nфабрика", 45000, true),
  new Card(CardType.MAIL),
  new AreaCell(60000),
  new Card(CardType.SLEEP)
];