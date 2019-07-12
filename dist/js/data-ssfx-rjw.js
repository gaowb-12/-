"use strict";

(function () {
  // ;(function($){
  //   $.fn.datepicker.dates['zh-CN'] = {
  //     days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  //     daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  //     daysMin: ["日", "一", "二", "三", "四", "五", "六"],
  //     months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  //     monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  //     today: "今天",
  //     monthsTitle: "选择月份",
  //     clear: "清除",
  //     format: "yyyy-mm-dd",
  //     titleFormat: "yyyy年mm月",
  //     weekStart: 1
  //   };
  // }(jQuery));
  var crossLineColor = '#00baff';
  var splitLineColor = 'rgba(0, 0, 0, .1)';
  $('#reservation').daterangepicker({
    opens: 'right',
    locale: {
      format: "YYYY/MM/DD",
      //设置显示格式
      applyLabel: '确定',
      //确定按钮文本
      cancelLabel: '取消',
      //取消按钮文本
      daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      firstDay: 1
    }
  }); //配色

  var color = ['#0c8fd8', '#05a07d', '#8ac700', '#c4db3a', '#f59647', '#f16b60', '#db2b14', '#7b51ba', '#917c5f', '#00baff', '#52bbb7', '#595ea0']; // 访问次数分布  fwcsfb 

  var fwcsfbCharts = echarts.init(document.getElementById('fwcsfb'));
  var ydata = [{
    name: '访问次数1',
    value: 18
  }, {
    name: '访问次数2',
    value: 122
  }, {
    name: '访问次数3',
    value: 99
  }, {
    name: '访问次数4',
    value: 34
  }];
  var fwcsfbOptions = {
    backgroundColor: 'rgba(255,255,255,1)',
    color: color,
    legend: {
      orient: 'vartical',
      right: '30',
      data: ['访问次数1', '访问次数2', '访问次数3', '访问次数4'],
      itemWidth: 11,
      itemHeight: 11,
      itemGap: 16,
      formatter: function formatter(name) {
        return '' + name;
      }
    },
    series: [{
      type: 'pie',
      clockwise: false,
      //饼图的扇区是否是顺时针排布
      minAngle: 2,
      //最小的扇区角度（0 ~ 360）
      radius: ['60%', '70%'],
      center: ['45%', '45%'],
      avoidLabelOverlap: false,
      itemStyle: {
        //图形样式
        normal: {
          borderColor: '#ffffff',
          borderWidth: 3
        }
      },
      label: {
        normal: {
          show: false,
          position: 'center',
          formatter: '{text|{b}}\n独立访客：{d}%',
          // formatter: function (params) {
          //   var res = '';
          //   var myseries = ydata;
          //   for (var j = 0; j < myseries.length; j++) {
          //     if (myseries[j].name == params.name) {
          //       res += ' ' + myseries[j].name
          //         + '\n {value|}' + myseries[j].value
          //         + '\n {miaoshu|}' + myseries[j].miaoshu;
          //     }
          //   }
          //   return res;
          // },
          rich: {
            text: {
              color: '#333',
              fontSize: 14,
              align: 'center',
              verticalAlign: 'middle',
              padding: 8
            },
            value: {
              color: '#333',
              fontSize: 14,
              align: 'center',
              verticalAlign: 'middle'
            }
          }
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: 14
          }
        }
      },
      data: ydata
    }]
  };
  setTimeout(function () {
    fwcsfbCharts.on('mouseover', function (params) {
      if (params.name == ydata[0].name) {
        fwcsfbCharts.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: 0
        });
      } else {
        fwcsfbCharts.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: 0
        });
      }
    });
    fwcsfbCharts.on('mouseout', function (params) {
      fwcsfbCharts.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: 0
      });
    });
    fwcsfbCharts.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: 0
    });
  }, 1000);
  fwcsfbCharts.setOption(fwcsfbOptions); //每次浏览数分布   mcllsfb

  var mcllsfbCharts = echarts.init(document.getElementById('mcllsfb'));
  var mcllsfbdata = [{
    name: '访问次数1~2次',
    value: 18
  }, {
    name: '访问次数3~5次',
    value: 122
  }, {
    name: '访问次数6~9次',
    value: 99
  }, {
    name: '访问次数10~15次',
    value: 34
  }, {
    name: '浏览>=15次',
    value: 34
  }];
  var mcllsfbOptions = {
    backgroundColor: 'rgba(255,255,255,1)',
    color: color,
    legend: {
      orient: 'vartical',
      right: '30',
      data: ['访问次数1~2次', '访问次数3~5次', '访问次数6~9次', '访问次数10~15次', '浏览>=15次'],
      itemWidth: 11,
      itemHeight: 11,
      itemGap: 16,
      formatter: function formatter(name) {
        return '' + name;
      }
    },
    series: [{
      type: 'pie',
      clockwise: false,
      //饼图的扇区是否是顺时针排布
      minAngle: 2,
      //最小的扇区角度（0 ~ 360）
      radius: ['60%', '70%'],
      center: ['45%', '45%'],
      avoidLabelOverlap: false,
      itemStyle: {
        //图形样式
        normal: {
          borderColor: '#ffffff',
          borderWidth: 3
        }
      },
      label: {
        normal: {
          show: false,
          position: 'center',
          formatter: '{text|{b}}\n独立访客：{d}%',
          // formatter: function (params) {
          //   var res = '';
          //   var myseries = ydata;
          //   for (var j = 0; j < myseries.length; j++) {
          //     if (myseries[j].name == params.name) {
          //       res += ' ' + myseries[j].name
          //         + '\n {value|}' + myseries[j].value
          //         + '\n {miaoshu|}' + myseries[j].miaoshu;
          //     }
          //   }
          //   return res;
          // },
          rich: {
            text: {
              color: '#333',
              fontSize: 14,
              align: 'center',
              verticalAlign: 'middle',
              padding: 8
            },
            value: {
              color: '#333',
              fontSize: 14,
              align: 'center',
              verticalAlign: 'middle'
            }
          }
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: 14
          }
        }
      },
      data: mcllsfbdata
    }]
  };
  mcllsfbCharts.setOption(mcllsfbOptions); // 用户变化趋势 

  var yhbhqsCharts = echarts.init(document.getElementById('yhbhqs'));
  var y_data_yhbhqs = ['2019/02/01', '2019/02/02', '2019/02/33', '2019/02/04', '2019/02/05', '2019/02/06', '2019/02/07', '2019-2-8', '2019/02/09', '2019-2-10', '2019/02/11', '2019/02/12', '2019/02/13', '2019/02/14'];
  var yhbhqsOptions = {
    title: {
      left: '8',
      text: '指标变化趋势',
      textStyle: {
        fontWeight: 700,
        fontSize: 14
      }
    },
    grid: {
      left: '4%',
      right: '4%',
      top: '70',
      bottom: '8%',
      containLabel: true
    },
    color: color,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        color: crossLineColor
      }
    },
    legend: {
      data: ['独立访客', '独立IP']
    },
    xAxis: [{
      type: 'category',
      data: y_data_yhbhqs,
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#999'
        }
      },
      axisPointer: {
        type: 'line',
        label: {
          show: true
        },
        lineStyle: {
          color: crossLineColor,
          type: 'dashed'
        }
      },
      splitLine: {
        show: false
      }
    }],
    yAxis: [{
      type: 'value',
      name: '用\n户\n数',
      nameLocation: 'center',
      nameRotate: 0,
      nameTextStyle: {
        color: '#000',
        fontSize: 12,
        verticalAlign: 'center'
      },
      nameGap: 15,
      min: 0,
      max: 400,
      interval: 50,
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#999'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: splitLineColor
        }
      },
      axisLabel: {
        inside: true,
        formatter: '{value}\n'
      },
      axisPointer: {
        type: 'line',
        label: {
          show: true
        },
        lineStyle: {
          color: crossLineColor,
          type: 'dashed'
        }
      }
    }],
    series: [{
      name: '独立访客',
      type: 'line',
      smooth: true,
      showSymbol: false,
      symbolSize: 5,
      sampling: 'average',
      data: [110, 120, 130, 14, 150, 160, 180, 19, 300, 22, 44, 380, 21, 43, 55, 202, 44, 66]
    }, {
      name: '独立IP',
      type: 'line',
      smooth: true,
      showSymbol: false,
      symbolSize: 5,
      sampling: 'average',
      data: [22, 110, 120, 130, 14, 150, 160, 180, 19, 300, 22, 44, 380, 21, 43, 55, 202, 44, 66]
    }]
  };
  yhbhqsCharts.setOption(yhbhqsOptions); // 访问情况变化趋势 

  var fwqkbhqsCharts = echarts.init(document.getElementById('fwqkbhqs'));
  var x_data_fwqkbhqs = ['2019/02/01', '2019-2-2', '2019-2-3', '2019-2-4', '2019-2-5', '2019-2-6', '2019-2-7', '2019-2-8', '2019-2-9', '2019-2-10', '2019-2-11'];
  var fwqkbhqsOptions = {
    title: {
      left: '8',
      text: '访问情况变化趋势',
      textStyle: {
        fontWeight: 700,
        fontSize: 14
      }
    },
    grid: {
      left: '4%',
      right: '4%',
      top: '70',
      bottom: '8%',
      containLabel: true
    },
    color: [color[1], color[4]],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: crossLineColor
        }
      }
    },
    legend: {
      data: ['访问次数', '浏览次数']
    },
    xAxis: [{
      type: 'category',
      data: x_data_fwqkbhqs,
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#999'
        }
      },
      axisPointer: {
        type: 'line',
        label: {
          show: true
        },
        lineStyle: {
          color: crossLineColor,
          type: 'dashed'
        }
      },
      splitLine: {
        show: false
      }
    }],
    yAxis: [{
      type: 'value',
      name: '访\n问\n次\n数',
      nameLocation: 'center',
      nameRotate: 0,
      nameTextStyle: {
        color: '#000',
        fontSize: 12,
        verticalAlign: 'center'
      },
      nameGap: 15,
      min: 0,
      max: 400,
      interval: 50,
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#999'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: splitLineColor
        }
      },
      axisLabel: {
        inside: true,
        formatter: '{value}\n'
      }
    }, {
      type: 'value',
      name: '浏\n览\n次\n数',
      nameLocation: 'center',
      nameRotate: 0,
      nameTextStyle: {
        color: '#000',
        verticalAlign: 'center',
        fontSize: 12
      },
      nameGap: 15,
      min: 0,
      max: 1000,
      interval: 200,
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#999'
        }
      },
      splitLine: {
        show: false,
        lineStyle: splitLineColor
      },
      axisLabel: {
        inside: true,
        opacity: 0.2,
        formatter: '{value}\n'
      }
    }],
    series: [{
      name: '访问次数',
      type: 'bar',
      barWidth: 20,
      // barGap: '5%',
      // barCategoryGap: '5%',
      smooth: true,
      showSymbol: false,
      symbolSize: 5,
      itemStyle: {
        normal: {
          barBorderRadius: 5
        }
      },
      sampling: 'average',
      data: [110, 120, 130, 14, 150, 160, 180, 19, 300, 22, 44, 380, 21, 43, 55]
    }, {
      name: '浏览次数',
      type: 'line',
      smooth: true,
      showSymbol: false,
      symbolSize: 5,
      sampling: 'average',
      data: [22, 110, 120, 130, 14, 150, 160, 180, 19, 300, 22, 44, 380, 21, 43, 55]
    }]
  };
  fwqkbhqsCharts.setOption(fwqkbhqsOptions); // 分辨率top10

  var fblTop10Charts = echarts.init(document.getElementById('fblTop10'));
  var category = ['1024×540', '2048×1080', '4090×2160', '1024×540', '1024×540', '1024×540', '1024×540'];
  var fblbarData = [3100, 2142, 1218, 581, 431, 383, 163];
  var fblTop10Options = {
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
    color: color[10],
    grid: {
      left: '5%',
      right: '5%',
      top: 0,
      bottom: '10%',
      containLabel: true
    },
    barMaxWidth: 20,
    xAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: color[10],
          width: 1
        }
      },
      axisLine: {
        show: false,
        // splitLine:{show: true, color: '#79fed0'},//去除网格线
        axisLine: {
          lineStyle: {
            color: color[10],
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
      data: fblbarData,
      itemStyle: {
        emphasis: {
          shadowBlur: 4,
          shadowColor: color[10],
          borderWidth: 1,
          borderColor: '#fff'
        },
        normal: {
          barBorderRadius: 7,
          color: color[10]
        }
      }
    }]
  };
  fblTop10Charts.setOption(fblTop10Options); // 浏览器top10

  var llqTop10Charts = echarts.init(document.getElementById('llqTop10'));
  var category = ['1024×540', '2048×1080', '4090×2160', '1024×540', '1024×540', '1024×540', '1024×540'];
  var llqbarData = [3100, 2142, 1218, 581, 431, 383, 163];
  var llqTop10Options = {
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
    color: color[11],
    grid: {
      left: '5%',
      right: '5%',
      top: 0,
      bottom: '10%',
      containLabel: true
    },
    barMaxWidth: 22,
    xAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: color[11],
          width: 1
        }
      },
      axisLine: {
        show: false,
        // splitLine:{show: true, color: '#79fed0'},//去除网格线
        axisLine: {
          lineStyle: {
            color: color[11],
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
      data: llqbarData,
      itemStyle: {
        emphasis: {
          shadowBlur: 4,
          shadowColor: color[11],
          borderWidth: 1,
          borderColor: '#fff'
        },
        normal: {
          barBorderRadius: 7,
          color: color[11]
        }
      }
    }]
  };
  llqTop10Charts.setOption(llqTop10Options);
})();