// 跳一跳 方块、圆 图片 配置

var imgConfig = {
    "1001": {
        img1: "1001_1",     // 顶部
        img2: "1001_2",     // 底部
        img3: "1001_3",     // 阴影
        scale: 1,           //缩放值
        kind: "fangxing",   //形状
        distance1: 223,      //向左 距离
        distance2: 222,      //向右 距离
        pos: cc.p(19, 154),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(51,45), //阴影位置
    },
    "1002": {
        img1: "1001_1",
        img2: "1001_2",
        img3: "1001_3",     // 阴影
        scale: 0.7,
        kind: "fangxing",   //形状
        distance1: 223,      //向左 距离
        distance2: 222,      //向右 距离
        pos: cc.p(19, 154),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(51,45), //阴影位置
    },
    "1003": {
        img1: "1003_1",
        img2: "1003_2",
        img3: "1003_3",     // 阴影
        scale: 1,
        kind: "yuanxing",   //形状
        distance1: 164,      //向左 距离
        distance2: 164,      //向右 距离
        pos: cc.p(0, 121),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(14,16), //阴影位置
    },
    "1004": {
        img1: "1003_1",
        img2: "1003_2",
        img3: "1003_3",     // 阴影
        scale: 0.7,
        kind: "yuanxing",   //形状
        distance1: 164,      //向左 距离
        distance2: 164,      //向右 距离
        pos: cc.p(0, 121),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(14,16), //阴影位置
    },
    "1005": {
        img1: "1003_1",
        img2: "1003_2",
        img3: "1003_3",     // 阴影
        scale: 0.5,
        kind: "yuanxing",   //形状
        distance1: 164,      //向左 距离
        distance2: 164,      //向右 距离
        pos: cc.p(0, 121),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(14,16), //阴影位置
    },
    "1006": {
        img1: "1006_1",
        img2: "1006_2",
        img3: "1006_3",     // 阴影
        scale: 1,
        kind: "fangxing",   //形状
        distance1: 156,      //向左 距离
        distance2: 156,      //向右 距离
        pos: cc.p(0, 166),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(25,75), //阴影位置
    },
    "1007": {
        img1: "1006_1",
        img2: "1006_2",
        img3: "1006_3",     // 阴影
        scale: 0.7,
        kind: "fangxing",   //形状
        distance1: 156,      //向左 距离
        distance2: 156,      //向右 距离 
        pos: cc.p(0, 166),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(25,75), //阴影位置
    },
    "1008": {
        img1: "1006_1",
        img2: "1006_2",
        img3: "1006_3",     // 阴影
        scale: 0.5,
        kind: "fangxing",   //形状
        distance1: 156,      //向左 距离
        distance2: 156,      //向右 距离
        pos: cc.p(0, 166),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(25,75), //阴影位置
    },
    "1009": {
        img1: "1009_1",
        img2: "1009_2",
        img3: "1009_3",     // 阴影
        scale: 1,
        kind: "fangxing",   //形状
        distance1: 169,      //向左 距离
        distance2: 169,      //向右 距离 
        pos: cc.p(0, 180),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(25,83), //阴影位置
    },
    "1010": {
        img1: "1009_1",
        img2: "1009_2",
        img3: "1009_3",     // 阴影
        scale: 0.7,
        kind: "fangxing",   //形状
        distance1: 169,      //向左 距离
        distance2: 169,      //向右 距离
        pos: cc.p(0, 180),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(25,83), //阴影位置
    },
    "1011": {
        img1: "1011_1",
        img2: "1011_2",
        img3: "1011_3",     // 阴影
        scale: 1,
        kind: "fangxing",   //形状
        distance1: 161,      //向左 距离
        distance2: 161,      //向右 距离
        pos: cc.p(0, 174),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(25,79), //阴影位置
    },
    "1012": {
        img1: "1011_1",
        img2: "1011_2",
        img3: "1011_3",     // 阴影
        scale: 0.7,
        kind: "fangxing",   //形状
        distance1: 161,      //向左 距离
        distance2: 161,      //向右 距离
        pos: cc.p(0, 174),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(25,79), //阴影位置
    },
    "1013": {
        img1: "1011_1",
        img2: "1011_2",
        img3: "1011_3",     // 阴影
        scale: 0.5,
        kind: "fangxing",   //形状
        distance1: 161,      //向左 距离
        distance2: 161,      //向右 距离
        pos: cc.p(0, 174),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(25,79), //阴影位置
    },
    "1014": {
        img1: "1014_1",
        img2: "1014_2",
        img3: "1014_3",     // 阴影
        scale: 1,
        kind: "fangxing",   //形状
        distance1: 160,      //向左 距离
        distance2: 160,      //向右 距离
        pos: cc.p(0, 257),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(41,68), //阴影位置
    },
    "1015": {
        img1: "1014_1",
        img2: "1014_2",
        img3: "1014_3",     // 阴影
        scale: 0.7,
        kind: "fangxing",   //形状
        distance1: 160,      //向左 距离
        distance2: 160,      //向右 距离
        pos: cc.p(0, 257),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(41,68), //阴影位置
    },
    "1016": {
        img1: "1016_1",
        img2: "1016_2",
        img3: "1016_3",     // 阴影
        scale: 1,
        kind: "fangxing",   //形状
        distance1: 156,      //向左 距离
        distance2: 156,      //向右 距离
        pos: cc.p(0, 186),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(25,75), //阴影位置
    },
    "1017": {
        img1: "1016_1",
        img2: "1016_2",
        img3: "1016_3",     // 阴影
        scale: 0.7,
        kind: "fangxing",   //形状
        distance1: 156,      //向左 距离
        distance2: 156,      //向右 距离
        pos: cc.p(0, 186),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(25,75), //阴影位置
    },
    "1018": {
        img1: "1018_1",
        img2: "1018_2",
        img3: "1018_3",     // 阴影
        scale: 1,
        kind: "yuanxing",   //形状
        distance1: 68,      //向左 距离
        distance2: 68,      //向右 距离
        pos: cc.p(0, 90),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(2,19), //阴影位置
    },
    "1019": {
        img1: "1019_1",
        img2: "1019_2",
        img3: "1019_3",     // 阴影
        scale: 1,
        kind: "yuanxing",   //形状
        distance1: 100,      //向左 距离
        distance2: 100,      //向右 距离
        pos: cc.p(0, 172),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(2,27), //阴影位置
    },
    "1020": {
        img1: "1020_1",
        img2: "1020_2",
        img3: "1020_3",     // 阴影
        scale: 1,
        kind: "yuanxing",   //形状
        distance1: 144,      //向左 距离
        distance2: 144,      //向右 距离
        pos: cc.p(0, 125),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(6,40), //阴影位置
    },
    "1021": {
        img1: "1020_1",
        img2: "1020_2",
        img3: "1020_3",     // 阴影
        scale: 0.7,
        kind: "yuanxing",   //形状
        distance1: 144,      //向左 距离
        distance2: 144,      //向右 距离
        pos: cc.p(0, 125),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(6,40), //阴影位置
    },
    "1022": {
        img1: "1022_1",
        img2: "1022_2",
        img3: "1022_3",     // 阴影
        scale: 1,
        kind: "fangxing",   //形状
        distance1: 156,      //向左 距离
        distance2: 156,      //向右 距离
        pos: cc.p(0, 167),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(25,76), //阴影位置
    },
    "1023": {
        img1: "1022_1",
        img2: "1022_2",
        img3: "1022_3",     // 阴影
        scale: 0.7,
        kind: "fangxing",   //形状
        distance1: 156,      //向左 距离
        distance2: 156,      //向右 距离
        pos: cc.p(0, 167),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(25,76), //阴影位置
    },
    "1024": {
        img1: "1022_1",
        img2: "1022_2",
        img3: "1022_3",     // 阴影
        scale: 0.5,
        kind: "fangxing",   //形状
        distance1: 156,      //向左 距离
        distance2: 156,      //向右 距离
        pos: cc.p(0, 167),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(25,76), //阴影位置
    },
    "1025": {
        img1: "1025_1",
        img2: "1025_2",
        img3: "1025_3",     // 阴影
        scale: 1,
        kind: "fangxing",   //形状
        distance1: 156,      //向左 距离
        distance2: 156,      //向右 距离
        pos: cc.p(0, 166),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(25,76), //阴影位置
        effect:"yinyue",        // 帧动画特效
        effectPos:cc.p(-11,160),   
        score: 10,              // 额外得分  
    },
    "1026": {
        img1: "1026_1",
        img2: "1026_2",
        img3: "1026_3",     // 阴影
        scale: 1,
        kind: "fangxing",   //形状
        distance1: 120,      //向左 距离
        distance2: 180,      //向右 距离
        pos: cc.p(0, 146),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(15,77), //阴影位置
        effect:"maoyan",        // 帧动画特效
        effectPos:cc.p(0,300),  
        score: 10,              // 额外得分
    },
    "1027": {
        img1: "1027_1",
        img2: "1027_2",
        img3: "1027_3",     // 阴影
        scale: 1,
        kind: "yuanxing",   //形状
        distance1: 165,      //向左 距离
        distance2: 162,      //向右 距离
        pos: cc.p(-13, 183),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(14,27), //阴影位置
        effect:"pijiupao",        // 帧动画特效
        effectPos:cc.p(-10,280),  
        score: 15,              // 额外得分
    },
    "1028": {
        img1: "1028_1",
        img2: "1028_2",
        img3: "1028_3",     // 阴影
        scale: 1,
        kind: "fangxing",   //形状
        distance1: 102,      //向左 距离
        distance2: 162,      //向右 距离    
        pos: cc.p(0, 201),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(27,67), //阴影位置      
        effect:"dianshi",        // 帧动画特效
        effectPos:cc.p(30,111),
        score: 30,              // 额外得分
    },
    "1029":{
        imgCount:2,
        img1:"1029_1",
        img2:"1029_2",
        img3:"1029_3",
        scale:1,
        kind: "fangxing",   //形状
        distance1:180,      //向左 距离
        distance2:180,      //向右 距离
        pos: cc.p(0, 172),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(25,90), //阴影位置      
        effect:"shuilifang",        // 帧动画特效
        effectPos:cc.p(0,131),
        score: 20,              // 额外得分                                                                                
    },
    "1030":{
        imgCount:2,
        img1:"1030_1",
        img2:"1030_2",
        img3:"1030_3",
        scale:1,
        kind: "yuanxing",   //形状
        distance1:227,      //向左 距离
        distance2:227,      //向右 距离
        pos: cc.p(8, 114),  // img1 在 img2 的位置,img2 AnchorPoint=cc.p(0.5,0)
        shadowPos:cc.p(14,17), //阴影位置      
        effect:"xiaodeng",        // 帧动画特效
        effectPos:cc.p(6,82),
        score: 30,              // 额外得分                                                                                
    },

};

module.exports = imgConfig;