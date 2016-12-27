enum AppStates {
  MENU,
  LOBBY,
  ROOM_LIST,
  GAME
}


class App {
  private static mainMenu: HTMLElement;
  private static lobby: HTMLElement;
  private static gameList: HTMLElement;
  private static game: HTMLElement;
  private static isReady: boolean;
  private static state: AppStates;

  public static set State(newState: AppStates) {
    App.hideAll();
    switch(newState) {
      case AppStates.MENU:
        App.showMenu();
        break;
      case AppStates.ROOM_LIST:

        break;
      case AppStates.LOBBY:
        break;
      case AppStates.GAME:
        break;
      default: throw new Error();
    }
    App.state = newState;
  }

  public static get State(): AppStates {
    return App.state;
  }

  public static initApp(
    mainMenu: HTMLElement,
    gameList: HTMLElement,
    lobby: HTMLElement,
    game: HTMLElement
  ): void {
    //menu//
    App.mainMenu = mainMenu;
    console.log(App.mainMenu);
    mainMenu.querySelector('#createGame').addEventListener('click', () => {
      App.createLobby();
    });
    //game list//
    App.gameList = gameList;
    //game//
    App.game = game;
    //lobby//
    App.lobby = lobby;

    App.isReady = true;

  }

  private static hideAll() {
    App.mainMenu.setAttribute('style', 'display: none;');
    App.lobby.setAttribute('style', 'display: none;');
    App.gameList.setAttribute('style', 'display: none;');
    App.game.setAttribute('style', 'display: none;');
  }

  public static showMenu() {
    App.mainMenu.setAttribute('style', 'display: block;');
  }

  public static showLobby(roomId?: string) {
    App.lobby.setAttribute('style', 'display: block;');
    if(roomId) {
      App.joinLobby(roomId);
    } else {
      App.createLobby();
    }
  }

  private static createLobby() {
    Lobby.create(App.lobby);
  }

  private static joinLobby(roomId: string) {

  }
}


class Lobby {
  private static players: { [key:string]: HTMLElement};
  private static lobbyDiv: HTMLElement;
  static create(lobbyDiv: HTMLElement) {
    socket.emit('createLobby');
    Lobby.players = {};
    Lobby.lobbyDiv = lobbyDiv;
    player.textContent = `Вы: ${socket.id}`;
    lobbyDiv.appendChild(player);
    Lobby.players[socket.id] = player;

  }

  static show() {
    var player = document.createElement('DIV');

  }

  static deinit() {
    while (Lobby.lobbyDiv.firstChild) {
      Lobby.lobbyDiv.removeChild(Lobby.lobbyDiv.firstChild);
    }

  }
}
