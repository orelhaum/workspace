function guardarGeolocalizacion(position) {
  // Comprueba la existencia de los objetos localStorage/sessionStorage.
  if (typeof (localStorage) !== "undefined") {
    // El almacenamiento funciona con pares clave/valor
    localStorage.latitud = position.coords.latitude;
    localStorage.longitud = position.coords.longitude;
  } else {
    document.getElementById("result").innerHTML = "No hay soporte para web storage...";
  }
}

function obtenerGelocalizacion(callback) {
  // Comprueba que la geolocalización es soportada
  if (navigator.geolocation) {

    // El primer parámetro es una función invocada si es posible acceder correctamente a la geolocalización, mientras que el segundo es una función invocada en caso de error
    navigator.geolocation.getCurrentPosition(position => {
        guardarGeolocalizacion(position);
        callback({
          longitud: position.coords.longitude,
          latitud: position.coords.latitude
        });
      },
      error => {
        console.log('Se ha producido un error: ' + error.code);
        callback(undefined);
      });
  } else {
    console.log("Geolocalización no soportada por el navegador");
  }
}

obtenerGelocalizacion(data => {
  console.log(data);
});

function getCredentials(){
  if (localStorage.username) {
  return {
    username: localStorage.username,
    token: localStorage.token
  };
}
else{
     
  return undefined;
}
}

function setCredentials(username,token){
    localStorage.username=username;
    localStorage.token=token;
  }