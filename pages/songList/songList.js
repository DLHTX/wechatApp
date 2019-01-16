const app = getApp()

Page({
    data:{
        musicList:null,
        duration:null,
        currentTime:null,
        progressWidth:null,
        isPlaying:null,
        musicListIndex:null,
        currentMusic:null,
        isOpen:false,
        animationData:{}
    },
    onLoad(){
        this.initData()
        this.getMusicTime()
    },
    getMusicTime(){
        let whichMusic = app.globalData.musicList[this.data.musicListIndex]
        let minT = parseInt(whichMusic.time / 60) >10?parseInt(whichMusic.time / 60):'0'+parseInt(whichMusic.time / 60) 
        let secT = parseInt(whichMusic.time % 60)>10?parseInt(whichMusic.time % 60):'0'+parseInt(whichMusic.time % 60)
        this.setData({
            duration: minT+ ':' +  secT
        })
        setTimeout(() => {
            console.log(app.globalData.music.duration)
            app.globalData.music.onTimeUpdate(() => {
                let min = parseInt(app.globalData.music.currentTime / 60)>9?parseInt(app.globalData.music.currentTime / 60):'0'+parseInt(app.globalData.music.currentTime / 60)
                let sec = parseInt(app.globalData.music.currentTime % 60)>9?parseInt(app.globalData.music.currentTime % 60):'0'+parseInt(app.globalData.music.currentTime % 60)
                let width = parseInt(app.globalData.music.currentTime  % whichMusic.time)+'%'
                this.setData({
                    currentTime:min +':'+ sec,
                    progressWidth:width
                })
            })
        }, 500)
    },
    initData(){
        this.setData({ 
            isPlaying:app.globalData.isPlaying,
            musicList:app.globalData.musicList,
            musicListIndex:app.globalData.musicListIndex,
            currentMusic:app.globalData.musicList[app.globalData.musicListIndex]
        })
    },
    pause(){
        app.pauseMusic()
        this.initData()
    },
    play(){
        app.play()
        this.initData()
    },
    playNext(){
        app.playNext()
        this.initData()
    },
    playFrom(){
        app.playFrom()
        this.initData()
    },
    openMusicList(){
        var that = this;
        // 创建一个动画实例
        var animation  = wx.createAnimation({
            duration:300, // 动画持续时间
            timingFunction:'ease' // 定义动画效果，当前是匀速
        })
        that.animation = animation    // 将该变量赋值给当前动画
        animation.translateY(200).step() // 先在y轴偏移，然后用step()完成一个动画
      
        that.setData({  // 用setData改变当前动画
            animationData: animation.export(),   // 通过export()方法导出数据  
            isOpen:true// 改变view里面的Wx：if
        })
        setTimeout(function(){   // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
            animation.translateY(0).step()
            that.setData({
                animationData: animation.export()
            })
        },200)
    },
    hideModal(e){
        var that = this;
        var animation = wx.createAnimation({
          duration:300,
          timingFunction:'ease'
        })
        that.animation = animation
        animation.translateY(200).step()
        that.setData({
          animationData:animation.export()
          
        })
        setTimeout(function () {
          animation.translateY(0).step()
          that.setData({
            animationData: animation.export(),
            isOpen: false
          })
        }, 200)
    }
})