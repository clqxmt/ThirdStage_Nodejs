class Register{
    constructor(container){
        this.container=container;
        this.init();
    }
    init(){
        this.createForm();
    }
    createForm(){
        this.container.html(Register.html);
        this.skipLogin();
        this.clickRegister();
    }

    skipLogin(){
         this.container.find(".text-info").click(this.handleSkipLogin.bind(this));

    }
    handleSkipLogin(){
        new Page().createForm(true);
    }

    clickRegister(){
        this.container.find(".form-btn").click(this.handleClickRegister.bind(this));
    }

    handleClickRegister(e){
        e.preventDefault();
        let username=this.container.find("#form-username").val();
        let password=this.container.find("#form-password").val();
        $.ajax({
            type:"post",
            url:"/users/register",
            data:{
                username,
                password
            },
            success:this.handleSuccess.bind(this)
        })
    }

    handleSuccess(data){
        if(data.data.status===1){
            alert(data.data.info);
            new Page().createForm(true);
        }else{
            alert(data.data.info);
        }
    }
}
Register.html=`
<div class="form-logo">
<img src="https://cas.1000phone.net/cas/images/login/logo.png" alt="">
</div>
<form>
<div class="form-group">
    <label for="form-username">用户名</label>
    <input type="text" class="form-control" id="form-username" placeholder="请输入用户名">
</div>
<div class="form-group">
    <label for="form-password">密码</label>
    <input type="password" class="form-control" id="form-password" placeholder="请输入密码">
</div>
<p class="text-info">已有账号，立即登录</p>
<button type="submit" class="btn btn-primary form-btn">注册</button>
</form>

`