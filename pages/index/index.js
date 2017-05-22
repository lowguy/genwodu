//index.js
//获取应用实例
Page({
  data: {
    mapheight:300,
    mapwidth:300,
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [],
    marker:[],
    controls:[],
    filePath:''
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
    var that = this
    wx.getSystemInfo({
        success:function(res){
            that.setData({
                mapheight:res.windowHeight,
                mapwidth:res.windowWidth
            });
        }
    });
    
    var controls = [{
      id: 1,
      iconPath: '/image/icon/publish.png',
      position: {
        left: that.data.mapwidth/2 - 25,
        top: that.data.mapheight - 80,
        width: 50,
        height: 50
      },
      clickable: true
    }]
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        that.setData({
            latitude:res.latitude,
            longitude:res.longitude,
            controls:controls
        });
      }
    });

    wx.request({
        url: `https://890vip.cn/vip/Activits/lists`,
        header: {
            'content-type': 'application/json'
        },
        method:'post',
        success: function(res) {
          if(res.status = 1){
            var arr = res.data.result
            for (var i = 0; i < arr.length; i++) {
              that.setData({
                marker: arr[i]
              });
              var iconPath = that.data.marker['iconPath']
              wx.downloadFile({
                url: iconPath,
                success: function (res) {
                  
                  that.data.marker['iconPath'] = res.tempFilePath
                  console.log(res.tempFilePath)
                  that.setData({
                    markers: that.data.markers.concat(that.data.marker)
                  })
                }
              })
            }
          }
        }
      });
  },
  markertap:function(e) {
    console.log(e.markerId)
  },
  controltap:function(e) {
    if(e.controlId == 1){
        wx.navigateTo({
          url: '../publish/index'
        })
    }
  }
})