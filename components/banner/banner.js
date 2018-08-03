// components/banner/banner.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    'imgUrls': {
      type: Array,
      value: [
        '/assets/img/banner.png',
        '/assets/img/banner.png',
        '/assets/img/banner.png'
      ]
    },
    'indicatorDots':{
      type:Boolean,
      value:true
    },
    'autoplay':{
      type:Boolean,
      value:true
    },
    'interval':{
      type:Number,
      value:5000
    },
    'duration':{
      type:Number,
      value:1000
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 0,
    bannerWidth: 750,
    bannerHeights: [],
  },
  /**
   * 组件的方法列表
   */
  methods: {
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
    }
  }
})
