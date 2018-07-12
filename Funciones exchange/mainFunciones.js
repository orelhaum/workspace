let usuario1 = {		
  usuario: "Bob",
  realCash: 50000,
  fondos: {
    "BTCUSDT": 5.0
  },
  compras: [],
  ventas:[],
  enviados: [],
  recibidos: []
}

let usuario2 = {	
  usuario: "Alice",	
  realCash: 50000,
  fondos: {
    "BTCUSDT": 5.0
  },
  compras: [],
  ventas:[],
  enviados: [],
  recibidos: []
}

let monedaBTC = {
  symbol: "BTCUSDT",
  historico: [ {
    precioUltimo: 7200
  },
  {
    precioUltimo: 7000
  }]		
}

let monedaONJ = {
  symbol: "ONJBTC",
   
  historico: [ {
    precioUltimo: 0.02
  },
  {
    precioUltimo: 0.01
  }]		
}

let monedas = [monedaBTC, monedaONJ];

function ingresarDolares(usuario, dolares) {
  usuario.realCash = ("realCash" in usuario) ? usuario.realCash + dolares : dolares;
}

function ingresarFondos(usuario, monedaBTC, cantidadBTCAComprar) {
  let len = monedaBTC.historico.length;
  let precioBTC = monedaBTC.historico[len-1].precioUltimo;
  let total = precioBTC * cantidadBTCAComprar;
  if (usuario.realCash < total) {
    console.log("No hay suficiente cash")
    return false;
  }
  usuario.realCash -= total;
  let symbol = monedaBTC.symbol;
  usuario.fondos[symbol] = (symbol in usuario.fondos) ? usuario.fondos.BTC + cantidadBTCAComprar : cantidadBTCAComprar;
  return true;
}

function retirarFondos(usuario, monedaBTC, cantidadBTCAVender) {
  let len = monedaBTC.historico.length;
  let precioBTC = monedaBTC.historico[len-1].precioUltimo;
  let symbol = monedaBTC.symbol;
  if ((!symbol in usuario.fondos) || (cantidadBTCAVender > usuario.fondos[symbol])) {
    console.log("No hay suficiente bitcoins")
    return false;
  }
  let total = precioBTC * cantidadBTCAVender;
  usuario.realCash += total;
  usuario.fondos[symbol] -= cantidadBTCAVender;
  return true;
}

function obtenerPrecioBTC() {
  let len = monedaBTC.historico.length;
  return monedaBTC.historico[len-1].precioUltimo;
}

function obtenerPrecioUltimoMonedaBTC(monedas=[], symbolMoneda) {
  let lenMonedas = monedas.length;
  for (let i=0; i<lenMonedas; i++) {
    if (monedas[i].symbol === symbolMoneda) {
      let lenMoneda = monedas[i].historico.length;
      return monedas[i].historico[lenMoneda-1].precioUltimo; 
    }
  }
  return undefined;
}


function comprarMoneda(usuario, moneda, cantidad) {

  let precioMonedaEnBTC = obtenerPrecioUltimoMonedaBTC(monedas, moneda.symbol);
  let totalCompradoEnBTC = cantidad * precioMonedaEnBTC;

  // Comprobamos si hay suficiente cantidad de bitcoins para realizar la compra
  if (usuario.fondos[monedaBTC.symbol] < totalCompradoEnBTC) {
    console.log('No hay suficiente cantidad de bitcoins');
    return false;
  }

  // En este punto, ya estamos seguro que hay suficiente cantidad de bitcoins para comprar
  usuario.fondos[monedaBTC.symbol] -= totalCompradoEnBTC;
  usuario.fondos[moneda.symbol] = (moneda.symbol in usuario.fondos) ? usuario.fondos[moneda.symbol] + cantidad : cantidad;

  // Guardar la compra en el atributo de compras
  let compra = {
    moneda: moneda.symbol,
    cantidad: cantidad,
    precioMoneda: precioMonedaEnBTC,
    fecha: new Date()
  }
  usuario.compras.push(compra);
  return true;
}



function listarFondos(usuario, monedas) {

  for (let nombreMoneda in usuario.fondos) {
    let precioMonedaBTC = obtenerPrecioUltimoMonedaBTC(monedas, nombreMoneda);
    let cantidadDolares = usuario.fondos[nombreMoneda] * precioMonedaBTC;
    console.log(`${nombreMoneda}: ${usuario.fondos[nombreMoneda]} (${cantidadDolares}$)`);
  }
}

