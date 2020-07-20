const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

let PollSchema=({
    code: {type: String, required: true, unique: true},
    creator: {type: String},
    name: {type: String},
    question: {type:String},
    option: {type: Array, "default" : [] },
    isDeadline: {type: Boolean}, //true or false
    deadline: {type: Date},
    multipleChoice: {type: Boolean}, //true or false
    timepicker: {type: Boolean}  //true or false
});

module.exports = mongoose.model('Poll', PollSchema);