/*********Funciones testeo***********/
//Actualización en tiempo real del valor del bitcoin

//import { servicioWeb } from "./http.js";
import { servicioWebSocket } from "./websocket_promise.js";
//import { pintar } from "./pintar.js";
//import { utilidades } from "./utilidades.js";

//let sw = new servicioWeb.ServicioWeb();
let sws = new servicioWebSocket.ServicioWebSocket();

let precioActualizado = (data, ws) => {
  console.log(`ha llegado un mensaje ${data}`);
  let jsonData = JSON.parse(data);
  $("#"+jsonData.symbol).text(jsonData.lastPrice + "$");
}
/* cion callback y sin promesas
sws.coin('BTCUSDT', () => {}, precioActualizado);
sws.coin('ETHBTC', () => {}, precioActualizado);
sws.coin('LTCBTC', () => {}, precioActualizado);
*/

/*con promesas
sws.coin('BTCUSDT',precioActualizado).then((ws)=>{
  console.log('conexión establecida');
}
).catch((err)=>{
  console.log(`Error en la conexión ${err}`);
})

sws.coin('LTCBTC',precioActualizado).then((ws)=>{
  console.log('conexión establecida');
}
).catch((err)=>{
  console.log(`Error en la conexión ${err}`);
})

sws.coin('ETHBTC',precioActualizado).then((ws)=>{
  console.log('conexión establecida');
}
).catch((err)=>{
  console.log(`Error en la conexión ${err}`);
})
*/

async function suscripcionmoneda(moneda){
  try{
let ws = await sws.coin(moneda,precioActualizado);
console.log('conexión establecida');
  }
  catch(err){
    console.log(`Error en la conexión ${err}`);
  }
}

suscripcionmoneda('LTCBTC');
suscripcionmoneda('BTCUSDT');
suscripcionmoneda('ETHBTC');
console.log('Finalizado');