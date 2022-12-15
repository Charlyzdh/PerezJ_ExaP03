require('dotenv').config()
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

mongoose.set('strictQuery', true); /*Query verdadero para evitar el error de deprecation */
mongoose.connect(process.env.MONGO_CONNECTION); /*Creamos la conexion con la liga que se encuentra en las variables de entorno */

var user_schema = new Schema({ /*Definimos el schema para manejar a la base de datos como un objeto JSON */
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
});

user_schema.virtual('password_confirmation').get(function (){ /*Funcion que valida que ambas contraseñas al registro sean identicas */
    return this.p_c;
}).set(function(password){
    this.p_c = password;
})


var User = mongoose.model("User", user_schema); /*Definimos el nombre del modelo para la BD con el schema antes creado como referencia */

module.exports.User = User; /*Exportamos el modulo completo */
