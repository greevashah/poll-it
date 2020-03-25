const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    userID: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100},
    created : { type : Array , "default" : [] },
    voted : { type : Array , "default" : [] }
});


// Export the model
module.exports = mongoose.model('User', UserSchema);