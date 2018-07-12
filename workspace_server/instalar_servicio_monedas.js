var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'Actualizador de Monedas',
  description: 'Servicio que actualiza el valor de las monedas',
  script: 'index.js'
});
 
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});
 
svc.install();