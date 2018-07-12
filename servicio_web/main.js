//Importaciones
let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let app = express();

//Variables globales
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//Middlewares
app.use('/static',express.static(path.join(__dirname,'public')));
app.use(bodyParser.raw()); // no parsea realmente, sino que convierte los datos recibidos del body a una variable de tipo Buffer que puede ser manejada por los siguientes middlewares
app.use(bodyParser.json()); // para parsear application/json
app.use(bodyParser.urlencoded({ extended: true })); // para parsear application/x-www-form-urlencoded

//Rutas
/*
//gulpfile.js
app.get('/download', (req, res)=> {
  res.download('./gulpfile.js')
});
*/
app.get('/prueba', (req, res,next)=> {
  res.render('index',{title:"Prueba de Pug",moneda:"BTCUSDT"});
});


app.get('/', (req, res)=> {
  res.send('general');
});

app.get('/coins', (req, res) =>{
  res.send('coins');
});

app.get('/coins', (req, res)=> {
  res.send('coins');
});

app.get('/market/:coinName', (req, res)=> {
  res.send(`Preguntando Market para:${req.params.coinName}`);
});

//historical/<coin_name>/<hours>
app.get('/historical/:coinName/:hours', (req, res)=> {
  res.send(`Preguntando Historical para: ${req.params.coinName} y las últimas ${req.params.hours}`);
});

///info_users
app.get('/info_users', (req, res)=> {
  res.send('info_users');
});

//funds
app.post('/funds', (req, res)=> {
  res.send('funds');
});

///buy/<coin_name>/<percent>
app.post('/buy/:coinName/:percent', (req, res) =>{
  res.send(`Comprando ${req.params.coinName} un porcentaje de ${req.params.percent}`);
});

///sell/<coin_name>/<percent>
app.post('/sell/:coinName/:percent', (req, res) =>{
  console.log(req.body);
  res.send(`Vendiendo ${req.params.coinName} un porcentaje de ${req.params.percent}`);
});

//msg/list
app.post('/msg/list', (req, res) =>{
  res.send(`Listando los mensajes`);
});

//msg/send
app.post('/msg/send', (req, res) =>{
  res.send(`Enviando mensaje`);
});

//msg/read/<id>
app.post('/msg/read/:id', (req, res) =>{
  res.send(`Leyendo el mensaje ${req.params.id}`);
});

//msg/remove/<id>
app.post('/msg/remove/:id', (req, res) =>{
  res.send(`Borrando el mensaje ${req.params.id}`);
});

//msg/remove_all
app.post('/msg/remove_all/', (req, res) =>{
  res.send(`Borrando todos los mensajes`);
});

// Esta ruta siempre debe ubicarse en el último lugar
app.use(function (req, res, next) {
  res.status(404).json({
    "ok":false,
    "msg":"Página no encontrada",
    "code":404,
    "data":[]
  })
})

app.listen(8085);