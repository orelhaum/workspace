/***************dominio y rutas*******/
//coins
const urlCoin = `${domain_ws}/coin`;
//chat
const urlChat = `${domain_ws}/chat/:user`;

class Ws {
  constructor() {}
  open(url, primerMensaje, callbackConexionEstablecida, callbackMensajeEntrante, postWebsocket) {
    if (WebSocket) {

      // Abrir websocket
      let ws = new WebSocket(url);

      // Cuando la conexión se abre
      ws.onopen = function () {
        // Se envía el mensaje
        ws.send(primerMensaje);
        callbackConexionEstablecida(ws);
      };

      // Cuando se recibe un mensaje
      ws.onmessage = function (evt) {

        // evt.data es el dato recibido
        postWebsocket(evt.data, ws, callbackMensajeEntrante)
      };

      // Cuando se cierra la conexión
      ws.onclose = function () {

        // websocket es cerrado
        console.log("Conexión cerrada...");
      };
    } else {
      console.log("WebSocket no es soportado por el navegador");
    }
  }

}


class ServicioWebSocket extends Ws {
  constructor() {
    super();
  }

  preWebsocket(url, token, callbackConexionEstablecida, callbackMensajeEntrante) {
    this.open(url, token, callbackConexionEstablecida, callbackMensajeEntrante, this.postWebsocket);
  }

  postWebsocket(jsonData, ws, callbackMensajeEntrante) {
    callbackMensajeEntrante(jsonData, ws);
  }

  coin(coin, callbackConexionEstablecida, callbackMensajeEntrante) {
    this.preWebsocket(urlCoin, coin, callbackConexionEstablecida, callbackMensajeEntrante);
  }
  
  chat(username, callbackConexionEstablecida, callbackMensajeEntrante) {
    let url = urlChat.replace(":user", username);
    this.preWebsocket(url, objetoAutenticacion.token, callbackConexionEstablecida, callbackMensajeEntrante);
  }

}

export const servicioWebSocket = { ServicioWebSocket }
