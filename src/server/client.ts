import {io} from "./app";
import {Lobby} from "./lobby";
enum ClientState {
  INACTIVE, LOBBY, IN_GAME
}

export class Client {
  private socket: SocketIO.Socket;
  private state: ClientState;
  private lobby: Lobby;
  private set State(state: ClientState) {
    this.state = state;
  };
  constructor(socket: SocketIO.Socket) {
    this.socket = socket;
    this.State = ClientState.INACTIVE

    socket.on('disconnect', () => {
      /// leave lobby if joined
      if (this.lobby) {
        this.lobby.RemovePlayer(socket);
      }
    });

    socket.on('join_room', (id) => {
      // if already in lobby do nothing
      if (this.lobby) {
        return;
      }
      this.lobby = new Lobby(id)
      this.lobby.AddPlayer(socket);
      this.State = ClientState.LOBBY;
      socket.on('leave_room', () => {
        // if in lobby, leave
        if (this.lobby) {
          this.lobby.RemovePlayer(socket);
          delete this.lobby;
          this.State = ClientState.INACTIVE;
        }
      });
    });


  }
}
