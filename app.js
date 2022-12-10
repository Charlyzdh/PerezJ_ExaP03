require('dotenv').config()
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var user = require('./models/user').User
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION);


var userSchemaJSON = {
    email: String,
    password: String
};

app.use('/public', express.static('public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.render('index');
})

app.get('/login', function (req, res) {
    user.find(function(err,doc){
        console.log(doc)
    })
    res.render('login');
});

app.post("/users", function(req, res){
    var user = new User({
        email: req.body.email,
        password: req.body.password
    })

    user.save(function(){
        res.send('Recibimos tu información!')
    })
})

console.log('Listening on port 8080')

app.listen(8080);