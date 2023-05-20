const User = require("../../Schema/userSchema");
const bcrypt = require("bcrypt");

//SIGNUP

const userSignup = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (await userExist) {
      res.status(400).json({ message: "user already exist" });
      res.end();
    } else {
      const password = await req.body.password.toString();

      ////PASSWORD HASHING
      const saltRounds = 10;

      
      let hashedPassword = await  bcrypt.hash(password, saltRounds)
        
      console.log(hashedPassword)

      ////STORED HASHED USER


      const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword, 
      };

      !userExist && new User(user);

      res.status(200).json(user);
    }
  } catch (err) {
    throw (err, res.status(400).json({ ERROR: err.message })),console.log(err.message)
  }
};

module.exports = { userSignup: userSignup };
