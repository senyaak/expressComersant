import {app, io} from "./app";

var LOBBY_PREFIX: string = "lobby_";

export class Lobby {
  public static rooms: {[key:string]: string[]} = {};
  private static lastIndex: number = 0;

  private id: number;
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
      console.log(Lobby.rooms[this.ID], this.ID);
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

  }
}
