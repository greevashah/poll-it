const express = require('express');
const router = express.Router();

const TimePicker = require('../models/timepicker');
const TimePickerUtil = require('../utils/timepicker')

const { onlyAuthenticated } = require('../middlewares/auth');
const { voteTimeslot } = require('../utils/timepicker');

router.post('/createTimePicker', onlyAuthenticated ,async (req,res) => {
    // ToDo formatting of req.body
    console.log("Time picker route hit")
    console.log(req.body);
    const code = req.body.code;
    // const timePicker = new TimePicker({code, start, end, eventduration,count});

    const eventDuration = Number(req.body.eventDuration) ;
    const startTime = new Date(req.body.startTime);
    const endTime = new Date(req.body.endTime)
    
    const diffMilliSeconds = (endTime.getTime() - startTime.getTime());
    // console.log("Difference in Second: ", diffSeconds);
    const halfHours = parseInt(diffMilliSeconds / (1000*60*30));
    console.log("halfhours: ", halfHours);
    const count = new Array(halfHours).fill(0); 
    const timePicker = new TimePicker({ code, startTime, endTime, eventDuration, count });
    try {
        await timePicker.save();
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

router.get('/getTimePicker',onlyAuthenticated,async(req,res) => {
    try {
        const code = req.query.code; 
        const timepicker = await TimePicker.findOne({code:code}).exec();
        console.log(req)
        console.log("Yes i am getting pinged", code);
        res.status(200).json(timepicker);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router
