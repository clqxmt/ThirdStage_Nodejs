class addArticle{
    constructor(){
        
        this.content=$(".content");
        this.init();
    }
    init(){
        this.createHtml();
        
    }
    createHtml(){
        this.content.html(addArticle.html);
        this.createEditor();
        this.clickAddArticle();
    }
    createEditor(){
        this.editor = new FroalaEditor('#editor');
        // console.log($('#example')[0])
        //     $(function() {
        //         $('#example')[0].froalaEditor({
        //         // Set the language code.
        //         language: 'zh_cn'
        //     })
        // });
        this.updateContent();
    }
    updateContent(){
        this.content.find("#editor .fr-placeholder").html("请输入文章内容");

    }

    //发布文章
    clickAddArticle(){
        this.content.find("#books-form").on("submit",this.handleClickAddArticleCb.bind(this));
    }
    handleClickAddArticleCb(e){
        e.preventDefault();
       
        let articleTitle=this.content.find("#articleTitle").val();
        // this.content.find()
        
        let articleContent=this.content.find("#editor .fr-view p").html();
        if(/^\w.*/g.test(articleTitle) && /^\w.*/g.test(articleContent)){
            $.ajax({
                type:"post",
                url:"/articles/addArticle",
                data:{
                    articleTitle,
                    articleContent
                },
                success:this.handleClickAddArticleSuccCb.bind(this)
            })
        }else{
            alert("文章标题或内容不能为空");
        }
        // console.log(articleTitle,articleContent);
        
    }
    handleClickAddArticleSuccCb(data){
        if(data.data.status===1){
            alert(data.data.info);
            new Slider().handleClickLi(3);
        }else{
            alert(data.data.info);
        }
    }
}
addArticle.html=`
<div class="article">
    <form id="books-form" class="article-form">
        <div class="form-group">
            <label for="articleTitle">文章标题</label>
            <input type="text" class="form-control" id="articleTitle" placeholder="请输入文章标题">
        </div>
        
        <div id="editor"></div>
        <button type="submit" class="btn btn-primary" class="article-btn">发布文章</button>
    </form>
</div>

      
`