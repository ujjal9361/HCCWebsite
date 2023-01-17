const ValidUser = require("./models/validUser");
function isTeacherOrAdmin(req, res, next) {
  if (
    req.session.isAuthenticated == "teacher" ||
    req.session.isAuthenticated == "teacher"
  ) {
    next();
  } else {
    res.redirect("/");
  }
}
async function deSerializeUser(req, res, next) {
  //If there is userId property set, we will fetch the object from the mongodb collection and attach it to req object
  if (typeof req.session.userId != "undefined") {
    try {
      let validUser = await ValidUser.findOne({ _id: req.session.userId });
      req.user = validUser;
    } catch (err) {
      console.log(err);
    }
  }
  next();
}
module.exports = { isTeacherOrAdmin, deSerializeUser };
