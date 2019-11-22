const articlesModel=require("../model/articles");

//查找所有文章数据
const findArticle=async(req,res)=>{
    let {page,limit}=req.query;
    let articleData=await articlesModel.findArticle(page,limit);
    if(articleData){
        res.json({
            code:200,
            errMes:"",
            data:{
                list:articleData,
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMes:"",
            data:{
                list:[],
                info:"服务器错误",
                status:0
            }
        })
    }
}

//添加文章
const addArticle=async(req,res)=>{
    let {articleTitle,articleContent}=req.body;
    let articleData=await articlesModel.addArticle({articleTitle,articleContent});
    if(articleData){
        res.json({
            code:200,
            errMes:"",
            data:{
                info:"发布成功",
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMes:"",
            data:{
                info:"发布失败",
                status:0
            }
        })
    }
}


//修改文章信息
const updateArticle=async(req,res)=>{
    let {id,articleTitle,articleContent}=req.body;
    let articleData=await articlesModel.updateArticle(id,{articleTitle,articleContent});
    if(articleData.ok===1){
        res.json({
            code:200,
            errMes:"",
            data:{
                info:"修改成功",
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMes:"",
            data:{
                info:"修改失败",
                status:0
            }
        })
    }
}

//删除文章
const deleteArticle=async(req,res)=>{
    let {id}=req.query;
    let articleData=await articlesModel.deleteArticle(id);
    if(articleData.ok===1){
        res.json({
            code:200,
            errMes:"",
            data:{
                info:"删除成功",
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMes:"",
            data:{
                info:"删除失败",
                status:0
            }
        })

    }
}

//查询所有文章
const findAllArticle=async(req,res)=>{
    let articleData=await articlesModel.findAllArticle();
    console.log(articleData);
    if(articleData){
        res.json({
            code:200,
            errMes:"",
            data:{
                list:articleData,
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

//显示每页文章信息
const showContent=async(req,res)=>{
    let {id}=req.query;
    let articleData=await articlesModel.showContent(id);
    if(articleData){
        res.json({
            code:200,
            errMes:"",
            data:{
                list:articleData,
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMes:"",
            data:{
                list:[],
                info:"没有查询到相关数据",
                status:0
            }
        })
    }
}
module.exports={
    findArticle,
    addArticle,
    updateArticle,
    deleteArticle,
    showContent,
    findAllArticle
}