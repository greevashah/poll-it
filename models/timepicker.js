const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TimePicker = new Schema({
    code: {type: String, required: true},
    start: {type: Date , required: true},
    end: {type: Date, required: true},
    eventduration:{type: Number, required: true},
    count : { type : Array , "default" : [] }
});


// Export the model
module.exports = mongoose.model('TimePicker', TimePicker);