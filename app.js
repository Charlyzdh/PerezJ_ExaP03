var express = require('express')
var bodyParser = require('body-parser')
var User = require('./models/user').User
var cookieSession = require('cookie-session')
var router_app = require('./routes_app')
var session_middleware = require('./middlewares/session')

var methodOverride = require('method-override')

/* Bloque de importacion de librerias NPM y JS*/

var app = express();

app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride('_method'))

app.use(cookieSession({ /*Guardamos sesion ID para evitar login en cada reinicio del server*/
    name: 'session',
    keys: ['session-1', 'session-2']
}));

app.set('view engine', 'jade'); /*Definimos el tipo de vista que se dará, puede ser HTML pero para este proyecto definimos JADE/PUG */

app.get('/', function (req, res) {
    console.log(req.session.user_id)
    res.render('index');
})


/*Bloques manejadores GET de las peticiones para renderizar las paginas JADE en HTML */
app.get('/signup', function (req, res) {
    User.find(function(err,doc){
        console.log(doc) /*Muestra en pantalla todos los registros obtenidos */
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

/*Bloques manejadores GET de las peticiones para renderizar las paginas JADE en HTML */

app.post("/users", function(req, res){
    var user = new User({ /*Objeto JSON que toma el modelo y schema de usuario, rellenando la data del formulario del front-end para mandar la peticion a Mongo */
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
        username: req.body.username
    })
    console.log(user.password_confirmation) /*Caso de error con coincidencia de pass, muestra en consola */
    user.save().then(function(us){ /*Funcion con promesa y callback de error para guardar la data en mongo */
        res.redirect('/')
    }),function(err){
        if(err){ /*En caso de error, lo imprimimos */
            console.log(err);
            res.send('No pudimos guardar la información')
        }
    }
})

app.post("/sessions", function(req, res){ /*Hacemos el post del login para validar si se encuentra al usuario que intenta entrar*/
    User.findOne({
        email: req.body.email, password : req.body.password
    },function(err, user){ /*Funcion callback con parametros de error y usuario para detectar falla de inicio de sesion*/
        if(err){
            res.redirect('/login'); /*Redirige en caso de fallas de inicio a la pagina de login */
        }
        req.session.user_id = user._id;
        res.redirect('/app'); /*Si es satisfactorio, redirige a la pagina principal de la app */
    })
})


app.use('/app',session_middleware)
app.use('/app', router_app)

console.log('Listening on port 8080') /*Imprimimos el puerto que estamos usando para el server */
app.listen(8080);