const passport = require("passport");
const express = require("express");

const router = express.Router();

router.get('/google',passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.send("<h1>Successfull login</h1>");
  });

module.exports = router;

