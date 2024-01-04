const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    detail: function(req, res){
        db.Movie.findByPk(req.params.id, {
            include: [{association: "genero"}, {association: "actores"}]
        })
        .then(function(pelicula){
            return res.render("moviesDetail", {movie: pelicula});
        });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, 
    //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function(req, res){
        db.Genre.findAll()
        .then(function(generos){
            return res.render("moviesAdd", {generos: generos});
        })
    },
    create: async function(req, res){
        try {
            await db.Movie.create({
                title: req.body.title,
                awards: req.body.awards,
                release_date: req.body.release_date,
                genre_id: req.body.genre,
                length: req.body.length,
                rating: req.body.rating
            });    
            res.redirect("/movies");            
        } catch (error) {
            console.log(error);
        }
    },
    edit: function(req, res){
        let pedidoPelicula = db.Movie.findByPk(req.params.id);

        let pedidoGeneros = db.Genre.findAll();

        Promise.all([pedidoPelicula, pedidoGeneros])
        .then(function([pelicula, generos]){
            res.render("moviesEdit", {movie:pelicula, genres:generos});
        })
    },
    update: async function(req, res){
        try {           
            db.Movie.update({
                title: req.body.title,
                awards: req.body.awards,
                release_date: req.body.release_date,
                genre_id: req.body.genre,
                length: req.body.length,
                rating: req.body.rating
            }, {
                where: {
                    id: req.params.id
                }
            });
    
            res.redirect("/movies/detail/" + req.params.id)
        } catch (error) {
            console.log(error);
        }
    },
    delete: function (req, res) {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDelete.ejs', { movie:movie });
            });
    },
    destroy: async function(req, res){
        try {
            db.Movie.destroy({
                where: {
                    id: req.params.id
                }
            })
    
            res.redirect("/movies")          
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = moviesController;