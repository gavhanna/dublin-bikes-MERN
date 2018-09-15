const express = require("express");
const mongoose = require("mongoose");

var users = require('./routes/api/users');
var locations = require('./routes/api/locations');

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("ok"));

// User Routes
app.use("/api/users", users);
app.use("/api/locations", locations);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
