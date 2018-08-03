// pages/shopDetail/shopDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    shopInfo:{
      imgUrls: [ //商品详情轮播图片
        '/assets/img/asdj@2x.png'
      ],
      title: "林氏木业北欧沙发家具小户型木框客厅现代简约组合",//标题
      price:200, //价格
      originalPrice:300, //原价
      freight: 1000, //运费
      sale: 630, //销量
      surplus: 863, //剩余
      shopDetailImg: '/assets/img/asdj@2x.png', //商品详情的图片
    },
    shopDIH:0
  },
  shopDIL:function(e){
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      ratio = imgwidth / imgheight;
    var viewHeight = 750 / ratio;
    this.setData({
      shopDIH: viewHeight
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})