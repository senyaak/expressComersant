import {Game} from "./ts/game";

import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as socket from 'socket.io';

/* set gloval values */
var playerPool = [];

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

/* start server */
const server = app.listen(conf.port, conf.host, () => {
  var address = server.address().address;
  var port = server.address().port;
  console.log(`Listening on http://localhost:${port}\nAdress ${address}`);
});
/*set sockets */
var io: SocketIO.Server = socket(server);

io.on('connection', (socket: SocketIO.Socket) => {
  playerPool.push(socket.client.id);
  socket.on('disconnect', () => {
    /* remove player from pool by disconnect */
    playerPool.forEach((id: string, index: number) => {
      if(id === socket.client.id) {
        playerPool.splice(index, 1);
      };
    });
  });
  /* if we have 2 player start game */
  if(playerPool.length = 2) {
    var game = new Game(playerPool);
    socket.emit('startGame', "game started");
  }
  
});
