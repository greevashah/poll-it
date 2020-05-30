const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

let PollSchema=({
    code: {type: String, required: true, unique: true},
    creator: {type: String},
    name: {type: String},
    question: {type:String},
    option: {type: Array, "default" : [] },
});

module.exports = mongoose.model('Poll', PollSchema);