const express=require("express");

const router=express.Router();
const tokenUtils=require("../utils/token");

const booksController=require("../controller/books");

router.post("/addBooks",booksController.addBooks);

router.get("/findBooks",tokenUtils.tokenVerfiy,booksController.findBooks);

router.post("/updateBooks",booksController.updateBooks);

router.get("/deleteBooks",booksController.deleteBooks);

router.get("/findAllBooks",booksController.findAllBooks);

router.get("/findByStatus",booksController.findByStatus);

router.get("/search",booksController.search);

router.get("/searchBooks",booksController.searchBooks);
module.exports=router;