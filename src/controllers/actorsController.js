let db = require("../database/models");

let actorsController ={
    list: function(req, res){
        db.Actor.findAll()
        .then(function(actores){
            return res.render("actorsList", {actors: actores});
        });
    },
    detail: function(req, res){
        db.Actor.findByPk(req.params.id, {
            include: [{association: "peliculas"}]
        })
        .then(function(actor){
            return res.render("actorsDetail", {actor: actor});
        });
    },
    add: function(req, res){
        db.Movie.findAll()
        .then(function(peliculas){
            return res.render("actorsAdd", {movies: peliculas});
        })
    },
    create: async function(req, res){
        try {
            await db.Actor.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                rating: req.body.rating,
                favorite_movie_id: req.body.favorite_movie_id
            });    
            res.redirect("/actors");            
        } catch (error) {
            console.log(error);
        }
    },
    edit: function(req, res){
        let pedidoActor = db.Actor.findByPk(req.params.id);

        let pedidoPeliculas = db.Movie.findAll();

        Promise.all([pedidoActor, pedidoPeliculas])
        .then(function([actor, peliculas]){
            res.render("actorsEdit", {actor:actor, movies:peliculas});
        })
    },
    update: async function(req, res){
        try {           
            db.Actor.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                rating: req.body.rating,
                favorite_movie_id: req.body.favorite_movie_id
            }, 
            {
                where: {
                    id: req.params.id
                }
            });
    
            res.redirect("/actors/detail/" + req.params.id)
        } catch (error) {
            console.log(error);
        }
    },
    delete: function (req, res) {
        db.Actor.findByPk(req.params.id)
            .then(actor => {
                res.render('actorsDelete.ejs', { actor:actor });
            });
    },
    destroy: async function(req, res){
        try {
            db.Actor.destroy({
                where: {
                    id: req.params.id
                }
            })
    
            res.redirect("/actors")          
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = actorsController;