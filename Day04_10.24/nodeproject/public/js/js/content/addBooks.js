class AddBooks {
    constructor() {
        this.content = $(".content");
        this.init();
        
    }
    init() {
        this.createHtml();
        
    }
    createHtml() {
        this.content.html(AddBooks.html);
        this.fileChange();
        this.clickAddBtn();
    }

    //上传图片
    fileChange(){
        this.content.find("#booksImage").on("change",this.handleFileChange.bind(this));
    }
    handleFileChange(){
        //获取到图片的信息
        let file=this.content.find("#booksImage")[0].files[0];
        /* 
            File {  name: "2018-2019学年校历第二学期.jpg", 
                    lastModified: 1528883610915, 
                    lastModifiedDate: Wed Jun 13 2018 17:53:30 GMT+0800 (中国标准时间), 
                    webkitRelativePath: "", size: 84299, …}
        */
        //模拟form上传
        let formData=new FormData();
        formData.append("booksImage",file);
        // console.log(file);

        $.ajax({
            type:"post",
            url:"/upload/urlImage",
            data:formData,
            contentType:false,
            processData:false,
            cache:false,
            success:this.handleSuccess.bind(this)
        })
    }
    handleSuccess(data){
        // console.log(data);
        if(data.data.status==1){
            this.content.find(".upload").attr("data-url",data.data.url);
            let img=$("<img/>");
            img.attr("src",data.data.url);
            img.css({width:90,height:120});
            this.content.find(".upload div").html(img);

        }
    }

    clickAddBtn(){
        this.content.find("#books-form").on("submit",this.handleClickAddBtn.bind(this));
    }
    handleClickAddBtn(e){
        e.preventDefault();
        let booksAuth=this.content.find("#booksAuth").val();
        let booksName=this.content.find("#booksName").val();
        let booksStatus=this.content.find("#booksStatus").val();
        let booksPrice=this.content.find("#booksPrice").val();
        let booksImage=this.content.find(".upload").attr("data-url");
        
        // console.log(booksAuth,booksName,booksStatus,booksPrice,booksImage);
        if(/^\w.*/g.test(booksAuth) && /^\w.*/g.test(booksName) && /^\w.*/g.test(booksStatus) && /^\d*$/g.test(gbooksPrice) && /^\w.*/g.test(booksImage)){
            $.ajax({
                type:"post",
                url:"/books/addBooks",
                data:{
                    booksAuth,
                    booksName,
                    booksStatus,
                    booksPrice,
                    booksImage
                },
                success:this.handleAddSuccess.bind(this)
            })
        }else{
            alert("以上所有内容不能为空");
        }
    }
    handleAddSuccess(data){
        if(data.data.status===1){
            alert(data.data.info);
            new Slider().handleClickLi(1);
        }else{
            alert(data.data.info);
        }
    }
}
AddBooks.html = `
    <div class="books-form">
        <form id="books-form">
            <div class="form-group">
                <label for="booksAuth">书籍作者</label>
                <input type="text" class="form-control" id="booksAuth" placeholder="请输入书籍作者">
            </div>
            <div class="form-group">
                <label for="booksName">书籍名称</label>
                <input type="text" class="form-control" id="booksName" placeholder="请输入书籍名称">
            </div>
            <div class="form-group">
                <label for="booksStatus">书籍状态</label>
                <select id="booksStatus" class="form-control" >
                    <option>连载中</option>
                    <option>已完结</option>
                </select>
            </div>
            <div class="form-group">
            <label for="booksPrice">书籍价格</label>
            <input type="number" class="form-control" id="booksPrice" placeholder="请输入书籍价格">
            </div>
            <div class="form-group upload">
                <div><label for="booksImage">上传图片</label></div>
                <input type="file" id="booksImage">
            </div>

            <button type="submit" class="btn btn-primary" class="books-btn">添加书籍</button>
        </form>
    </div>
`