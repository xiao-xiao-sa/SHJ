// pages/address/newAddress/newAddress.js
var request = require('../../../utils/util.js').request;
Page({
  /**
   * 页面的初始数据
   */
  data: {

    address: {
      id: '',
      name: '',
      phone: '',
      region: [],
      detailed: '',
      isDefault: 0
    }
  },
  //选择省市区
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var region = "address.region";
    this.setData({
      [region]: e.detail.value
    })
  },
  //设置默认地址的开关
  switchChange: function (e) {
    console.log('switch 发生 change 事件，携带值为', e.detail.value);
    if(e.detail.value){
      this.setData({
        isDefault:1
      })
    }else{
      this.setData({
        isDefault: 0
      })
    }
  },
  //获取收货人姓名
  getName: function (e) {
    var name = "address.name";
    this.setData({
      [name]: e.detail.value
    })
  },
  //获取收货人电话
  getPhone: function (e) {
    var phone = "address.phone";
    this.setData({
      [phone]: e.detail.value
    })
  },
  getDetailed: function (e) {
    var detailed = "address.detailed";
    this.setData({
      [detailed]: e.detail.value
    })
  },
  //保存地址
  preserve: function () {
    var address = this.data.address;
    var reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
    //验证收货人姓名是否为空
    //验证手机号是否为空，格式是否正确
    //验证地区是否为空
    //验证详细地址是否为空
    if (address.name == '') {
      wx.showToast({
        title: '收货人姓名不能为空',
        icon: 'none'
      });
      return false;
    } else if(address.phone.length ==0) {
      wx.showToast({
        title: '收货人手机号不能为空',
        icon: 'none'
      }); 
    } else if (!reg.test(address.phone)) {
      wx.showToast({
        title: '收货人手机号格式不正确',
        icon: 'none'
      });
      return false;
    } else if (address.region.length == 0) {
      wx.showToast({
        title: '收货人地区不能为空',
        icon: 'none'
      });
      return false;
    } else if (address.detailed == '') {
      wx.showToast({
        title: '收货人地址不能为空',
        icon: 'none'
      });
      return false;
    }
    request({
      url: 'https://',
      data: {
        address: address
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '提交成功',
            success: function () {
              wx.redirectTo({
                url: '/pages/address/address'
              })
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
    var that = this;
    //编辑参数id的地址
    if (options && options.id) {
      var id = options.id;
      wx.request({
        url: 'https://',
        data: { id: id },
        success: function (res) {
          that.setData({
            address: res.data.address
          })
        },
        fail:function(res){
          console.log(res);
        }
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