const router = require("express").Router();
const ValidUser = require("../models/validUser");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("homepage", { RenderingURL: req.originalUrl });
});

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res) => {
  //Check whether the details provided by user is present in our database
  //We will just use the presence or absence of the details in our database
  //to verify the user but later we will also verify through email address messaging
  ValidUser.findOne({ email: req.body.email }, (err, validUser) => {
    if (err) {
      return console.log(err);
    }
    if (!validUser) {
      return res.render("auth/signup", {
        flashMessage: "User credentials not in database",
        ...req.body,
      });
    }
    ValidUser.findOne({ fullName: req.body.fullName }, (err, validUser) => {
      if (err) {
        return console.log(err);
      }
      if (!validUser) {
        return res.render("auth/signup", {
          flashMessage: "User credentials not in database",
          ...req.body,
        });
      } else {
        ValidUser.findOne(
          { phoneNumber: req.body.phoneNumber },
          async (err, validUser) => {
            if (err) {
              console.log(err);
            } else {
              if (!validUser) {
                res.render("auth/signup", {
                  flashMessage: "User credentials not in database",
                  ...req.body,
                });
              } else {
                if (req.body.password.length < 8) {
                  res.render("auth/signup", {
                    flashMessage: "Password should be at least 8 characters",
                    ...req.body,
                  });
                } else {
                  //savePassword
                  if (validUser.password) {
                    return res.render("auth/signup", {
                      flashMessage:
                        "User with these credentials already signed up..Login Instead",
                      ...req.body,
                    });
                  }
                  validUser.password = await bcrypt.hash(req.body.password, 10);
                  await validUser.save();
                  res.redirect("/login");
                }
              }
            }
          }
        );
      }
    });
  });
});

router.get("/login", (req, res) => {
  res.render("auth/login", { req });
});
router.post("/login", (req, res) => {
  //Check for the email and password in database
  ValidUser.findOne({ email: req.body.email }, (err, validUser) => {
    if (err) {
      return console.log(err);
    }
    if (!validUser) {
      return res.render("auth/login", {
        flashMessage:
          "Email not in database..Contact admin to become a valid user",
        ...req.body,
      });
    }
    bcrypt.compare(req.body.password, validUser.password, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (!result) {
          res.render("auth/login", {
            flashMessage: "Incorrect Password",
            ...req.body,
          });
        } else {
          req.session.isAuthenticated = validUser.userType;
          req.session.userId = validUser._id;

          if (validUser.userType == "admin") {
            return res.redirect("/admin/dashboard");
          }
          res.redirect("/");
        }
      }
    });
  });
});
module.exports = router;
