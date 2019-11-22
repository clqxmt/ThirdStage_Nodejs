const multer=require("multer");


//磁盘存储引擎：diskStorage，可以控制文件的存储
//destination 是用来确定上传的文件应该存储在哪个文件夹中
//filename 用于确定文件夹中的文件名的确定。
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img');
    },
    filename: function (req, file, cb) {
        console.log(file);
      cb(null, Date.now()+ '-' +file.originalname );
    }
  })
  
  //使用配置
  var upload = multer({ storage: storage });

  //设置当前字段可以上传多少张图片
  var cpUpload = upload.fields([{ name: 'booksImage', maxCount: 9 }]);

  module.exports=cpUpload;