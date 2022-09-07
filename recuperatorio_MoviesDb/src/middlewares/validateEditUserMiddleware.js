const {body}=require('express-validator');
const path= require('path')

module.exports= [
    body('name')
    .notEmpty()
    .withMessage('Por favor, colocar su nombre')
    .isLength({ min: 2, max: 20 })
    .withMessage("El nombre tiene que tener entre 1 y 20 caracteres"),
    body('email')
    .notEmpty()
    .withMessage("Tienes que escribir un email")
    .bail()
    .isEmail()
    .withMessage("Tiene que tener formato de email"),
]

