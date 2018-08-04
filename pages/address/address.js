// pages/address/address.js
import address from '../../assets/data/address.js';
var request = require('../../utils/util.js').request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
    
  },
  //获取地址列表
  getAddressList:function(){
    var that = this;
    this.setData({
      addressList:address.list
    })
    request({
      url: 'https://',
      method: 'GET',
      success: function(res) {
        that.setData({
          addressList: res.data.addressList
        })
      },
      fail: function(res) {},
      complete: function(res) {}
    })
  },
  //编辑地址
  editAddress:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: 'newAddress/newAddress?id='+id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //修改地址，包括修改默认和删除
  modify:function(id,way){
    var that = this;
    request({
      url: 'https://',
      method: 'POST',
      data: { id:id,way:way },
      success: function (res) {
        that.getAddressList();
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  //删除地址
  deleteAddress:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var way = 'del'; //这个参数表示删除
    this.modify(id,way);
  },
  //设置默认地址
  changDefault:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var isDefault = e.currentTarget.dataset.isDefault;
    if(isDefault==0){
      var way = 'def'; //这个参数表示设置默认
      this.modify(id, way);
    }
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
    this.getAddressList();
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