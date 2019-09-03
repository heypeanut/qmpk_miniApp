// pages/video-details/video-details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const video = app.globalData.video
    const videoList = app.globalData.videoList
    const recommendList = this._normalRecommend(videoList.slice(0,10), video)
    // console.log(recommendList, video)
    this.setData({
      video: video,
      videoList: videoList,
      recommendList: recommendList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  selectItem(e){
    let video = e.currentTarget.dataset.video
    const recommendList = this._normalRecommend(this.data.videoList, video)
    this.setData({
      video: video,
      recommendList: recommendList
    })
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  _normalRecommend(list,currentVideo){
    const ret = []
    list.forEach(video=>{
      if (video.id !== currentVideo.id){
        ret.push(video)
      }
    })
    return ret
  }
})