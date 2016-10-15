/// <reference path="./ts/game.ts"/>
import * as express from 'express';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import Game from "./ts/game";
var conf = JSON.parse(fs.readFileSync('config/config.json', 'utf8'));

var game = new Game();
game.test();

var app = express();
app.use(express.static("built/client"));
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('somebody connected');
  next();
});
app.get('/', (req:express.Request, res:express.Response) => {
  res.status(200).sendFile(path.resolve(__dirname + '/../client/index.html'));
})
const server = app.listen(conf.port, conf.host, () => { // 3
  //  const {address, port} = server.address(); // 4
  var address = server.address().address;
  var port = server.address().port;
  console.log('Listening on http://localhost:' + port);
});
