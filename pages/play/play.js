var config = require('../../config.js'); //导入配置文件

Page({
  data: {
    song: {},  //传入的歌曲信息
    isPlaying: false, //播放状态
  },

  //页面载入事件处理函数
  onLoad: function (options) {
    var self = this;
    var songid = options.songid; //获取页面跳转传过来的参数(歌曲对象)
    if (songid === undefined) { //未传入歌曲ID
      var curSong = wx.getStorageSync('curSong') || {}; //从缓存中获取歌曲

      if (curSong === undefined) { //缓存中无歌曲
        var song = { songname: '未选择歌曲' }; //显示未选择歌曲
        this.setData({
          song: song
        })

      } else {
        this.setData({
          song: curSong
        });
      }

    } else {
      var songlist = wx.getStorageSync('songlist') || []; //从缓存中取出歌曲列表
      //在歌曲列表中查找songid指定的歌曲
      for (var i = 0; i < songlist.length; i++) {
        if (songlist[i].songid == songid) {  //找到对应的歌曲        
          this.setData({
            song: songlist[i]   //更新歌曲
          });
          break;
        }
      }
      //缓存正在播放的歌曲
      wx.setStorageSync('curSong', this.data.song);
    }
    console.log(this.data.song);
  },

  //播放/暂停
  playToggle: function () {
    var self = this;
    //没有歌曲要播放，则直接退出
    if (this.data.song.songname == '未选择歌曲') {
      return;
    }

    if (this.data.isPlaying) { //正在播放
      wx.stopBackgroundAudio(); //停止播放歌曲

    } else {//未播放，则开始播放

      //播放歌曲
      wx.playBackgroundAudio({
        dataUrl: this.data.song.url || this.data.song.m4a,
        success: function (res) { }
      })
    }

    //更新播放状态
    this.setData({
      isPlaying: !this.data.isPlaying
    });
  }
})