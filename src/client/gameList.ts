module Client {
  export class GameList {
    private static chosenRoom: string;
    private static gameListDiv: JQuery;
    public static get ChosenRoom(): string {
      return GameList.chosenRoom;
    }
    public static init(gameList: JQuery) {
      GameList.gameListDiv = gameList;
    }

    public static showRooms() {
      GameList.clear();
      socket.on('new_room', (roomName) => {
        GameList.AddRoom(roomName);
      });
      GameList.Rooms.then((res) => {
        res.forEach((roomName) => {
          GameList.AddRoom(roomName);
        });
        Utils.appendMainMenuButton(GameList.gameListDiv);
      });
    }

    private static AddRoom(roomName) {
      GameList.gameListDiv.append(`<div id="room_${roomName}"></div>`);
      var newRoom = $(`#room_${roomName}`);
      newRoom.html(`${roomName}`);
      newRoom.attr('name', roomName);
      newRoom.click(() => {
        GameList.chosenRoom = roomName;
        socket.emit('join_room', roomName);
        App.State = AppStates.JOIN_LOBBY;
      });
    }

    private static get Rooms(): Promise<string[]> {
      var resolver;
      var result = new Promise<string[]>((res, rej) => {
        resolver = res;
      });
      Utils.httpGetAsyncJson('/rooms', (res) => {
        resolver(res);
      });
      return result;
    }

    public static clear() {
      socket.off('new_room');
      GameList.gameListDiv.html('');
    }
  }
}
