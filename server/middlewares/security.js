
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/auth'); 
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/homepage'); 
    }
    next();
  }
  
  module.exports = { checkAuthenticated, checkNotAuthenticated };