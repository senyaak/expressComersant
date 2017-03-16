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
});
app.use(express.static("built/client"));
app.use(express.static("node_modules/svgjs/dist"));
app.use(express.static("node_modules/jquery/dist"));
app.use(express.static("public"));

app.get('/room/:room', (req, res) => {
  // console.log(io.sockets.adapter.rooms[req.params.room]);
  // console.log(req.params.room);
  // console.log(io.sockets.adapter.rooms);
  // io.sockets.adapter.rooms[req.params.room];
  res.json(io.sockets.adapter.rooms[req.params.room]);
});

app.get('/rooms', (req, res) => {
  // console.log(io.sockets.adapter.rooms[req.params.room]);
  // console.log(req.params.room);
  // console.log(io.sockets.adapter.rooms);
  // io.sockets.adapter.rooms[req.params.room];
  var list = [];
  for(var room in io.sockets.adapter.rooms) {
    if(room.indexOf('Player_Game_') !== -1) {
      list.push(room);
    }
  }
  res.json(list);
});





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

  socket.on('create_room', () => {
    if(io.sockets.adapter.rooms['Player_Game_'+socket.client.id] === undefined) {
      socket.join('Player_Game_'+socket.client.id);
      io.sockets.emit('new_room', 'Player_Game_'+socket.client.id);
      socket.emit('lobby_created', 'Player_Game_'+socket.client.id);
    } else {
      socket.emit('lobby_created', 'ALREADY EXIST');
    }
  });
  socket.on('leave_room', (id: string) => {
    socket.leave(id);
    if(id.replace('Player_Game_', '') === socket.client.id) {
      io.to(id).emit('room_deleted');
    } else {
      io.to(id).emit('left_room', socket.client.id);
    }
  });
  socket.on('join_room', (roomId: string) => {
    socket.join(roomId);
    io.to(roomId).emit('new_player', socket.id);
  })
  socket.on('getRoomList', () => {
    var rooms = [];
    for(var roomName in io.sockets.adapter.rooms) {
      if(roomName.indexOf('Player_Game_') === 0) {
        rooms.push(rooms);
      }
    }
  });
});
