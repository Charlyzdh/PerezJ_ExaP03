var express = require('express')
var bodyParser = require('body-parser')
var User = require('./models/user').User
var cookieSession = require('cookie-session')
var router_app = require('./routes_app')
var session_middleware = require('./middlewares/session')

var methodOverride = require('method-override')


var app = express();

app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride('_method'))

app.use(cookieSession({
    name: 'session',
    keys: ['session-1', 'session-2']
}));

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

app.get('/app/contact', function (req, res) {
    res.render('app/contact');
});

app.get('/app/catalog', function (req, res) {
    res.render('app/catalog');
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
        res.redirect('/')
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
            res.redirect('/login');
        }
        req.session.user_id = user._id;
        res.redirect('/app');
    })
})


app.use('/app',session_middleware)
app.use('/app', router_app)

console.log('Listening on port 8080')
app.listen(8080);