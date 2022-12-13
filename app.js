var express = require('express')
var bodyParser = require('body-parser')
var User = require('./models/user').User
var session = require('express-session')


var app = express()

app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: false
}))

app.set('view engine', 'jade');

app.get('/', function (req, res) {
    console.log(req.session.user_id)
    res.render('index');
})

app.get('/signup', function (req, res) {
    User.find(function(err,doc){
        console.log(doc)
    })
    res.render('signup');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.post("/users", function(req, res){
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
        username: req.body.username
    })
    console.log(user.password_confirmation)
    user.save().then(function(us){
        res.send('Recibimos tu información!')
    }),function(err){
        if(err){
            console.log(err);
            res.send('No pudimos guardar la información')
        }
    }
})

app.post("/sessions", function(req, res){
    User.findOne({
        email: req.body.email, password : req.body.password
    },function(err, user){
        if(err){
            console.log(err);
        }
        req.session.user_id = user._id;
        res.send('Hello world!');
    })
})

console.log('Listening on port 8080')

app.listen(8080);