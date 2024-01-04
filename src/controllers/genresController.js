const db = require('../database/models');
const sequelize = db.sequelize;


const genresController = {
    'list': (req, res) => {
        db.Genre.findAll()
            .then(genres => {
                res.render('genresList.ejs', {genres})
            })
    },
    'detail': (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                res.render('genresDetail.ejs', {genre});
            });
    },
    add: function(req, res){
        return res.render("genresAdd");
    },
    create: async function(req, res){
        try {
            await db.Genre.create({
                active: 1,
                name: req.body.name
            });    
            res.redirect("/genres");            
        } catch (error) {
            console.log(error);
        }
    },
    edit: function(req, res){
        let pedidoGenero = db.Genre.findByPk(req.params.id);

        Promise.all([pedidoGenero])
        .then(function([genero]){
            res.render("genresEdit", {genre:genero});
        })
    },
    update: async function(req, res){
        try {           
            db.Genre.update({
                name: req.body.name            
            }, 
            {
                where: {
                    id: req.params.id
                }
            });
    
            res.redirect("/genres/detail/" + req.params.id)
        } catch (error) {
            console.log(error);
        }
    },
    delete: function (req, res) {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                res.render('genresDelete.ejs', { genre:genre });
            });
    },
    destroy: async function(req, res){
        try {
            db.Genre.destroy({
                where: {
                    id: req.params.id
                }
            })
    
            res.redirect("/genres")          
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = genresController;