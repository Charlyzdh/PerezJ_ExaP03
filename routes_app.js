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

router.get('/imgs/:id/edit', function(req, res){
    Img.findById(req.params.id, function(err,img){
        res.render('app/imgs/edit',{img: img})
    })

})

router.route('/imgs/:id')
.get(function(req, res){
    Img.findById(req.params.id, function(err,img){
        res.render('app/imgs/show',{img: img})
    })
}).put(function(req, res){
    Img.findById(req.params.id, function(err,img){
        img.title = req.body.title;
        img.save(function(err){
            if(!err){
                res.render('app/imgs/show',{img: img})
            }else{
                res.render('app/imgs/'+img.id+'/edit',{img: img})
            }
        })
    })
}).delete(function(req, res){

});

router.route('/imgs')
.get(function(req, res){
    Img.find({}, function(err,img){
        if(err){
            res.redirect('/app')
            return
        }
        res.render('app/imgs/index',{img: img})
    })
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