const EventEmitter=require("events");
class MyEventEmitter extends EventEmitter{}

const myEvent=new MyEventEmitter();

function fn1(params){
    console.log(111,params);
}

function fn2(params){
    console.log(222,params);
}

function fn3(params){
    console.log(333,params);
}

//事件绑定
/* 
    参数1：事件名称（随意书写）
    参数2：绑定的事件函数
*/
myEvent.addListener("handle",fn1);
myEvent.addListener("hand",fn2);
myEvent.addListener("handle",fn3);

//解绑单个
myEvent.removeListener("handle",fn1);
/* 
    解绑fn1后输出
    333 zhangsan
    222 lisi
*/
//解绑同一个事件名称的函数
myEvent.removeAllListeners("handle");
/* 
    输出222 lisi
*/

//传参
/* 
    参数1：事件名称
    参数2：需要给绑定函数传的参数
    解绑前输出
    111 zhangsan
    222 lisi
    333 zhangsan
*/
myEvent.emit("handle","zhangsan");
myEvent.emit("hand","lisi");


