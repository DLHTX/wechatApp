//index.js
//获取应用实例
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()

Page({
  data: {
    tabs: ["视频", "图片", "动图","文字"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    page:1,
    jokeList:[],
    jokeImgList:[],
    jokeGifList:[],
    jokeTextList:[]
  
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
    // this.getJoke().then(res=>{
    //     this.setData({
    //         jokeList: res
    //     })
    // })

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
        this.setData({
            page:1
        })//初始化页数
        this.getJokeImg().then(res=>{
            this.setData({
                jokeImgList: res
            })
        })
    }else if(this.data.activeIndex==2){
        this.setData({
            page:1
        })//初始化页数
        this.getJokeGif().then(res=>{
            this.setData({
                jokeGifList: res
            })
        })
    }else if(this.data.activeIndex==3){
        this.setData({
            page:1
        })//初始化页数
        this.getJokeText().then(res=>{
            this.setData({
                jokeTextList: res
            })
        })
    }
  },

  getJoke: function() {
    this.showLoad()
    var that = this
    return new Promise((resolve, reject)=>{
        wx.request({
            url: 'https://api.apiopen.top/getJoke',
            data: {
                page:this.data.page,
                count:5,
                type:'video'
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
                that.hideLoad()
            },
        })
    })
  },
  getJokeImg:function(){
    this.showLoad()
    var that = this
    return new Promise((resolve, reject)=>{
        wx.request({
            url: 'https://api.apiopen.top/getJoke',
            data: {
                page:this.data.page,
                count:5,
                type:'image'
            },
            method: 'POST',
            header: {
                //设置参数内容类型为x-www-form-urlencoded
                'content-type':'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
            success: function(res){
                resolve(res.data.result)
                that.hideLoad()
            },
        })
    })
  },
  getJokeGif:function(){
    this.showLoad()
    var that = this
    return new Promise((resolve, reject)=>{
        wx.request({
            url: 'https://api.apiopen.top/getJoke',
            data: {
                page:this.data.page,
                count:5,
                type:'gif'
            },
            method: 'POST',
            header: {
                //设置参数内容类型为x-www-form-urlencoded
                'content-type':'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
            success: function(res){
                resolve(res.data.result)
                that.hideLoad()
            },
        })
    })
  },
  getJokeText:function(){
    this.showLoad()
    var that = this
    return new Promise((resolve, reject)=>{
        wx.request({
            url: 'https://api.apiopen.top/getJoke',
            data: {
                page:this.data.page,
                count:5,
                type:'text'
            },
            method: 'POST',
            header: {
                //设置参数内容类型为x-www-form-urlencoded
                'content-type':'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
            success: function(res){
                resolve(res.data.result)
                that.hideLoad()
            },
        })
    })
  },

  biggerImg(e){
    let img = e.target.dataset.img
    wx.previewImage({
        current:img, // 当前显示图片的链接，不填则默认为 urls 的第一张
        urls: [img],
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
        this.getJokeImg().then(img=>{
            this.setData({
                jokeImgList: this.data.jokeImgList.concat(img)
            })
            wx.hideLoading();
        })
    }else if(this.data.activeIndex==2){
        this.getJokeGif().then(img=>{
            this.setData({
                jokeGifList: this.data.jokeGifList.concat(img)
            })
            wx.hideLoading();
        })
    }else if(this.data.activeIndex==3){
        this.getJokeText().then(img=>{
            this.setData({
                jokeTextList: this.data.jokeTextList.concat(img)
            })
            wx.hideLoading();
        })
    }

  },
  scrollToTop:function(){
    wx.pageScrollTo({
        scrollTop: 0
    })
  },
  showLoad(){
    wx.showLoading({
        title: '玩命加载中',
    })
  },
  hideLoad(){
    wx.hideLoading();
  },


  
})