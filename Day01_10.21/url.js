const url=require("url");

//操作URL地址的转换
/* 
    *url.parse():将一个url地址转换为一个urlObject
        参数1：url地址
        参数2：如果值为true则代表将query(GET请求参数)解析成一个对象

    *url.format:将一个URLObject转换为一个url地址
*/
let urlPath="https://www.baidu.com/s?wd=node&rsv_spt=1&rsv_iqid=0xcc559f7b0002150d&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&oq=%25E7%258E%2589%25E4%25BC%25AF&inputT=894&rsv_t=e3e1AS%2FsjZ7O5uSt6t0c0WauvFK%2BMt4bu4n02cLvpIzbWokEmdy5cUrQ2rfWVYps2wTI&rsv_pq=a30436bf00012df8&rsv_sug3=30&rsv_sug1=35&rsv_sug7=100&rsv_sug2=0&rsv_sug4=894&rsv_sug=1";
let urlObject=url.parse(urlPath,true);
console.log(urlObject);

console.log(url.format(urlObject));

