/*********************************************/
const objetoAutenticacion = {
  username: "ramiro",
  token: "75d8bb9dbf12be694bcb71e85960c313c28f61d896c9dbd4db729e9c4edbef91713ba24c4aa4bdfb"
}

/***************dominio y rutas*******/

//const domain = "ws://107.191.108.165:8086";
const domain = "ws://192.168.1.72:8086";

//coins
const urlCoin = `${domain}/coin`;
//chat
const urlChat = `${domain}/chat/:user`;



/******** Funciones PRE-WEBSOCKET Y POST-WEBSOCKET *********/
/*******PRE-WEBSOCKET*******/
function preWebsocket(url, token, callbackConexionEstablecida, callbackMensajeEntrante) {
  websocket(url, token, callbackConexionEstablecida, callbackMensajeEntrante);
}
/*******PRE-WEBSOCKET*******/

/*******POST-WEBSOCKET*******/
function postWebsocket(jsonData, ws,callbackMensajeEntrante) {
  callbackMensajeEntrante(jsonData,ws);
}
/*******POST-WEBSOCKET*******/

/******** Funciones PRE-WEBSOCKET Y POST-WEBSOCKET *********/


/****** WEBSOCKET función que realiza la petición al servidor*****/
function websocket(url, primerMensaje,callbackConexionEstablecida, callbackMensajeEntrante) {
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
      postWebsocket(evt.data,ws,callbackMensajeEntrante)
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
/*********WEBSOCKET******** */

/*********Funciones específicas de websocket*********/
function coin(coin,callbackConexionEstablecida, callbackMensajeEntrante) {
  preWebsocket( urlCoin,coin ,callbackConexionEstablecida, callbackMensajeEntrante);
}

function chat(username,callbackConexionEstablecida, callbackMensajeEntrante) {
  let url = urlChat.replace(":user", username);
  preWebsocket( url,objetoAutenticacion.token ,callbackConexionEstablecida, callbackMensajeEntrante);
}
/*********Funciones específicas de websocket*********/