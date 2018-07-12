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

//prediction
const urlPrediction = `${domain}/prediction/:hours`;
const methodPrediction = "GET";

//info_user
const urlInfoUser = `${domain}/info_users`;
const methodInfoUser = "GET";

//funds
const urlFunds = `${domain}/funds`;
const methodFunds = "POST";

//buy
const urlBuy = `${domain}/buy/:coin/:cantidad`;
const methodBuy = "POST";

//sell
const urlSell = `${domain}/sell/:coin/:cantidad`;
const methodSell = "POST";

//msg list
const urlList = `${domain}/msg/list`;
const methodList = "POST";

//msg send
const urlSend = `${domain}/msg/send`;
const methodSend = "POST";

//msg read
const urlRead = `${domain}/msg/read/:idMessage`;
const methodRead = "POST";

//msg remove
const urlMsgRemove = `${domain}/msg/remove/:idMessage`;
const methodMsgRemove = "POST";

//msg remove_all
const urlMsgRemoveAll = `${domain}/msg/remove_all`;
const methodMsgRemoveAll = "POST";



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
  if(method==='GET'){
  xhttp.send();
  }
  else{
    xhttp.send(bodyString);
  }
}
/*********AJAX******** */

function coins(callback) {
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

function prediction( numeroHoras, callback) {
  let url = urlPrediction.replace(":hours", numeroHoras);
  preAjax(methodPrediction, url, undefined, callback);
}

function infoUsers(callback) {
  preAjax(methodInfoUser, urlInfoUser, undefined, callback);
}

function funds(callback) {
  let bodyObject = {
  }
  preAjax(methodFunds, urlFunds, bodyObject, callback);
}

function buy(nombreMoneda, percentCantidad, callback) {
  let url = urlBuy.replace(":coin", nombreMoneda).replace(":cantidad", percentCantidad);
  let bodyObject = {
  }
  preAjax(methodBuy, url, bodyObject, callback);
}

function sell(nombreMoneda, percentCantidad, callback) {
  let url = urlSell.replace(":coin", nombreMoneda).replace(":cantidad", percentCantidad);
  let bodyObject = {
  }
  preAjax(methodSell, url, bodyObject, callback);
}

function list(usuario, callback) {
  let bodyObject = {
  }
  preAjax(methodList, urlList, bodyObject, callback);
}

function send(destinationUser, message, callback) {
  let bodyObject = {
    destination_user: destinationUser,
    message: message
  }
  preAjax(methodSend, urlSend, bodyObject, callback);
}

function read(idMessage, callback) {
  let url = urlRead.replace(":idMessage", idMessage);
  let bodyObject = {
  }
  preAjax(methodRead, url, bodyObject, callback);
}

function remove(idMessage, callback) {
  let url = urlMsgRemove.replace(":idMessage", idMessage);
  let bodyObject = {
  }
  preAjax(methodMsgRemove, url, bodyObject, callback);
}

function removeAll(callback) {
  let bodyObject = {
  }
  preAjax(methodMsgRemoveAll, urlMsgRemoveAll, bodyObject, callback);
}
