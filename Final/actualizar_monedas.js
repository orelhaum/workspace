
import { servicioWeb } from "./http.js";
//import { servicioWebSocket } from "./websocket.js";
import { utilidades } from "./utilidades.js";

let sw = new servicioWeb.ServicioWeb();


function actualizarMonedas(){
  console.log('Actualizo Moneda');
  sw.coins((err,monedas) => {
    //Primero me quedo sólo con las monedas que estén relacionadas con el BTC
    let monedasOrdenadas = utilidades.limpiarMonedas(monedas);

    //Aquí ya tenemos las monedas relacionadas con el bitcoin
        // Envía un mensaje al hilo principal (script del archivo index.html)
    sessionStorage.setItem("monedas", monedasOrdenadas);

    let contador=0;

    for (let moneda of monedasOrdenadas) {
      //console.log(moneda);
      sw.market(moneda, (err,data) => {
                //recibimos los datos en un array de objetos pero de una sola posicion data[0]
        //moneda es igual a data[0].symbol
        //console.log(data[0]);
        sessionStorage.setItem(moneda,JSON.stringify(data[0]));
        /*contador++;
        console.log(contador);
        if (contador == monedasOrdenadas.length){
          console.log('finalizado');
          pintarMonedas();
        }*/

      },true)
    }

  },true);
}

//programamos para que llame cada 30 segundos
setInterval(actualizarMonedas,30000)