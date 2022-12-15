var express = require('express');
var Img = require('./models/imgs')
var router = express.Router();

router.get('/', function(req, res){ /*Manejamos la ruta / para renderizar home de la app */
    res.render('app/home')
})

/*REST*/

router.get('/imgs/new', function(req, res){ /*Renderizamos /imgs/new en caso de acceder a la ruta imgs/new */
    res.render('app/imgs/new')
})

router.get('/imgs/:id/edit', function(req, res){ /*Pasamos el ID del registro de la coleccion para poder manipularlo a edicion */
    Img.findById(req.params.id, function(err,img){ /*Img se obtiene del modelo images */
        res.render('app/imgs/edit',{img: img})
    })

})

router.route('/imgs/:id') /*Al ingresar a la ruta imgs/+ el id del registro, renderiza la pagina de mostrarlo */
.get(function(req, res){
    Img.findById(req.params.id, function(err,img){
        res.render('app/imgs/show',{img: img})
    })
}).put(function(req, res){ /*Caso de actionar un PUT, hacemos el override para editar la informacion de las opiniones */
    Img.findById(req.params.id, function(err,img){
        img.title = req.body.title; /*Asignamos al objeto img, el titulo que se encuentre en el body y dentro del formulario con el name title */
        img.comment = req.body.comment;
        img.save(function(err){ /*Actualizamos la informacion del registro seleccionado con funcion callback para manejo de errores */
            if(!err){
                res.render('app/imgs/show',{img: img}) /*En caso de no tener errores de ejecucion, mostramos los registros totales pasando el objecto como parametro para manipularlo en jade */
            }else{
                res.render('app/imgs/'+img.id+'/edit',{img: img})
            }
        })
    })
}).delete(function(req, res){ /*Metodo de eliminacion del registro */
    Img.findOneAndDelete({_id: req.params.id},function(err){ /*Con fines de eficiencia en ejecucion, encontramos y eliminamos en la misma funcion */
        if(!err){
            res.redirect('/app/imgs') /*Sin error mostramos lo actualizado */
        }else{
            console.log(err)
            res.redirect('/app/imgs'+req.params.id)
        }
    })
});

router.route('/imgs')/*Leemos la ruta /imgs para dar dos metodos POST y GET */
.get(function(req, res){
    Img.find({}, function(err,img){ /*Al accionar GET mostramos todos los datos del parametro del formulario */
        if(err){
            res.redirect('/app') /*Caso de error, redirigimos a /app el cual es el home */
            return
        }
        res.render('app/imgs/index',{img: img}) /*De lo contrario, mostramos el index o pagina de valores */
    })
}).post(function(req, res){ /*Manejador para POST */
    var data = { /*Asignamos al objecto data los valores del body dentro de los formularios con ese nombre */
        title: req.body.title,
        comment: req.body.comment
    }

    var img = new Img(data) /* Con los datos del objecto, creamos un nuevo objecto basados en el modelo y schema */

    img.save(function(err){ /*Mandamos guardar la info a mongo */
        if(!err){
            res.redirect('/app/imgs/') /*Sin error, redirigimos a donde se encuentran todos los registros */
        }else{
            console.log(err)
        }
    })
});


module.exports = router; /*Exportamos todo el modulo Route-app.js */