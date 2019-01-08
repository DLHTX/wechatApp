const app = getApp()

Page({
    data: {
        jokeList:[]
    },
    //事件处理函数

    getJoke: function() {
        var that = this
        wx.request({
            url: 'https://api.apiopen.top/getSongPoetry',
            data: {},
            method: 'POST',
            success: function(res){
                console.log(res.data.result)
                that.setData({
                    jokeList: res.data.result,
                })
            },
        })
    },
    onLoad: function() {
        this.getJoke()
    },
  })
  