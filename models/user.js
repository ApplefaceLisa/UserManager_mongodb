var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    fName: String,
    lName: String,
    title: String,
    gender: String,
    age: Number
});

module.exports = mongoose.model('User', UserSchema);