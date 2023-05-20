const router = require("express").Router();
const userController = require("../../controller/userController/userSignupController");

router.post("/signup", userController.userSignup);

module.exports = router;
