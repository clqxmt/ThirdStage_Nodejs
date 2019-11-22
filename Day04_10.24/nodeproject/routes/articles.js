const express=require("express");
const articlesController=require("../controller/articles");
const tokenUtils=require("../utils/token");

const router=express.Router();

router.get("/findArticle",tokenUtils.tokenVerfiy,articlesController.findArticle);

router.post("/addArticle",articlesController.addArticle);

router.post("/updateArticle",articlesController.updateArticle);

router.get("/deleteArticle",articlesController.deleteArticle);

router.get("/showContent",articlesController.showContent);

router.get("/findAllArticle",articlesController.findAllArticle);

module.exports=router;