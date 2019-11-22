
class Login{
    constructor(container){
        this.container=container;
        this.init();
    }
    init(){
        this.createForm();
        
    }
    createForm(){
        this.container.html(Login.html);
        this.skipRegister();
        this.clickLogin();
    }

    skipRegister(){
        this.container.find(".text-info").click(this.handleSkipRegister.bind(this));
    }

    handleSkipRegister(){
        new Page().createForm(false);
    }

    clickLogin(){
        this.container.find(".form-btn").click(this.handleClickLogin.bind(this));

    }

    handleClickLogin(e){
      e.preventDefault();  
      let username=this.container.find("#form-username").val();
      let password=this.container.find("#form-password").val();
      $.ajax({
          type:"POST",
          url:"/users/login",
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
            Cookies.set('username',this.container.find("#form-username").val() , { expires: 7, path: '' });
            if(Cookies.get("token")){
                window.location.href="http://localhost:3000/html/list.html";
            }else{
                window.location.href="http://localhost:3000";
            }
           
        }else{
            alert(data.data.info);
        }
    }
}
Login.html=`
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
<p class="text-info">没有账号，立即注册</p>
<button type="submit" class="btn btn-primary form-btn">登录</button>
</form>

`