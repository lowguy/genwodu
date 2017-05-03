//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    primary: '搜索',
    search_palceholder:'标题/作者',
    userInfo: {},
    apiUrl:'https://890vip.cn',
    recommend:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    
    wx.request({
      url: 'https://890vip.cn',
      data: {
        t: '890' 
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
          recommend:res.data.result
        })
      }
    })
  },
  detail: function(e) {
    var id = e.currentTarget.dataset.id
    wx.setStorage({
      key:"blog_id",
      data:id
    })
    wx.navigateTo({
      url: '../blog/index'
    })
  },
})
