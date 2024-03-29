// pages/video-list/video-list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getVideoList()
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

  selectItem: function(video){
    // console.log(app.globalData)
    app.globalData.video = video.currentTarget.dataset.video
    app.globalData.videoList = this.data.videoList
    // app.globalData.recommend = video.currentTarget.dataset.video
    wx.navigateTo({
      url: '/pages/video-details/video-details',
    })
  },

  _getVideoList(){
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: 'http://localhost:3000/list',
      success: (res) => {
        // console.log(res)
        if (res.data.status) {
          this.setData({
            videoList: res.data.data
          })
          wx.hideLoading()
          console.log(this.data.videoList)
        }
      }
    })
  }
  
})