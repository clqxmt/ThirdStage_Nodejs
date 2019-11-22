class BooksList{
    constructor(){
        this.content=$(".content");
        this.init();
        this.limit=10;
    }
    init(){
        this.createHtml();
        
    }
    createHtml(){
        this.content.html(BooksList.html);
        this.renderBooks(1);
        
        this.findByStatus();
        this.search();
        this.sort();
        this.enterDown();
    }

    //查找所有数据
    findAllBooks(){
        $.ajax({
            type:"get",
            url:"/books/findAllBooks",
            success:this.handleFindAllBooksSucCb.bind(this)
        })
    }
    handleFindAllBooksSucCb(data){
        if(data.data.status===1){
            new Paging(data.data.list.length,this.limit);
        }else{
            alert(data.data.info);
        }
        this.addPagingEvents();
    }

    //给分页添加点击事件
    addPagingEvents(){
        $.each(this.content.find("nav .paging"),this.handleAddPagingEventsCb.bind(this));
    }
    handleAddPagingEventsCb(index){
        this.content.find("nav .paging").eq(index).click(this.handleClickPaging.bind(this,index));
    }
    handleClickPaging(index){
        this.renderBooks(index+1);
    }

    //显示书籍列表
    renderBooks(page){
        $.ajax({
            type:"get",
            url:"/books/findBooks",
            data:{
                page,
                limit:this.limit
            },
            success:this.handleRenderBooksSuc.bind(this)
        })
    }
    handleRenderBooksSuc(data){
        
        if(data.data.status===1){
            this.list=data.data.list;
            this.render();
            this.booksUpdate();
            this.booksSave();
            this.deleteBooks();
        }else{
            if(confirm(data.data.info)){
                window.location.href="http://localhost:3000";
            }
        }
    }
    render(){
        let str="";
        for(var i=0;i<this.list.length;i++){
            str+=`
                <tr >
                    <td>${i}</td>
                    <td>${this.list[i].booksAuth}</td>
                    <td>${this.list[i].booksName}</td>
                    <td>${this.list[i].booksStatus}</td>
                    <td style="width:100px;">
                        <img src="${this.list[i].booksImage}">
                    </td>
                    <td>${this.list[i].booksPrice}</td>
                    <td data-id="${this.list[i]._id}">
                        <button type="button" class="btn btn-link update" data-toggle="modal" data-target="#booksModal">修改</button>
                        <button type="button" class="btn btn-link delete">删除</button>
                    </td>
                </tr>
                `
        }
        this.content.find("table tbody").html(str);
        this.findAllBooks();
    }
    //修改
    booksUpdate(){
        this.update=this.content.find(".update");
        $.each(this.update,this.handleBooksUpdate.bind(this));
    }
    handleBooksUpdate(index){
        
        this.update.eq(index).click(this.handleClickUpdateCb.bind(this,index));
    }
    handleClickUpdateCb(index){
        this.id=this.update.eq(index).parent().attr("data-id");
        console.log(this.id);
        for(var i=0;i<this.list.length;i++){
            if(this.list[i]._id===this.id){
                this.content.find("#booksAuth").val(this.list[i].booksAuth);
                this.content.find("#booksName").val(this.list[i].booksName);
                this.content.find("#booksPrice").val(this.list[i].booksPrice);
                this.content.find(".upload").attr("data-url",this.list[i].booksImage);
                if(this.list[i].booksStatus==="连载中"){
                    $("option:contains('连载中')").attr("selected","selected");
                }else{
                    $("option:contains('已完结')").attr("selected","selected");
                }
                let img=$("<img/>");
                img.attr("src",this.list[i].booksImage);
                img.css({width:90,height:120});
                this.content.find(".upload div").html(img);
                break;
            }
        }
        // this.content.find(".modal-body").html(_str);
        this.fileChange();
    }

    //点击保存数据
    booksSave(){
        this.content.find(".booksSave").click(this.handleBooksSaveCb.bind(this));

    }
    handleBooksSaveCb(){
        $('#booksModal').modal('toggle');
        let booksAuth=this.content.find("#booksAuth").val();
        let booksName=this.content.find("#booksName").val();
        let booksStatus=this.content.find("#booksStatus").val();
        let booksPrice=this.content.find("#booksPrice").val();
        let booksImage=this.content.find(".upload").attr("data-url");
        // console.log(booksAuth,booksName,booksStatus,booksPrice,booksImage); 
        
        $.ajax({
            type:"post",
            url:"/books/updateBooks",
            data:{
                id:this.id,
                booksAuth,
                booksName,
                booksStatus,
                booksPrice,
                booksImage
            },
            success:this.handleBooksSaveSucCb.bind(this)
        })
    }
    handleBooksSaveSucCb(data){
        if(data.data.status===1){
            alert(data.data.info);
            this.renderBooks();
        }else{
            alert(data.data.info);
        }
    }

    //删除
    deleteBooks(){
        $.each(this.content.find(".delete"),this.handleDeleteBooksCb.bind(this));
    }
    handleDeleteBooksCb(index){
        this.content.find(".delete").eq(index).click(this.handleClickDeleteCb.bind(this,index));
    }
    handleClickDeleteCb(index){
        let id=this.content.find(".delete").eq(index).parent().attr("data-id");
        $.ajax({
            type:"get",
            url:"/books/deleteBooks",
            data:{
                id
            },
            success:this.handleClickDeleteSuccCb.bind(this)
        })
    }
    handleClickDeleteSuccCb(data){
        if(data.data.status===1){
            alert(data.data.info);
            this.renderBooks();
        }else{
            alert(data.data.info);
        }
    }


    //上传图片
    fileChange(){
        this.content.find("#booksImage").on("change",this.handleFileChange.bind(this));
    }
    handleFileChange(){
        //获取到图片的信息
        let file=this.content.find("#booksImage")[0].files[0];
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


    //根据书籍状态进行查询
    findByStatus(){
        this.content.find("select").change(this.handleFindByStatus.bind(this));
    }
    handleFindByStatus(){
        let status=this.content.find("select").val();
        console.log(status);
        $.ajax({
            type:"get",
            url:"/books/findByStatus",
            data:{
                status
            },
            success:this.handleFindByStatusSuccCb.bind(this)
        })
    }
    handleFindByStatusSuccCb(data){
        this.list=data.data.list;
        this.render();
        new Paging(data.data.list.length,this.limit);
    }

    //搜索
    search(){
        this.content.find(".search").on("input propertychange",this.handleSearchCb.bind(this));
    }
    handleSearchCb(){
        let keyword=this.content.find(".search").val();
        $.ajax({
            type:"get",
            url:"/books/search",
            data:{
                keyword
            },
            success:this.handleSearchSuccCb.bind(this)
        })
    }
    handleSearchSuccCb(data){
        if(data.data.status===1){
            let str="";
            var list=data.data.list;
            for(var i=0;i<list.length;i++){
                str=`
                    <li data-id="${list[i]._id}">${list[i].booksName}</li>
                `
            }
            this.content.find("#searchContent").html(str);
            this.clickSearchLi();
        }else{
            this.content.find("#searchContent").html("没有找到相关书籍");
        }
        if(this.content.find(".search").val()){
            this.content.find("#searchContent").css({"display":"block"});
        }else{
            this.content.find("#searchContent").css({"display":"none"});
        }
    }

    //排序
    sort(){
        
        this.content.find(".sort").click(this.handleSortCb.bind(this));
    }
    handleSortCb(){
        
       if(this.flag===1){
            this.flag=-1;
       }else{
            this.flag=1;
       }
        for( var i=0;i<this.list.length;i++){
            for(var j=0;j<this.list.length-1-i;j++){
                if(this.list[j].booksPrice*this.flag>this.list[j+1].booksPrice*this.flag){
                    let empty=this.list[j];
                    this.list[j]=this.list[j+1];
                    this.list[j+1]=empty;
                }
            }
        }
        this.render();
    }

    //点击搜索出来的结果
    clickSearchLi(){
        $.each(this.content.find("#searchContent li"),this.handleSearchLi.bind(this));
    }
    handleSearchLi(index){
        this.content.find("#searchContent li").eq(index).on("click",this.handleClickLi.bind(this,index));
    }
    handleClickLi(index){
        // let id=this.content.find("#searchContent li").eq(index).attr("data-id");
        // this.content.find(".search").val();
        let value=this.content.find("#searchContent li").eq(index).html();
        this.searchRequest(value);
    }
    searchRequest(value){
        $.ajax({
            type:"get",
            url:"/books/searchBooks",
            data:{
                value
            },
            success:this.handleClickLiSucc.bind(this)
        })
    }
    handleClickLiSucc(data){
        if(data.data.status===1){
            this.list=data.data.list; 
            this.render();
        }else{
            alert(data.data.info);
        }
    }


    //在搜索框中输入内容按下回车进行搜索
    enterDown(){
        this.content.find(".search").on("keydown",this.handleEnterDown.bind(this));
    }
    handleEnterDown(e){
        if(e.keyCode===13){
            let value=this.content.find(".search").val();
            this.searchRequest(value);
        }
    }
}
BooksList.html=`
    <div class="action">
        <select class="form-control">
            <option>已完结</option>
            <option>连载中</option>
        </select>
        <input type="text" placeholder="请输入关键字" class="form-control search">
        <div id="searchContent"></div>
        <button  class="btn btn-primary sort">排序</button>
    </div>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>书籍ID</th>
                <th>书籍作者</th>
                <th>书籍名称</th>
                <th>书籍状态</th>
                <th>书籍图片</th>
                <th>书籍价格</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>

    <div class="modal fade " tabindex="-1" role="dialog" id="booksModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">修改书籍信息</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="booksAuth">书籍作者</label>
                    <input type="text" class="form-control" id="booksAuth">
                </div>
                <div class="form-group">
                    <label for="booksName">书籍名称</label>
                    <input type="text" class="form-control" id="booksName" >
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
                    <input type="number" class="form-control" id="booksPrice">
                </div>
                <div class="form-group upload">
                    <div></div>
                    <input type="file" id="booksImage">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary booksSave">保存数据</button>
            </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
`