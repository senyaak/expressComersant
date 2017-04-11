module Utils {
  export function withThousandSeparateDots(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  export function httpGetAsyncJson(theUrl, callback): any {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        callback(JSON.parse(xmlHttp.responseText));
      }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }

  export function appendMainMenuButton(container: JQuery, callback?: Function) {
    // button.setAttribute('i', 'mainM');
    container.append(`<button class="exit_btn">Выход</button>`);
    $(container).find(`.exit_btn`).click(() => {
      Client.App.State = Client.AppStates.MENU;
      if(typeof callback == 'function') {
        callback();
      }
    });
  }

  var SUCCESS_COLOR: string= "green";
  var ERROR_COLOR: string = "red";

  export function appendReadyButton(container: JQuery, socket: SocketIOClient.Socket, state: {isReady: boolean}) {
    container.append(`<div class="setReadyState">Ready!</div>`);
    var element = $('.setReadyState');
    state.isReady = false;
    var toggle = () => {
      if (state.isReady = !state.isReady) {
        socket.emit('ready');
        element.text("Ready!");
        element.css("color", SUCCESS_COLOR);
      } else {
        socket.emit('not_ready');
        element.text("Not Ready!");
        element.css("color", ERROR_COLOR);
      }
    };
    element.text("Not Ready!");
    element.css("color", ERROR_COLOR);

    element.click(toggle);
  }
}
