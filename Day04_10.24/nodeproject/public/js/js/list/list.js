class List{
    constructor(){
        this.header=$(".header");
    }
    init(){
        this.showUser();
        this.logout();
        this.CenterClick();
    }
    showUser(){
        let username=Cookies.get("username");
        this.header.find("#username").html(username);
    }
    logout(){
        this.header.find("#logout").on("click",this.handleLogout.bind(this));
    }
    handleLogout(){
        Cookies.remove("username");
        Cookies.remove("token");
        window.location.href="http://localhost:3000";
    }
    CenterClick(){
        this.header.find("#own").on("click",this.handleCenterClick.bind(this));
    }
    handleCenterClick(){
        
    }
}
new List().init();