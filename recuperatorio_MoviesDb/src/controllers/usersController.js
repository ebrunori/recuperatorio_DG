const bcryptjs = require ("bcryptjs");
const path = require('path');
const fs= require('fs');
const { validationResult } = require('express-validator');
/* requiero el modulo User de a carpeta models */
const db = require('../database/models');
const User = require('../models/User.js')

const Users = db.User;

const userController= {
    register: (req,res) => {      
     res.render('usersRegister')

    },
   
    processRegister: async (req, res) => {
        const resultValidation = validationResult(req);
            console.log(resultValidation)
        if(resultValidation.errors.length >0){
            return res.render('usersRegister',{
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        };

        // Validación propia, que no exista ya el email
        let userInDB = await Users.findOne({
            where: {
              email: req.body.email,
            },
          });

         // si ya existe..
        if (userInDB) {
            return res.render('usersRegister',{
                errors: {
                    email:{
                        msg: "Este email ya está registrado"
                    }
                },
                oldData: req.body
            })
        }

        await Users.create({
            name:req.body.name,
            email:req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
    })
        return res.redirect('/users/login')
    },


    login: (req,res) => {
        res.render('usersLogin')
    },

    loginProcess:  async (req, res) => {
    // Validación propia: existe el user?
    let userToLogin = await Users.findOne({
        where: {
          email: req.body.email,
        },
      });

    // existe el user?
      if (userToLogin){
            let passOk = bcryptjs.compareSync(req.body.password, userToLogin.password)
            if (passOk){
                // para no almacenar el password en session
                delete userToLogin.password;
                // se crea obj.literal session con prop userLogged y valor userToLogin
                req.session.userLogged = userToLogin;

                // creamos cookie
                if(req.body.remember_user){
                  res.cookie("userEmail", req.body.email, {maxAge: (1000 * 60) * 2 })
                }

                return res.redirect('/users/userProfile') 
            }
                 // si contraseña inválida
                return res.render('usersLogin',{
                    errors:{
                        email: {
                            msg: "Las credenciales son invalidas"
                            }
                        }
                    }) 
                }
                // si no se encuentra el email
                return res.render('usersLogin',{
                    errors:{
                        email: {
                            msg: "No hay usuario registrado con este correo"
                            }
                        }
                    });
    },


    profile: (req,res) => {
        return res.render('userProfile', {
           user: req.session.userLogged
        })
    },
    
    logout: (req,res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        return res.redirect("/")
    },
    edit: (req, res) => {
        res.render('usersEdit', {
          user: req.session.userLogged
        })
    },
    editPost:  async (req, res) => {

        let userInDB = await Users.findOne({
            where: {
              email: req.body.email,
              
            },
          });

         // si ya existe..
        if (userInDB && userInDB.id !== req.session.userLogged.id) {
            return res.render('usersEdit',{
                errors: {
                    email:{
                        msg: "Este email ya está registrado"
                    }
                },
                oldData: req.body,
                user: req.session.userLogged
            })
        };
        const resultValidation = validationResult(req);

          if (resultValidation.errors.length ==0)  {
    
             await Users.update({
              ...req.body,
            }, {
              where: {id:req.params.id}
            })
            let userUpdate = await Users.findOne({
                where: {id:req.params.id} 
              })
              
              req.session.userLogged = userUpdate
            
              return res.redirect("/users/userProfile");
                          
          } 

  
          
          else {
            return res.render("usersEdit", {errors: resultValidation.mapped(),user: req.session.userLogged});
          }

        },
    
};

    module.exports= userController;