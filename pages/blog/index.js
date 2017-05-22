// pages/blog/index.js

Page({
  data:{
    apiUrl:'https://890vip.cn',
    scrollTop: 100,
    scrollHeight:0,
    hidden:false,
    refresh:false,
    hasmore:false,
    shareTitle:'blogs.890vip.cn',
    shareId:0,
    page:1,
    blog:[]
  },
  onShareAppMessage: function () {
    var that = this
    return {
      title: that.data.shareTitle,
      path: '/detail/id/'+that.data.shareId,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  menus:function(e){
    var that = this
    that.setData({
        shareTitle:e.currentTarget.dateset.title,
        shareId:e.currentTarget.dateset.id
    });
  },
  //加载状态
  loading:function(hidden){
    var that = this
    that.setData({
        hidden:hidden,
        refresh:!hidden
    });
  },
  //滑动到顶部
  upper: function(e) {
    console.log(e)
  },
  //滑动到底部
  lower: function(e) {
    var that = this
    if(that.data.refresh||that.data.hasmore){
      return 
    }
    var page = that.data.page
    page++
    that.setData({
       page:page
    })
    that.getData(that.data.page)
  },
  //加载数据
  getData:function(page){
    var that = this
    that.loading(false)
    wx.request({
        url: `https://890vip.cn/vip/index/lists`,
        header: {
            'content-type': 'application/json'
        },
        method:'post',
        data:{page:page},
        success: function(res) {
          if(!res.data.result.length){
              that.setData({
                  hasmore:true
              })
          }
          that.setData({
            blog:that.data.blog.concat(res.data.result)
          })
          that.loading(true);
        }
      });
  },
  onLoad:function(options){
    var that = this
    wx.getSystemInfo({
        success:function(res){
            that.setData({
                scrollHeight:res.windowHeight
            });
        }
    });
    that.getData(that.data.page)
  }
})