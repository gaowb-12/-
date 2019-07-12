"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @author: yiyh
 */
(function () {
  'use strict'; // 1. 热门学科top10分布

  var _geoCoordMap, _geo;

  var hotSubjectTop10Charts;
  var normalColor = ['#084a9d', '#4e3692', '#5b61a2', '#1171a0', '#03909b', '#114975', '#446c9e', '#093f89', '#74beda', '#5d7f9b'];
  var hoverColor = '#bcb31e';
  var hotSubjectTop10Opts;
  var hotSubjectTop10Data = [{
    name: '语文',
    value: 154
  }, {
    name: '数学',
    value: 115
  }, {
    name: '美术',
    value: 113
  }, {
    name: '英语',
    value: 95
  }, {
    name: '物理',
    value: 92
  }, {
    name: '化学',
    value: 87
  }, {
    name: '生物',
    value: 87
  }, {
    name: '地理',
    value: 60
  }, {
    name: '劳动',
    value: 60
  }, {
    name: '体育',
    value: 60
  }];
  var hotSubjectTop10Style = [{
    offset: [50, 50]
  }, {
    offset: [2, 80]
  }, {
    offset: [63, 15]
  }, {
    offset: [16, 30]
  }, {
    offset: [64, 70]
  }, {
    offset: [85, 65]
  }, {
    offset: [80, 18]
  }, {
    offset: [40, 65]
  }, {
    offset: [9, 70]
  }, {
    offset: [25, 15]
  }];
  var datas = [];
  var total = hotSubjectTop10Data.reduce(function (acc, next) {
    return acc + next.value;
  }, 0);

  for (var i = 0; i < hotSubjectTop10Data.length; i++) {
    var item = hotSubjectTop10Data[i];
    var itemToStyle = hotSubjectTop10Style[i];
    datas.push({
      name: (item.value / total * 100 || 0).toFixed(2) + '%\n' + item.name,
      value: itemToStyle.offset,
      symbolSize: Math.round(item.value / total * 100 * 4 + 20),
      label: {
        normal: {
          textStyle: {
            fontSize: 14,
            color: '#fff'
          }
        }
      },
      itemStyle: {
        normal: {
          color: normalColor[i]
        }
      }
    });
  }

  hotSubjectTop10Opts = {
    grid: {
      show: false,
      top: 10,
      bottom: 10
    },
    xAxis: [{
      gridIndex: 0,
      type: 'value',
      show: false,
      min: 0,
      max: 100,
      nameLocation: 'middle',
      nameGap: 5
    }],
    yAxis: [{
      gridIndex: 0,
      min: 0,
      show: false,
      max: 100,
      nameLocation: 'middle',
      nameGap: 30
    }],
    series: [{
      type: 'scatter',
      symbol: 'circle',
      symbolSize: 120,
      label: {
        normal: {
          show: true,
          formatter: '{b}',
          color: '#fff',
          textStyle: {
            fontSize: '20'
          }
        }
      },
      itemStyle: {
        normal: {
          borderWidth: '3',
          borderType: 'solid',
          borderColor: '#fff',
          color: hoverColor,
          shadowColor: hoverColor,
          shadowBlur: 10
        }
      },
      data: datas
    }]
  }; // 2. 学科年级使用情况

  var subjectUsageCharts;
  var subjectUsageOpts;
  var subjectUsageAnimationTime = 3000; //动画定时时间

  var subjectUsageIndex = 0; //第几个显示

  var subjectUsageDatas = [{
    value: 60,
    name: '一年级',
    normal: {
      position: 'center'
    }
  }, {
    value: 5,
    name: '二年级',
    normal: {
      position: 'center'
    }
  }, {
    value: 11,
    name: '三年级',
    normal: {
      position: 'center'
    }
  }, {
    value: 15,
    name: '四年级',
    normal: {
      position: 'center'
    }
  }, {
    value: 22,
    name: '五年级',
    normal: {
      position: 'center'
    }
  }, {
    value: 35,
    name: '六年级'
  }];

  var subjectUsageAnimation = function subjectUsageAnimation(chart, seriesIndex) {
    if (!seriesIndex) seriesIndex = 0; // 默认是0

    var options = chart.getOption();
    options.series[seriesIndex].data.forEach(function (data, i) {
      options.series[seriesIndex].data[i].label.emphasis = {
        show: subjectUsageIndex === i
      };
    });
    chart.setOption(options);

    if (subjectUsageIndex > 0) {
      chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: subjectUsageIndex - 1
      });
    }

    chart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: subjectUsageIndex
    });
    subjectUsageIndex++;

    if (subjectUsageIndex >= options.series[seriesIndex].data.length) {
      subjectUsageIndex = 0;
    }
  }; //数据组装


  var getPieData = function getPieData(dataMap) {
    var dataArr = [];
    subjectUsageDatas.forEach(function (data, i) {
      dataArr.push({
        name: data.name,
        value: data.value,
        label: {
          normal: {
            show: false,
            position: 'center'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        }
      });
    });
    return dataArr;
  };

  var subjectUsageDataList = getPieData(subjectUsageDatas);
  subjectUsageOpts = {
    color: ['#1bbdfc', '#df0bff', '#ff8a00', '#ffc029', '#fffc00', '#a7e307', '#05e100', '#00ff8a', '#02d8cb'],
    series: [{
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['55%', '75%'],
      selectedMode: 'single',
      avoidLabelOverlap: false,
      labelLine: {
        normal: {
          show: false
        }
      },
      label: {
        normal: {
          color: '#fff',
          fontSize: 16,
          lineHeight: 20,
          formatter: '{b}\n{d}%'
        }
      },
      data: subjectUsageDataList
    }]
  }; // 语文热门教材top5

  var textbookTop5Charts;
  var textbookTop5ChartsOpts;
  var textbookTop5DataList = [{
    name: '二年级上册',
    value: 999
  }, {
    name: '二年级下册',
    value: 888
  }, {
    name: '三年级上册',
    value: 777
  }, {
    name: '五年级上册',
    value: 777
  }, {
    name: '一年级上册',
    value: 777
  }];
  var textbookTop5Count = textbookTop5DataList.reduce(function (acc, next) {
    return acc += next.value;
  }, 0);
  textbookTop5ChartsOpts = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: ''
      },
      formatter: function formatter(obj) {
        return obj[0].name + '<br>教材用户：' + (obj[0].value / textbookTop5Count * 100).toFixed(2) + '%';
      }
    },
    grid: {
      // top: '10%',
      // left: '3%',
      // right: '3%',
      // bottom: '0',
      top: '14',
      left: '18',
      right: '18',
      bottom: '-6',
      containLabel: true
    },
    yAxis: [{
      type: 'category',
      data: textbookTop5DataList.map(function (item) {
        return item.name;
      }),
      inverse: true,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 12,
          color: '#fff'
        }
      }
    }],
    xAxis: [{
      type: 'value',
      show: false,
      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 12,
          color: '#53a8fa'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#192469'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#17367c'
        }
      }
    }],
    series: [{
      name: '热门学科TOP5',
      type: 'bar',
      barMaxWidth: 20,
      // barWidth:26,
      data: textbookTop5DataList,
      label: {
        normal: {
          show: true,
          position: 'insideRight',
          textStyle: {
            color: 'white' //color of value

          },
          formatter: function formatter(obj) {
            return (obj.value / textbookTop5Count * 100).toFixed(2) + '%';
          }
        }
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: '#4465f3' // 0% 处的颜色

          }, {
            offset: 1,
            color: '#00faff' // 100% 处的颜色

          }], false),
          barBorderRadius: [15, 15, 15, 15],
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 0
        },
        emphasis: {
          shadowBlur: 4,
          shadowColor: '#3c526e',
          borderWidth: 2,
          borderColor: '#0a2f5c'
        }
      }
    }]
  }; //map echarts

  var mapCharts;
  var mapOpts;
  var mapOpts = {
    title: {
      text: 'china'
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2,
      formatter: function formatter(params) {
        var value = (params.value + '').split('.');
        value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
        return params.seriesName + '<br/>' + params.name + ': ' + value;
      }
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data: []
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      x: 'right',
      y: 'center',
      feature: {
        saveAsImage: {
          show: false
        }
      }
    },
    visualMap: {
      min: 0,
      max: 2000,
      text: ['高', '低'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered']
      }
    },
    series: [{
      name: 'cd',
      type: 'map',
      mapType: 'CD',
      roam: true,
      aspectScale: 1,
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#034598',
          borderColor: '#0976c2'
        },
        emphasis: {
          areaColor: '#023a80'
        }
      },
      showLegendSymbol: true,
      data: [{
        name: '北京',
        value: 100
      }, {
        name: '天津',
        value: 72
      }]
    }]
  }; // 指定相关的配置项和数据

  var mapBoxOption = {
    series: [{
      name: 'cd',
      type: 'map',
      mapType: 'CD',
      roam: true,
      aspectScale: 1,
      label: {
        normal: {
          show: true,
          //显示省份标签
          textStyle: {
            color: "blue" //省份标签字体颜色

          }
        },
        emphasis: {
          //对应的鼠标悬浮效果
          show: false,
          textStyle: {
            color: "#800080"
          }
        }
      },
      zoom: 1.2,
      itemStyle: {
        normal: {
          areaColor: '#034598',
          borderColor: '#0976c2'
        },
        emphasis: {
          areaColor: '#023a80'
        }
      },
      // itemStyle: {
      //     normal: {
      //         borderWidth: .5, //区域边框宽度
      //         borderColor: '#009fe8', //区域边框颜色
      //         areaColor: "#ffefd5", //区域颜色
      //     },
      //     emphasis: {
      //         borderWidth: .5,
      //         borderColor: '#4b0082',
      //         areaColor: "#ffdead",
      //     }
      // },
      data: [{
        name: '北京',
        selected: false,
        value: 1
      }, {
        name: '天津',
        selected: false,
        value: 2
      }, {
        name: '上海',
        selected: false,
        value: 3
      }, {
        name: '重庆',
        selected: false,
        value: 4
      }, {
        name: '河北',
        selected: false,
        value: 5
      }, {
        name: '河南',
        selected: false,
        value: 6
      }, {
        name: '云南',
        selected: false,
        value: 7
      }, {
        name: '辽宁',
        selected: false,
        value: 8
      }, {
        name: '黑龙江',
        selected: false,
        value: 9
      }, {
        name: '湖南',
        selected: false,
        value: 10
      }, {
        name: '安徽',
        selected: false,
        value: 11
      }, {
        name: '山东',
        selected: false,
        value: 12
      }, {
        name: '新疆',
        selected: false,
        value: 13
      }, {
        name: '江苏',
        selected: false,
        value: 14
      }, {
        name: '浙江',
        selected: false,
        value: 15
      }, {
        name: '江西',
        selected: false,
        value: 16
      }, {
        name: '湖北',
        selected: false,
        value: 17
      }, {
        name: '广西',
        selected: false,
        value: 18
      }, {
        name: '甘肃',
        selected: false,
        value: 19
      }, {
        name: '山西',
        selected: false,
        value: 20
      }, {
        name: '内蒙古',
        selected: false,
        value: 21
      }, {
        name: '陕西',
        selected: false,
        value: 22
      }, {
        name: '吉林',
        selected: false,
        value: 23
      }, {
        name: '福建',
        selected: false,
        value: 24
      }, {
        name: '贵州',
        selected: false,
        value: 25
      }, {
        name: '广东',
        selected: false,
        value: 26
      }, {
        name: '青海',
        selected: false,
        value: 27
      }, {
        name: '西藏',
        selected: false,
        value: 28
      }, {
        name: '四川',
        selected: false,
        value: 29
      }, {
        name: '宁夏',
        selected: false,
        value: 30
      }, {
        name: '海南',
        selected: false,
        value: 31
      }, {
        name: '台湾',
        selected: false,
        value: 32
      }, {
        name: '香港',
        selected: false,
        value: 33
      }, {
        name: '澳门',
        selected: false,
        value: 34
      }] //各省地图颜色数据依赖value

    }],
    dataRange: {
      x: '-1000 px',
      //图例横轴位置
      y: '-1000 px',
      //图例纵轴位置
      splitList: [{
        start: 1,
        end: 1,
        label: '北京',
        color: '#cfc5de'
      }, {
        start: 2,
        end: 2,
        label: '天津',
        color: '#f1ebd1'
      }, {
        start: 3,
        end: 3,
        label: '上海',
        color: '#feffdb'
      }, {
        start: 4,
        end: 4,
        label: '重庆',
        color: '#e0cee4'
      }, {
        start: 5,
        end: 5,
        label: '河北',
        color: '#fde8cd'
      }, {
        start: 6,
        end: 6,
        label: '河南',
        color: '#e4f1d7'
      }, {
        start: 7,
        end: 7,
        label: '云南',
        color: '#fffed7'
      }, {
        start: 8,
        end: 8,
        label: '辽宁',
        color: '#e4f1d7'
      }, {
        start: 9,
        end: 9,
        label: '黑龙江',
        color: '#e4f1d7'
      }, {
        start: 10,
        end: 10,
        label: '湖南',
        color: '#fffed7'
      }, {
        start: 11,
        end: 11,
        label: '安徽',
        color: '#fffed8'
      }, {
        start: 12,
        end: 12,
        label: '山东',
        color: '#dccee7'
      }, {
        start: 13,
        end: 13,
        label: '新疆',
        color: '#fffed7'
      }, {
        start: 14,
        end: 14,
        label: '江苏',
        color: '#fce8cd'
      }, {
        start: 15,
        end: 15,
        label: '浙江',
        color: '#ddceeb'
      }, {
        start: 16,
        end: 16,
        label: '江西',
        color: '#e4f1d3'
      }, {
        start: 17,
        end: 17,
        label: '湖北',
        color: '#fde8cd'
      }, {
        start: 18,
        end: 18,
        label: '广西',
        color: '#fde8cd'
      }, {
        start: 19,
        end: 19,
        label: '甘肃',
        color: '#fde8cd'
      }, {
        start: 20,
        end: 20,
        label: '山西',
        color: '#fffdd6'
      }, {
        start: 21,
        end: 21,
        label: '内蒙古',
        color: '#ddcfe6'
      }, {
        start: 22,
        end: 22,
        label: '陕西',
        color: '#fad8e9'
      }, {
        start: 23,
        end: 23,
        label: '吉林',
        color: '#fce8cd'
      }, {
        start: 24,
        end: 24,
        label: '福建',
        color: '#fad8e8'
      }, {
        start: 25,
        end: 25,
        label: '贵州',
        color: '#fad8e8'
      }, {
        start: 26,
        end: 26,
        label: '广东',
        color: '#ddcfe8'
      }, {
        start: 27,
        end: 27,
        label: '青海',
        color: '#fad8e9'
      }, {
        start: 28,
        end: 28,
        label: '西藏',
        color: '#ddcfe6'
      }, {
        start: 29,
        end: 29,
        label: '四川',
        color: '#e4f1d5'
      }, {
        start: 30,
        end: 30,
        label: '宁夏',
        color: '#fefcd5'
      }, {
        start: 31,
        end: 31,
        label: '海南',
        color: '#fad8e9'
      }, {
        start: 32,
        end: 32,
        label: '台湾',
        color: '#fce8cd'
      }, {
        start: 33,
        end: 33,
        label: '香港',
        color: '#dc9bbb'
      }, {
        start: 34,
        end: 34,
        label: '澳门',
        color: '#e0f7cc'
      }]
    } //各省地图颜色；start：值域开始值；end：值域结束值；label：图例名称；color：自定义颜色值；

  }; // 使用制定的配置项和数据显示图表

  var geoCoordMap = (_geoCoordMap = {
    '景德镇': [13037509, 3400510],
    '白银': [11597684, 4375100],
    '北京': [12955467, 4854848],
    '天津': [13047033, 4740470],
    '唐山': [13158156, 4811646],
    '秦皇岛': [13313621, 4854949],
    '张家口': [12788246, 4985451],
    '承德': [13127054, 5007564],
    '廊坊': [12989855, 4795727],
    '石家庄': [12744943, 4585802],
    '邯郸': [12743070, 4383707],
    '邢台': [12745534, 4448253],
    '保定': [12857421, 4701218],
    '沧州': [13008881, 4623147],
    '衡水': [12880576, 4541047],
    '太原': [12531162, 4561234],
    '大同': [12612090, 4880069],
    '阳泉': [12643028, 4559759],
    '晋城': [12561594, 4232928],
    '朔州': [12514901, 4766624],
    '忻州': [12549218, 4635975],
    '离石': [12371470, 4510721],
    '榆次': [12550756, 4533775],
    '临汾': [12413700, 4312023],
    '运城': [12355478, 4165772],
    '长治': [12590854, 4325681],
    '呼和浩特': [12430301, 4985966],
    '包头': [12228636, 4963263],
    '乌海': [11890577, 4818710],
    '集宁': [12590069, 5016939],
    '东胜': [12244874, 4839591],
    '临河': [11955108, 4977349],
    '阿拉善左旗': [11762625, 4698813],
    '赤峰': [13241433, 5201206],
    '通辽': [13609957, 5405525],
    '锡林浩特': [12920437, 5456825],
    '海拉尔': [13328345, 6310829],
    '乌兰浩特': [13588598, 5791289],
    '加格达奇': [13818262, 6520549],
    '沈阳': [13738125, 5130561],
    '大连': [13536543, 4709904],
    '鞍山': [13690558, 5029356],
    '抚顺': [13795775, 5138217],
    '本溪': [13777401, 5054853],
    '锦州': [13484505, 5028746],
    '营口': [13605930, 4963545],
    '阜新': [13541882, 5162170],
    '盘锦': [13586280, 5040181],
    '铁岭': [13786298, 5205359],
    '朝阳': [13408596, 5097952],
    '锦西': [13452680, 4976027],
    '丹东': [13846081, 4885605],
    '长春': [13950049, 5448831],
    '吉林': [14089353, 5447921],
    '四平': [13845634, 5337213],
    '辽源': [13930218, 5298068],
    '浑江': [14073189, 5150549],
    '白城': [13674439, 5719091],
    '延吉': [14416923, 5297862],
    '通化': [14017698, 5119619],
    '哈尔滨': [14097872, 5739019],
    '鸡西': [14577037, 5668400],
    '鹤岗': [14502280, 5997302],
    '双鸭山': [14599791, 5883135],
    '伊春': [14349562, 6061001],
    '佳木斯': [14511867, 5911712],
    '七台河': [14568982, 5749837],
    '牡丹江': [14426838, 5556254],
    '绥化': [14135737, 5883025],
    '齐齐哈尔': [13799082, 5997973],
    '大庆': [13917703, 5876289],
    '黑河': [14191781, 6488724],
    '上海': [13521897, 3663719],
    '南京': [13221725, 3769562],
    '无锡': [13391638, 3707942],
    '徐州': [13045042, 4064781],
    '常州': [13352804, 3734981],
    '苏州': [13427215, 3673915],
    '南通': [13453580, 3765288],
    '连云港': [13265587, 4110355],
    '淮阴': [13248582, 3973518],
    '盐城': [13373386, 3947162],
    '扬州': [13295647, 3814862],
    '镇江': [13296478, 3790368],
    '杭州': [13376066, 3537787],
    '宁波': [13529913, 3486936],
    '温州': [13430729, 3251051],
    '嘉兴': [13442232, 3603059],
    '湖州': [13369151, 3615363],
    '绍兴': [13422228, 3504955],
    '金华': [13319622, 3389758],
    '衢州': [13232456, 3370358],
    '舟山': [13592288, 3506126],
    '丽水': [13349050, 3305680],
    '临海': [13482843, 3356427],
    '合肥': [13055071, 3745374],
    '芜湖': [13175756, 3676266],
    '蚌埠': [13064609, 3887242],
    '淮南': [13026687, 3844536],
    '马鞍山': [13189212, 3727256],
    '淮北': [13000724, 4024840],
    '铜陵': [13114903, 3623044],
    '安庆': [13028213, 3569617],
    '黄山': [13170105, 3467717],
    '阜阳': [12891880, 3882330],
    '宿州': [13021057, 3980582],
    '滁州': [13169225, 3804932],
    '六安': [12967918, 3730999],
    '宣州': [13218242, 3626368],
    '巢湖': [13120577, 3711424],
    '贵池': [13077516, 3588266],
    '福州': [13280171, 3008817],
    '厦门': [13145442, 2809248],
    '莆田': [13248168, 2929656],
    '三明': [13091308, 3026728],
    '泉州': [13201338, 2865420],
    '漳州': [13097082, 2816676],
    '南平': [13154526, 3079169],
    '宁德': [13304718, 3081863],
    '龙岩': [13027763, 2889225],
    '赣州': [12794358, 2980871],
    '南昌': [12901919, 3334471],
    '萍乡': [12672769, 3202780],
    '九江': [12911344, 3468020],
    '新余': [12793880, 3224605],
    '鹰潭': [13027751, 3279972],
    '宜春': [12732123, 3223224],
    '上饶': [13131625, 3306241],
    '吉安': [12798449, 3136747],
    '临川': [12946573, 3240760],
    '济南': [13025003, 4392802],
    '青岛': [13398210, 4319056],
    '淄博': [13141939, 4410373],
    '枣庄': [13086305, 4146587],
    '东营': [13190909, 4503688],
    '烟台': [13511952, 4514029],
    '潍坊': [13258913, 4397940],
    '济宁': [12977243, 4219635],
    '泰安': [13038195, 4326398],
    '威海': [13593410, 4509138],
    '日照': [13297286, 4222138],
    '滨州': [13138122, 4490499],
    '德州': [12945106, 4502535],
    '聊城': [12911772, 4362640],
    '临沂': [13173321, 4173323],
    '菏泽': [12851363, 4197708],
    '郑州': [12651465, 4130911],
    '开封': [12728957, 4134728],
    '洛阳': [12515071, 4118860],
    '平顶山': [12612519, 3994429],
    '安阳': [12729389, 4313956],
    '鹤壁': [12707639, 4292379],
    '新乡': [12675789, 4205743],
    '焦作': [12603791, 4197546],
    '濮阳': [12803406, 4259679],
    '许昌': [12670561, 4032409],
    '漯河': [12694996, 3971543],
    '三门峡': [12378199, 4134128],
    '商丘': [12873785, 4088521],
    '周口': [12761360, 3978965],
    '驻马店': [12694394, 3892522],
    '南阳': [12527618, 3895173],
    '信阳': [12697960, 3780470],
    '武汉': [12722920, 3576709],
    '黄石': [12810089, 3531061],
    '十堰': [12332284, 3849220],
    '沙市': [12495366, 3544405],
    '宜昌': [12388219, 3594361],
    '襄樊': [12483491, 3769271],
    '鄂州': [12788515, 3555427],
    '荆门': [12490070, 3636673],
    '黄州': [12786705, 3561398],
    '孝感': [12680551, 3623461],
    '咸宁': [12720337, 3489973],
    '江陵': [12489040, 3548981],
    '恩施': [12186881, 3538583],
    '衡阳': [12534503, 3111052],
    '邵阳': [12409605, 3154770],
    '郴州': [12582291, 2974614],
    '永州': [12424613, 3025274],
    '大庸': [12298742, 3392442],
    '怀化': [12240049, 3192031],
    '吉首': [12215515, 3287874],
    '长沙': [12577017, 3274316],
    '株洲': [12596029, 3230607],
    '湘潭': [12569642, 3233015],
    '岳阳': [12590019, 3423413],
    '常德': [12433010, 3380510],
    '益阳': [12504971, 3325082],
    '娄底': [12467103, 3216401],
    '汕尾': [12842263, 2605276],
    '惠州': [12734104, 2642659],
    '深圳': [12702741, 2578459],
    '河源': [12767657, 2721130],
    '广州': [12608204, 2646405],
    '佛山': [12591850, 2636237],
    '清远': [12581469, 2719276],
    '东莞': [12662455, 2637889],
    '珠海': [12642360, 2544284],
    '江门': [12588536, 2582654],
    '肇庆': [12518033, 2639020],
    '中山': [12620452, 2574898],
    '湛江': [12289585, 2415145],
    '茂名': [12344090, 2472036],
    '韶关': [12646494, 2852275],
    '汕头': [12989181, 2675939],
    '梅州': [12925076, 2791778],
    '阳江': [12463095, 2492953],
    '梧州': [12390521, 2690974],
    '玉林': [12260892, 2587563],
    '桂林': [12277057, 2910407],
    '南宁': [12057210, 2608640],
    '百色': [11868005, 2741420],
    '河池': [12028252, 2838560],
    '钦州': [12090933, 2505507],
    '柳州': [12178665, 2791278],
    '北海': [12147090, 2449182],
    '三亚': [12190354, 2064961],
    '海口': [12283717, 2276797],
    '康定': [11349871, 3510329],
    '雅安': [11463981, 3501274],
    '马尔康': [11380465, 3751285],
    '成都': [11586328, 3588808],
    '自贡': [11663650, 3422532],
    '重庆': [11856676, 3446882],
    '南充': [11808952, 3606261],
    '泸州': [11737287, 3360635],
    '德阳': [11620813, 3649701],
    '绵阳': [11660555, 3692157],
    '遂宁': [11751966, 3568421],
    '内江': [11694495, 3449364],
    '乐山': [11549553, 3448168],
    '宜宾': [11645896, 3346437],
    '广元': [11781131, 3821730],
    '达县': [11966883, 3661964],
    '西昌': [11384117, 3236024],
    '攀枝花': [11321016, 3067958],
    '黔江土家族苗族自治县': [12109497, 3442916],
    '六盘水': [11674437, 3070694],
    '铜仁': [12155273, 3213990],
    '安顺': [11791636, 3029365],
    '凯里': [12019957, 3072201],
    '都匀': [11968853, 3031731],
    '兴义': [11676957, 2886413],
    '毕节': [11719985, 3161791],
    '贵阳': [11879055, 3070706],
    '遵义': [11903326, 3210623],
    '昆明': [11433020, 2881130],
    '东川': [11486080, 3010562],
    '曲靖': [11554373, 2936811],
    '楚雄': [11303800, 2879804],
    '玉溪': [11413947, 2796723],
    '个旧': [11483629, 2674759],
    '文山': [11603845, 2677422],
    '思茅': [11240509, 2607304],
    '昭通': [11545492, 3166300],
    '景洪': [11220287, 2513047],
    '大理': [11157146, 2948331],
    '保山': [11039411, 2890097],
    '潞西': [10974987, 2807412],
    '丽江纳西族自治县': [11158025, 3108071],
    '泸水': [11001007, 2997600],
    '中甸': [11099376, 3226359],
    '临沧': [11141723, 2738783],
    '拉萨': [10144773, 3459611],
    '昌都': [10816641, 3651227],
    '乃东': [10216523, 3404618],
    '日喀则': [9893990, 3410620],
    '那曲': [10247471, 3695320],
    '噶尔': [8916308, 3829828],
    '林芝': [10517939, 3450197],
    '西安': [12128150, 4063994],
    '铜川': [12140201, 4174140],
    '宝鸡': [11926587, 4080249],
    '咸阳': [12101556, 4074172],
    '渭南': [12189577, 4096345],
    '汉中': [11915014, 3905681],
    '安康': [12136695, 3854210],
    '商州': [12237377, 4011617],
    '延安': [12186287, 4382647],
    '榆林': [12218143, 4621506],
    '兰州': [11549403, 4309987],
    '金昌': [11373039, 4649618],
    '天水': [11768166, 4107527],
    '张掖': [11182074, 4712373],
    '武威': [11425104, 4569105],
    '定西': [11646085, 4242330],
    '成县': [11769777, 3994635],
    '平凉': [11875904, 4236896],
    '西峰': [11982010, 4264706],
    '临夏': [11489738, 4246639],
    '夏河': [11410935, 4191406],
    '嘉峪关': [10939890, 4837305],
    '酒泉': [10966207, 4828950],
    '西宁': [11330927, 4384807],
    '平安': [11366068, 4369922],
    '门源回族自治县': [11311930, 4491476],
    '同仁': [11355217, 4233496],
    '共和': [11200502, 4339513],
    '玛沁': [11159327, 4093388],
    '玉树': [10799921, 3896991],
    '德令哈': [10837718, 4490855],
    '银川': [11830138, 4645752],
    '石嘴山': [11842396, 4725150],
    '吴忠': [11822031, 4577377],
    '固原': [11830878, 4302446],
    '乌鲁木齐': [9752268, 5433146],
    '克拉玛依': [9446973, 5715924],
    '吐鲁番': [9927640, 5303153],
    '哈密': [10410465, 5284448],
    '昌吉': [9718782, 5467916],
    '博乐': [9136483, 5606347],
    '库尔勒': [9588471, 5125078],
    '阿克苏': [8934567, 5037312],
    '阿图什': [8479120, 4824950],
    '喀什': [8458706, 4788666],
    '伊宁': [9052351, 5451661],
    '基隆': [13551789, 2891653],
    '台北': [13526908, 2881780],
    '台南': [13380315, 2632140],
    '高雄': [13391476, 2587379],
    '台中': [13432960, 2771035],
    '辽阳': [13710302, 5051528],
    '和田': [8897431, 4454559]
  }, _defineProperty(_geoCoordMap, "\u660C\u90FD", [10816641, 3651227]), _defineProperty(_geoCoordMap, "\u90A3\u66F2", [10247471, 3695320]), _defineProperty(_geoCoordMap, "\u5676\u5C14", [8916308, 3829828]), _defineProperty(_geoCoordMap, '泽当镇', [10216964, 3406536]), _defineProperty(_geoCoordMap, '八一镇', [10504012, 3461655]), _defineProperty(_geoCoordMap, '澳门', [12640334, 2535650]), _defineProperty(_geoCoordMap, '香港', [12707610, 2545258]), _geoCoordMap);
  var BJData = [[{
    name: '北京'
  }, {
    name: '上海',
    value: 95
  }], [{
    name: '北京'
  }, {
    name: '广州',
    value: 90
  }], [{
    name: '北京'
  }, {
    name: '大连',
    value: 80
  }], [{
    name: '北京'
  }, {
    name: '南宁',
    value: 70
  }], [{
    name: '北京'
  }, {
    name: '南昌',
    value: 60
  }], [{
    name: '北京'
  }, {
    name: '拉萨',
    value: 50
  }], [{
    name: '北京'
  }, {
    name: '长春',
    value: 40
  }], [{
    name: '北京'
  }, {
    name: '包头',
    value: 30
  }], [{
    name: '北京'
  }, {
    name: '重庆',
    value: 20
  }], [{
    name: '北京'
  }, {
    name: '常州',
    value: 10
  }]];
  var SHData = [[{
    name: '上海'
  }, {
    name: '包头',
    value: 95
  }], [{
    name: '上海'
  }, {
    name: '昆明',
    value: 90
  }], [{
    name: '上海'
  }, {
    name: '广州',
    value: 80
  }], [{
    name: '上海'
  }, {
    name: '郑州',
    value: 70
  }], [{
    name: '上海'
  }, {
    name: '长春',
    value: 60
  }], [{
    name: '上海'
  }, {
    name: '重庆',
    value: 50
  }], [{
    name: '上海'
  }, {
    name: '长沙',
    value: 40
  }], [{
    name: '上海'
  }, {
    name: '北京',
    value: 30
  }], [{
    name: '上海'
  }, {
    name: '丹东',
    value: 20
  }], [{
    name: '上海'
  }, {
    name: '大连',
    value: 10
  }]];
  var GZData = [[{
    name: '广州'
  }, {
    name: '福州',
    value: 95
  }], [{
    name: '广州'
  }, {
    name: '太原',
    value: 90
  }], [{
    name: '广州'
  }, {
    name: '长春',
    value: 80
  }], [{
    name: '广州'
  }, {
    name: '重庆',
    value: 70
  }], [{
    name: '广州'
  }, {
    name: '西安',
    value: 60
  }], [{
    name: '广州'
  }, {
    name: '成都',
    value: 50
  }], [{
    name: '广州'
  }, {
    name: '常州',
    value: 40
  }], [{
    name: '广州'
  }, {
    name: '北京',
    value: 30
  }], [{
    name: '广州'
  }, {
    name: '北海',
    value: 20
  }], [{
    name: '广州'
  }, {
    name: '海口',
    value: 10
  }]];
  var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

  var convertData = function convertData(data) {
    var res = [];

    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i];
      var fromCoord = geoCoordMap[dataItem[0].name];
      var toCoord = geoCoordMap[dataItem[1].name];

      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem[0].name,
          toName: dataItem[1].name,
          coords: [fromCoord, toCoord]
        });
      }
    }

    return res;
  };

  var mapColor = ['#a6c84c', '#ffa022', '#46bee9'];
  var mapSeries = [];
  [['北京', BJData] // ['上海', SHData],
  // ['广州', GZData]
  ].forEach(function (item, i) {
    mapSeries.push({
      name: item[0] + ' Top10',
      type: 'lines',
      zlevel: 1,
      effect: {
        show: true,
        period: 6,
        trailLength: 0.7,
        color: '#fff',
        symbolSize: 3
      },
      lineStyle: {
        normal: {
          color: mapColor[i],
          width: 0,
          curveness: 0.2
        }
      },
      data: convertData(item[1])
    }, {
      name: item[0] + ' Top10',
      type: 'lines',
      zlevel: 2,
      effect: {
        show: true,
        period: 6,
        trailLength: 0,
        //symbol: planePath,
        symbolSize: 5
      },
      lineStyle: {
        normal: {
          color: mapColor[i],
          width: 1,
          opacity: 0.6,
          curveness: 0.2
        }
      },
      data: convertData(item[1])
    }, {
      name: item[0] + ' Top10',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        brushType: 'stroke'
      },
      label: {
        normal: {
          show: true,
          position: 'right',
          formatter: '{b}'
        }
      },
      symbolSize: function symbolSize(val) {
        return val[2] / 8;
      },
      itemStyle: {
        normal: {
          color: mapColor[i]
        }
      },
      data: item[1].map(function (dataItem) {
        return {
          name: dataItem[1].name,
          value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
        };
      })
    });
  });
  mapOpts = {
    // backgroundColor: '#404a59',
    tooltip: {
      trigger: 'item'
    },
    geo: (_geo = {
      map: 'CD',
      roam: true,
      aspectScale: 1,
      label: {
        emphasis: {
          show: false
        }
      }
    }, _defineProperty(_geo, "roam", true), _defineProperty(_geo, "itemStyle", {
      normal: {
        areaColor: '#034598',
        borderColor: '#0976c2'
      },
      emphasis: {
        areaColor: '#023a80'
      }
    }), _geo),
    series: mapSeries,
    crs: {
      type: "name",
      properties: {
        name: "urn:ogc:def:crs:OGC:1.3:CRS84"
      }
    }
  };
  var realtimeUserCharts;
  var realtimeUserChartsOpts;
  var realtimeUserDatalist = [{
    name: '11:33:55',
    value: 70
  }, {
    name: '11:34:55',
    value: 40
  }, {
    name: '11:35:55',
    value: 10
  }, {
    name: '11:36:55',
    value: 11
  }, {
    name: '11:37:55',
    value: 44
  }, {
    name: '11:38:55',
    value: 55
  }, {
    name: '11:34:55',
    value: 40
  }, {
    name: '11:35:55',
    value: 10
  }, {
    name: '11:36:55',
    value: 11
  }, {
    name: '11:37:55',
    value: 44
  }, {
    name: '11:38:55',
    value: 55
  }, {
    name: '11:37:55',
    value: 44
  }, {
    name: '11:38:55',
    value: 55
  }, {
    name: '11:34:55',
    value: 40
  }, {
    name: '11:35:55',
    value: 10
  }, {
    name: '11:36:55',
    value: 11
  }, {
    name: '11:37:55',
    value: 44
  }, {
    name: '11:38:55',
    value: 55
  }, {
    name: '11:39:55',
    value: 6
  }],
      realtimeUserChartsOpts = {
    grid: {
      top: '20',
      left: '18',
      right: '24',
      bottom: '12',
      containLabel: true
    },
    tooltip: {
      formatter: '{b}<br>实时用户：{c}'
    },
    xAxis: {
      data: realtimeUserDatalist.map(function (item) {
        return item.name;
      }),
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 'auto',
        // rotate:254
        textStyle: {
          color: '#fff',
          fontSize: 12
        }
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#364d69',
          width: '1' //坐标线的宽度

        }
      }
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          color: '#364d69',
          //网格横线颜色
          width: 1,
          type: 'solid'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#fff',
          fontSize: 12
        }
      },
      axisLine: {
        show: false
      }
    },
    series: [{
      name: '实时用户',
      type: 'bar',
      // barWidth:70,
      data: realtimeUserDatalist.map(function (item) {
        return item.value;
      }),
      //数据
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#0d6cf6'
          }, //柱图渐变色
          {
            offset: 0.5,
            color: '#0a91f6'
          }, //柱图渐变色
          {
            offset: 1,
            color: '#03d5f6'
          }]) // emphasis: {
          //     color: new echarts.graphic.LinearGradient(
          //         0, 0, 0, 1,
          //         [
          //             {offset: 0, color: '#71C8B1'},
          //             {offset: 0.7, color: '#44C0C1'},
          //             {offset: 1, color: '#06B5D7'}
          //         ]
          //     )
          // }

        }
      }
    }]
  }; // userTrendCharts

  var userTrendCharts;
  var userTrendChartsOpts;
  var userTrendDataList = [{
    name: '02/14',
    value: 22
  }, {
    name: '03/14',
    value: 33
  }, {
    name: '04/14',
    value: 13
  }, {
    name: '05/14',
    value: 3
  }, {
    name: '06/14',
    value: 22
  }, {
    name: '07/14',
    value: 11
  }, {
    name: '08/14',
    value: 55
  }];
  userTrendChartsOpts = {
    tooltip: {
      //鼠标悬浮弹出提示框
      trigger: 'axis',
      //提示框弹出的触发时间，折线图和柱状图为axis
      formatter: '{a} <br/>{b} : {c} ' //提示框提示的信息，{a}series内的名字，{b}为块状的名字，{c}为数值

    },
    grid: {
      //统计图距离边缘的距离
      top: '20',
      left: '18',
      right: '18',
      bottom: '16',
      containLabel: true
    },
    xAxis: [{
      //x轴
      type: 'category',
      //数据类型为不连续数据
      boundaryGap: false,
      //坐标轴两边是否留白
      axisLine: {
        //坐标轴轴线相关设置。数学上的x轴
        show: true,
        lineStyle: {
          color: '#103153' //x轴颜色

        }
      },
      axisLabel: {
        //坐标轴刻度标签的相关设置
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        margin: 12
      },
      axisTick: {
        show: true
      },
      //刻度点数轴
      data: userTrendDataList.map(function (item) {
        return item.name;
      })
    }],
    yAxis: [{
      //y轴的相关设置
      type: 'value',
      //y轴数据类型为连续的数据
      splitLine: {
        //y轴上的y轴线条相关设置
        show: true,
        lineStyle: {
          color: '#103153'
        }
      },
      axisLine: {
        //y轴的相关设置
        show: true,
        lineStyle: {
          color: '#103153' //y轴颜色

        }
      },
      axisLabel: {
        //y轴的标签相关设置
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        margin: 12
      },
      axisTick: {
        show: true //刻度点数轴

      }
    }],
    series: [{
      name: '智慧教学平台--用户趋势',
      type: 'line',
      //统计图类型为折线图
      smooth: true,
      //是否平滑曲线显示
      symbolSize: 0,
      //数据点的大小，[0,0]//b表示宽度和高度
      lineStyle: {
        normal: {
          color: '#09d1eb'
        }
      },
      areaStyle: {
        normal: {
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(61,234,255, 0.4)'
          }, {
            offset: 1,
            color: 'rgba(61,234,255, 0)'
          }], false),
          shadowColor: 'rgba(53,142,215, 0.9)',
          shadowBlur: 2
        }
      },
      data: userTrendDataList.map(function (item) {
        return item.value;
      })
    }]
  }; // hotApp

  var hotAppCharts;
  var hotAppChartsOpts;
  var hotAppColor = ['#02d8cb', '#b69cfe', '#74beda', '#c1c6ff', '#4490ef', '#0feeff', '#79fbbf', '#5d7f9b', '#b5e7ff', '#55c7ff'];
  hotAppChartsOpts = {
    tooltip: {},
    grid: {
      // top: '10%',
      // left: '3%',
      // right: '3%',
      // bottom: '0',
      top: '6',
      left: '6',
      right: '6',
      bottom: '6',
      containLabel: true
    },
    series: [{
      type: 'wordCloud',
      gridSize: 2,
      sizeRange: [12, 50],
      width: '90%',
      height: '90%',
      rotationRange: [0, 0],
      shape: 'pentagon',
      // width: 600,
      // height: 400,
      textStyle: {
        normal: {
          color: function color() {
            var randIndex = Math.round((hotAppColor.length - 1) * Math.random());
            return hotAppColor[randIndex];
          }
        },
        emphasis: {
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      data: [{
        name: 'Sam S Club',
        value: 10000,
        textStyle: {
          normal: {
            color: 'black'
          },
          emphasis: {
            color: 'red'
          }
        }
      }, {
        name: 'Macys',
        value: 6181
      }, {
        name: 'Amy Schumer',
        value: 4386
      }, {
        name: 'Jurassic World',
        value: 4055
      }, {
        name: 'Charter Communications',
        value: 2467
      }, {
        name: 'Chick Fil A',
        value: 2244
      }, {
        name: 'Planet Fitness',
        value: 1898
      }, {
        name: 'Pitch Perfect',
        value: 1484
      }, {
        name: 'Express',
        value: 1112
      }, {
        name: 'Home',
        value: 965
      }, {
        name: 'Johnny Depp',
        value: 847
      }, {
        name: 'Lena Dunham',
        value: 582
      }, {
        name: 'Lewis Hamilton',
        value: 555
      }, {
        name: 'KXAN',
        value: 550
      }, {
        name: 'Mary Ellen Mark',
        value: 462
      }, {
        name: 'Farrah Abraham',
        value: 366
      }, {
        name: 'Rita Ora',
        value: 360
      }, {
        name: 'Serena Williams',
        value: 282
      }, {
        name: 'NCAA baseball tournament',
        value: 273
      }, {
        name: 'Point Break',
        value: 265
      }]
    }]
  };

  window.onload = function () {
    // subject usage
    $('.charts-box').height($('.box-aside').height() - 28); // .width($('.box-aside').width());

    subjectUsageCharts = echarts.init(document.querySelector('.subject-usage-charts'));
    subjectUsageCharts.setOption(subjectUsageOpts);
    setInterval(function () {
      subjectUsageAnimation(subjectUsageCharts, 0);
    }, subjectUsageAnimationTime); // map charts

    $('.map-charts').height($('.box-center-a').height()).width($('.box-center-a').width());
    mapCharts = echarts.init(document.querySelector('.map-charts')); // mapCharts.setOption(mapOpts); // hotSubjectTop10Charts

    $.getJSON('../js/lib/chinamap.json', function (chinaJson) {
      console.log("ddddddd");
      echarts.registerMap('CD', chinaJson);
      console.log("aaaaaaa");
      mapCharts.setOption(mapOpts);
      console.log("bbbbbb");
    });
    hotSubjectTop10Charts = echarts.init(document.querySelector('.hot-subject-top10-charts'));
    hotSubjectTop10Charts.setOption(hotSubjectTop10Opts, true);
    hotSubjectTop10Charts.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: 0
    }); // hotSubujectTop5

    textbookTop5Charts = echarts.init(document.querySelector('.textbook-top5-charts'));
    textbookTop5Charts.setOption(textbookTop5ChartsOpts); // realtimeUser

    realtimeUserCharts = echarts.init(document.querySelector('.realtime-user-charts'));
    realtimeUserCharts.setOption(realtimeUserChartsOpts); // userTrendCharts

    userTrendCharts = echarts.init(document.querySelector('.user-trend-charts'));
    userTrendCharts.setOption(userTrendChartsOpts); // hotApp

    hotAppCharts = echarts.init(document.querySelector('.hot-app-charts'));
    hotAppCharts.setOption(hotAppChartsOpts); // subjectUsageCharts
    // subjectDataUsageCharts = echarts.init(
    //   document.querySelector('.subject-usage-charts')
    // );
    // subjectDataUsageCharts.setOption(subjectUsageOpts);
    // subjectDataUsageCharts.dispatchAction({
    //   type: 'highlight',
    //   seriesIndex: 0,
    //   dataIndex: 0
    // });
    // subjectDataUsageCharts.on('mouseover', function(params) {
    //   if (params.dataIndex != 0) {
    //     subjectDataUsageCharts.dispatchAction({
    //       type: 'downplay',
    //       seriesIndex: 0,
    //       dataIndex: 0
    //     });
    //   }
    // });

    function bindEvents() {
      function reqFullScreenCb() {
        console.log('dashboard reqFullScreenCb'); // TODO: resize
        // change css

        $('.i-fullscreen').removeClass('pep-icon-test6').addClass('pep-icon-test9');
      }

      function exitFullScreenCb() {
        console.log('exitFullScreenCb'); // TODO: resize
        // change css

        $('.i-fullscreen').removeClass('pep-icon-test9').addClass('pep-icon-test6');
        ;
      }

      $('.i-fullscreen').on('click', function () {
        if ($(this).hasClass('pep-icon-test6')) {
          var dom = document.querySelector('.dashboard-wrapper');
          util.reqFullScreen(dom, reqFullScreenCb);
        } else {
          util.exitFullScreen(null, exitFullScreenCb);
        }
      }); // resize

      function resize() {
        $('.charts-box').height($('.box-aside').height() - 28).width($('.box-aside').width());
        $('.map-charts').height($('.box-center-a').height()).width($('.box-center-a').width());
        $('.realtime-user-charts').height($('.box-center-b').height() - 28).width($('.box-center-b').width());
        subjectUsageCharts.resize();
        mapCharts.resize();
        hotSubjectTop10Charts.resize();
        textbookTop5Charts.resize();
        realtimeUserCharts.resize();
        userTrendCharts.resize();
        hotAppCharts.resize();
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
    }

    bindEvents();
  };
})();