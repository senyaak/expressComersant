import {io} from "./app";
import {Lobby} from "./lobby";
import {Game} from "./models/game";
export enum ClientState {
  INACTIVE, LOBBY, IN_GAME
}

export class Client {
  private socket: SocketIO.Socket;
  private state: ClientState;
  private lobbyId: string;
  private game: Game;

  public set State(state: ClientState) {
    this.state = state;
  };
  public get State(): ClientState {
    return this.state;
  }

  constructor(socket: SocketIO.Socket) {
    this.socket = socket;
    this.State = ClientState.INACTIVE

    socket.on('disconnect', () => {
      /// leave lobby if joined
      if (this.Lobby) {
        this.Lobby.RemovePlayer(socket);
      }

      if (this.game) {
        this.game.destroy();
      }
    });

    socket.on('join_room', (id) => {
      // if already in lobby do nothing
      if (!this.Lobby) {
        if (id === null) {
          var lobby =  new Lobby(id);
          this.lobbyId = lobby.ID;
          Lobby.lobbies[this.lobbyId] = lobby;
        } else {
          this.lobbyId = id;
        }

        this.Lobby.AddPlayer(socket);
        this.State = ClientState.LOBBY;
        this.Lobby.InitReadyEvent(socket, this);
        socket.on('leave_room', () => {
          // if in lobby, leave
          if (this.Lobby) {
            this.Lobby.RemovePlayer(socket);
            this.State = ClientState.INACTIVE;
          }
        });
      }
    });
  }

  private get Lobby() {
    return Lobby.lobbies[this.lobbyId];
  }
}
