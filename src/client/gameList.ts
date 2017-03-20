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
      GameList.initListeners();
      GameList.Rooms.then((res) => {
        res.forEach((roomName) => {
          GameList.JoinRoom(roomName);
        });
        Utils.appendMainMenuButton(GameList.gameListDiv);
      });
    }

    private static JoinRoom(roomName) {
      GameList.gameListDiv.prepend(`<div id="room_${roomName}"></div>`);
      var newRoom = $(`#room_${roomName}`);
      newRoom.html(`${roomName}`);
      newRoom.attr('name', roomName);
      newRoom.click(() => {
        GameList.chosenRoom = roomName;
        App.State = AppStates.LOBBY;
      });
    }

    private static removeRoom(roomName) {
      $(`[name*=${roomName}]`).remove();
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

    private static initListeners() {
      socket.on("remove_room", (id) => {
        GameList.removeRoom(id);
      });
      socket.on('new_room', (roomName) => {
        GameList.JoinRoom(roomName);
      });
    }
    public static removeListeners() {
      socket.off("remove_lobby");
      socket.off('new_room');
    }
  }
}
