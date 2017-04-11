import {Game} from "./models/game";
import {Client} from "./client";
import {Lobby} from "./lobby";
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as socket from 'socket.io';

/* set gloval values */
var playerPool: string[] = [];

/* get config */
var conf = JSON.parse(fs.readFileSync('config/config.json', 'utf8'));

/* Create server */
export var app = express();
/* routing  */
app.get('/', (req:express.Request, res:express.Response) => {
  res.status(200).sendFile(path.resolve(__dirname + '/../client/index.html'));
});
app.use(express.static("built/client"));
app.use(express.static("node_modules/svgjs/dist"));
app.use(express.static("node_modules/jquery/dist"));
app.use(express.static("public"));

// get sockets in room
app.get('/room/:room', (req, res) => {
  res.json(io.sockets.adapter.rooms[req.params.room]);
});

// get room list
app.get('/rooms', (req, res) => {
  var result = [];
  for(var key in Lobby.rooms) {
    result.push(key);
  }
  res.json(result);
});

/* start server */
const server = app.listen(conf.port, conf.host, () => {
  var address = server.address().address;
  var port = server.address().port;
  console.log(`Listening on http://localhost:${port}\nAdress ${address}`);
});
/*set sockets */
export var io: SocketIO.Server = socket(server);
var clients: Client[] = [];
// get players in room

io.on('connection', (socket: SocketIO.Socket) => {
  console.log('a user connected', socket.client.id);
  clients.push(new Client(socket));
  // io.sockets.in('').clients((error,clients) => {});
});

export var Games: {[key:string]: Game} = {};
