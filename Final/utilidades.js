//reloj (hh:mm:ss)
let fecha = new Date();

function obtenerFecha() {
  //let fecha= new Date(); muy costoso computanocioalmente así que mejor ir sumando 1 segundo cada vez.
  fecha.setTime(fecha.getTime() + 1000);
  let minutos = (fecha.getMinutes() < 10) ? "0" + fecha.getMinutes() : fecha.getMinutes();
  let segundos = (fecha.getSeconds() < 10) ? "0" + fecha.getSeconds() : fecha.getSeconds();
  let fechaFormateada = `${fecha.getHours()}:${minutos}:${segundos}`
  return fechaFormateada;
}

function limpiarMonedas(monedas) {
  let monedasLimpias = [];
  for (let moneda of monedas) {
    if (moneda.indexOf('BTC') !=-1) {
      monedasLimpias.push(moneda);
    }
  }
  return monedasLimpias.sort();
}

function ordenarArrayDeObjeto(datosParaPintar,atributoDeOrdenacion){
  return datosParaPintar.sort((a,b) =>{
    if (a[atributoDeOrdenacion] < b[atributoDeOrdenacion])
      return -1;
    if (a[atributoDeOrdenacion] > b[atributoDeOrdenacion])
      return 1;
    return 0;
  });
}

function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}


export let utilidades = {fecha,obtenerFecha,limpiarMonedas,ordenarArrayDeObjeto,removeOptions}