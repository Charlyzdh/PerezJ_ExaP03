require('dotenv').config()
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_CONNECTION);

var userSchemaJSON = {
    email: String,
    comment: String
};

var user_schema = new Schema(userSchemaJSON);

var User = mongoose.model('User', user_schema);

app.use('/public', express.static('public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.render('index');
})

app.get('/login', function (req, res) {
    res.render('login');
});

app.post("/users", function(req, res){
    var user = new User({
        email: req.body.email,
        comment: req.body.comment
    })

    user.save(function(){
        res.send('Recibimos tu información!')
    })
})

app.listen(8080);
console.log('listening on http://localhost:8080')