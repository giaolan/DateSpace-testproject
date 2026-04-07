<template>
    <div style="position: relative; width: 100%; height: 100%">
      <div ref="chartContainer" style="width: 100%; height: 100%;"></div>
      <!-- <button @click="toggleFullscreen" style="position: absolute; right: 0px; top: -25px; z-index: 1000;">🔍</button> -->
    </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from 'vue'
  import * as echarts from 'echarts'
  import type { EChartsOption, BarSeriesOption } from 'echarts'
  
  type EChartsInstance = echarts.ECharts
  type BarLabelOption = NonNullable<BarSeriesOption['label']>
  
  const chartContainer = ref<HTMLElement | null>(null)
  let myChart: EChartsInstance | null = null
  
  // 图表配置
  const appConfig = {
    position: 'insideBottom' as const,
    distance: 15,
    align: 'left' as const,
    verticalAlign: 'middle' as const,
    rotate: 90
  }
  
  const labelOption: BarLabelOption = {
    show: true,
    position: appConfig.position,
    distance: appConfig.distance,
    align: appConfig.align,
    verticalAlign: appConfig.verticalAlign,
    rotate: appConfig.rotate,
    formatter: '{c}%  ',
    fontSize: 7,
    rich: {
      name: {}
    }
  }
  
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params: any) {
        let result = params[0].name + '<br>'
        params.forEach((item: any) => {
          const value = item.value ? `${item.value}${item.seriesName === '准确率' ? '%' : ''}` : '-'
          result += `${item.marker} ${item.seriesName} : ${value}<br>`
        })
        return result
      },
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // 设置提示框背景颜色
      textStyle: {
        color: '#FFFFFF' // 设置提示框字体颜色
      }
    },
    legend: {
      data: ['可重入', '委托调用', '时间戳', '整数溢出'],
      textStyle: {
        fontSize: 12,
        color: '#FFFFFF'
      }
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['准确率', '精确率', '召回率', 'F1分数'],
        axisLabel: {
          color: '#7EB7FD',
          fontSize: 13
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        max: 100,  // 调整最大值，原本为100
        axisLabel: {
          formatter: '{value}%', // Y轴显示百分比
          color: '#7EB7FD',
          fontSize: 12
        },
        splitLine: {
          show: false
        }
      }
    ],
  
    series: [
      {
        name: '时间戳',
        type: 'bar',
        barWidth: 13,  // 调整柱宽
        barGap: '30%',  // 调整柱间距
        label: {
          ...labelOption
        },
        emphasis: {
          focus: 'series'
        },
        data: [88.46, 92.45, 85.96, 89.09],
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0],
          color: '#37a2da'
        }
      },
      {
        name: '委托调用',
        type: 'bar',
        barWidth: 13,
        barGap: '30%',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [96.55, 100, 90, 94.74],
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0],
          color: '#32c5e9'
        }
      },
      {
        name: '整数溢出',
        type: 'bar',
        barWidth: 13,
        barGap: '30%',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [91.46, 82.14, 92, 86.79],
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0],
          color: '#67e0e3'
        }
      },
      {
        name: '可重入',
        type: 'bar',
        barWidth: 13,
        barGap: '30%',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [97.53, 100, 91.67, 95.65],
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0],
          color: '#9fe6b8'
        }
      }
    ],
    grid: {
      containLabel: true,
      left: '2%',
      right: '6%',
      bottom: '16%',
      top: '16%'
    }
  }
  
  const resizeChart = () => {
    myChart?.resize()
  }
  
  onMounted(() => {
    if (chartContainer.value !== null) {
      myChart = echarts.init(chartContainer.value)
      myChart.setOption(option)
      window.addEventListener('resize', resizeChart)
    }
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', resizeChart)
    myChart?.dispose()
  })
  </script>
  
  <style scoped>
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #3180cf00;
  }
  </style>
  