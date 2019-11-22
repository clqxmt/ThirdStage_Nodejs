const jwt=require("jsonwebtoken");
const secret="bk1917";

//签发token
const sendToken=(userInfo)=>{
    return jwt.sign(userInfo,secret,{expiresIn:'1h'});
}

//中间件
const tokenVerfiy=(req,res,next)=>{
    let token=req.cookies.token;
    jwt.verify(token,secret,(err,data)=>{
        if(data){
            next();
        }else{
            res.json({
                code:200,
                errMes:"",
                data:{
                    list:[],
                    info:"token验证失败，请重新登录",
                    status:0
                }
            })
        }
    })
}
module.exports={
    sendToken,
    tokenVerfiy
}