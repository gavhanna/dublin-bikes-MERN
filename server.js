const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require('passport');

var users = require('./routes/api/users');
var locations = require('./routes/api/locations');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// Passport
app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

// User Routes
app.use("/api/users", users);
app.use("/api/locations", locations);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
