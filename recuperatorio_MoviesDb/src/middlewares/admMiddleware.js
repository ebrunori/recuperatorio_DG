function admMiddleware (req, res, next){
  if (req.session.userLogged.rol == 0){
      return res.render("errorAdm") 
  }
  next();
}

module.exports = admMiddleware