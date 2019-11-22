const mongoose=require("../utils/database");

const User=mongoose.model("user",{
    username:String,
    password:String,
    status:Boolean,
    registerTime:Number,
    name:String,
    headImg:String
})

const userFind=(userInfo)=>{
    return User.findOne(userInfo);//返回一个promise对象
}

const userSave=(userInfo)=>{
    let user = new User(userInfo);
    return user.save()
}

//查询所有的用户
const findAllUser=()=>{
    return User.find();
}

//查询每页的用户信息
const findUser=(page,limit)=>{
    page=Number(page);
    limit=Number(limit);
    return User.find().skip((page-1)*limit).limit(limit);
}

module.exports={
    userFind,
    userSave,
    findUser,
    findAllUser
}