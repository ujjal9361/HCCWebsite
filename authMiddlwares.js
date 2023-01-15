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

module.exports = { isTeacherOrAdmin };
