const mongoose=require("mongoose");

const Articles=mongoose.model("article",{
    articleTitle:String,
    articleContent:String,
    articleTime:String
})

//查找所有文章数据
const findArticle=(page,limit)=>{
    page=Number(page);
    limit=Number(limit);
    return Articles.find().skip((page-1)*limit).limit(limit);
}

//添加文章
const addArticle=(articleInfo)=>{
    if(articleInfo){
        let articles=new Articles(articleInfo);
        return articles.save(); 
    }
}

//修改文章信息
const updateArticle=(id,articleInfo)=>{
    return Articles.update({_id:id},articleInfo);
}

//删除文章
const deleteArticle=(id)=>{
    return Articles.remove({_id:id});
}

//查询所有文章
const findAllArticle=()=>{
    return Articles.find();
}

//显示文章内容
const showContent=(id)=>{
    return Articles.findOne({_id:id});
}
module.exports={
    findArticle,
    addArticle,
    updateArticle,
    deleteArticle,
    showContent,
    findAllArticle
}