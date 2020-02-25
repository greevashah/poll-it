var express = require('express');
var app = express();

app.use(express.static('./static'));

app.get('/',(req,res)=>{
    res.sendFile('index.html');
});

app.get('/poll-it',(req,res)=>{
    res.send("You're in POll-it");
})

var server= app.listen(8000,(e)=>{
    var host= server.address().address;
    var port= server.address().port;
    console.log("Add", host);
    console.log("Port", port);
});