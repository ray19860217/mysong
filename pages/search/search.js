var config = require('../../config.js');  //导入配置文件

Page({
  data: {
    value: '', //搜索关键字
    loading: false, //按键前的loading图标
    list: [], //搜索结果
  },

  //保存输入的关键字  
  inputing: function (e) {
    this.setData({
      value: e.detail.value  //更新搜索关键字
    });
  },

  //立即搜索按钮
  bindSearch: function () {
    var self = this;

    this.setData({
      loading: !self.data.loading //更新立即搜索按钮的loading图标
    });

    //开始搜索
    wx.request({
      url: config.config.searchByNameUrl, //搜索接口
      data: { keyword: self.data.value },    //搜索关键字

      success: function (e) {
        if (e.statusCode == 200) { //搜索成功

          self.setData({
            list: e.data.showapi_res_body.pagebean.contentlist,  //更新搜索结果
            loading: !self.data.loading
          });

          //将歌曲列表保存到本地缓存中
          wx.setStorageSync('songlist', e.data.showapi_res_body.pagebean.contentlist);
        }
      }
    });
  },

  bindtaplist: function (e) {
    console.log(e.currentTarget.id);
    var musicindex = parseInt(e.currentTarget.id, 10)
    wx.reLaunch({
      url: '/pages/play/play?songid=' + this.data.list[musicindex].songid,
    })
  }
})