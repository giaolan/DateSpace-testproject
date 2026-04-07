<script setup lang='ts'>
import { onMounted, onBeforeUnmount, onUpdated, ref } from 'vue'

import { getTime } from '@/utils'
//接收props
defineProps({
  title: {
    type: String,
  },
  noHome: {
    type: Boolean,
    default: false,
  }
})

let time = ref(getTime()); // 时间
let interval: number;

onMounted(() => {
  // 设置时间不断更新
  interval = setInterval(() => {
    time.value = getTime();
  }, 1000);
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>
<template>
  <header>
    <router-link v-if="!noHome" to="/home"><img src="/assets/image/home.png" class="home"></router-link>
    <!-- <img src="/assets/image/left.png" class="left"> -->
     <!-- 插入gif -->
    <img src="/assets/image/topbg.png" class="left" >
    <h2>{{ title }}</h2>
    <!-- <img src="/assets/image/right.png" class="right"> -->
    <h5>{{ time }}</h5>
  </header>
</template>
<style lang="less" scoped>
// 沿图片中心水平翻转
// @keyframes reverse {
//   0% {
//     transform: rotateY(0deg);
//   }

//   50% {
//     transform: rotateY(180deg);
//   }

//   100% {
//     transform: rotateY(360deg);
//   }
// }

header {
  position: static;
  height: 6rem;

  img {
    position: absolute;
  }

  .home {
    top: 1.8rem;
    left: .5rem;
    height: 1.8rem;
    width: 1.8rem;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 40%;
    padding: .4rem;
    z-index: 3;
  }

  .home:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
  .mid{
    position:absolute;
    top:-420px;
  }

  .left {
    top: 0.1rem;
    left: 0rem;
    z-index: 2;
    width:100%;
    height:8%;
    // animation: reverse 5s linear infinite;
  }

  .right {
    right: 3.8rem;
    top: 2.2rem;
    z-index: 2;
    // animation: reverse 5s linear infinite;
  }

  h2 {
    margin: 0;
    color: #fff;
    text-align: center;
    position: relative;
    z-index: 2;
    top: 1rem;
  }

  h5 {
    background-image: -webkit-linear-gradient(bottom, #86919e, #fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
    position: absolute;
    right: 4rem;
    top: 0.4rem;
    z-index: 2;
  }
}
</style>
