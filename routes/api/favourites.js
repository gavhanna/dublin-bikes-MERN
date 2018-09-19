const express = require("express")
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load favourites model
const Favourites = require("../../models/Favourites");
// load User Model
const User = require('../../models/User');

// @route    GET api/favourites/test
// @desc     Tests favourites route
// @acccess  Public
router.get("/test", (req, res) => {
  res.json({ msg: "WORKING" })
});

// @route    GET api/favourites/
// @desc     Get faves for current user
// @acccess  Private
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  Favourites.findOne({ user: req.user.id })
    .then(favourites => res.json(favourites))
    .catch(err => console.log(err))
});

// @route    POST api/favourites/add
// @desc     Add faves for current user
// @acccess  Private
router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
  const location = parseInt(req.body.location);
  Favourites.findOne({ user: req.user.id })
    .then(favourites => {
      if (!favourites) {
        new Favourites({ user: req.user.id, locations: [location] })
          .save()
          .then(favourite => res.json(favourite));
      } else {
        const newFave = parseInt(location);
        if (favourites.locations.includes(newFave)) {
          res.json({ error: "Location already saved" })
        } else {
          favourites.locations = [...favourites.locations, location];
          favourites.save()
            .then(faves => res.json(location))
            .catch(err => console.log(err))
        }
      }
    })
});

// @route    DELETE api/favourites/remove
// @desc     remove fave for current user
// @acccess  Private
router.delete("/remove/:fave", passport.authenticate("jwt", { session: false }), (req, res) => {
  Favourites.findOne({ user: req.user.id })
    .then(fave => {
      const removeIndex = fave.locations.indexOf(parseInt(req.params.fave));

      fave.locations.splice(removeIndex, 1);
      fave.save().then(fave => res.json(fave.locations))
        .catch(err => res.status(404).json(err));
    })
});

module.exports = router;