
export default function request(url,data={},type='GET'){
    return new Promise((resolve,reject)=>{
        wx.request({
            url: url,
            data:data,
            method: type,
            header: {
                //设置参数内容类型为x-www-form-urlencoded
                'content-type':'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
            success: function(res){
                resolve(res.data)
            },
        })
    })
}