function venderMoneda(usuario,moneda,cantidad){
  let precioMonedaEnBTC = obtenerPrecioUltimoMonedaBTC(monedas, moneda.symbol);
  let totalVendidoEnBTC = cantidad * precioMonedaEnBTC;

    // Comprobamos si hay suficiente cantidad de monedas para realizar la venta
    if (cantidad>usuario.fondos[moneda.symbol] ) {
      console.log(`No hay suficiente cantidad de ${moneda.symbol}`);
      return false;
    }

  // En este punto, ya estamos seguro que hay suficiente cantidad de bitcoins para comprar
  usuario.fondos[monedaBTC.symbol] += totalVendidoEnBTC;
  usuario.fondos[moneda.symbol] -=cantidad;

  if(usuario.fondos[moneda.symbol]==0){
    delete usuario.fondos[moneda.symbol];
  }
  // Guardar la venta en el atributo de compras
  let venta = {
    moneda: moneda.symbol,
    cantidad: cantidad,
    precioMoneda: precioMonedaEnBTC,
    fecha: new Date()
  }
  usuario.ventas.push(venta);
  return true;
}

function listarCompras(usuario){
  for (let compra of usuario.compras){
    console.log(`Compras: ${compra.moneda},${compra.cantidad},${compra.precioMoneda},${compra.fecha}`)
  }
}

function listarVentas(usuario){
  for (let venta of usuario.ventas){
    console.log(`Ventas: ${venta.moneda},${venta.cantidad},${venta.precioMoneda},${venta.fecha}`)
  }
}


function enviarMensaje(usuarioEmisor,usuarioReceptor,mensajeTexto){

  let idMensaje=new Date().getTime();
  let fechaHora=new Date();

let mensajeEnviado = {
  id: idMensaje, //identificador del mensaje
  usuario: usuarioReceptor.usuario,
  fecha: fechaHora,
  mensaje: mensajeTexto
}

let mensajeRecibido = {
  id: idMensaje, //identificador del mensaje
  usuario: usuarioEmisor.usuario,
  fecha: fechaHora,
  mensaje: mensajeTexto
}

//actualziación del atributo enviados del usuario emisor
usuarioEmisor.enviados.push(mensajeEnviado);

//actualziación del atributo enviados del usuario receptor
usuarioReceptor.recibidos.push(mensajeRecibido);

return idMensaje;
}

function borrarMensajeEnviado(usuario,idMensaje){

  let posicionElementoABorrar = -1;
  let len =usuario.enviados.length;

  //recorro todos los mendajes enviados
  let i=0;

  while((posicionElementoABorrar==-1) && (i < len)){

    posicionElementoABorrar = (usuario.enviados[i].id === idMensaje) ? i : -1;
    i++;
  }

  //borro el mensaje encontrado
  if (posicionElementoABorrar!= -1){
    usuario.enviados.splice(posicionElementoABorrar,1);
    return true;
  }

return false;
}

function borrarMensajeRecibido(usuario,idMensaje){

  let posicionElementoABorrar = -1;
  let len =usuario.recibidos.length;

  //recorro todos los mendajes enviados
  let i=0;

  while((posicionElementoABorrar==-1) && (i < len)){

    posicionElementoABorrar = (usuario.recibidos[i].id === idMensaje) ? i : -1;
    i++;
  }

  //borro el mensaje encontrado
  if (posicionElementoABorrar!= -1){
    usuario.recibidos.splice(posicionElementoABorrar,1);
    return true;
  }

return false;
}

function listarMensajesRecibidos(usuario){
  console.log(`Se van a mostrar los mensajes recibidos(${usuario.recibidos.length})`)
  for (let recibido of usuario.recibidos){
    console.log(`id: ${recibido.id},Usuario emisor:${recibido.usuario},Fecha recepción:${recibido.fecha},Mensaje: ${recibido.mensaje}`)
  }
}

function listarMensajesEnviados(usuario){
  console.log(`Se van a mostrar los mensajes enviados(${usuario.recibidos.length})`)
  for (let enviado of usuario.enviados){
    console.log(`id: ${enviado.id},Usuario receptor:${enviado.usuario},Fecha emisión:${enviado.fecha},Mensaje: ${enviado.mensaje}`)
  }
}

function insertDatoHistoricoMoneda(moneda,datoAInsertar){
  moneda.historico.push(datoAInsertar);
}

/*prueba llamadas funciones*/
idMensaje = enviarMensaje(usuario1, usuario2, 'Hello Wolrd!');

ok = borrarMensajeEnviado(usuario, identificador);
ok = borrarMensajeRecibido(usuario, identificador);

