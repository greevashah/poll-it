const express = require('express');
const router = express.Router();

const TimePicker = require('../models/timepicker');

const { onlyAuthenticated } = require('../middlewares/auth');
const { voteTimeslot } = require('../utils/timepicker');

router.post('/createTimePicker', onlyAuthenticated ,async (req,res) => {
    // ToDo formatting of req.body
    const { code, start, end, eventduration} = req.body;
    const milliseconds = ((new Date(start)) - (new Date(end)));
    const halfHours = milliseconds / (60000*30);
    const count = new Array(halfHours).fill(0);
    
    const timePicker = new TimePicker({code,start,end,eventduration,count});

    try {
        await timePicker.save();
        console.log(timePicker);
        res.status(200).json(timePicker);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/pickSlot',onlyAuthenticated,async(req,res) => {
    const {code, start, end} = req.body;
    try {
        let timepicker = await TimePicker.findOne({code:code}).exec();
        timepicker.count = voteTimeslot(start,end,timepicker.count)
        const updatedTimePicker = await TimePicker.findOneAndUpdate({code:code},timepicker,{new: true});
        console.log(updatedTimePicker);
        res.status(200).json(updatedTimePicker);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/getTimePicker',onlyAuthenticated,async(req,res) => {
    try {
        const code = req.body.code; 
        const timepicker = await TimePicker.findOne({code:code}).exec();
        console.log(timepicker);
        res.status(200).json(timepicker);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router
