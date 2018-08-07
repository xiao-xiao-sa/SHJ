// pages/order/orderAccount/orderAccount.js
var request = require('../../../utils/util.js').request;
import addressList from '../../../assets/data/address';
import orderAccount from '../../../assets/data/orderAccount';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:null,
    shopInfo: null,
    count:1,
    message:''
  },

  minusCount:function(){
    var count = this.data.count;
    if(count>1){
      this.setData({
        count:count-1
      })
    }
  },
  addCount:function(){
    var count = this.data.count;
    if(count<this.data.shopInfo.surplus){
      this.setData({
        count:count+1
      })
    }
  },
  getMessage: function (e) {
    var message = e.detail.value;
    this.setData({
      message:message
    })
  },
  account:function(){
    var that = this;
    var address = this.data.address;
    if(address == null){
      wx.showToast({
        title: '您还未选择收货地址',
        icon:'none'
      })
      return
    }
    request({
      url: 'https://',
      data: {}, //提交订单信息，包括收货地址，商品信息，商品数量，运费，买家留言等等
      method: 'post',
      success: function(res) {
        var timeStamp = new Date().getTime();
        var orderNumber = res.data.orderNumber
        wx.requestPayment({
         
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shopId = options.shopId;
    var list = addressList.list;
    var address = list.filter(function (item, index, arr) {
      if (item.isDefault == 1) {
        return item;
      }
    })[0];
    var shopInfo = orderAccount.info;
    this.setData({
      address: address,
      shopInfo: shopInfo
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
    var that = this;
    var address = app.globalData.address;
    console.log(address)
    if(address == null){
      return
    }else{
      this.setData({
        address:address[0]
      }) 
    } 
    console.log(this.data.address)
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