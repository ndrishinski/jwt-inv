var express = require("express");
var router = express.Router();

const jwt = require("jsonwebtoken");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("signup");
});

let db = {};

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    let newUser = { username, password };
    console.log("NICKY JUST CHECKING ", newUser);
    db[username] = newUser;
    let token;
    try {
      token = jwt.sign(
        {
          username: username,
          password: password,
        },
        "secretkeyappearshere",
        { expiresIn: "1h" }
      );
      console.log("token yoooo: ", db);
      res.status(201).json({
        success: true,
        data: {
          username: username,
          password: password,
          token: token,
        },
      });
    } catch (err) {
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
  } catch (err) {
    console.log("err: ", err);
  }
});

module.exports = router;
