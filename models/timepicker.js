const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TimePicker = new Schema({
    code: {type: String, required: true},
    startTime: {type: Date , required: true},
    endTime: {type: Date, required: true},
    eventDuration: {type: Number, required: true},
    count : { type : Array , "default" : [], required: true}
});


// Export the model
module.exports = mongoose.model('TimePicker', TimePicker);