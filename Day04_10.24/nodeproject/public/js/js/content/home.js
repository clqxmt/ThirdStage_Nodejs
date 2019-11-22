class Home{
    constructor(){
        
        this.content=$(".content");
        this.init();
    }
    init(){
        this.createHtml();
        
    }
    createHtml(){
        this.content.html(Home.html);
        this.setEChars1();
        this.setEChars2();
        this.setEChars3();
        this.setEChars4();
        this.setmainEChars();
    }
    setEChars1(){
        var myChart = echarts.init(document.getElementById('echarts1'));
        var option1 = {
            title: {
                text: '总销售额',
                subtext: '￥126,560'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]
        };
        myChart.setOption(option1);
    }
    setEChars2(){
        var myChart = echarts.init(document.getElementById('echarts2'));
        var option2 = {
            title: {
                text: '访问量',
                subtext: '8,846'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]
        };
        myChart.setOption(option2);
    }
    setEChars3(){
        var myChart = echarts.init(document.getElementById('echarts3'));
        
        var option3 = {
            title: {
                text: '支付笔数',
                subtext: '6,560'
            },
             color: ['#3398DB'],
             tooltip : {
                 trigger: 'axis',
                 axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                     type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                 }
             },
             grid: {
                 left: '3%',
                 right: '4%',
                 bottom: '3%',
                 containLabel: true
             },
             xAxis : [
                 {
                     type : 'category',
                    //  data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                     axisTick: {
                         alignWithLabel: true
                     }
                 }
             ],
             yAxis : [
                 {
                     type : 'value'
                 }
             ],
             series : [
                 {
                     name:'直接访问',
                     type:'bar',
                     barWidth: '50%',
                     
                     data:[10, 52, 200, 334, 390, 330, 220]
                 }
             ]
         };

         //4
        //  app.title = '世界人口总量 - 条形图';

          

        //  myChart.setOption(option1);
         
         myChart.setOption(option3);
         
         
    }
    setEChars4(){
        var myChart = echarts.init(document.getElementById('echarts4'));
        var option4 = {
            title: {
                text: '运营活动效果',
                subtext: '78%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            // legend: {
            //     data: ['2011年', '2012年']
            // },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                // data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230]
                },
                // {
                //     name: '2012年',
                //     type: 'bar',
                //     data: [19325, 23438, 31000, 121594, 134141, 681807]
                // }
            ]
        };
        myChart.setOption(option4);
    }

    setmainEChars(){
        var myChart = echarts.init(document.getElementById('main'));
        
        
        
        var option = {
             color: ['#3398DB'],
             tooltip : {
                 trigger: 'axis',
                 axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                     type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                 }
             },
             grid: {
                 left: '3%',
                 right: '4%',
                 bottom: '3%',
                 containLabel: true
             },
             xAxis : [
                 {
                     type : 'category',
                    //  data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                     axisTick: {
                         alignWithLabel: true
                     }
                 }
             ],
             yAxis : [
                 {
                     type : 'value'
                 }
             ],
             series : [
                 {
                     name:'直接访问',
                     type:'bar',
                     barWidth: '30%',
                     
                     data:[19,23,45,34,52, 200, 334, 390, 330, 220,433,333]
                 }
             ]
         };
         myChart.setOption(option);
    }
}

Home.html=`
<div class="top">
<div class="echarts echarts1">
<div id="echarts1" style="width: 150px;height:150px;"></div>
</div>
<div class="echarts echarts2">
    <div id="echarts2" style="width: 150px;height:150px;"></div>
</div>
<div class="echarts echarts3">
  <div id="echarts3" style="width: 150px;height:150px;"></div>
</div>
<div class="echarts echarts4">
    <div id="echarts4" style="width: 150px;height:150px;"></div>
</div>
</div>
<div class="main" id="main">
    
</div>
`