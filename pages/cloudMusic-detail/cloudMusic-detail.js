Page({
    data:{
        playid:null,
        playList:[]
    },
    onLoad(query){
        this.setData({
            playid:query.id,
          
        })
        this.getMusic()
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
    }
})