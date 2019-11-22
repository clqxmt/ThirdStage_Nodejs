const multer=require("../utils/upload");

const uploadImage=(req,res)=>{
    multer(req,res,(err)=>{
        // console.log(req.body)
        if(err){
            res.json({
                code:200,
                errMes:"",
                data:{
                    url:"http://img2.imgtn.bdimg.com/it/u=2581204526,1641464124&fm=26&gp=0.jpg",
                    info:"服务器错误",
                    status:0
                }
            })
        }else{
            res.json({
                code:200,
                errMes:"",
                data:{
                    url:"http://localhost:3000/img/"+req.files.booksImage[0].filename,
                    info:"上传成功",
                    status:1
                }
            })
        }
    })
    
}

module.exports={
    uploadImage
}