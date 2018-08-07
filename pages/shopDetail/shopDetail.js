// pages/shopDetail/shopDetail.js
import shopDetail from '/../../assets/data/shopDetail.js';
var request = require('../../utils/util.js').request;

Page({

  /**
   * 页面的初始数据
   */
  data: { 
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    shopInfo:null,
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
    wx.showShareMenu({
      withShareTicket: true
    })
    var shopId = options.shopId;
    if (options.type && options.type == 'share'){
      //此用户是点击分享页面进入的
      //分享者的Id:options.userId;
      //分享时间：options.staTime;
      var endTime = new Date().getTime();//获取此时的时间作为分享的结束时间
      //发送后台
    }
    this.setData({
      shopInfo:shopDetail.detail
    })
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
  onShareAppMessage: function (res) {
    var staTime = new Date().getTime();
    //需要获取用户的id
    var userId = '010';
    var title = this.data.shopInfo.title;
    var path = '/pages/shopDetail/shopDetail?shopId=' + this.data.shopInfo.shopId + '&type=share&staTime=' + staTime+'&userId='+userId;
    return {
      title: title,
      path: path,
      complete:function(res){
        console.log('提示：点击了分享按钮，但不知值有没有分享成功');
      }
    }
  }
})