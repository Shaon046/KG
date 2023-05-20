const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWTSECRET = process.env.JWTSECRET;

//This middleware function would only execute when there any AUTH Token receive in header

const verifyToken = (req, res, next) => {
  ////// if requested url is not "/LOGIN " then token required



  ////Find requested URL
  let URL = req.originalUrl;
  let loginRequest = URL === "/login";
  let signupRequest = URL === "/signup";

  if (req.headers["authorization"]) {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWTSECRET);
      const authenticatedUserEmail = decoded.email;
      req.body.authenticatedUser = authenticatedUserEmail;
      console.log("Token is valid");
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  ///////if login request or signup request token is not required
  if (!req.headers["authorization"] && !loginRequest && !signupRequest) {
    return res.status(403).send("A token is required for authentication");
  }
  next();
};

module.exports = verifyToken;

/////////////////catch (err) {
//  return res.json({ message: "Invalid Token" });
//  return next();
// }
