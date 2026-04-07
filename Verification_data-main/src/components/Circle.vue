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
  <h5>未确权</h5>
  <v-chart class="circle" style="left:4.5rem;" :option="circleOptions1" autoresize />
  <h5 style="left:9.5rem;">一级确权</h5>
  <v-chart class="circle" style="left:11.5rem;" :option="circleOptions2" autoresize />
  <h5 style="left:16.5rem;">二级确权</h5>
</template>

<style lang="less" scoped>
.circle {
  width: 17%;
  height: 17%;
  position: absolute;
  top: 45%;
  left: -2.5rem;
}

h5 {
  position: absolute;
  top: 61%;
  left: 3.2rem;
  margin: 0;
}
</style>