Page({
  data: {
    msg:"avc",
    musicBar:['精选','热门','搜索'],
    typeIndex:0,
    HQsongList:[],
    page:1
  },
  onLoad(){ 
    if(this.data.typeIndex==0){
        this.getHQsong().then(res=>{
            this.setData({
                HQsongList:res.data
            })
        })
    }
    
  },
  goDetail(e){
    console.log(e.currentTarget.dataset.playid)
    wx.navigateTo({
        url: '../cloudMusic-detail/cloudMusic-detail?id='+e.currentTarget.dataset.playid
    })
  },
  changeType(e){
    this.setData({
      typeIndex:e.target.dataset.index
    })
  },
  request(url,data,type){
    let that = this
    return new Promise((resolve, reject)=>{
      wx.request({
          url: url,
          data:data,
          method:type,
          header: {
              //设置参数内容类型为x-www-form-urlencoded
              'content-type':'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
          success: function(res){
              resolve(res.data)
              //that.hideLoad()
          },
      })
  })
  },
  getHQsong(){
    return new Promise((resolve, reject)=>{
        this.request('https://api.bzqll.com/music/netease/hotSongList',{
            key:'579621905',
            cat:'全部',
            limit:12,
            offset:this.data.page
        },'GET').then(res=>{
            resolve(res)
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
    this.getHQsong().then(res=>{
        this.setData({
            HQsongList:this.data.HQsongList.concat(res.data)
        })
        wx.hideLoading();
    })
  },

});