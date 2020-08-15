const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// Item Model
const User = require("../../models/User");

// @route  POST api/users
// @desc   Register new user
// @access Public
router.post("/", (req, res) => {
  //   res.send("register");
  const { username, email, password } = req.body;

  //Simple validation
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });
    const newUser = new User({
      username,
      email,
      password,
    });

    //Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  username: user.username,
                  email: user.email,
                  password: user.password,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
