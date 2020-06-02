const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

let UserSchema = new Schema({
    userID: {type: String, required: true, unique:true, max: 100},
    password: {type: String, required: true, max: 100},
    created : { type : Array , "default" : [] },
    voted : { type : Array , "default" : [] }
});

UserSchema.plugin(uniqueValidator);

// Export the model
module.exports = mongoose.model('User', UserSchema);