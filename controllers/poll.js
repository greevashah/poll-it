var express = require('express');
var router = express.Router();

var Poll = require('../models/poll');
var TimePicker = require('../models/timepicker');
var { onlyAuthenticated } = require('../middlewares/auth')

var TimePickerUtil = require('../utils/timepicker')

var mongoose = require('mongoose');

const makeCode = (length)=> {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
 
router.post('/createPoll', onlyAuthenticated ,async (req,res) => {
    console.log("Create Poll Link");
    console.log(req.body);
    const { name, question, options, timepicker, multipleChoice, isDeadline } = req.body;

    const code = makeCode(5);
    console.log("Code is: ", code);
    const creator = req.cookies.userID;
    const options_final = options.map(option => [option,[]] )

    let poll;

    if(isDeadline) {
        const deadline = new Date(req.body.deadline);
        poll = new Poll({code,name,question,option:options_final,creator,timepicker,multipleChoice,isDeadline, deadline});
    }
    else{
        poll = new Poll({code,name,question,option:options_final,creator,timepicker,multipleChoice,isDeadline});
    }
    try {
        await poll.save();
        console.log(poll);
        res.status(200).json(poll);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Adding vote in the respective poll
router.post('/vote/:code/:val',onlyAuthenticated, async(req,res)=>{
    try {
        let poll = await Poll.findOne({code:req.params.code}).exec();
        poll.option[req.params.val][1].push(req.cookies.userID);
        Poll.findOneAndUpdate({code: req.params.code}, poll, (err,doc)=>{
            if(err){
                console.log(err);
                res.send(500).json("db update error");
            }
            console.log("vote has been added");
            res.status(200).json(poll);
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

// View Poll with the given code
router.get('/result/:code',onlyAuthenticated, async (req,res)=>{
    try {
        let poll = await Poll.findOne({code:req.params.code}).exec();
        // let timepicker = await TimePicker.findOne({code:req.params.code}).exec();
        // console.log("Result::", result);

        res.status(200).send(poll);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;