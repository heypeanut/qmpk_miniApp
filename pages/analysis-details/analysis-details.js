// pages/analysis-details/analysis-details.js
import * as echarts from '../../component/ec-canvas/echarts';

function initChartPic(canvas, width, height, data) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '阵容出战占比',
      subtext: '根据每个阵容出战次数计算占比',
      x: "center",
      textStyle: {
        color: "#6eabf0",
        fontSize: 18,
        fontWeight: 400
      }
    },
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '50%'],
      data: data,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };

  chart.setOption(option);
  return chart;
}

function initChartRadar(canvas, width, height, data) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    legend: {
      data: ['门派场数']
    },
    radar: {
      name: {
        textStyle: {
          color: "#6eabf0",
        }
      },
      indicator: data.indicator
    },
    series: [{
      type: 'radar',
      areaStyle: { normal: {} },
      data: [
        {
          value: data.value,
          // name: "门派场数"
        }
      ]
    }]
  };

  chart.setOption(option);
  return chart;
}

function initChartLine(canvas, width, height,data) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: 'PK时长分析',
      subtext: '根据PK时长排序该队伍战斗时间（分钟）',
      x: "center",
      textStyle: {
        color: "#6eabf0",
        fontSize: 18,
        fontWeight: 400
      }
    },
    textStyle: {
      fontSize: 12,
      color: '#6eabf0'
    },
    xAxis: {
      type: "category",
      splitNumber: 0,
      axisLabel: {
        margin: 10,
      },
      data: data.xAxisData,
    },
    yAxis: {
      show: false,
      type: "value",
    },
    series: [{
      type: "line",
      smooth: true,
      data: data.seriesData
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fighting_timer:[],
    most_team:[],
    odds:'',
    playSchool:[],
    picEc: {
    },
    ecRadar: {
    },
    lineEc: {
    },
    timer: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.options)
    const { name, year } = this.options
    if (!name || !year){
      wx.reLaunch({
        url:'/pages/analysis/analysis'
      })
    }
    this._getAnalysis(name, year)
    wx.setNavigationBarTitle({
      title: name+'分析结果'
    })
    this.setData({
      name:name,
      year: year
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

  echartInit(e) {
    this.setData({
      canvasData:e.detail
    })
    // initChart(e.detail.canvas, e.detail.width, e.detail.height, data);
  },
  echartInitRadar(e){
    this.setData({
      canvasRadar: e.detail
    })
  },
  echartInitLine(e) {
    this.setData({
      canvasLine: e.detail
    })
  },
  radarData() {
    const playSchool = this.data.playSchool;
    const auxiliary = ["普陀山", "化生寺", "无底洞", "阴曹地府"];
    const sealing = [
      "女儿村",
      "方寸山",
      "盘丝岭",
      "五庄观",
      "天宫",
      "无底洞"
    ];
    const physical = ["大唐官府", "狮驼岭", "五庄观", "凌波城", "花果山"];
    const element = ["龙宫", "魔王寨", "天宫", "神木林"];
    const tomb = ["女魃墓"];
    const machine = ["天机城"];
    const indicator = [
      {
        name: "辅助",
        max: 0
      },
      {
        name: "封系",
        max: 0
      },
      {
        name: "传统物理",
        max: 0
      },
      {
        name: "传统法系",
        max: 0
      },
      {
        name: "女魃墓",
        max: 0
      },
      {
        name: "天机城",
        max: 0
      }
    ];
    if (!playSchool) {
      return false
    }
    playSchool.map(item => {
      if (auxiliary.includes(item.school)) {
        indicator[0]["max"] += item.num;
      }
      if (sealing.includes(item.school)) {
        indicator[1]["max"] += item.num;
      }
      if (physical.includes(item.school)) {
        indicator[2]["max"] += item.num;
      }
      if (element.includes(item.school)) {
        indicator[3]["max"] += item.num;
      }
      if (tomb.includes(item.school)) {
        indicator[4]["max"] += item.num;
      }
      if (machine.includes(item.school)) {
        indicator[5]["max"] += item.num;
      }
    });
    let value = [];
    let max = playSchool.sort((a, b) => {
      return a.num < b.num;
    });
    for (let i = 0; i < indicator.length; i++) {
      if (indicator[i].max === 0) {
        value.push(max.max);
      } else {
        value.push(indicator[i].max * 0.8);
      }
    }
    return {
      value,
      indicator
    };
  },
  lineData() {
    const fighting_timer = this.data.fighting_timer
    const xAxisData = []
    const seriesData = []
    const timer = []
    if (!fighting_timer) {
      return false
    }
    fighting_timer.map((item, index) => {
      timer.push(item.videoTime.videoTime)
      xAxisData.push(parseInt(item.videoTime.videoTime))
      seriesData.push(item.videoTime.original)
    })


    return {
      xAxisData: xAxisData,
      seriesData: seriesData,
      timer: timer
    }
  },
  _getAnalysis(name, year){
    const data = []
    wx.showLoading({
      title: '分析中',
    })
    wx.request({
      url: `http://localhost:3000/v0/analysis?team=${name}&year=${year}`,
      success: (res) => {
        
        if (res.data.status) {
          
          this.setData({
            ...res.data.data,
          })
          if (!res.data.data.most_team || !res.data.data.fighting_timer){
            wx.showToast({
              title: '当前选择年度无队伍信息',
              icon: 'none',
              duration: 2000,
              success: () => {
                setTimeout(()=>{
                  wx.navigateBack()
                }, 1500)
              }
            })
          }
          res.data.data.most_team.forEach((item, index) => {
            data.push({
              value: item.num,
              name: '阵容' + (index+1)
            })
          })
          const { canvasData, canvasRadar, canvasLine } = this.data
          // console.log(this.lineData())
          const newLineData = this.lineData()
          this.setData({
            timer: newLineData.timer
          })
          // console.log(canvasData.canvas, canvasData.width, canvasData.height)
          initChartPic(canvasData.canvas, canvasData.width, canvasData.height, data);
          // console.log(canvasRadar)
          // initChartRadar
          initChartRadar(canvasRadar.canvas, canvasRadar.width, canvasRadar.height, this.radarData())
          
         
          initChartLine(canvasLine.canvas, canvasLine.width, canvasLine.height, newLineData)
          
          wx.hideLoading()
        }
      },
      fail:()=>{
        wx.showToast({
          title: '网络错误',
          icon: 'none',
          duration: 2000,
          success: () => {
            wx.reLaunch({
              url: '/pages/analysis/analysis'
            })
          }
        })
      }
    })
  }
})