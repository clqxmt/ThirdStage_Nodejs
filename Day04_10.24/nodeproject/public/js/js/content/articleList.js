class ArticleList{
    constructor(){
        this.content=$(".content");
        this.init();
        this.limit=10;
    }
    init(){
        this.createHtml();
    }
    createHtml(){
        this.content.html(ArticleList.html);
        this.renderArticle(1);
        
    }
    //查找所有数据
    findAllArticle(){
        $.ajax({
            type:"get",
            url:"/articles/findAllArticle",
            success:this.handleFindAllArticleSucCb.bind(this)
        })
    }
    handleFindAllArticleSucCb(data){
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
        this.renderArticle(index+1);
    }
    //显示每页的信息
    renderArticle(page){
        $.ajax({
            type:"get",
            url:"/articles/findArticle",
            data:{
                page,
                limit:this.limit
            },
            success:this.handleFindAticleSuccCb.bind(this)
        })
    }
    handleFindAticleSuccCb(data){
       if(data.data.status===1){
            this.list=data.data.list;
            let str="";
            for(var i=0;i<this.list.length;i++){
                str+=`
                    <tr>
                        <td class="articleTitle" data-id="${this.list[i]._id}">${this.list[i].articleTitle}</td>
                        <td id="content">${this.list[i].articleContent}</td>
                        <td data-id="${this.list[i]._id}">
                            <button type="button" class="btn btn-link update" data-toggle="modal" data-target="#articleModal">修改</button>
                            <button type="button" class="btn btn-link delete">删除</button>
                        </td>
                    </tr>
                `
            }
            this.content.find("tbody").html(str);
            this.addUpdateEvent();
            this.saveUpdateArticle();
            this.createEditor();
            this.addDeleteEvent();
            this.eachArticleTitle();
            this.findAllArticle();
       }else{
           if(confirm(data.data.info)){
               window.location.href="http://localhost:3000";
           }
       }
    }

    //点击修改按钮
    addUpdateEvent(){
        $.each(this.content.find(".update"),this.handleAddUpdateEventCb.bind(this));
    }
    handleAddUpdateEventCb(index){
        this.content.find(".update").eq(index).click(this.handleClickUpdate.bind(this,index));
    }
    handleClickUpdate(index){
        this.content.find("#editor .fr-placeholder").remove();
        this.id=this.content.find(".update").eq(index).parent().attr("data-id");
        for(var i=0;i<this.list.length;i++){
            if(this.list[i]._id===this.id){
                this.content.find("#articleTitle").val(this.list[i].articleTitle);
                this.content.find("#editor .fr-view p").html(this.list[i].articleContent);
                break;
            }
            
        }
    }

    saveUpdateArticle(){
        
        this.content.find(".articleSave").click(this.handleSaveUpdateCb.bind(this));
        
    }
    handleSaveUpdateCb(){
        $('#articleModal').modal('toggle');
        let articleTitle=this.content.find("#articleTitle").val();
        let articleContent=this.content.find("#editor .fr-view p").html();
        console.log(articleTitle,articleContent);
        $.ajax({
            type:"post",
            url:"/articles/updateArticle",
            data:{
                id:this.id,
                articleTitle,
                articleContent
            },
            success:this.handleUpdateSuccessCb.bind(this)
        })
    }
    handleUpdateSuccessCb(data){
        if(data.data.status===1){
            alert(data.data.info);
            this.renderArticle();
        }else{
            alert(data.data.info);
        }
    }


    //添加删除事件
    addDeleteEvent(){
        $.each(this.content.find(".delete"),this.handleAddDeleteEventCb.bind(this));
    }
    handleAddDeleteEventCb(index){
        this.content.find(".delete").eq(index).click(this.handleClickDeleteEvent.bind(this,index));
    }
    handleClickDeleteEvent(index){
        var id=this.content.find(".delete").eq(index).parent().attr("data-id");
        $.ajax({
            type:"get",
            url:"/articles/deleteArticle",
            data:{
                id
            },
            success:this.handleDeleteSuccessCb.bind(this)
        })
    }
    handleDeleteSuccessCb(data){
        if(data.data.status===1){
            alert(data.data.info);
            this.renderArticle();
        }else{
            alert(data.data.info);
        }
    }

    //给文章标题articleTitle添加点击事件
    eachArticleTitle(){
        $.each(this.content.find(".articleTitle"),this.handleEachArticleTitleCb.bind(this));
    }
    handleEachArticleTitleCb(index){
        this.content.find(".articleTitle").eq(index).click(this.handleClickTitle.bind(this,index));
    }
    handleClickTitle(index){
        let id=this.content.find(".articleTitle").eq(index).attr("data-id");
        window.location.href="http://localhost:3000/html/content.html?id="+id;
    }
    
    //创建editor
    createEditor(){
        this.editor = new FroalaEditor('#editor');
    }
}
ArticleList.html=`
<table class="table table-striped" id="article-form">
<thead>
    <tr>
        <th>文章标题</th>
        <th id="content">文章内容</th>
        <th>操作</th>
    </tr>
</thead>
<tbody>
    
</tbody>
</table>

<div class="modal fade " tabindex="-1" role="dialog" id="articleModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">修改文章信息</h4>
        </div>
        <div class="modal-body">
           
               <div class="form-group">
                    <label for="articleTitle">文章标题</label>
                    <input type="text" class="form-control" id="articleTitle" placeholder="请输入文章标题">
               </div>
               <div id="editor"></div>
        </div>
        
        
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary articleSave">保存数据</button>
        </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
`