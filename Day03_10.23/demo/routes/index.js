var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { goods_list:[
    {
      image:"https://img14.360buyimg.com/jdcms/s150x150_jfs/t1/40557/25/8662/215367/5d201edeE213eeb20/b260ed56b6901b70.jpg.webp",
      title:"床 公主床女生单人床1.35田园风格1.5房家具套房组合 808款单床 1350mm*2000mm  不带",
      price:1928.00
    },
    {
      image:"https://img13.360buyimg.com/jdcms/s150x150_jfs/t1/37514/2/9347/123611/5cd1b772E3a901f6b/58ea602c1d518d46.jpg.webp",
      title:"baiston 佰事通 全国对讲机民用5000公里 电信天翼插卡手台 公网集群双模车队对讲50KM 传令兵4G（终身免费）全网通",
      price:399.0
    },
    {
      image:"https://img11.360buyimg.com/jdcms/s150x150_jfs/t1/59343/20/3863/215065/5d201e90Eb0114521/7b16b70603742a53.jpg.webp",
      title:"北欧日式实木床1.5m1.8米双人主卧室床现代新中式简约家具 原木色床 1500mm*2000mm  框架结构",
      price:2578
    },
    {
      image:"https://img10.360buyimg.com/jdcms/s150x150_jfs/t22618/225/2383875001/725599/bd951b07/5b7e6e1bNd3004251.jpg.webp",
      title:"铭瀚 中式抱枕靠垫红木沙发抱枕中国风古典实木沙发靠背腰枕腰靠家具客厅含芯 石榴花+泥金 50x50cm(含芯）",
      price:48.80
    }
  ] });
});

module.exports = router;
