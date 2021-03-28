module.exports = (req, res, next) => {
  if(!req.session.isAdmin) {
    console.log("redirecting to login haha", req.session);
    return res.redirect('/login');
  }
  next();
}