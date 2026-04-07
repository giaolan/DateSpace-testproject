<script setup lang='ts'>
import { onMounted, onUpdated, ref } from 'vue'
import { dashed } from '@/utils'
import { phonePrefix } from '@/utils/constant'
import { Login, Signup } from '@/components'
import { isLogin, setIsLogin } from '@/utils/login'

let interval;
onMounted(() => {
  dashed() // 绘制虚线
  window.addEventListener('resize', dashed)
  // router.replace('/login/login')  // 但是这样刷新就会跳转到登录页面
  // 生成弹幕
  const bulletContainer = document.querySelector('.bullet-container')
  interval = setInterval(() => {
    const bulletItem = document.createElement('div')
    bulletItem.className = 'bullet-item'
    // 从phonePrefix中随机取一个前缀
    bulletItem.innerText = `${phonePrefix[Math.floor(Math.random() * phonePrefix.length)]}****${Math.floor(Math.random() * 10000)}注册成功`
    bulletItem.style.top = `${Math.floor(Math.random() * 15)}%`

    bulletContainer.appendChild(bulletItem)
    setTimeout(() => {
      bulletContainer.removeChild(bulletItem)
    }, 9000)
  }, 1000)
})

onUpdated(() => {
  dashed()
})

</script>
<template>
  <div class="bullet-container" />

  <main>
    <div class="total">
      <div class="data1">
        <span>本年生成NFT</span>
        <p>56847108</p>
      </div>
      <div class="data2">
        <span>本月生成NFT</span>
        <p>1457104</p>
      </div>
      <div class="data3">
        <span>本周生成NFT</span>
        <p>564710</p>
      </div>
      <div class="data4">
        <span>今日生成NFT</span>
        <p>14504</p>
      </div>
      <canvas class="dashed"></canvas>
      <div class="sphere">
        <div class="sphere-bg"></div>
        <div class="sum">
          <span>目前共有NFT</span>
          <p>568971401</p>
        </div>
      </div>
      <div class="cicle3"></div>
      <div class="cicle4"></div>
      <div class="cicle5"></div>
      <div class="cicle6"></div>
      <div class="cicle7"></div>
      <div class="cicle8">
        <span>20%</span>
        <p>同比增长</p>
      </div>
      <div class="cicle9">
        <span>98%</span>
        <p>申请成功率</p>
      </div>
      <div class="cicle10">
        <span>80%</span>
        <p>出售成功率</p>
      </div>
      <div class="cicle11">
        <span>89%</span>
        <p>绑定成功率</p>
      </div>
    </div>
  </main>

  <div class="form">
    <h2>欢迎回来</h2>
    <!-- <router-view /> -->
    <Login v-if="isLogin" />
    <Signup v-else />
  </div>
</template>
<style lang="less">
@import '../assets/css/animation.less'; // 引入动画

// 引入字体
@font-face {
  font-family: 'DS-DIGIT';
  src: url('../assets/fonts/DS-DIGIT.TTF');
}

