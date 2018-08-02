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
    current: 0,
    bannerWidth: 750, 
    bannerHeights:[],
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
  imageLoad: function (e) {
    //获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var bannerHeights = this.data.bannerHeights
    //把每一张图片的高度记录到数组里  
    bannerHeights.push(imgheight)
    this.setData({
      bannerHeights: bannerHeights,
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
