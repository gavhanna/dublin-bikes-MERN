const express = require("express")
const router = express.Router();

// @route    GET api/locations/test
// @desc     Tests locations route
// @acccess  Public
router.get("/", (req, res) => {
  res.json({ msg: "WORKING" })
});

module.exports = router;