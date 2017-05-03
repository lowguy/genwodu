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
 
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
