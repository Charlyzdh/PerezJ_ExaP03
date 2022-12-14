require('dotenv').config()
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION);

var user_schema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
});

user_schema.virtual('password_confirmation').get(function (){
    return this.p_c;
}).set(function(password){
    this.p_c = password;
})


var User = mongoose.model("User", user_schema);

module.exports.User = User;
