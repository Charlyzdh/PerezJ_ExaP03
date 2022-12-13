var express = require('express');
var Img = require('./models/imgs')
var router = express.Router();

router.get('/', function(req, res){
    res.render('app/home')
})

/*REST*/

router.get('/imgs/new', function(req, res){
    res.render('app/imgs/new')
})

router.get('imgs/:id/edit', function(req, res){

})

router.route('/imgs/:id')
.get(function(req, res){
    Img.findById(req.params.id, function(err,img){
        res.render('app/imgs/show',{img: img})
    })
}).put(function(req, res){

}).delete(function(req, res){

});

router.route('/imgs')
.get(function(req, res){

}).post(function(req, res){
    var data = {
        title: req.body.title
    }

    var img = new Img(data)

    img.save(function(err){
        if(!err){
            res.redirect('/app/imgs/'+img._id)
        }else{
            res.render(err)
        }
    })
});


module.exports = router;