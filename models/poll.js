const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let PollSchema=({
    code: {type: String, required: true},
    creator: {type: String},
    name: {type: String},
    question: {type:String},
    option: {type: Array, "default" : [] },
    deadline: {type: Date}
});

module.exports = mongoose.model('Poll', PollSchema);