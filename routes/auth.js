var express = require("express");
const bcrypt = require("bcrypt");
var router = express.Router();
const userModel = require("../models/User");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res, next) => {
  const user = req.body;

  if (!user.email || !user.password) {
    req.flash("error", "Please fill all information");
    return res.redirect("/signup");
  } else {
    userModel
      .findOne({ email: user.email })
      .then((dbRes) => {
        if (dbRes) {
          req.flash("error", "An account already exists with this email");
          return res.redirect("/signup");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(user.password, salt);
        user.password = hashed;

        userModel.create(user).then(() => {
          req.flash("success", "Your account has been created");
          res.redirect("/signin");
        });
      })
      .catch(next);
  }
});

router.get("/signin", (req, res, next) => {
  res.render("auth/signin");
});

router.post("/signin", async (req, res, next) => {
  const user = req.body;

  if (!user.email || !user.password) {
    req.flash("error", "Please enter your email and password");
    return res.redirect("/signin");
  }

  userModel
    .findOne({ email: user.email })
    .then((dbRes) => {
      if (!dbRes) {
        req.flash("error", "Wrong credentials");
        return res.redirect("/signin");
      }
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        const { _doc: clone } = { ...dbRes };

        delete clone.password;

        req.session.currentUser = clone;
        return res.redirect("/");
      } else {
        req.flash("error", "Wrong credentials");
        return res.redirect("/signin");
      }
    })
    .catch(next);
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
