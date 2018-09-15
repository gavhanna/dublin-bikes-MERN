const express = require("express")
const router = express.Router();

// @route    GET api/users/test
// @desc     Tests users route
// @acccess  Public
router.get("/test", (req, res) => {
  res.json({ msg: "WORKING" })
});

module.exports = router;