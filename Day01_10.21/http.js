const http=require("http");

const server=http.createServer((req,res)=>{
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    res.writeHead(200,{"content-type":"text/plain;charset=utf8"})
    res.write("123");
    res.write("456");
    res.end("结束");
})

server.listen(9000,()=>{
    console.log("服务启动成功:127.0.0.1");
})


/* 
    req:request  请求
    res:response 响应

    方法
        req.url   请求路径
        req.method 请求的方式
        req.headers  请求头

    方法
        res.end():最后回复-->中断结束的效果
        res.write():回复
        res.statusCode: 状态码
        res.setHeader:设置响应头
        res.writeHead:

    响应头常用的类型：
        text/plain
        text/html
        text/css
        image/png jpg
        application/json
        application/x-javascript

    请求头常用的类型
        application/json
        application/x-www-form-urlencoded
    
*/