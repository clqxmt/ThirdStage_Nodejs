const mongoClient = require("mongodb").MongoClient;

//定义连接的地址
const db_path="mongodb://127.0.0.1:27017";

//定义连接的数据库
const db_name="bk1917";

mongoClient.connect(db_path,(err,client)=>{
    if(err){
        console.log("连接错误");
    }else{
        console.log("连接成功");
        let students=client.db(db_name).collection("students");

        students.save({username:"张三",age:100},(err,data)=>{

        });

        students.remove({username:"张三"});

        students.update({username:"胡歌"},{$set:{username:"李四"}});

        students.find().toArray((err,data)=>{
            console.log(data);
        })
    }
})