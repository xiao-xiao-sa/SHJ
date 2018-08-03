// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNav: ['全部', '待付款', '待发货', '待收货', '已完成'],
    currentTab: 0,//默认当前tab项为0
    orderList:[
      {
        number:18254665144551,
        status:1,
        shopList:[
          {
            imgUrl:'/assets/img/slt.png',
            title: "林氏木业北欧沙发家具小户型木框客厅现代简约组合",
            price:200,
            count:1
          },
          {
            imgUrl: '/assets/img/slt.png',
            title: "林氏木业北欧沙发家具小户型木框客厅现代简约组合",
            price: 200,
            count: 1
          }
        ],
        freight:100, 
        totalPrice:300,
        totalCount:1
      },
      {
        number: 18254665144551,
        status: 2,
        shopList: [
          {
            imgUrl: '/assets/img/slt.png',
            title: "林氏木业北欧沙发家具小户型木框客厅现代简约组合",
            price: 200,
            count: 1
          }
        ],
        freight: 100,
        totalPrice: 300,
        totalCount: 1
      },
      {
        number: 18254665144551,
        status: 3,
        shopList: [
          {
            imgUrl: '/assets/img/slt.png',
            title: "林氏木业北欧沙发家具小户型木框客厅现代简约组合",
            price: 200,
            count: 1
          }
        ],
        freight: 100,
        totalPrice: 300,
        totalCount: 1,
        postid: 1234567884
      },
      {
        number: 18254665144551, //订单编号
        status: 4, //状态
        shopList: [ //商品列表
          {
            imgUrl: '/assets/img/slt.png',
            title: "林氏木业北欧沙发家具小户型木框客厅现代简约组合",
            price: 200,
            count: 1
          }
        ],
        freight: 100,  //运费
        totalPrice: 300, //总价
        totalCount: 1, //总数量
        company:'', //快递公司
        postid: 1234567884 //快递单号
      }
    ],
    //待付款的订单数量 注:页面刚开始加载的时候就遍历返回的数据数组，记录每一个状态下订单的数量
    status01: 1,
    //待发货的订单数量
    status02: 1,
    //待收货的订单数量
    status03: 1,
    //交易成功的订单数量
    status04: 1
  },
  //获取orderList
  getOrderList:function(){
    
  },
  //更改tab项
  changeTab: function (e) {
    var cur = e.currentTarget.dataset.cur;
    var that = this;
    this.setData({
      currentTab: cur
    })
  },
  //删除订单
  del: function (val) {
    var orderNumber = val;
    var backData = this.data.backData;
    //遍历订单数组，删除该订单
    for (var i = 0, len = backData.length; i < len; i++) {
      if (backData[i].orderNumber == orderNumber) {
        var status = backData[i].status;
        if (status == '01') {
          var status01 = this.data.status01;
          status01 -= 1;
          this.setData({
            status01: status01
          })
        } else if (status == '02') {
          var status02 = this.data.status02;
          status02 -= 1;
          this.setData({
            status02: status02
          })
        } else if (status == '03') {
          var status03 = this.data.status03;
          status03 -= 1;
          this.setData({
            status03: status03
          })
        } else if (status == '04') {
          var status04 = this.data.status04;
          status04 -= 1;
          this.setData({
            status04: status04
          })
        }
        backData.splice(i, 1);
        console.log(backData);
        this.setData({
          backData: backData
        })
        break;
      }
    }
    //发送订单号去数据库删除该订单
    // request({
    //   url:'http://',
    //   data:{orderNumber:orderNumber},
    //   method:'POST',
    //   success:function(){}
    // })
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
    //获取订单号，订单金额，如果是普通用户，需要调用微信支付接口，openid通过发送sessionid在后台获取，
    //如果是供应商，因为不走微信支付，直接通过后台充值积分，使用积分支付
    var number = e.currentTarget.dataset.orn;
    var totalPrice = e.currentTarget.dataset.totalPrice;
    console.log(number,totalPrice)
    request({
      url: 'https://',
      method: 'POST',
      data: {
        orderNumber: orderNumber,
        totalFee: totalFee
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
                number: number
              },
              method: 'POST',
              success: function (res) {
                that.onShow();
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
    console.log(company, postid)
    wx.navigateTo({
      url: '/pages/orderForm/wuliu/wuliu?company=' + company + '&postid=' + postid,
    })
  },
  //确认收货
  receive: function (e) {
    var that = this;
    var orderNumber = e.currentTarget.dataset.orn;
    console.log(orderNumber);
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
              that.onShow();
            },
          })
        }
      }
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