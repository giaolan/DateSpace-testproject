<template>
    <!-- ECharts 图表容器 -->
  <div id="echart4" class="PingTai"></div>

</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
name: 'EChartsDemo',
setup() {
  // 初始化 ECharts 图表
  const initECharts = () => {
    echarts_4();
  };

  // 在组件挂载后初始化图表
  onMounted(() => {
    initECharts();
  });

  // echarts_4
  const echarts_4 = () => {
    const myChart = echarts.init(document.getElementById('echart4')!);
    // ECharts 配置
    const option = {
tooltip: {
  trigger: 'axis',
  axisPointer: {
    lineStyle: {
      color: '#fff'
    }
  }
},
legend: {
  top: '0%',
  data: ['生成', '修复', '检测'],
  // 修复 axisLabel 的配置错误
 
   textStyle: {
    color: 'white'
  }
},
grid: {
  left: '10',
  top: '30',
  right: '10',
  bottom: '10',
  containLabel: true
},
xAxis: [{
  type: 'category',
  boundaryGap: false,
  axisLabel: {
    color: 'rgba(255,255,255,.6)',
    fontSize: 12,
  },
  axisLine: {
    lineStyle: {
      color: 'rgba(255,255,255,.2)'
    }
  },
  data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
}, {
  axisPointer: { show: false },
  axisLine: { show: false },
  position: 'bottom',
  offset: 20,
}],
yAxis: [{
  type: 'value',
  axisTick: { show: false },
  axisLine: {
    lineStyle: {
      color: 'rgba(255,255,255,.1)'
    }
  },
  axisLabel: {
    color: 'rgba(255,255,255,.6)',
    fontSize: 12,
  },
  splitLine: {
    lineStyle: {
      color: 'rgba(255,255,255,.1)'
    }
  }
}],
series: [
  
  {
    name: '检测',
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
      color: '#00d887', // 设置线的颜色
      width: 2
    },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(0, 216, 135, 0.4)'
      }, {
        offset: 0.8,
        color: 'rgba(0, 216, 135, 0.1)'
      }], false),
      shadowColor: 'rgba(0, 0, 0, 0.1)',
    },
    itemStyle: {
      color: '#00d887',
      borderColor: 'rgba(221, 220, 107, .1)',
      borderWidth: 12
    },
    data: [5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]
  },
  {
    name: '修复',
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
      color: '#0179c1', // 设置线的颜色
      width: 2
    },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(0, 216, 135, 0.4)'
      }, {
        offset: 0.8,
        color: 'rgba(0, 216, 135, 0.1)'
      }], false),
      shadowColor: 'rgba(0, 0, 0, 0.1)',
    },
    itemStyle: {
      color: '#0179c1',
      borderColor: 'rgba(221, 220, 107, .1)',
      borderWidth: 12
    },
    data: [8, 5, 12, 10, 3, 14, 7, 9, 2, 13, 11, 6, 4, 1, 10, 3, 13, 7, 8, 6, 14, 2, 11, 4]
  },
  {
    name: '生成',
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
      color: '#00d8c1', // 设置线的颜色
      width: 2
    },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(0, 216, 135, 0.4)'
      }, {
        offset: 0.8,
        color: 'rgba(0, 216, 135, 0.1)'
      }], false),
      shadowColor: 'rgba(0, 0, 0, 0.1)',
    },
    itemStyle: {
      color: '#00d887',
      borderColor: 'rgba(221, 220, 107, .1)',
      borderWidth: 12
    },
    data: [11, 4, 9, 8, 13, 7, 3, 6, 14, 5, 2, 10, 1, 12, 4, 13, 7, 11, 9, 2, 8, 14, 10, 6]
  }
]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
window.addEventListener('resize', () => {
myChart.resize();
});

  };

  return {
    initECharts
  };
}
});
</script>

<style scoped>
/* 可选的样式 */
.PingTai{
width: 100%;
height: 100%;
margin: 0 auto;
position: relative;
top:20px;
}
</style>
