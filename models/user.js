var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var user_schema = new Schema({
    name: String,
    username: String,
    password: String,
    email: String
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;
