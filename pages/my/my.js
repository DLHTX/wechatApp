const app = getApp()

page({
    data:{
        hasUser:false,
        userInfo:null
    },
    getUserInfo(info) {
        const userInfo = info.detail.userInfo
        this.setData({
          userInfo,
          hasUser: true
        })
    },
})



