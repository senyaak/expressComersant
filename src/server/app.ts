import {Game} from "./ts/game";

import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as socket from 'socket.io';

/* set gloval values */
var playerPool: string[] = [];

/* get config */
var conf = JSON.parse(fs.readFileSync('config/config.json', 'utf8'));

/* Create server */
var app = express();
/* test connections */
// app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
//   console.log('somebody connected');
//   next();
// });
/* routing  */
app.get('/', (req:express.Request, res:express.Response) => {
  res.status(200).sendFile(path.resolve(__dirname + '/../client/index.html'));
})
app.use(express.static("built/client"));
app.use(express.static("node_modules/svgjs/dist"));
app.use(express.static("public"));
/* start server */
const server = app.listen(conf.port, conf.host, () => {
  var address = server.address().address;
  var port = server.address().port;
  console.log(`Listening on http://localhost:${port}\nAdress ${address}`);
});
/*set sockets */
var io: SocketIO.Server = socket(server);

io.on('connection', (socket: SocketIO.Socket) => {
  console.log('a user connected', socket.client.id);

  // io.sockets.in('').clients((error,clients) => {});

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.client.id);
    /// remove room
    if(io.sockets.adapter.rooms['Player_Game_'+socket.client.id] !== undefined) {
      io.sockets.in('Player_Game_'+socket.client.id).clients((err, clients) => {
        clients.forEach(id => {
          io.sockets.connected[id].leave('Player_Game_'+socket.client.id);
        });
      });
    }
  });

  socket.on('createLobby', () => {
    if(io.sockets.adapter.rooms['Player_Game_'+socket.client.id] === undefined) {
      socket.join('Player_Game_'+socket.client.id);
      socket.emit('lobby_created');
    } else {
      socket.emit('lobby_created', 'ALREADY EXIST');
    }
  });
  socket.on('getRoomList', () => {
    // TODO storage rooms in global array
    var rooms = [];
    for(var roomName in io.sockets.adapter.rooms) {
      if(roomName.indexOf('Player_Game_') === 0) {
        rooms.push(rooms);
      }
    }
  });
  // /* if we have 2 player start game */
  // if(playerPool.length == 2) {
  //   var game = new Game(playerPool);
  //   io.sockets.emit('startGame', playerPool.join(""));
  //   game.GameId = playerPool.join("");
  //   console.log(playerPool);
  // }
  // socket.on('leaveLobby', (gameId: string) => {
  //   console.log('leaveLobby', playerPool, playerPool.indexOf(socket.client.id) !== -1 && gameId.indexOf(socket.client.id) !== -1 )
  //   if(playerPool.indexOf(socket.client.id) !== -1 && gameId.indexOf(socket.client.id) !== -1 ) {
  //     playerPool.splice(playerPool.indexOf(socket.client.id), 1);
  //     socket.join(gameId);
  //   }
  // });
  // socket.on('nextStep', () => {
  //   if(socket.client.id == game.getCurrPlayerId()) {
  //     console.log('PLAYER ACTION');
  //     game.nextAction(socket.client.id);
  //     socket.emit('update', game.getPlayerInfo(), game.getCurrPlayerNumber());
  //   } else {
  //     console.log('PLAYER WRONG ACTION');
  //   }
  // });
});
