const booksModel=require("../model/books");

const addBooks=async (req,res)=>{
    let {booksAuth,booksName,booksStatus,booksPrice,booksImage}=req.body;
    let booksData=await booksModel.addBooks({booksAuth,booksName,booksStatus,booksPrice,booksImage});
    if(booksData.length){
        res.json({
            code:200,
            errMes:"",
            data:{
                info:"添加成功",
                status:1,
            }
        })
    }else{
        res.json({
            code:200,
            errMes:"",
            data:{
                info:"添加失败",
                status:0
            }
        })
    }
}

//查找所有显示的书籍
const findAllBooks=async(req,res)=>{
    let booksData=await booksModel.findAllBooks();
    if(booksData.length){
        res.json({
            code:200,
            errMes:"",
            data:{
                list:booksData,
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

//查询每页显示的书籍
const findBooks=async (req,res)=>{
    let {page,limit}=req.query;
    
    let booksData=await booksModel.findBooks(page,limit);
    // console.log(booksData);
    if(booksData.length){
        res.json({
            code:200,
            errMes:"",
            data:{
                list:booksData,
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMes:"",
            data:{
                info:"服务器错误",
                status:0
            }
        })
    }
}

//保存修改后的数据
const updateBooks=async(req,res)=>{
    let {id,booksAuth,booksName,booksStatus,booksPrice,booksImage}=req.body;
    let booksData=await booksModel.updateBooks(id,{booksAuth,booksName,booksStatus,booksPrice,booksImage});
    // console.log(booksData);//输出{ ok: 1, nModified: 1, n: 1 }
    if(booksData.ok===1){
        res.json({
            code:200,
            errMes:"",
            data:{
                info:"修改成功",
                status:1,
            }
        })
    }else{
        res.json({
            code:200,
            errMes:"",
            data:{
                info:"修改失败",
                status:0,
            }
        })
    }
}

//删除
const deleteBooks=async(req,res)=>{
    let {id}=req.query;
    let booksData=await booksModel.deleteBooks(id);
    if(booksData.ok===1){
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

//根据书籍状态查询数据
const findByStatus=async(req,res)=>{
    let {status}=req.query;
    let booksData=await booksModel.findByStatus(status);
    if(booksData.length){
        res.json({
            code:200,
            errMes:"",
            data:{
                list:booksData,
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMes:"",
            data:{
                list:[],
                status:0
            }
        })

    }
}

//根据用户输入的关键字进行模糊查询
const search=async(req,res)=>{
    let {keyword}=req.query;
    let booksData=await booksModel.search(keyword);
    if(booksData.length){
        res.json({
            code:200,
            errMes:"",
            data:{
                list:booksData,
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMes:"",
            data:{
                list:[],
                info:"未找到相关数据",
                status:0
            }
        })
    }
}

//用户点击搜索框下拉列表中的数据时
const searchBooks=async(req,res)=>{
    let {value}=req.query;
    console.log(value);
    let booksData=await booksModel.searchBooks(value);
    console.log(booksData)
    if(booksData.length){
        res.json({
            code:200,
            errMes:"",
            data:{
                list:booksData,
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMes:"",
            data:{
                list:[],
                info:"没有找到相关书籍",
                status:0
            }
        })
    }
}
module.exports={
    addBooks,
    findBooks,
    updateBooks,
    deleteBooks,
    findAllBooks,
    findByStatus,
    search,
    searchBooks
}