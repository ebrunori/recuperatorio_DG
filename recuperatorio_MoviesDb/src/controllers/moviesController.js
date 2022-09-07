const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'agregar': function (req, res) {
        let genres = Genres.findAll();
        let actors = Actors.findAll();
        
        Promise
        .all([genres, actors])
        .then(([allGenres, allActors]) => {
            return res.render('moviesCreate', {allGenres,allActors})})
        .catch(error => res.send(error))
    },
    'create': function (req,res) {
        Movies
        .create(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }
        )
        .then(()=> {
            return res.redirect('/')})            
        .catch(error => res.send(error))
    },
    'detail': (req, res) => {
        Movies.findByPk(req.params.id,
            {
                include : ['genre','actors']
            })
            .then(movie => {
                res.render('moviesDetail', {movie});
            });
    },
    'edit': function(req,res) {
        let movieId = req.params.id;
        let movies = Movies.findByPk(movieId,{include: ['genre','actors']});
        let genres = Genres.findAll();
        Promise
        .all([movies, genres])
        .then(([movie, allGenres]) => {
            movie.release_date = moment( new Date(movie.release_date)).format('L');
            return res.render('moviesEdit', {movie,allGenres})})
        .catch(error => res.send(error))
    },
    update: function (req,res) {
        let movieId = req.params.id;
        Movies
        .update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: {id: movieId}
            })
        .then(()=> {
            return res.redirect('/')})            
        .catch(error => res.send(error))
    },
    delete: function (req,res) {
        Movies
        .findByPk(req.params.id)
        .then(movie => {
            return res.render('moviesDelete', {movie})})
        .catch(error => res.send(error))
    },
    destroy: function (req,res) {
        Movies
        .destroy({where: {id: req.params.id}, force: true}) 
        .then(()=>{
            return res.redirect('/')})
        .catch(error => res.send(error)) 
    }  
}

module.exports = moviesController;