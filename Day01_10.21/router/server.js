const http=require("http");
const fs=require("fs");
const path=require("path");

/* 
    路由：根据用户请求路径的不同，返回不同的页面或数据

    前端路由：根据用户请求的路径，展示不同的数据，
            前端路由是不会经过后端的，页面也不会经过刷新，
            一般情况下都是用来做SPA单页面开发

    后端路由：根据用户请求路径的不同，返回不同的页面或者数据，
            后端路由一般情况下都用来做接口，根据用户请求的路径返回不同的数据
            

*/

const server=http.createServer((req,res)=>{
    if(req.url==="/"){
        res.writeHead(200,{"content-type":"text/html;charset=utf8"});
        fs.readFile(path.join(__dirname,"./html/index.html"),(err,data)=>{
            res.end(data);
        });
        
    }else if(req.url==="/css/index.css"){
        res.writeHead(200,{"content-type":"text/css;charset=utf8"});
        console.log(path.join(__dirname,"./css/index.css"));
        fs.readFile(path.join(__dirname,"./css/index.css"),(err,data)=>{
            res.end(data);
        })
    }else if(req.url==="/js/index.js"){
        res.writeHead(200,{"content-type":"application/x-javascript;charset=utf8"});
        fs.readFile(path.join(__dirname,"./js/index.js"),(err,data)=>{
            res.end(data);
        })
    }
})
server.listen(3000,()=>{
    console.log("启动成功");
})