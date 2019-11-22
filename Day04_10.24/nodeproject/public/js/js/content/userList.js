class UserList{
    constructor(){
        
        this.content=$(".content");
        this.init();
        this.limit=10;
    }
    init(){
        this.createHtml();
    }
    createHtml(){
        this.content.html(UserList.html);
        this.showUser(1);
        
    }
    //查找所有数据
    findAllUser(){
        $.ajax({
            type:"get",
            url:"/users/findAllUser",
            success:this.handleFindAllUserSucCb.bind(this)
        })
    }
    handleFindAllUserSucCb(data){
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
        // console.log(index);
        this.showUser(index+1);
    }
    //显示每页的数据
    showUser(page){
        $.ajax({
            type:"get",
            url:"/users/findUser",
            data:{
                page:page,
                limit:this.limit
            },
            success:this.handleShowUserSucCb.bind(this)
        })
    }
    handleShowUserSucCb(data){
        if(data.data.status===1){
            
            let str="";
            let status=null;
            let list=data.data.list;
            for(var i=0;i<list.length;i++){
                console.log(list[i].headImg);
                if(list[i].status){
                    status="正常";
                }else{
                    status="已冻结";
                }
                str+=`
                    <tr>
                        <td style="width:100px;" class="headImg">
                            <img src="${list[i].headImg}">
                        </td>
                        <td>${list[i].name}</td>
                        <td>${list[i].username}</td>
                        <td>${list[i].registerTime}</td>
                        <td>${status}</td>
                    </tr>
                    `
               
            }
           
            this.content.find("tbody").html(str);
            this.findAllUser();
        }else{
            if(confirm(data.data.info)){
                window.location.href="http://localhost:3000";
            }
        }
    }
}
UserList.html=`
<table class="table table-striped">
        <thead>
            <tr>
                <th>用户头像</th>
                <th>用户昵称</th>
                <th>用户账号</th>
                <th>注册时间</th>
                <th>用户状态</th>
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
   
`