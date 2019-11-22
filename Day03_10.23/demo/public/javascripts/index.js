
window.onload=main;
function main(){
    var _lis=document.getElementsByTagName("li");
    // console.log(_lis);
    for(var i=0;i<_lis.length;i++){
        (function(index){
            _lis[index].onmouseover=function(){
                this.style.boxShadow="0 0 10px #e0e0e0";
                // console.log(this);
            }
            _lis[index].onmouseout=function(){
                this.style.boxShadow="0 0 0";
                // console.log(this);
            }
        })(i);
    }
}