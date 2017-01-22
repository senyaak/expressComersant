class GameList {
  private static chosenRoom: string;
  private static gameListDiv: HTMLElement;
  public static get ChosenRoom(): string {
    return GameList.chosenRoom;
  }
  public static init(gameList: HTMLElement) {
    GameList.gameListDiv = gameList;
  }

  public static showRooms() {
    GameList.clear();
    console.log('showRooms');
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
    var newRoom = document.createElement('DIV');
    newRoom.textContent = `${roomName}`;
    newRoom.setAttribute('name', roomName);
    GameList.gameListDiv.appendChild(newRoom);
    newRoom.onclick = () => {
      console.log('JOIN ROOM', roomName)
      GameList.chosenRoom = roomName;
      socket.emit('join_room', roomName);
      App.State = AppStates.JOIN_LOBBY;
    };
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
    while(GameList.gameListDiv.firstChild) {
      GameList.gameListDiv.removeChild(GameList.gameListDiv.firstChild);
    }
  }
}
