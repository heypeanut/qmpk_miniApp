// pages/video-list/video-list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList:[],
    team:'',
    page:1,
    per_page:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { team, per_page,page } = this.data
    this._getVideoList(team, per_page, page)
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

  more(e){
    console.log(e)
    let { team, per_page,page } = this.data
    team = e.detail.value
    ++page
    if(page < 100){
      this._getVideoList(team, per_page,page)
      this.setData({
        page:page
      })
    }
    
  },

  search(e){
    // console.log(e.detail.value)
    let { team, per_page} = this.data
    team = e.detail.value
    this._getVideoList(team,50)
  },

  clear(){
    let { team, per_page } = this.data
    this._getVideoList(team, per_page)
  },

  _getVideoList(team, per_page, page){
    let { videoList } = this.data
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: `http://localhost:3000/list?team=${team}&per_page=${per_page}&page=${page}`,
      success: (res) => {
        // console.log(res)
        if (res.data.status) {
          this.setData({
            videoList: videoList.concat(res.data.data)
          })
          wx.hideLoading()
        }
      }
    })
  }
  
})