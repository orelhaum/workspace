let express = require('express')
let app = express()

// Método GET
app.get('/', function (req, res) {
  res.send('Hello World!')
})