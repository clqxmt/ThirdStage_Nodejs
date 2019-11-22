class Paging{
    constructor(data,limit){
        this.data=data;
        this.limit=limit;
        this.content=$(".content");
        this.init();
    }
    init(){
        this.content.find(".paging-nav").remove();
        this.createHtml();
    }
    createHtml(){
        let _html="";
        let sum=Math.ceil(this.data/this.limit);
        _html=`
        <nav aria-label="Page navigation" class="paging-nav">
           
            <ul class="pagination">
            <li>
                <a href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
        `
        
        for(var i=0;i<sum;i++){
           _html+=`
                <li class="paging"><a>${i+1}</a></li>
           `
        }
        _html+=`
                <li>
                    <a href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav> 
        `
        this.content.append(_html);
    }
}
