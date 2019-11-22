const qs=require("querystring");
//作用：做字符串的解析

/* 
    *querystring.parse():将字符串解析成对象
        参数1：字符串
        参数2：分割符
        参数3：赋值符
    

    *querystring.stringify():将对象转换为字符串
        参数1：对象
        参数2：分割符
        参数3：赋值符

    *querystring.escape():转义

    *querystringify.unescape():反转义
*/

// let str="username%Alley@age%20";
// console.log(qs.parse(str,"@","%"));

// let obj={username:"Alley",age:20};
// console.log(qs.stringify(obj,"!","$"));

//转义
// let str="username=age=sex=20";
// const url=require("url");
// let urlpath="http://www.baidu.com/s?"+qs.escape("username=age=sex")+"=20";
// console.log(url.parse(urlpath,true));

//反转义
console.log(qs.unescape("username%3Dage%3Dsex"));
