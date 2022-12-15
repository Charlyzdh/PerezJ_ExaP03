var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var img_schema = new Schema({ /*Schema para manejar las opiniones de los clientes a la BD */
    title: {type: String, required: true},
    comment: {type: String, required: true}
})

var Img = mongoose.model('Image', img_schema) /*Creamos el modelo para opiniones usando el schema antes creado */

module.exports = Img; /*Exportamos el modulo completo */