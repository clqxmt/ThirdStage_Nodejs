const mongoose=require("mongoose");

const Books=mongoose.model("book",{
    booksAuth:String,
    booksName:String,
    booksStatus:String,
    booksPrice:Number,
    booksImage:String
})

//添加书籍
const addBooks=(booksInfo)=>{
    let books=new Books(booksInfo);
    return books.save();
}


//查询
const findBooks=(page,limit)=>{
    page=Number(page);
    limit=Number(limit);
    return Books.find().skip((page-1)*limit).limit(limit);
}

//查询所有书籍
const findAllBooks=()=>{
    return Books.find();
}

//修改书籍信息
const updateBooks=(id,booksInfo)=>{
    return Books.update({_id:id},booksInfo);
}

//删除
const deleteBooks=(id)=>{
    return Books.remove({_id:id});
}

//根据状态查询信息
const findByStatus=(status)=>{
    return Books.find({booksStatus:status});
}

//根据用户输入的关键字进行查询
const search=(keyword)=>{
    var reg=new RegExp(keyword,"g");
    return Books.find({booksName:reg},{booksName:1});
}

const searchBooks=(value)=>{
    var reg=new RegExp(value,"g");
    return Books.find({booksName:reg});
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