enum AppStates {
  MENU,
  LOBBY,
  JOIN_LOBBY,
  GAME_LIST ,
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
      case AppStates.GAME_LIST:
        App.showGameList();
        break;
      case AppStates.JOIN_LOBBY:
        App.showLobby(GameList.ChosenRoom);
        break;
      case AppStates.LOBBY:
        App.showLobby();
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
    //===========menu========//
    App.mainMenu = mainMenu;
    mainMenu.querySelector('#createGame').addEventListener('click', () => {
      App.State = AppStates.LOBBY;
    });
    mainMenu.querySelector('#findGame').addEventListener('click', () => {
      App.State = AppStates.GAME_LIST;
    });
    //=============game list==============//
    App.gameList = gameList;
    GameList.init(App.gameList);
    //=============lobby==================//
    App.lobby = lobby;
    Lobby.init(App.lobby);
    //=============game===================//
    App.game = game;


    // ======== done ===============//
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

  public static showGameList() {
    App.gameList.setAttribute('style', 'display: block;');
    GameList.showRooms();
  }

  public static showLobby(roomId?: string) {
    App.lobby.setAttribute('style', 'display: block;');
    console.log('showLobby', roomId)
    if(roomId) {
      App.joinLobby(roomId);
    } else {
      App.createLobby();
    }
  }

  private static createLobby() {
    Lobby.createLobby();
  }

  private static joinLobby(roomId: string) {
    Lobby.joinLobby(roomId);
  }
}
