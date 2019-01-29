//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    this.initData()
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    music:wx.getBackgroundAudioManager(),
    isPlaying:null,
    musicList:[],
    musicListIndex:null
  },
  initData(){
    this.globalData.musicListIndex = -1
  },
  playMusic(music){
    this.globalData.music.src = music.url 
    this.globalData.music.title = music.name
    this.globalData.music.coverImgUrl  = music.pic
    this.globalData.music.play()
    this.globalData.musicListIndex ++
    this.globalData.isPlaying = true
    console.log('musicListIndex', this.globalData.musicListIndex)
    this.globalData.musicList.push(music)
    console.log(this.globalData.musicList)
  },
  playAll(musicList){
    console.log('传来的list',musicList.songs)
    this.globalData.musicList = this.globalData.musicList.concat(musicList.songs)
    console.log('连接完的List', this.globalData.musicList)
    this.globalData.musicListIndex++
    this.setMusic()
    this.play()
  },
  play(){
    this.globalData.music.play()
    console.log(this.globalData.music.src)
    this.globalData.isPlaying = true

    this.globalData.music.onEnded(res=>{
      console.log('播放结束')
      this.playNext()
    })  
  },
  playThis(index){
    this.globalData.musicListIndex=index
    this.setMusic()
  },
  playNext(){ 
    if(this.globalData.musicListIndex == this.globalData.musicList.length -1){
      this.globalData.musicListIndex = 0
      this.setMusic()
    }else{
      this.globalData.musicListIndex ++
      this.setMusic()
    }
  },
  playFrom(){
    if(this.globalData.musicListIndex == 0){
      this.globalData.musicListIndex  = this.globalData.musicList.length - 1
      this.setMusic()
    }else{
      this.globalData.musicListIndex --
      this.setMusic()
    }
  },
  pauseMusic(){
    this.globalData.music.pause()
    this.globalData.isPlaying = false
    console.log('全局isplay',this.globalData.isPlaying)
  },
  seekMusic(time){
    this.globalData.music.duration*(time/100)
    this.globalData.music.seek(this.globalData.music.duration*(time/100))//单位s 跳转到位置
  },
  stopMusic(){
    this.globalData.music.stop()
    this.globalData.isPlaying=false
  },
  setMusic(){
    this.globalData.music.src =  this.globalData.musicList[this.globalData.musicListIndex].url
    this.globalData.music.title =  this.globalData.musicList[this.globalData.musicListIndex].name
    this.globalData.music.coverImgUrl  =  this.globalData.musicList[this.globalData.musicListIndex].pic
    this.play()
  },
  request(url,data={},type='GET'){
        let that = this
        return new Promise((resolve, reject)=>{
        wx.request({
            url: url,
            data:data,
            method:type,
            header: {
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
})