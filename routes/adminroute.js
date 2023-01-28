const router = require("express").Router();
const ValidUser = require("../models/validUser");
//Admin Dashboard
router.get("/", (req, res) => {
  //based on whether one is logged in as an admin, we redirect them to either login page or to dashboard
  if (!req.user) {
    return res.redirect("/admin/login");
  }
  if (req.user.userType === "admin") {
    return res.redirect("/admin/dashboard");
  }
  res.redirect("/admin/login");
});
router.get("/dashboard", checkAdminPrivilege, async (req, res) => {
  //Pass students,teachers and admins object
  try {
    const users = await ValidUser.find({});
    const students = users.filter((user) => user.userType === "student");
    const teachers = users.filter((user) => user.userType === "teacher");
    const admins = users.filter((user) => user.userType === "admin");
    res.render("auth/adminDashboard", { students, teachers, admins, req });
  } catch {
    res.status(500).send("Problem with server");
  }
});

router.get("/login", (req, res) => {
  res.render("auth/login",{req});
});
router.get("/users", (req, res) => {
  res.render("auth/users");
});
//Form for admin to add users
router.get("/users/new", (req, res) => {
  res.render("auth/newUser.ejs");
});

//Taking the form data submitted by the admin
router.post("/users", (req, res) => {
  const { fullName, email, phoneNumber, userType } = req.body;
  //Check to see whether a user by that email or phoneNumber already exists in our validUsers collection
  ValidUser.findOne({ email: email }, (err, validUser) => {
    if (err) {
      console.log(err);
    }
    //If user is already listed
    if (validUser) {
      //We will render the route the user to admin/dashboard
      return res.render("auth/newUser", {
        flashMessage: "User with this email already in database",
        fullName,
        email,
        phoneNumber,
        userType,
      });
    }

    ValidUser.findOne({ phoneNumber }, async (err, validUser) => {
      if (validUser) {
        return res.render("auth/newUser", {
          flashMessage: "User with that phone number already in database",
          fullName,
          email,
          phoneNumber,
          userType,
        });
      } else {
        const newValidUser = new ValidUser({
          fullName,
          email,
          phoneNumber,
          userType,
        });
        await newValidUser.save();
        //Redirect to the /admin/users where there are all users listed along with a flash message.
        req.session.currentTab = newValidUser.userType;
        res.redirect("/admin/dashboard");
      }
    });
    //If admin is adding a new valid user
  });
});
async function checkAdminPrivilege(req, res, next) {
  try {
    if (req.user.userType === "admin") {
      return next();
    }
  } catch {
    return res.redirect("/admin/login");
  }
  res.redirect("/admin/login");
}
module.exports = router;
