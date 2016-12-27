function initMoveByClick(mainGroup: svgjs.Element) {
  var mouseX;
  var mouseY;

  window.document.body.onmousedown =  (e) => {
    console.log("START", e.pageX, e.pageY)
    mouseX = e.pageX;
    mouseY = e.pageY;
    onmousemove = (e) => {
      console.log('onmousemove', e.which);
      /* TODO DETECT MOUSE LEAVE */
      if (e.which === 0) {
        onmouseup(e);
      } else {
        mainGroup.transform({x: mainGroup.transform().x - (mouseX - e.pageX)});
        mainGroup.transform({y: mainGroup.transform().y - (mouseY - e.pageY)});
        mouseX = e.pageX;
        mouseY = e.pageY;
      }
    };
  };
  var onmouseup =  (e) => {
    console.log("STOP")
    onmousemove = null;
  };
  window.document.body.onmouseup = onmouseup;
}
