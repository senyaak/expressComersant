/// <reference path="../../typings/index.d.ts"/>
/// <reference path="./field.ts"/>
var socket = io();
socket.emit('test', 'test value');

socket.on('startGame', (val1,val2,val3) => {
  field
  console.log(val1,val2,val3);
});
