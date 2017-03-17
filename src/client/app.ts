enum AppStates {
  MENU,
  LOBBY,
  JOIN_LOBBY,
  GAME_LIST ,
  GAME
}


class App {
  private static mainMenu: JQuery;
  private static lobby: JQuery;
  private static gameList: JQuery;
  private static game: JQuery;

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
    mainMenu: JQuery,
    gameList: JQuery,
    lobby: JQuery,
    game: JQuery
  ): void {
    //===========menu========//
    App.mainMenu = mainMenu;
    mainMenu.find('#createGame').on('click', () => {
      App.State = AppStates.LOBBY;
    });
    mainMenu.find('#findGame').on('click', () => {
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
    App.mainMenu.attr('style', 'display: none;');
    App.lobby.attr('style', 'display: none;');
    App.gameList.attr('style', 'display: none;');
    App.game.attr('style', 'display: none;');
  }

  public static showMenu() {
    App.mainMenu.attr('style', 'display: block;');
  }

  public static showGameList() {
    App.gameList.attr('style', 'display: block;');
    GameList.showRooms();
  }

  public static showLobby(roomId?: string) {
    App.lobby.attr('style', 'display: block;');
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
