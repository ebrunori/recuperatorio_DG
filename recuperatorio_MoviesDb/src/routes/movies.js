const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const guestMiddleware = require("../middlewares/guestMiddleware");
const autMiddleware = require("../middlewares/autMiddleware");
const admMiddleware = require("../middlewares/admMiddleware");
const validations = require("../middlewares/validateRegisterMiddleware");
const userLoggedMiddleware = require("../middlewares/userLoggedMiddleware");

router.get('/detail/:id', moviesController.detail);
router.get('/add',autMiddleware,admMiddleware, moviesController.agregar);
router.post('/create',autMiddleware,admMiddleware, moviesController.create);
router.get('/edit/:id',autMiddleware,admMiddleware, moviesController.edit);
router.put('/update/:id',autMiddleware,admMiddleware, moviesController.update);
router.get('/delete/:id',autMiddleware,admMiddleware, moviesController.delete);
router.delete('/delete/:id',autMiddleware,admMiddleware, moviesController.destroy);

module.exports = router;

