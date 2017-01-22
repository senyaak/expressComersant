/// <reference path="../../typings/index.d.ts"/>

var socket = io();

var game: Game;

socket.on('startGame', (gameId) => {
  game = new Game(gameId);
  socket.emit('leaveLobby', gameId, socket.id);
});

socket.on('lobby_created', (err) => {
  if(App.State === AppStates.LOBBY)
  console.log('Lobby created. Errors:' + err);
});

// init app class
window.onload = () => {
  App.initApp(
    document.getElementById('mainMenu'),
    document.getElementById('gameList'),
    document.getElementById('lobby'),
    document.getElementById('game')
  );
};
