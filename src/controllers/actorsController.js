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
    }
}

module.exports = actorsController;