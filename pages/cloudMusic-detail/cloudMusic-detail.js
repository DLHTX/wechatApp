const app = getApp()

Page({
    data:{
        playid:null,
        playList:[],
        musicList:null,
        isPlaying:null,
        typeIndex:-1,
    },
    onLoad(query){
        this.setData({
            playid:query.id,
        })
        this.getMusic()
    },
    onShow(){
        this.initData()
    },
    initData(){
        this.setData({
            musicList:app.globalData.musicList,
            isPlaying:app.globalData.isPlaying
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
    getMusic(){
        this.request('https://api.bzqll.com/music/netease/songList',{
            key:'579621905',
            id:this.data.playid
        },'GET').then(res=>{
            console.log(res)
            this.setData({
                playList:res.data
            })
        })
    },
    playMusic(e){
        console.log(e)
        this.setData({
            typeIndex : e.currentTarget.dataset.index
        })
        app.playMusic(e.currentTarget.dataset.music)
        this.initData()
    },
    goSong(){
        wx.navigateTo({
            url: '../songList/songList'
        })
    }
})