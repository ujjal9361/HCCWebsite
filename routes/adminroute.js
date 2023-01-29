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
router.get("/dashboard", async (req, res) => {
  //Pass students,teachers and admins object
  try {
    const users = await ValidUser.find({});
    const students = users.filter((user) => user.userType === "student");
    const teachers = users.filter((user) => user.userType === "teacher");
    const admins = users.filter((user) => user.userType === "admin");
    return res.render("auth/adminDashboard", {
      students,
      teachers,
      admins,
      req,
    });
  } catch {
    res.status(500).send("Problem with server");
  }
});

router.get("/login", (req, res) => {
  res.render("auth/login", { req });
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
      req.session.errorObject = {
        hasError: true,
        errorMessage: "User with that email already in database",
        fullName,
        email,
        phoneNumber,
        userType,
      };
      return res.redirect("/admin/dashboard");
    }

    ValidUser.findOne({ phoneNumber }, async (err, validUser) => {
      if (validUser) {
        req.session.errorObject = {
          hasError: true,
          errorMessage: "User with that phoneNumber already in database",
          fullName,
          email,
          phoneNumber,
          userType,
        };
        return res.redirect("/admin/dashboard");
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

//Updating an user
router.get("/users/:id/edit", (req, res) => {
  res.send(`Edit page for user with id ${req.params.id}`);
});

//Deleting an user
router.delete("/users/:id", async (req, res) => {
  try {
    const toBeDeleted = await ValidUser.findById(req.params.id);
    req.session.currentTab = toBeDeleted.userType;
    await toBeDeleted.delete();
    res.redirect("/admin/dashboard");
  } catch (e) {
    res.send(JSON.parse(e));
  }
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
