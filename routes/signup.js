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
    db[username] = newUser;
    let token;
    try {
      token = jwt.sign(
        {
          userId: newUser.id,
          email: newUser.email,
        },
        "secretkeyappearshere",
        { expiresIn: "1h" }
      );
      console.log("token yoooo: ", db);
      res.status(201).json({
        success: true,
        data: {
          userId: newUser.id,
          email: newUser.email,
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
