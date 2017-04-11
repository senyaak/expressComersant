module Client {
  export enum AppStates {
    MENU,
    LOBBY,
    GAME_LIST ,
    GAME
  }


  export class App {
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
        case AppStates.LOBBY:
          if (App.state === AppStates.GAME_LIST) {
            App.showLobby(GameList.ChosenRoom);
          } else {
            App.showLobby(null);
          }
          break;
        case AppStates.GAME:
          App.game.attr('style', 'display: block;');
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
      Game.InitGame();

      // ======== done ===============//
      App.isReady = true;
      App.hideAll();
    }

    private static hideAll() {
      App.mainMenu.attr('style', 'display: none;');
      App.lobby.attr('style', 'display: none;');
      App.gameList.attr('style', 'display: none;');
      App.game.attr('style', 'display: none;');
      GameList.removeListeners();
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
      Lobby.joinLobby(roomId);
    }

    public static StartGame(playersCount: number, playerNumber: number) {
      App.State = AppStates.GAME;
      Game.StartGame(playersCount, playerNumber);
    }
  }
}
