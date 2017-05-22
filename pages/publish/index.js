// pages/publish/index.js
var app = getApp()
Page({
  data:{
    userInfo:null,
    title:'',
    brief:'',
    address:'',
    latitude:'',
    longitude:''
  },
  setAddress:function(){
    var that =this
    wx.chooseLocation({
      success:function(res){
        that.setData({
          address:res.address,
          latitude:res.latitude,
          longitude:res.longitude
        })
      }
    })
  },
  bindKeyInput:function(e){
    this.setData({
      title: e.detail.value
    })
  },
  bindTextAreaBlur: function(e) {
    this.setData({
      brief: e.detail.value
    })
  },
  formSubmit:function(){
    var that = this
    var postData = {title:that.data.title,avatar:that.data.userInfo.avatarUrl,name:that.data.userInfo.nickName,brief:that.data.brief,address:that.data.address,latitude:that.data.latitude,longitude:that.data.longitude};
    wx.request({
        url: `https://890vip.cn/vip/Activits/add`,
        header: {
            'content-type': 'application/json'
        },
        method:'post',
        data:postData,
        success: function(res) {
          if(res.status = 1){
            wx.showToast({
              title: res.message,
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '../index/index'
            })
          }else{

          }
          
        }
      });
  },
  onLoad:function(options){
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
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