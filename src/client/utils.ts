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
}
