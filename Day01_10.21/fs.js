const fs=require("fs");
const path=require("path");

//异步写入
// fs.writeFile("demo.html","demo.html",(err)=>{
//     if(err){
//         console.log("error");
//     }else{
//         console.log("ok");
//     }
// })

//同步写入
// fs.writeFileSync("demo.html","demohtml");

//异步读取
// fs.readFile("list.json",(err,data)=>{
//     console.log(JSON.parse(data));//{ username: 'zhangsan' }
// })

//同步读取
fs.readFileSync("demo.html",(err,data)=>{
    console.log(data);
})

//获取当前路径
let pathurl=__dirname;
console.log(pathurl);//D:\NodeJS\NodeJS\Day01_10.21

//拼接路径
let path_url=path.join(pathurl,"demo.html")
console.log(path_url);//D:\NodeJS\NodeJS\Day01_10.21\demo.html

//读取demo.html中内容
fs.readFile(path_url,(err,data)=>{
    console.log(data);//<Buffer 64 65 6d 6f 68 74 6d 6c>Buffer类型
})