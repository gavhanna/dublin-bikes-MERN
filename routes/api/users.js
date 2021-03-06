const express = require("express")
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require("../../validation/register")
const validateLoginInput = require("../../validation/login")


// Load user model
const User = require('../../models/User');

// @route    GET api/users/test
// @desc     Tests users route
// @acccess  Public
router.get("/test", (req, res) => {
  res.json({ msg: "WORKING" })
});

// @route    GET api/users/register
// @desc     Register user
// @acccess  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Vaidation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    });
});

// @route    GET api/users/login 
// @desc     Login user / returning JWT Token
// @acccess  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Vaidation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors)
      }

      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // User Matched
            // JWT payload
            const payload = {
              id: user.id,
              name: user.name,
              email: user.email,
              favourites: user.favourites
            }

            // Sign Token
            jwt.sign(
              payload,
              keys.secretOrKey,
              // { expiresIn: 3600 }, // never expires...
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                })
              })
          } else {
            errors.password = "Password incorrect"
            return res.status(400).json(errors);
          }
        })
    })
});

// @route    GET api/users/current 
// @desc     Return current user
// @acccess  Private
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    favourites: req.user.favourites
  })
});

module.exports = router;