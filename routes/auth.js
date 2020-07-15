var express = require('express');
var router = express.Router();
const userModel = require("../models/User");
const { get } = require('http');

router.get("/signup", (req, res, next) => {
    res.render("/auth/signup");
});

router.post("/signup", async (req, res, next) => {

    res.redirect("/");
});

router.get("/signin", (req, res, next) => {
    res.render("/auth/signin");
});

router.post("/signin", async (req, res, next) => {

    res.redirect("/");
});
