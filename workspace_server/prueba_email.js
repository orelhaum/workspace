const { Email } = require('./modules/email');
const { Configuracion } = require('./modules/configuracion');

let conf = new Configuracion('conf.json');

let email = new Email(conf);
//inicia el proceso de actualización de los archivos
email.send('pruebas.ramiro.saenz.picabea@gmail.com',"asunto prueba","texto de prueba",(err,info)=>{
console.log('Email enviado');
console.log(info);
});