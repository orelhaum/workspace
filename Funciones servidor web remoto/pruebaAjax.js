/*********************************************/
const objetoAutenticacion = {
  username: "ramiro",
  token: "75d8bb9dbf12be694bcb71e85960c313c28f61d896c9dbd4db729e9c4edbef91713ba24c4aa4bdfb"
}

/***************dominio y rutas*******/


const domain = "http://192.168.1.66:8085";

//coins
const urlCoins = `${domain}/coins`;
const methodCoins = "GET";

//market
const urlMarket = `${domain}/market/:coin`;
const methodMarket = "GET";

//historical
const urlHistorical = `${domain}/historical/:coin/:hours`;
const methodHistorical = "GET";

//founds
const urlFounds = `${domain}/founds`;
const methodFounds = "POST";

//founds
const urlSend = `${domain}/msg/send`;
const methodSend = "POST";


/******** Funciones PRE-AJAX Y POST-AJAX *********/
/*******PRE-AJAX*******/
function preAjax(method,url,bodyObject,callback){

if (method!=='GET'){
  //Peticiones que no son del tipo GET
  bodyObject.token=objetoAutenticacion.token;
  bodyObject.username=objetoAutenticacion.username;
}
ajax(method,url,JSON.stringify(bodyObject),callback);
}
/*******PRE-AJAX*******/

/*******POST-AJAX*******/
function postAjax(jsonData,callback){
callback(jsonData.data);
}
/*******POST-AJAX*******/
/******** Funciones PRE-AJAX Y POST-AJAX *********/


/****** AJAX función que realiza la petición al servidor*****/
function ajax(method, url, bodyString, callback) {
  // Crea el objeto XMLHttpRequest
  let xhttp = new XMLHttpRequest();

  // Define una función a llamar cuando la propiedad readyState cambia
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      jsonData = JSON.parse(this.responseText);
      postAjax(jsonData,callback);
    }
  };

  // Especifica la petición (tipo, url y asincronismo)
  xhttp.open(method, url, true);

  // Envía la petición al servidor
  if(method!=='GET'){
  xhttp.send();
  }
  else{
    xhttp.send(bodyString);
  }
}
/*********AJAX******** */

function devolverMonedas(callback) {
  preAjax(methodCoins, urlCoins, undefined, callback);
}

function market(nombreMoneda, callback) {
  let url = urlMarket.replace(":coin", nombreMoneda);
  preAjax(methodMarket, url, undefined, callback);
}


function historical(nombreMoneda, numeroHoras, callback) {
  let url = urlHistorical.replace(":coin", nombreMoneda).replace(":hours", numeroHoras);
  preAjax(methodMarket, url, undefined, callback);
}

function funds(callback) {
  let bodyObject = {
    destination_user: destinationUser,
    message: message
  }
  preAjax(methodFounds, urlFounds, bodyObject, callback);
}


function send(destinationUser, message, callback) {
  let bodyObject = {
    destination_user: destinationUser,
    message: message
  }
  preAjax(methodSend, urlSend, bodyObject, callback);
}


//coins 
coins(function (monedas) {
  let len = monedas.length;
  for (moneda of monedas) {
    console.log(moneda);
  }
});

//market
market('BTCUSDT', function (informacionMoneda) {
  console.log(informacionMoneda);
});


//historical
historical('BTCUSDT', 2, function (historical) {
  let len = historical.length;
  for (dataHistorico of historical) {
    console.log(dataHistorico);
  }
});


funds(function (informacionMoneda) {
  console.log(informacionMoneda);
});

//prueba asincronía coins 
devolverMonedas(function (monedas) {
  let len = monedas.length;
  for (moneda of monedas) {
    console.log(moneda);
    market(moneda, function (informacionMoneda) {
      console.log(informacionMoneda);
    });
  }
});

//send
send('alejandro', 'prueba mensaje', function (data) {
console.log(data);
});