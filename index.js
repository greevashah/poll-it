var express = require('express');
var app = express();

app.get('/',(req,res)=>{
    res.send("Hello World! Bye Chirag");
})

var server= app.listen(8000,(e)=>{
    var host= server.address().address;
    var port= server.address().port;
    console.log("Add", host);
    console.log("Port", port);
});