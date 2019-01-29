const app = getApp()

Page({
    data:{
        musicList:null,
        duration:null,
        currentTime:null,
        progressWidth:null,
        currentwidth:null,
        isPlaying:null,
        musicListIndex:null,
        currentMusic:null,
        isOpen:false,
        animationData:{},
        touchStart:null,
        touchEnd:null,
        biggerDot:false,
        lry:[]
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
                let width = (app.globalData.music.currentTime  / whichMusic.time) * 100
                this.setData({
                    currentTime:min +':'+ sec,
                    progressWidth:width,
                    currentwidth:width
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
        console.log('歌词',this.data.currentMusic.lrc)
        app.request(this.data.currentMusic.lrc).then(res=>{
           this.setData({
               lry2:this.sliceNull(this.parseLyric(res)),
               lry:this.forLyric(this.data.lry2)
           })
           console.log(this.data.lry)
        })
    },
    sliceNull(lrc) {
        var result = []
        for (var i = 0; i < lrc.length; i++) {
          if (lrc[i][1] == "") {
          } else {
            result.push(lrc[i]);
          }
        }
        return result
    },
    parseLyric(text) {
        //将文本分隔成一行一行，存入数组
        var lines = text.split('\n'),
          //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
          pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
          //保存最终结果的数组
          result = [];
        //去掉不含时间的行
        while (!pattern.test(lines[0])) {
          lines = lines.slice(1);
        };
        //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
        lines[lines.length - 1].length === 0 && lines.pop();
        lines.forEach(function (v /*数组元素值*/, i /*元素索引*/, a /*数组本身*/) {
          //提取出时间[xx:xx.xx]
            //   var time = v.match(pattern)
            //提取歌词
          var arr = []
          arr.time =  v.match(pattern)
          arr.value = v.replace(pattern, '');
          result.push(arr)
        });
        //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
        result.sort(function (a, b) {
          return a[0] - b[0];
        });
        return result;
    },
    forLyric(res){
        res.forEach(item=>{
            item.time.forEach(items=>{
                items = items.replace(/\[|]/g,'')
            })
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
    playthis(e){
        //console.log(e.currentTarget.dataset.index)
        app.playThis(e.currentTarget.dataset.index)
        this.initData()
        this.hideModal()
    },
    playNext(){
        app.playNext()
        this.initData()
    },
    playFrom(){
        app.playFrom()
        this.initData()
    },

    touchstart(e){
        console.log(e,'touchstart')
        this.setData({
            touchStart:e.touches[0].pageX
        })

    },
    touchmove(e){
        console.log( ((e.touches[0].pageX - this.data.touchStart)/240)*100)
        this.setData({
            touchEnd:e.touches[0].pageX,
            biggerDot:true
        })
        console.log(this.data.progressWidth)
    },
    touchend(e){
        this.setData({
            progressWidth:this.data.currentwidth +((this.data.touchEnd - this.data.touchStart)/240)*100,
            biggerDot:false
        })
        app.seekMusic(this.data.progressWidth)
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
        },100)
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
        }, 100)
    }
})