module.exports = function(sequelize, dataTypes){
    let alias = "Actor";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name:{
            type: dataTypes.STRING
        },
        last_name:{
            type: dataTypes.STRING
        },
        rating:{
            type: dataTypes.DOUBLE
        },
        favorite_movie_id:{
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: "actors",
        timestamps: false
    }
    
    let Actor = sequelize.define(alias, cols, config);

    Actor.associate = function(models){
        Actor.belongsTo(models.Movie, {
            as: "movie",
            foreignKey: "id"
        });

        Actor.belongsToMany(models.Movie, {
            as: "peliculas",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false
        });
    }

    return Actor;
}