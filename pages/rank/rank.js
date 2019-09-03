// pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankList:[],
    page_no:1,
    total_page:0,
    team_name:'',
    pk_region:'两广赛区',
    num_per_page:17
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { page_no, pk_region, team_name, num_per_page} = this.data
    this._getRankList(page_no, pk_region, team_name, num_per_page)
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
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.hideLoading()
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

  prev(){
    let { page_no, pk_region, team_name, num_per_page, total_page } = this.data
    let num = --page_no
    console.log(total_page)
    if (num >= 1) {
      this._getRankList(num, pk_region, team_name, num_per_page)
      this.setData({
        page_no: num
      })
    }
  },

  next(){
    let { page_no, pk_region, team_name, num_per_page, total_page} = this.data
    let num = ++page_no
    if (num <= total_page){
      this._getRankList(num, pk_region, team_name, num_per_page)
      this.setData({
        page_no: num
      })
    }
  },

  chnageInput(e){
    let { page_no, pk_region, team_name, num_per_page, total_page } = this.data
    team_name = e.detail.value
    console.log(team_name)
    this._getRankList(page_no, pk_region, team_name, num_per_page)
  },

  _getRankList(page, pk_region, team_name, num_per_page) {
    wx.showLoading({
      title: '数据加载中',
    })
    let url = `http://localhost:3000/rank?page_no=${page}&pk_region=${pk_region}&team_name=${team_name}&num_per_page=${num_per_page}`
    wx.request({
      url: url,
      success: (res) => {
        if(res.data.status){
          this.setData({
            rankList: res.data.data,
            total_page: res.data.total_page
          })
          wx.hideLoading()
        }
      }
    })
  }
})