.bullet-container {

  .bullet-item {
    line-height: 2;
    font-size: 0.8rem;
    background-color: rgba(255, 255, 255, 0.15);
    padding: .1rem;
    border-radius: 8%;
    letter-spacing: 0.05rem;
    width: 200px;
    text-align: center;
    position: absolute;
    right: 0;
    // margin: 10px 0 10px;
    margin-top: 10px;
    animation: moveToLeft 8s linear;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

}

main {
  width: 100%;
  height: 78%;
  padding: 0 2.5%;
  box-sizing: border-box;
  position: relative;
  top: 17%;

  .total {
    width: 67%;
    height: 100%;
    float: left;
    position: relative;

    .data1,
    .data2,
    .data3,
    .data4 {
      width: 8rem;
      height: 4rem;
      position: absolute;

      span {
        color: #0ac1c7;
        font-size: 0.8rem;
        font-family: '宋体';
        display: block;
        text-align: center;
      }

      p {
        font-family: DS-DIGIT;
        font-size: 1.5rem;
        color: #f29701;
        margin: 0;
        text-align: center;
      }
    }

    .data1 {
      left: 10%;
      top: 12%;
    }

    .data2 {
      left: 39%;
      top: 3%;
    }

    .data3 {
      left: 58%;
      top: 7%;
    }

    .data4 {
      left: 68%;
      top: 30%;
    }

    .dashed {
      position: absolute;
      left: 0;
      top: 0;
    }

    .sphere {
      width: 20rem;
      height: 20rem;
      position: relative;
      margin: 14% auto 0;

      .sphere-bg {
        position: absolute;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url(../assets/image/earth.png) no-repeat center;
        background-size: contain;
        animation: rotate 50s linear infinite;
      }

      .sum {
        position: absolute;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url(../assets/image/cloud.png) no-repeat center;
        background-size: 55%;

        span {
          display: block;
          font-weight: bold;
          font-family: '宋体';
          margin-top: 32%;
          color: #005a79;
          font-size: 1.1rem;
          text-align: center;
        }

        p {
          margin-top: 2%;
          text-align: center;
          color: #003c63;
          font-family: 'DS-DIGIT';
          font-size: 2.5rem;
          margin: 0;
        }
      }
    }

    .cicle3 {
      width: 35rem;
      height: 35rem;
      background: url(../assets/image/circle.png) no-repeat center;
      background-size: 100%;
      position: absolute;
      top: 20%;
      left: 50%;
      transform-style: preserve-3d;
      transform: translateX(-50%) rotateX(75deg);
      animation: rotate3 20s linear infinite;
    }

    .cicle4 {
      width: 15rem;
      height: 15rem;
      position: absolute;
      top: 60%;
      left: 50%;
      transform-style: preserve-3d;
      background: url(../assets/image/gqright.png) no-repeat center;
      background-size: 100%;
      transform: translateX(-50%) rotateX(75deg);
      animation: rotate3 2s linear infinite;
    }

    .cicle5 {
      width: 15rem;
      height: 15rem;
      position: absolute;
      top: 62%;
      left: 50%;
      transform-style: preserve-3d;
      background: url(../assets/image/gqleft.png) no-repeat center;
      background-size: 100%;
      transform: translateX(-50%) rotateX(75deg);
      animation: rotate4 2s linear infinite;
    }

    .cicle6 {
      width: 12rem;
      height: 12rem;
      position: absolute;
      top: 70%;
      left: 50%;
      transform-style: preserve-3d;
      background: url(../assets/image/gqbottomright.png) no-repeat center;
      background-size: 100%;
      transform: translateX(-50%) rotateX(75deg);
      animation: rotate3 2s linear infinite;
    }

    .cicle7 {
      width: 12rem;
      height: 12rem;
      position: absolute;
      top: 72%;
      left: 50%;
      transform-style: preserve-3d;
      background: url(../assets/image/gqbottomleft.png) no-repeat center;
      background-size: 100%;
      transform: translateX(-50%) rotateX(75deg);
      animation: rotate4 2s linear infinite;
    }

    .cicle8,
    .cicle9,
    .cicle10,
    .cicle11 {
      width: 5rem;
      height: 5rem;
      position: absolute;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 100;
      margin-left: -2.5rem;
      border-radius: 50%;

      span {
        font-family: 'LCdd';
        display: block;
        margin-left: 25%;
        font-size: 1.5rem;
        margin-top: 20%;
      }

      p {
        text-align: center;
        font-size: 0.7rem;
        margin: 0;
      }
    }

    .cicle8 {
      background: url(../assets/image/circle1.png) no-repeat;
      background-size: 100%;
      animation: rotate5 20s linear infinite;
      color: #f29701;
    }

    .cicle9 {
      background: url(../assets/image/circle2.png) no-repeat;
      background-size: 100%;
      animation: rotate6 20s linear infinite;
      color: #0ac1c7
    }

    .cicle10 {
      background: url(../assets/image/circle1.png) no-repeat;
      background-size: 100%;
      animation: rotate7 20s linear infinite;
      color: #f29701;
    }

    .cicle11 {
      background: url(../assets/image/circle2.png) no-repeat;
      background-size: 100%;
      color: #0ac1c7;
      animation: rotate8 20s linear infinite;
    }
  }
}

.form {
  width: 33%;
  position: absolute;
  right: 10%;
  top: 30%;

  h2 {
    text-align: center;
    letter-spacing: 0.2rem;
  }
}
</style>
