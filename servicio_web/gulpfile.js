// gulpfile.js (Dirección para conectarse --> http://localhost:7000/)
let gulp = require('gulp');
let browserSync = require('browser-sync');
let nodemon = require('gulp-nodemon');


gulp.task('default', ['browser-sync'], function () {});

// Actualiza el navegador (Chrome) cuando se detecten cambios en el directorio public/
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:5000", // 5000 es el puerto en el que se ejecuta Express
      files: ["public/*"],
      browser: "chrome",
      port: 7000, // 7000 es el puerto en el que se ejecuta browser-sync y desde donde se enrutarán las peticiones a localhost:5000
  });
});

// cb es un callback que se puede invocar en el momento en el que la tarea es finalizada
gulp.task('nodemon', function (cb) {

  let started = false;
  
  // Para y reinicia el servidor automáticamente cuando existen cambios en cualquier archivo JavaScript del directorio, incluyendo subdirectorios, a excepción del directorio node_modules
  return nodemon({
    script: 'main.js'
  }).on('start', function () {
    // Se ejecuta este callback cada vez que existe un cambio en algún archivo
    if (!started) {
      cb(); // Notifica que la tarea ha finalizado. Solamente es ejecutada la primera vez, para advertir a la tarea browser-sync que puede ejecutar el servidor proxy y enrutar hacia Express puesto que en este punto ya se encuentra ejecutándose la aplicación de Express en app.js
      started = true;
    }
  });

  // Esta línea es alcanzada cuando finaliza el código de la tarea nodemon. Sin embargo, nodemon todavía no ha arrancado en este punto y, por tanto, la tarea browser-sync no puede ser ejecutada aún. Por eso se invoca al callback (cb)
});