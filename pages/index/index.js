//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '/assets/img/banner.png',
      '/assets/img/banner.png',
      '/assets/img/banner.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    goodsList:[
      {
        shopId:1,
        goodsTitle:"抢购",
        imgPath:"/assets/img/shop1.png"
      },
      {
        shopId: 2,
        goodsTitle: "货架",
        imgPath: "/assets/img/shop2.png"
      },
      {
        shopId: 3,
        goodsTitle: "福利",
        imgPath: "/assets/img/shop3.png"
      }
    ]
  },
  onLoad: function () {
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
