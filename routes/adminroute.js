const router = require("express").Router();
const ValidUser = require("../models/validUser");
//Admin Dashboard
router.get("/", (req, res) => {
  res.render("auth/adminDashboard");
});

router.get("/users", (req, res) => {
  res.render("auth/users");
});
//Form for admin to add users
router.get("/users/new", (req, res) => {
  res.render("auth/newUser.ejs");
});

//Taking the form data submitted by the admin
router.post("/users/new", (req, res) => {
  const { fullName, email, phoneNumber, userType } = req.body;
  //Check to see whether a user by that email or phoneNumber already exists in our validUsers collection
  ValidUser.findOne({ email: email }, (err, validUser) => {
    if (err) {
      console.log(err);
    }
    //If user is already listed
    if (validUser) {
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
        res.redirect("/admin/users");
      }
    });
    //If admin is adding a new valid user
  });
});

module.exports = router;
