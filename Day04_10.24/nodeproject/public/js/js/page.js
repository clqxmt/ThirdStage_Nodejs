
class Page{
    constructor(){
        this.container=$(".form-container");
    }
    init(){
        this.createForm();
    }
    createForm(flag){
        if(flag){
            new Login(this.container);
        }else{
            new Register(this.container);
        }
    }
}
new Page().init()