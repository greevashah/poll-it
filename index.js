var User=require('./models/user');
var Poll=require('./models/poll');
var TimePicker=require('./models/timepicker');

var express = require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var app = express();

mongoose.connect("mongodb+srv://root:1234@poll-it-bwvcs.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err) console.log('err :', err);
    else console.log('Connected');
});



app.use(express.static('./static'));

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());





app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/static/funpage.html');
});

app.get('/poll-it',(req,res)=>{
    res.send("You're in POll-it");
})


// create
app.post('/adduser',urlencodedParser,async(req,res)=>{
    // console.log(req.body);
    // res.send("ok");
    const user = new User(req.body);
    try {
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
})

// read
app.get('/readuser',urlencodedParser,async(req,res)=>{

    try {
        console.log(req.query.userID);
        let userresult = await User.findOne({userID:req.query.userID}).exec();
        res.send(userresult);
    } catch (err) {
        res.status(500).send(err);
    }
})

// update
// Model.findOneAndUpdate(query, { $set: { name: 'jason bourne' }}, options, callback)
app.post('/modifyuser',urlencodedParser,async(req,res)=>{
    User.findOneAndUpdate({userID: req.body.userID}, {$set: {password: req.body.password}}, (err,doc)=>{
        if(err){
            console.log(err);
        }
        console.log("Modified");
        res.send(doc);
    });
});

//delete
app.post('/deleteuser',urlencodedParser,async(req,res)=>{
    User.findOneAndDelete({userID: req.body.userID}, (err,doc)=>{
        if(err){
            console.log(err);
        }
        console.log("Deleted");
        res.send(doc);
    });
});

var server= app.listen(8000,(e)=>{
    var host= server.address().address;
    var port= server.address().port;
    console.log("Add", host);
    console.log("Port", port);
});

// mongodb+srv://root:<password>@poll-it-bwvcs.mongodb.net/test?retryWrites=true&w=majority