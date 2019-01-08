//index.js
//获取应用实例
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()

Page({
  data: {
    // motto: '进入小程序',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    tabs: ["段子", "美图", "我的"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    jokeList:[],
    page:1,
    imgList:[]
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
        success: function(res) {
            that.setData({
                sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
        }
    });
    this.getJoke().then(res=>{
        this.setData({
            jokeList: res
        })
    })

  },
  tabClick: function (e) {
    this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
    });
    if(this.data.activeIndex==0){
        this.setData({
            page:1
        })//初始化页数
        this.getJoke().then(res=>{
            this.setData({
                jokeList: res
            })
        })
    }else if(this.data.activeIndex==1){
        console.log('1')
        this.setData({
            page:1
        })//初始化页数
        this.getImage().then(res=>{
            this.setData({
                imgList: res
            })
        })
    }
  },
  getJoke: function() {
    return new Promise((resolve, reject)=>{
        wx.request({
            url: 'https://api.apiopen.top/getJoke',
            data: {
                page:this.data.page,
                count:10
            },
            method: 'POST',
            header: {
                //设置参数内容类型为x-www-form-urlencoded
                'content-type':'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
            success: function(res){
                console.log(res.data.result)
                resolve(res.data.result)
                // that.setData({
                //     jokeList: res.data.result,
                // })
            },
        })
    })
  },
  getImage:function(){
    return new Promise((resolve, reject)=>{
        wx.request({
            url: 'https://api.apiopen.top/getImages',
            data: {
                page:this.data.page,
                count:10
            },
            method: 'POST',
            header: {
                //设置参数内容类型为x-www-form-urlencoded
                'content-type':'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
            success: function(res){
                console.log(res.data.result)
                resolve(res.data.result)
            },
        })
    })
  },
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    this.setData({
        page :  this.data.page + 1
    })
    if(this.data.activeIndex==0){
        this.getJoke().then(res=>{
            this.setData({
                jokeList:this.data.jokeList.concat(res)
            })
            wx.hideLoading();
        })
    }else if(this.data.activeIndex==1){
        this.getImage().then(img=>{
            this.setData({
                imgList: this.data.imgList.concat(img)
            })
            wx.hideLoading();
        })
    }

  },
  scrollToTop:function(){
    wx.pageScrollTo({
        scrollTop: 0
    })
  }
  
})