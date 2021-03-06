// pages/order/order.js
import orderList from '../../assets/data/orderList.js';
var request = require('../../utils/util.js').request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNav: ['全部', '待付款', '待发货', '待收货', '已完成'],
    currentTab: 0,//默认当前tab项为0
    orderList:[],
    //待付款的订单数量 注:页面刚开始加载的时候就遍历返回的数据数组，记录每一个状态下订单的数量
    status01: 0,
    //待发货的订单数量
    status02: 0,
    //待收货的订单数量
    status03: 0,
    //交易成功的订单数量
    status04: 0
  },
  //获取orderList
  getOrderList:function(){
    console.log('我被调用了');
    var data = orderList.list;
    var s1 = 0, s2 = 0, s3 = 0, s4 = 0;
    for(var i=0,l=data.length;i<l;i++){
      var status = data[i].status;
      switch(status){
        case 1:
          s1 += 1;
          break;
        case 2:
          s2 += 1;
          break;
        case 3:
          s3 += 1;
          break;
        case 4:
          s4 += 1;
          break;
      }
    }
    this.setData({
      orderList: data,
      status01: s1,
      status02: s2,
      status03: s3,
      status04: s4
    })
    // request({
    //   url: 'https://',
    //   success: function(res) {
    //     var data =res.data.orderList;
    //     for (var i = 0, l = data.length; i < l; i++) {
    //       var status = data[i].status;
    //       switch (status) {
    //         case 1:
    //           s1 += 1;
    //           break;
    //         case 2:
    //           s2 += 1;
    //           break;
    //         case 3:
    //           s3 += 1;
    //           break;
    //         case 4:
    //           s4 += 1;
    //           break;
    //       }
    //     }
    //     this.setData({
    //       orderList: data,
    //       status01: s1,
    //       status02: s2,
    //       status03: s3,
    //       status04: s4
    //     })
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  },
  //删除订单
  del:function(val){
    var orderNumber = val;
    var that = this;
    //发送请求删除订单的请求
    request({
      url: 'https://',
      data: { orderNumber: orderNumber},
      method: 'POST',
      success: function(res) {
        console.log(res);
        that.getOrderList();
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {},
    })
  },
  //更改tab项
  changeTab: function (e) {
    var cur = e.currentTarget.dataset.cur;
    var that = this;
    this.setData({
      currentTab: cur
    })
  },
  //是否取消订单
  cancelOrder: function (e) {
    var orderNumber = e.currentTarget.dataset.orn;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定取消该订单吗',
      success: function (res) {
        if (res.confirm) {
          that.del(orderNumber);
        }
      }
    })
  },
  //是否删除订单
  deleteOrder: function (e) {
    var orderNumber = e.currentTarget.dataset.orn;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除该订单吗',
      success: function (res) {
        if (res.confirm) {
          that.del(orderNumber);
        }
      }
    })
  },
  //付款
  pay: function (e) {
    var that = this;
    var orderNumber = e.currentTarget.dataset.orn;
    var money = e.currentTarget.dataset.money;
    console.log(orderNumber,totalPrice);
    request({
      url: 'https://',
      method: 'POST',
      data: {
        orderNumber: orderNumber,
        money:money
      },
      success: function (res) {
        var timeStamp = new Date().getTime();
        wx.requestPayment({
          //当前时间戳
          'timeStamp': timeStamp,
          //随机字符串，32个字符以下
          'nonceStr': orderNumber,
          'package': 'prepay_id=' + res.data.prepay_id,
          'signType': 'MD5',
          'paySign': res.data._paySignjs,
          'success': function (res) {
            console.log(res);
            //如果支付成功，去数据库修改当前订单的转态，重新获得订单列表
            request({
              url: 'https://',
              data: {
                orderNumber: orderNumber
              },
              method: 'POST',
              success: function (res) {
                that.getOrderList();
              }
            })
          },
          'fail': function (res) {
            console.log('fail:' + JSON.stringify(res));
          }
        })
      }
    }) 
  },
  //查看物流
  wuliu: function (e) {
    var company = e.currentTarget.dataset.company;
    var postid = e.currentTarget.dataset.postid;
    console.log(company, postid);
    wx.navigateTo({
      url: '/pages/order/wuliu/wuliu?company=' + company + '&postid=' + postid,
    })
  },
  //确认收货
  receive: function (e) {
    var that = this;
    var orderNumber = e.currentTarget.dataset.orn;
    wx.showModal({
      title: '提示',
      content: '确认已经收到了购买的商品了吗',
      success: function (res) {
        if (res.confirm) {
          request({
            url: 'https://',
            data: { orderNumber: orderNumber },
            method: 'POST',
            success: function (res) {
              //修改成功之后，重新获取订单列表
              that.getOrderList();
            },
            fail:function(res){
              console.log(res);
            }
          })
        }
      }
    })
  },
  toOrderDetail:function(e){
    var orderNumber = e.currentTarget.dataset.orn;
    wx.navigateTo({
      url: '/pages/order/orderDetail/orderDetail?orderNumber='+orderNumber,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options && options.status){
      this.setData({
        currentTab:options.status
      })
    }
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
    this.getOrderList();
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