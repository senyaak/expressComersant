module Client {
  export interface PlayersList {
    length: number;
    sockets: {[key:string]: boolean};
  }

  export class Lobby {
    private static players: { [key:string]: JQuery};
    private static lobbyDiv: JQuery;
    private static lobbyId: string;

    public static isReady: boolean = false;

    public static init(lobbyDiv: JQuery) {
      Lobby.players = {};
      Lobby.lobbyDiv = lobbyDiv;
    }

    public static joinLobby(roomId: string = null) {
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
      socket.on('join_game', (playersCount, playerNumber) => {
        socket.off('new_player');
        socket.off('remove_player');
        socket.off('join_game');
        App.StartGame(playersCount, playerNumber);
      })


      Utils.appendMainMenuButton(Lobby.lobbyDiv, () => {
        Lobby.leaveRoom();
      });
      Utils.appendReadyButton(Lobby.lobbyDiv, socket, Lobby);
      if(roomId) {
        this.PlayerList.then((list) => {
          console.log(list)
          for(var key in list.sockets) {
            this.addPlayer(key);
          }
        });
      }
      socket.emit("join_room", roomId);
    }

    private static removePlayer(name: string) {
      if (!Lobby.players[name]) {
        throw new Error("Player not found in lobby!");
      }

      $(Lobby.lobbyDiv).children(`[name*=${name}]`).each((index: number, elem: Element) => {
        delete Lobby.players[name];
        $(elem).remove();
      });
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

    private static leaveRoom() {
      App.State = AppStates.MENU;
      Lobby.clear();
      socket.emit('leave_room', Lobby.lobbyId);
    }

    private static clear() {
      socket.off('new_player');
      socket.off('remove_player');

      Lobby.lobbyDiv.html(``);
      Lobby.players = {};
    }
  }
}
