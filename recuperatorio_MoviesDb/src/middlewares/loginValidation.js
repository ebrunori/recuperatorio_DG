const { body } = require("express-validator");

const validations = [
  body("email")
    .notEmpty()
    .withMessage("Tienes que escribir un email")
    .bail()
    .isEmail()
    .withMessage("Tiene que tener formato de email"),

  body("password").notEmpty().withMessage("Tienes que escribir un password"),
];

module.exports = validations;