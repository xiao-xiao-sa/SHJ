// pages/order/orderDetail/orderDetail.js
import orderInfo from '../../../assets/data/orderInfo.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: null
  },
  //获取订单订单信息
  getOrderInfo:function(val){
    console.log('getOrderInfo被调用');
    var data = orderInfo.info;
    this.setData({
      orderInfo: data
    })
    // var orderNumber = val;
    // var that = this;
    // wx.request({
    //   url: 'https://',
    //   data:{orderNumber:orderNumber},
    //   success:function(res){
    //     that.setData({
    //       orderInfo:res.data.orderInfo
    //     })
    //   }
    // })
  },
  //删除订单
  del:function(val){
    var orderNumber = val;
    wx.request({
      url: 'https://',
      data: { orderNumber: orderNumber },
      method: 'POST',
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        wx.redirectTo({
          url: '/pages/order/order'
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) { },
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
    console.log(orderNumber, money);
    wx.request({
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
            wx.request({
              url: 'https://',
              data: {
                orderNumber: orderNumber
              },
              method: 'POST',
              success: function (res) {
                that.getOrderInfo(orderNumber);
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
          wx.request({
            url: 'https://',
            data: { orderNumber: orderNumber },
            method: 'POST',
            success: function (res) {
              //修改成功之后，重新获取订单列表
              that.getOrderInfo(orderNumber);
            },
            fail: function (res) {
              console.log(res);
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderNumber = options.orderNumber;
    this.getOrderInfo(orderNumber);
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