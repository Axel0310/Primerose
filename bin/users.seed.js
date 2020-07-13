require("dotenv").config();
require("./../config/mongodb");

const userModel = require("./../models/User");

const users = [
  {
    firstName: "Toto1",
    lastName: "Titi1",
    email: "toto1@baz.com",
    password: "fakePassword1",
    profil: "user",
  },
  {
    firstName: "Toto2",
    lastName: "Titi2",
    email: "toto2@baz.com",
    password: "fakePassword2",
    profil: "user",
  },
  {
    firstName: "Toto3",
    lastName: "Titi3",
    email: "toto3@baz.com",
    password: "fakePassword3",
    profil: "user",
  },
];

userModel
  .insertMany(users)
  .then((dbRes) => console.log(dbRes))
  .catch((dbErr) => console.log(dbErr));
