var express = require('express');
var mongoose=require('mongoose');
var app = express();
var cors = require('cors');
var cookieParser = require('cookie-parser');

var auth = require('./controllers/auth');
var poll = require('./controllers/poll');
var timePicker = require('./controllers/timepicker');


app.use(cors({origin: [
    "http://localhost:4200"
  ], credentials: true}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static('./static'));

app.get('/fun-page',(req,res)=>{
    res.sendFile(__dirname+'/static/funpage.html');
});

app.get('/',(req,res)=>{
    res.send("You're in POll-it");
})

app.use('/auth',auth);
app.use('/poll',poll);
app.use('/timePicker',timePicker);


var server= app.listen(8080,(e)=>{
    var host= server.address().address;
    var port= server.address().port;
    console.log("Add:", host);
    console.log("Port", port);
    mongoose.connect("mongodb+srv://root:1234@poll-it-bwvcs.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    }, (err) => {
        if (err) console.log('err :', err);
        else console.log('Connected');
    });
});

// mongodb+srv://root:<password>@poll-it-bwvcs.mongodb.net/test?retryWrites=true&w=majority