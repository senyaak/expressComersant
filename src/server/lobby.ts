import {app, io} from "./app";
import {Client, ClientState} from "./client";

var LOBBY_PREFIX: string = "lobby_";

export class Lobby {
  public static rooms: {[key:string]: string[]} = {};
  private static lastIndex: number = 0;

  private id: number;
  private playersReady: string[];
  public get ID(): string {
    return LOBBY_PREFIX + this.id;
  }
  public AddPlayer(socket: SocketIO.Socket) {
    socket.join(this.ID);
    Lobby.rooms[this.ID].push(socket.id);
    io.to(this.ID).emit('new_player', socket.id);
  };

  public RemovePlayer(socket: SocketIO.Socket) {
    io.to(this.ID).emit('remove_player', socket.id);
    socket.leave(this.ID);

    var index = Lobby.rooms[this.ID].indexOf(socket.id);
    Lobby.rooms[this.ID].splice(index, 1);
    if(Lobby.rooms[this.ID].length === 0) {
      delete Lobby.rooms[this.ID];
      io.sockets.emit("remove_room", this.ID);
    }
  }

  constructor(id: string) {
    if(!id) {
      this.id = ++Lobby.lastIndex;
      Lobby.rooms[this.ID] = [];
      io.sockets.emit('new_room', this.ID);
    } else {
      this.id = parseInt(("" + id).replace(LOBBY_PREFIX, ""), 10);
    }
    this.playersReady = [];
  }

  public InitReadyEvent(socket: SocketIO.Socket, client: Client) {
    socket.on('ready', () => {
      if (client.State === ClientState.LOBBY && this.playersReady.indexOf(socket.id) === -1) {
        this.playersReady.push(socket.id);

        if(Lobby.rooms[this.ID].length === this.playersReady.length && this.playersReady.length > 1) {
          this.createGame();
        }
      }

    });

    socket.on('not_ready', () => {
      var playerIndex = this.playersReady.indexOf(socket.id);
      if (client.State === ClientState.LOBBY && playerIndex !== -1) {
        this.playersReady.splice(playerIndex, 1);
      }
    });
  }

  private createGame() {
    io.to(this.ID).emit("create_game", Lobby.rooms[this.ID]);
  }
}
