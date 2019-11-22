const http=require("http");

//服务端没有跨域，请求数据时使用服务端代理的方式
let urlApi="http://m.maoyan.com/ajax/movieOnInfoList?token=";

http.get(urlApi,(res)=>{
    let str="";
    res.on("data",(data)=>{
        str+=data;
    })

    res.on("end",()=>{
        console.log(JSON.parse(str));
    })
})