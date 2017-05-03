// pages/blog/index.js
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data:{
    apiUrl:'https://890vip.cn',
    blog:[]
  },
  caidan:function(e){
    console.log(890)
    
  },
  onLoad:function(options){
    var that = this
    wx.request({
        url: 'https://890vip.cn/vip/index/lists',
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          that.setData({
            blog:res.data.result
          })
        }
      })

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})