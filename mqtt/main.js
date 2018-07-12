let mqtt = require('mqtt')
let client  = mqtt.connect('mqtt://192.168.1.165:1883')

client.on('connect', function () {
  client.subscribe('chats')
  let i=0;
setInterval(()=>{
  client.publish('chats', `Ramiro ${i++}`);
},1000)


})

client.on('message', function (topic, message) {
  console.log(message.toString())
  //client.end()
})