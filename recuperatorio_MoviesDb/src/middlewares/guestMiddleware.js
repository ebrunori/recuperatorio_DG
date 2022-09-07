function guestMiddleware (req, res, next){
  if (req.session.userLogged){
      return res.redirect("/users/userProfile")/*crear vista de perfil*/ 
  }
  next();
}

module.exports = guestMiddleware