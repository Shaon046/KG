const router = require("express").Router();
const userController = require("../../controller/userController/userLoginController");

router.get("/login", userController.login);

module.exports = router;
