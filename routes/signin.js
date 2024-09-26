var express = require("express");
var router = express.Router();

const jwt = require("jsonwebtoken");

let db = {
  your_username: { username: "your_username", password: "your_password" },
};

router.post("/", async (req, res, next) => {
  let { username, password } = req.body;

  let existingUser;
  try {
    existingUser = db[username];
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  if (!existingUser || existingUser.password != password) {
    const error = Error("Wrong details please check at once");
    return next(error);
  }
  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: {
      userId: existingUser.id,
      email: existingUser.email,
      token: token,
    },
  });
});

module.exports = router;
