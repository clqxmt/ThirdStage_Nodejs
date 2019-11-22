var express = require('express');
var router = express.Router();
const userController=require("../controller/user");
const tokenUtils=require("../utils/token");

router.post("/register",userController.userRegister);

router.post("/login",userController.userLogin);

router.get("/findUser",tokenUtils.tokenVerfiy,userController.findUser);

router.get("/findAllUser",userController.findAllUser);

module.exports = router;
