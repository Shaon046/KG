const User = require("../../Schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const login = async (req, res) => {
  const JWTSECRET = process.env.JWTSECRET;

  try {
    ////if token is valid , It would not check user crediantial
    ////// req.body.authenticatedUser we are getting this from JWT_Auth middleware
    if (req.body.authenticatedUser) {
      const user = await User.findOne({ email: req.body.authenticatedUser });
      let { firstname, lastname, phone, email } = user;
      res.status(200).json({ firstname, lastname, phone, email });
    }

    //////else we would verify and create a token
    else {
      if (!(req.body.email || req.body.phone) && !req.body.password) {
        res.status(404).json({ message: "require all details" });
      } else {
        let user;

        if (req.body.email) {
          user = await User.findOne({ email: req.body.email });
        }
        if (!req.body.email && req.body.phone) {
          user = await User.findOne({ phone: req.body.phone });
        }

        if (user) {
          const passwordToCompair = req.body.password.toString();
          const storedPassword = user.password;

          const match = await bcrypt.compare(passwordToCompair, storedPassword);

          if (match) {
            const { firstname, lastname, phone, email } = user;

            //// Creating token
            const token = jwt.sign({ email: user.email }, JWTSECRET, {
              expiresIn: "1000h",
            });

            ////we sending token in cookie
            res
              .cookie("auth", token)
              .status(200)
              .json({ firstname, lastname, phone, email });
          }
          user && !match && res.status(402).json({ message: "wrong password" });
        }
        !user && res.status(401).json({ message: "user not found" });
      }
    }
  } catch (err) {
    throw (err, console.log(err.message));
  }
};

module.exports = { login: login };
