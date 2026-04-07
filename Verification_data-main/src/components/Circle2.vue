<script setup lang='ts'>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { getCircleOptions } from '@/utils/Options';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';

// 绘制echarts图
use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const angle = ref(0);
const circleOptions0 = ref(getCircleOptions(0, 13));
const circleOptions1 = ref(getCircleOptions(6, 42));
const circleOptions2 = ref(getCircleOptions(12, 55));
const timer = setInterval(() => {
  angle.value += 3;
  circleOptions0.value = getCircleOptions(angle.value, 13);
  circleOptions1.value = getCircleOptions(angle.value, 42);
  circleOptions2.value = getCircleOptions(angle.value, 55);
}, 100);

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <v-chart class="circle" :option="circleOptions0" autoresize />
  <h5>流通数据量</h5>
  <v-chart class="circle" style="right:4.5rem;" :option="circleOptions1" autoresize />
  <h5 style="right:9.1rem;">确权数据量</h5>
  <v-chart class="circle" style="right:11.5rem;" :option="circleOptions2" autoresize />
  <h5 style="right:16.2rem;">准入数据量</h5>
</template>

<style lang="less" scoped>
.circle {
  width: 17%;
  height: 17%;
  position: absolute;
  top: 48%;
  right: -2.5rem;
}

h5 {
  position: absolute;
  top: 63%;
  right: 2rem;
  margin: 0;
}
</style>