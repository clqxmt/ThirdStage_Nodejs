const userModle=require("../model/user");

//引入加密模块
const crypto = require('crypto');
const tokenUtils=require("../utils/token");

//用户注册
const userRegister= async(req,res)=>{
  let {username,password}=req.body;
  let findData= await userModle.userFind({username});
  if(findData){
    res.json({
        code:200,
        errMes:"",
        data:{
            info:"账号已存在",
            status:0
        }
    })
  }else{
      //用户状态
      let status=true;
      //用户注册时间
      let registerTime=new Date().getTime();

      //用户昵称
      let name =Math.random().toString(36).substr(2,8);
      //用户头像
      let headImg="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3223406197,3935291553&fm=26&gp=0.jpg";
      
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    let saveData=await userModle.userSave({username,password:hash,status,registerTime,name,headImg});
    if(saveData){
        res.json({
            code:200,
            errMes:"",
            data:{
                info:"注册成功",
                status:1
            }
        })
    }
  }
  

  






  /* userModle.userFind({username},(data)=>{
    if(data){
        res.json({
            code:200,
            errMes:"",
            data:{
                info:"账号已存在",
                status:0
            }
        })
    }else{
        userModle.userSave({username,password},()=>{
            
                res.json({
                    code:200,
                    errMes:"",
                    data:{
                        info:"注册成功",
                        status:1
                    }
                })
            
        });
    }
  }) */
}


const userLogin=async (req,res)=>{
    let {username,password}=req.body;
    let findData=await userModle.userFind({username});
    console.log(findData);
    if(findData){
        if(findData.status){
            let hash=crypto.createHash("sha256").update(password).digest('hex');
            if(findData.password===hash){
                
                let token=tokenUtils.sendToken({username});
                //发送一个cookie给客户端
                res.cookie("token",token);

                res.json({
                    code:200,
                    errMes:"",
                    data:{
                        info:"登录成功",
                        status:1
                    }
                })
            }else{
                res.json({
                    code:200,
                    errMes:"",
                    data:{
                        info:"密码输入错误",
                        status:0
                    }
                })
            }
        }else{
            res.json({
                code:200,
                errMes:"",
                data:{
                    info:"账号异常",
                    status:3
                }
            })
        }
    }else{
        res.json({
            code:200,
            errMes:"",
            data:{
                info:"账号不存在",
                status:2
            }
        })
    }
 }


 //查询所有用户
 const findAllUser=async(req,res)=>{
     let userData=await userModle.findAllUser();
     if(userData){
         res.json({
             code:200,
             errMes:"",
             data:{
                 list:userData,
                 status:1
            }
         })
     }else{
         res.json({
             code:200,
             errMes:"",
             data:{
                 list:[],
                 info:"没有查询到数据",
                 status:0
             }
         })
     }
 }

 //显示每页用户信息
 const findUser=async(req,res)=>{
     let {page,limit}=req.query;
     let userData=await userModle.findUser(page,limit);
     if(userData){
         res.json({
             code:200,
             errMes:"",
             data:{
                 list:userData,
                 status:1
             }
         })
     }else{
         res.json({
             code:200,
             errMes:"",
             data:{
                 info:"没有查到数据",
                 list:[],
                 status:0
             }
         })
     }
 }



module.exports={
    userRegister,
    userLogin,
    findUser,
    findAllUser
}