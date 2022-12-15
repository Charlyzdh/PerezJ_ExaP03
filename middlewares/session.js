var User = require('../models/user').User; /*Tomamos el modelo User para manejar validaciones basicas de pagina */

module.exports = function(req, res, next) { /*Exportamos la funcion y resultados, ya que dependeran algunas acciones de esta funcion para otros modulos */
    if(req.session.user_id == undefined){ /*Caso de tener indefinido el usuario conectado, o sea que no hay nadie loggeado, se redirige a login */
        res.redirect('/login');
    }
    else{
        User.findById(req.session.user_id,function(err, user){ /*Al tener una sesion definida, validamos permiso de acceso */
            if(err){
                console.log(err)
                res.redirect('/login') /*Caso de error, redirigimos a login */
            } else{
                res.locals = {user: user} /*De lo contrario, mandamos a locals (Para exportar mejor el objeto resultante) */
                next(); /*Continuamos la ejecucion dependiendo de donde sea que llamemos */
            }
        });
    }
}