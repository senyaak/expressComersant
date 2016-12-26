/// <reference path="../../typings/index.d.ts"/>
/// <reference path="./field.ts"/>

var socket = io();
socket.emit('test', 'test value');

socket.on('startGame', (val1,val2,val3) => {
  /*create field*/
  var mainSvg: svgjs.Element = SVG('game').size(
    9000,//window.innerWidth, 
    window.innerHeight
  );
  var mainGroup = mainSvg.group();

  field.forEach((f,i) => {
    f.createElement(mainGroup, i);
  });
  console.log(val1,val2,val3);
});
