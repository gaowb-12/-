"use strict";

(function () {
  var splitLineColor = 'rgba(0, 0, 0, .1)';
  var textColor = '#333';
  var currSubject = '语文'; // 学科分析

  var subAnalysisCharts = echarts.init(document.getElementById('subject-analysis'));
  var subAnalysisOptions;
  var subAnalysisRes = [{
    name: '语文',
    value: 2000,
    selected: true
  }, {
    name: '数学',
    value: 130
  }, {
    name: '英语',
    value: 13
  }, {
    name: '体育',
    value: 1600
  }, {
    name: '劳动',
    value: 197
  }, {
    name: '生物',
    value: 165
  }, {
    name: '历史',
    value: 152
  }];
  var subAnalysisOptions = {
    tooltip: {
      show: 'true',
      trigger: 'item',
      padding: [8, 10],
      // 内边距
      formatter: function formatter(a) {
        return '23:13:16<br>实时用户: 45<br>实时新增用户:55<br>教材使用次数:' + a.value;
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      top: 30,
      bottom: '18%'
    },
    xAxis: [{
      type: 'category',
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        inside: false,
        textStyle: {
          color: '#999',
          fontWeight: 'normal',
          fontSize: '12'
        }
      },
      data: subAnalysisRes.map(function (item) {
        return item.name;
      })
    }],
    yAxis: {
      type: 'value',
      show: true,
      // max: maxPlanCourseCnt,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: splitLineColor
        }
      },
      axisLabel: {
        textStyle: {
          color: '#999',
          // textColor,
          fontWeight: 'normal',
          fontSize: '12'
        },
        formatter: '{value}'
      }
    },
    series: [{
      name: '',
      type: 'bar',
      barMaxWidth: 50,
      itemStyle: {
        normal: {
          show: true,
          color: function color(param) {
            var colorStr = param.name === currSubject ? '#1f8380' : '#52bbb7';
            return colorStr;
          },
          barBorderRadius: 5,
          borderWidth: 0
        }
      },
      data: subAnalysisRes
    }]
  };
  subAnalysisCharts.setOption(subAnalysisOptions); // top10

  var top10Charts = echarts.init(document.getElementById('top10-charts'));
  var category = ['一年级上册', '一年级下册', '二年级上册', '二年级下册', '三年级上册', '三年级下册', '四年级上册'];
  var barData = [3100, 2142, 1218, 581, 431, 383, 163];
  var top10ChartsOptions = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: ''
      },
      formatter: function formatter(obj) {
        // console.log(obj);
        return '23:13:16<br>实时用户: 45<br>实时新增用户:55<br>教材使用次数:' + (obj[0] && obj[0].value || '');
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      top: 30,
      bottom: '15%',
      containLabel: true
    },
    barMaxWidth: 22,
    xAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: splitLineColor,
          width: 1
        }
      },
      axisLine: {
        show: false,
        // splitLine:{show: true, color: '#79fed0'},//去除网格线
        axisLine: {
          lineStyle: {
            color: '#79fed0',
            width: 1
          }
        },
        textStyle: {
          color: '#79fed0',
          fontWeight: 'normal',
          fontSize: '12'
        },
        lineStyle: {
          color: '#999'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      data: category,
      splitLine: {
        show: false
      },
      textStyle: {
        color: '#999',
        fontWeight: 'normal',
        fontSize: '12'
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#999'
        }
      },
      axisTick: {
        show: false
      },
      offset: 10
    },
    series: [{
      name: '数量',
      type: 'bar',
      data: barData,
      itemStyle: {
        emphasis: {
          shadowBlur: 4,
          shadowColor: '#51d7ff',
          borderWidth: 1,
          borderColor: '#fff'
        },
        normal: {
          barBorderRadius: 7,
          color: '#51d7ff'
        }
      }
    }]
  };
  top10Charts.setOption(top10ChartsOptions);
  var userDistributionCharts = echarts.init(document.getElementById('user-distribution-charts'));
  var userDistributionData = [{
    value: 75,
    name: '内嵌资源'
  }, {
    value: 15,
    name: '云上资源'
  }, {
    value: 45,
    name: '其他资源'
  }];
  var color = ['#f5a31b', '#00b1ec', '#999'];
  var outDataStyle = {
    normal: {
      label: {
        show: false
      },
      labelLine: {
        show: false
      }
    }
  };
  var innerDataStyle = {
    normal: {
      label: {
        show: true
      },
      labelLine: {
        show: true
      },
      shadowBlur: 40,
      shadowColor: 'rgba(40, 40, 40, 0.5)'
    }
  };
  var placeHolderStyle = {
    normal: {
      label: {
        show: false
      },
      labelLine: {
        show: false
      }
    }
  };
  var userDistributionChartsOptions = {
    tooltip: {
      show: true,
      formatter: '{b}<br>{c} ({d}%)'
    },
    legend: {
      show: true,
      orient: 'vertical',
      right: 10,
      data: userDistributionData.map(function (item) {
        return item.name;
      })
    },
    grid: {
      left: '0',
      right: '25%',
      top: 30,
      bottom: '18%',
      containLabel: true
    },
    series: [{
      name: 'Line 1',
      type: 'pie',
      clockWise: false,
      center: ['45%', '50%'],
      radius: ['60%', '70%'],
      itemStyle: {
        normal: innerDataStyle
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}\n{d}%'
        }
      },
      color: color,
      data: userDistributionData
    }, {
      name: 'Line 2',
      type: 'pie',
      animation: false,
      clockWise: false,
      center: ['45%', '50%'],
      radius: ['78%', '79%'],
      itemStyle: outDataStyle,
      hoverAnimation: false,
      legendHoverLink: false,
      trigger: false,
      tooltip: {
        show: false
      },
      color: ['rgba(0, 0, 0, .1)'],
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [{
        value: 100,
        name: 'xxx'
      }, {
        value: 0,
        name: 'invisible'
      }]
    }]
  };
  userDistributionCharts.setOption(userDistributionChartsOptions); // events

  var bindEvents = function bindEvents() {
    // 一级选项卡点击事件
    $('.box-a').on('click', function (e) {
      $('.box-a').removeClass('selected');
      $(this).addClass('selected');
      refreshAll();
    }); // 二级选项卡(学科分析)点击事件
    // 处理点击事件并且跳转到相应的百度搜索页面

    subAnalysisCharts.on('click', function (params) {
      console.log('点击事件:' + params.name);

      if (currSubject === params.name) {
        // 点击当前科目, 查询全部内容
        currSubject = '';
      } else {
        currSubject = params.name;
      } // 刷新柱子状态


      subAnalysisCharts.setOption(subAnalysisOptions);
      refreshBySubjects(currSubject);
    }); // resize

    function resize() {
      subAnalysisCharts.resize();
      top10Charts.resize();
      userDistributionCharts.resize();
    }

    $('.sidebar-toggle').on('click', function () {
      setTimeout(function () {
        resize();
      }, 400);
    });
    $(window).resize(function () {
      var timer = null;

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(function () {
        resize();
      }, 200);
    });
  };

  function refreshAll() {
    // 分别刷新所有charts
    // chart1
    subAnalysisRes = [{
      name: '语文',
      value: 1000
    }, {
      name: '数学',
      value: 130
    }, {
      name: '英语',
      value: 13
    }, {
      name: '体育',
      value: 1600,
      selected: true
    }, {
      name: '劳动',
      value: 197
    }, {
      name: '生物',
      value: 165
    }, {
      name: '历史',
      value: 1520
    }];
    subAnalysisOptions.series[0].data = subAnalysisRes;
    subAnalysisOptions.xAxis.data = subAnalysisRes;
    subAnalysisCharts.setOption(subAnalysisOptions); // charts2 ...

    refreshBySubjects();
  }

  function refreshBySubjects() {
    var subject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '语文';
    // top10
    barData = [110, 212, 118, 381, 41, 83, 1603];
    top10ChartsOptions.series[0].data = barData;
    top10Charts.setOption(top10ChartsOptions); // 用户分布

    userDistributionData = [{
      value: 15,
      name: '内嵌资源'
    }, {
      value: 35,
      name: '云上资源'
    }, {
      value: 65,
      name: '其他资源'
    }];
    userDistributionChartsOptions.series[0].data = userDistributionData;
    userDistributionCharts.setOption(userDistributionChartsOptions);
  }

  bindEvents();
})();