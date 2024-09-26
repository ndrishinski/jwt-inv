var express = require("express");
var router = express.Router();

const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("TOKEN: ", token);
  //Authorization: 'Bearer TOKEN'
  if (!token) {
    res.status(200).json({
      success: false,
      message: "Error!Token was not provided.",
    });
  }
  //Decoding the token
  const decodedToken = jwt.verify(token, "secretkeyappearshere");
  console.log("DECODED TOKEN: ", decodedToken);
  res.status(200).json({
    success: true,
    data: {
      username: decodedToken.username,
      password: decodedToken.password,
    },
  });
});

module.exports = router;

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjczODM2NTksImV4cCI6MTcyNzM4NzI1OX0.pSVABDd8QoFRB0RJedRHI_piQEJMPkiZBFFsq5bvasw";
