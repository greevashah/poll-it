var express = require('express');
var mongoose=require('mongoose');
var app = express();
var cors = require('cors');
var cookieParser = require('cookie-parser');

var auth = require('./controllers/auth');
var poll = require('./controllers/poll');

// var PORT=process.env.PORT|8080;
process.env.PORT = process.env.PORT ? process.env.PORT : 8080;

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

app.use('/auth',auth);
app.use('/poll',poll);

app.listen(process.env.PORT,(e)=>{
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