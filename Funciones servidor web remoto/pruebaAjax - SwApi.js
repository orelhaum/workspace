/*********************************************/
const objetoAutenticacion = {
  username: "ramiro",
  token: "75d8bb9dbf12be694bcb71e85960c313c28f61d896c9dbd4db729e9c4edbef91713ba24c4aa4bdfb"
}

/***************dominio y rutas*******/


const domain = "https://swapi.co/api";

//Personajes
const urlPeople = `${domain}/people/:people/`;
const methodPeople = "GET";

//planetas
const urlPlanets = `${domain}/planets/:planet/`;
const methodPlanets = "GET";



/****** AJAX función que realiza la petición al servidor*****/
function ajax(method, url, body, callback) {
  // Crea el objeto XMLHttpRequest
  let xhttp = new XMLHttpRequest();

  // Define una función a llamar cuando la propiedad readyState cambia
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      jsonData = JSON.parse(this.responseText);
      callback(jsonData);
    }
  };

  // Especifica la petición (tipo, url y asincronismo)
  xhttp.open(method, url, true);

  // Envía la petición al servidor
  xhttp.send();


}
/*********AJAX******** */


function people(numeroPeople, callback) {
  let url = urlPeople.replace(":people", numeroPeople);
  console.log(url);
  ajax(methodPeople, url, undefined, callback);
}


function historical(nombreMoneda, numeroHoras, callback) {
  let url = urlHistorical.replace(":coin", nombreMoneda).replace(":hours", numeroHoras);
  ajax(methodMarket, url, undefined, callback);
}




//coins 
devolverMonedas(function (monedas) {
  let len = monedas.length;
  for (moneda of monedas) {
    console.log(moneda);
  }
});

//market
people(2, function (informacionPeople) {
  console.log(informacionPeople);
});


//historical
historical('BTCUSDT', 2, function (historical) {
  let len = historical.length;
  for (dataHistorico of historical) {
    console.log(dataHistorico);
  }
});


historical(function (informacionMoneda) {
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

send(destinationUser, message, function (data) {
  let body = {

  }

});