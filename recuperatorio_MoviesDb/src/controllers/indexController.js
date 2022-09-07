const db = require('../database/models');
const sequelize = db.sequelize;

const Movies = db.Movie;


indexController = {
    index: (req, res) => {
        Movies.findAll({
            include: ['genre']
        })
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
            
    }
}
    
module.exports = indexController;