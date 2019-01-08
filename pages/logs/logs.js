//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    something:'avc',
    latitude:'',
    longitude:''
  },
  onLoad: function () {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.latitude = res.latitude // 纬度
        this.longitude = res.longitude // 经度
        console.log(this.latitude, this.longitude)
      }
    })
  }
})
