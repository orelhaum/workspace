const express = require('express')

// Creación de una aplicación express
const app = express()

// Se establece la ruta / y se devuelve la cadena 'Hello world!' para esa ruta
// El resto de rutas devolverá 404
// Los objectos req (Request) y res (Response) son exactamente los mismos que proporciona Node
app.get('/', (req, res) =>{ res.send('Hello World!');})

// Escuchar en el puerto 3000
app.listen(3000, () => {console.log('Escuchando en el puerto 3000!');})