/*********Funciones testeo***********/

let conexionEstablecida = (ws) => {
  console.log("Conexión establecida");
  //document.getElementById('submitmsg').addEventListener("click",ws.send(document.getElementById('usermsg').innerText));
  function enviarMensaje(e) {
    console.log("Pulsado");
    ws.send(document.getElementById('usermsg').value);
    document.getElementById('usermsg').value="";
    console.log(document.getElementById('usermsg').value);
  }
  document.getElementById('submitmsg').addEventListener("click",enviarMensaje);
  console.log("evento asociado");
}

let mensajeEntrante = (data, ws) => {
  let nodoAux = document.createElement('p');
  let chatBoxElement = document.getElementById('chatbox');
  try
  {
    mensajeRecibido=JSON.parse(data);
    nodoAux.innerHTML = `${mensajeRecibido.username}: ${mensajeRecibido.msg}`;
    chatBoxElement.appendChild(nodoAux);
  }
  catch(e){
    console.log("error parseando");
    //Aquí entra cuando el mensaje es OK o ERROR
    if(data==="OK"){
      document.getElementById('estado').innerHTML="CONECTADO";
    }else{
      document.getElementById('estado').innerHTML="NO CONECTADO";
    }

  }

  //let jsonData = JSON.parse(data)

  //ws.send('mensaje de prueba desde main.js');
  //console.log(data);
}

chat('ramiro',conexionEstablecida,mensajeEntrante)

//coin('btcusdt',conexionEstablecida,mensajeEntrante)



//Prueba de reloj que se va actualizando cada segundo
/*
let fecha = new Date();
function visualizarFecha() {
  //let fecha= new Date(); muy costoso computanocioalmente así que mejor ir sumando 1 segundo cada vez.
  fecha.setTime(fecha.getTime() + 1000);
  let minutos = (fecha.getMinutes() < 10) ? "0" + fecha.getMinutes() : fecha.getMinutes();
  let segundos = (fecha.getSeconds() < 10) ? "0" + fecha.getSeconds() : fecha.getSeconds();
  let fechaFormateada = `${fecha.getHours()}:${minutos}:${segundos}`
  document.getElementById("reloj").innerHTML = fechaFormateada
}
visualizarFecha();
setInterval(visualizarFecha, 1000)



let precioActualizado = (data, ws) => {
  let precioBitcoin = document.getElementById('precioBitcoin');
  let jsonData=JSON.parse(data);
  precioBitcoin.innerHTML=jsonData.lastPrice + "$";
  //ws.send('mensaje de prueba desde main.js');
}

coin('btcusdt',()=>{},precioActualizado)
*/