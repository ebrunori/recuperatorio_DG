const express= require('express');
const router=express.Router();
const path=require('path');

//controller
const userController = require('../controllers/usersController');

/*middlewares validator*/

const guestMiddleware = require("../middlewares/guestMiddleware");
const autMiddleware = require("../middlewares/autMiddleware");
const validations = require("../middlewares/validateRegisterMiddleware");
const validateEditUserMiddleware = require("../middlewares/validateEditUserMiddleware");
const userLoggedMiddleware = require("../middlewares/userLoggedMiddleware");

/*formulariode registro*/

router.get('/register', guestMiddleware, userController.register);

/*procesar el registro*/
router.post('/register', validations, userController.processRegister);

/*formulario login*/
router.get('/login', guestMiddleware, userController.login);

/*procesar login*/
router.post('/login',userController.loginProcess);

/*perfil del usuario*/
router.get('/userProfile', autMiddleware, userController.profile);

/*Logout*/
router.get('/logout', userController.logout);

router.get('/edit/:id', userController.edit);
// Actualiza perfectamente pero hay que cerrar sesion y volver a iniciar.
router.post('/edit/:id',validateEditUserMiddleware, userController.editPost);


module.exports= router;

