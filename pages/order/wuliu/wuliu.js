// pages/orderForm/wuliu/wuliu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errTip: '',
    wuliu: null,
    company: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var data = {
      'type': options.company,
      'postid': options.postid
    }
    wx.request({
      url: 'https://www.kuaidi100.com/query',
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var errTip = res.data.message;
        var wuliu = res.data.data;
        var com = res.data.com;
        var company = '';
        switch (com) {
          case 'yunda':
            company = '韵达';
            break;
          case 'yuantong':
            company = '圆通';
            break;
          case 'ems':
            company = 'EMS';
            break;
          case 'shunfeng':
            company = '顺丰';
            break;
        };
        that.setData({
          company: company
        })
        if (wuliu.length == 0) {
          that.setData({
            errTip: errTip
          })
          return
        }
        that.setData({
          errTip: '',
          wuliu: wuliu
        })
      }
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
  onShareAppMessage: function () {

  }
})