/// <reference path="./ts/game.ts"/>
import Game from "./ts/game";

import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

/* get config */
var conf = JSON.parse(fs.readFileSync('config/config.json', 'utf8'));
/* Test Class Game */
var game = new Game(2);

game.startGame();
var i = 100;
while(i-- > 80) {
  if(game.getCurrStep() === 1) {
    console.log('Start turn');
  }
  console.log(game.getPlayerInfo());
  let currStep = game.getCurrStep();
  game.nextAction(game.getCurrPlayerId());
  if(game.getCurrStep() === 2) {
    game.purchaseProp();
  }
}

/* Create server */
var app = express();
/* test connections */
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('somebody connected');
  next();
});
/* routing  */
app.get('/', (req:express.Request, res:express.Response) => {
  res.status(200).sendFile(path.resolve(__dirname + '/../client/index.html'));
})
app.use(express.static("built/client"));
app.use('/superagent', express.static("node_modules/superagent"));

/* start server */
const server = app.listen(conf.port, conf.host, () => {
  var address = server.address().address;
  var port = server.address().port;
  console.log(`Listening on http://localhost:${port}\nAdress ${address}`);
});
