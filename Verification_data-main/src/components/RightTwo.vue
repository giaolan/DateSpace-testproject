<template>
    <div :class="{ 'fullscreen-container': isFullscreen }" class="chart-container">
      <div
        ref="echartsRef"
        style="position: absolute; width: 500px; height: 380px; top: 0px;left: -220px;"
      ></div>
    </div>
  </template>
  
<script setup lang="ts">
  import { ref, onMounted, onUnmounted, nextTick } from 'vue'
  // import screenfull from 'screenfull'
  import * as echarts from 'echarts'
  import { graphic } from 'echarts/core'
  import type { ECharts, EChartsOption } from 'echarts'
  
  const echartsRef = ref<HTMLElement | null>(null)
  let myChart: ECharts | null = null
  const isFullscreen = ref(false)
  
  // 静态数据模拟
  const mockData = {
    category: [
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
    ],
    barData: [10, 10, 8, 9, 13, 13, 15, 8, 11, 7, 15, 14, 13, 10, 8, 10, 14, 13, 12, 8],
    lineData: [5, 6, 2, 5, 8, 8, 7, 5, 5, 3, 8, 6, 6, 4, 3, 4, 6, 6, 6, 3],
  }
  
  // 图表配置
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,.6)',
      borderColor: 'rgba(147, 235, 248, .8)',
      textStyle: {
        color: '#FFF'
      },
      formatter: function (params: any) {
        let result = params[0].name + '<br>'
        params.forEach((item: any) => {
          const value = item.value ? `${item.value}${item.seriesName === '准确率' ? '%' : ''}` : '-'
          result += `${item.marker} ${item.seriesName} : ${value}<br>`
        })
        return result
      }
    },
    legend: {
      data: ['总使用量','本周使用量'],
      textStyle: {
        color: '#B4B4B4',
        fontSize: 16 // 调整字体大小
      },
      top: '0',
      bottom: '10px'
    },
    grid: {
      left: '60px',
      right: '40px',
      bottom: '120px',
      top: '50px'
    },
    xAxis: {
      data: mockData.category,
      axisLine: {
        lineStyle: {
          color: '#B4B4B4'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [
      {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#B4B4B4'
          }
        },
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#B4B4B4'
          }
        },
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        name: '总使用量',
        type: 'bar',
        barWidth: 15,
        itemStyle: {
          borderRadius: 5,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
                              offset: 0,
                              color: "#3f64b6",
                          },
                          {
                              offset: 1,
                              color: "#4693EC",
                          },
          ])
        },
        data: mockData.barData
      },
  
      {
        name: '本周使用量',
        type: 'line',
        smooth: false,  // 修改为 false 以显示直线图而不是平滑曲线
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 10,
        yAxisIndex: 1,
        itemStyle: {
          color: "#7ba6d3", // 线条颜色
        },
        data: mockData.lineData
      }
    ]
  }
  
  const resizeChart = () => {
    nextTick(() => {
      myChart?.resize()
    })
  }
  
  onMounted(() => {
    if (echartsRef.value) {
      myChart = echarts.init(echartsRef.value)
      myChart.setOption(option)
      // if (screenfull.isEnabled) {
      //   screenfull.on('change', () => {
      //     isFullscreen.value = screenfull.isFullscreen
      //     resizeChart()
      //   })
      // }
    }
  })
  
  onUnmounted(() => {
    // if (screenfull.isEnabled) {
    //   screenfull.off('change', resizeChart)
    // }
    myChart?.dispose()
  })
</script>
  
<style scoped>
  .chart-container {
    position: relative;
    width: 93%;
    height: 100%;
  }
  
  .fullscreen-container {
    width: 100%;
    height: 100vh;
  }
  
  
</style>
  