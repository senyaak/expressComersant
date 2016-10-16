/// <reference path="./ts/game.ts"/>
import * as express from 'express';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import Game from "./ts/game";

/* get config */
var conf = JSON.parse(fs.readFileSync('config/config.json', 'utf8'));


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
