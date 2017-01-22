module Utils {
  export function withThousandSeparateDots(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  export function httpGetAsyncJson(theUrl, callback): any {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          console.log(xmlHttp.responseText);
          callback(JSON.parse(xmlHttp.responseText));
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }

  export function appendMainMenuButton(container: HTMLElement, callback?: Function) {
    var button = document.createElement('DIV');
    button.textContent = `Выход`;
    // button.setAttribute('i', 'mainM');
    container.appendChild(button);
    button.onclick = () => {
      console.log('JOIN ROOM');
      App.State = AppStates.MENU;
      if(typeof callback == 'function') {
        callback();
      }
    };

  }
}
