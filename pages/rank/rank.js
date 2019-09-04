// pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:['排位赛','积分赛'],
    regionList: ['两广赛区', '闽赣赛区', '中西赛区', '东北华北赛区', '浙江赛区', '山东赛区', '豫皖赛区', '苏沪赛区'],
    pk_type:0,
    region:0,
    rankList:[],
    page_no:1,
    total_page:0,
    team_name:'',
    pk_region:'两广赛区',
    num_per_page:15
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { page_no, pk_region, team_name, num_per_page, pk_type} = this.data
    this._getRankList(page_no, pk_region, team_name, num_per_page, pk_type)
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

  clear(){
    let { page_no, pk_region, team_name, num_per_page, total_page } = this.data
    team_name = ''
    this._getRankList(page_no, pk_region, team_name, num_per_page)
  },

  prev(){
    let { page_no, pk_region, team_name, num_per_page, total_page, pk_type } = this.data
    let num = --page_no
    console.log(total_page)
    if (num >= 1) {
      this._getRankList(num, pk_region, team_name, num_per_page, pk_type)
      this.setData({
        page_no: num
      })
    }
  },

  next(){
    let { page_no, pk_region, team_name, num_per_page, total_page, pk_type} = this.data
    let num = ++page_no
    if (num <= total_page){
      this._getRankList(num, pk_region, team_name, num_per_page, pk_type)
      this.setData({
        page_no: num
      })
    }
  },

  chnageInput(e){
    let { page_no, pk_region, team_name, num_per_page, total_page } = this.data
    team_name = e.detail.value
    // console.log(team_name)
    this._getRankList(page_no, pk_region, team_name, num_per_page)
  },

  bindRegionChange(e){
    // console.log(e.detail.value)
    const index = e.detail.value
    
    let { page_no, pk_region, team_name, num_per_page, regionList, pk_type } = this.data
    pk_region = regionList[index]
    page_no = 1
    this.setData({
      region: index,
      pk_region: pk_region,
      page_no: page_no
    })
    this._getRankList(page_no, pk_region, team_name, num_per_page, pk_type)
  },

  bindTypeChange(e) {
    // console.log(e.detail.value)
    const index = e.detail.value
    let { page_no, pk_region, team_name, num_per_page, types, pk_type } = this.data
    pk_type = index
    page_no = 1
    this.setData({
      pk_type: pk_type,
      page_no: page_no
    })
    this._getRankList(page_no, pk_region, team_name, num_per_page, pk_type)
  },

  _getRankList(page, pk_region, team_name, num_per_page, pk_type) {
    pk_type = parseInt(pk_type) + 1
    wx.showLoading({
      title: '数据加载中',
    })
    let url = `http://localhost:3000/rank?page_no=${page}&pk_region=${pk_region}&team_name=${team_name}&num_per_page=${num_per_page}&pk_type=${pk_type}`
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