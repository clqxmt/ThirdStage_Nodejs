class Slider {
    constructor() {
        this.lis = $(".slider ul li");
        
    }
    init() {
        this.liEach();
        this.handleClickLi(1);
    }
    liEach(){
        $.each(this.lis,this.handleLiEach.bind(this));
    }
    handleLiEach(index){
        this.lis.eq(index).click(this.handleClickLi.bind(this,index));
    }
    handleClickLi(index) {
        // console.log(index);
        
        this.lis.eq(index).addClass("active").siblings().removeClass("active");
        switch (index) {
            case 0:
                new Home();
                break;
            case 1:
                new BooksList();
                break;
            case 2:
                new AddBooks();
                break;
            case 3:
                new ArticleList();
                break;
            case 4:
                new addArticle();
                break;
            case 5:
                new UserList();
                break;
            default:
                new Home();
                break;
        }
    }
}
new Slider().init();