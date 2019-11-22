const express=require("express");
const router=express.Router();

const uploadControll=require("../controller/upload");

router.post("/urlImage",uploadControll.uploadImage);

module.exports=router;