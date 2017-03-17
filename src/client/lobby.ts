module Client {
  export interface PlayersList {
    length: number;
    sockets: {[key:string]: boolean};
  }

  export class Lobby {
    private static players: { [key:string]: JQuery};
    private static lobbyDiv: JQuery;
    private static lobbyId: string;

    public static init(lobbyDiv: JQuery) {
      Lobby.players = {};
      Lobby.lobbyDiv = lobbyDiv;
    }

    public static createLobby() {
      socket.on('lobby_created', (lobbyId) => {
        Lobby.lobbyId = lobbyId;
        Lobby.joinLobby(lobbyId);
        // FIXME
        console.log('lobby created', lobbyId);
      });
      socket.emit('create_room');
    }

    public static joinLobby(roomId: string) {
      Lobby.clear();
      Lobby.lobbyId = roomId;
      // TODO get players list
      // while(players) { addPlayer(); }
      socket.on('new_player', (id) => {
        Lobby.addPlayer(id);
      });
      socket.on('remove_player', (id) => {
        Lobby.removePlayer(id);
      })
      socket.on('room_deleted', () => {
         App.State = AppStates.MENU;
        Lobby.removeRoom();
      });
      socket.on('left_room', (id) => {
        console.log('left_room');
        Lobby.removePlayer(id);
      });
      Lobby.PlayerList.then((res: PlayersList) => {
        for(var i in res.sockets) {
          Lobby.addPlayer(i);
        }
        Utils.appendMainMenuButton(Lobby.lobbyDiv, () => {
          Lobby.removeRoom();
        });
      });
    }

    private static removePlayer(name: string) {
      if (!Lobby.players[name]) {
        throw new Error("Player not found in lobby!");
      }

      $(Lobby.lobbyDiv).children(`[name*=${name}]`).each((index: number, elem: Element) => {
        delete Lobby.players[name];
        $(elem).remove();
      });
      // for(var key in Lobby.lobbyDiv.children) {
      //   console.log('1',Lobby.lobbyDiv.children[key]);
      //   if(Lobby.lobbyDiv.children[key].getAttribute('name') === name) {
      //     Lobby.lobbyDiv.removeChild(Lobby.lobbyDiv.children[key]);
      //     break;
      //   }
      // }
    }
    private static addPlayer(name: string) {
      if (Lobby.players[name]) {
        return;
        // throw new Error("Player already in lobby!");
      }
      Lobby.lobbyDiv.prepend(`<div id="player_${name}">${name}</div>`);
      var player = $(`#player_${name}`);
      player.html(`${socket.id === name? "Вы" :"Игрок"}: ${name}`);
      player.attr('name', name);

      Lobby.players[name] = player;
    }

    private static get PlayerList(): Promise<any> {
      var resolver;
      var result = new Promise<string[]>((res,rej) => {resolver = res});
      Utils.httpGetAsyncJson('/room/'+ Lobby.lobbyId, (res) => {
        resolver(res);
      });
      return result;
    }

    private static removeRoom() {
      App.State = AppStates.MENU;
      Lobby.clear();
      socket.emit('leave_room', Lobby.lobbyId);
    }

    private static clear() {
      socket.off('new_player');
      socket.off('remove_player');
      socket.off('lobby_created');

      Lobby.lobbyDiv.html(``);
      Lobby.players = {};
    }
  }
}
