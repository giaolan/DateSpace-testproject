<script setup lang='ts'>
import { ref, onMounted, watch } from 'vue'
import { Header, Circle, Circle2 } from '@/components'
import { getTime } from '@/utils'
import { getMapOptions, rentAndSellOptions, rateOptions } from '@/utils/Options'
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import AMapLoader from "@amap/amap-jsapi-loader";
import axios from 'axios';
import {Test} from '@/api'
// 绘制echarts图
use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
// 参数和方法
const nowProvince = ref('全国')
const rightBottomOptions = ref(rentAndSellOptions);
const leftCenterOptions = ref(rateOptions);
const mapOptions = ref({});
let time = ref(getTime()); // header时间
let interval: number;
// 暂定从localStorage获取登录状态
const isLogin = localStorage.getItem('username') ? true : false;
// let map: AMap.Map;


console.log('username', localStorage.getItem('username'))
console.log('isLogin', isLogin)

onMounted(() => {
  // window._AMapSecurityConfig = {
  //   securityJsCode: "df765ec91119fcf06080438ee63cfff8",
  // };
  // AMapLoader.load({
  //   key: "fc6be70094b42237fbb26ba49fc79013", // 申请好的Web端开发者Key，首次调用 load 时必填
  //   // version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  //   plugins: ["AMap.Scale", 'AMap.ToolBar', "AMap.Geocoder"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  // }).then((AMap) => {
  //   map = new AMap.Map("mapContainer", {
  //       // 设置地图容器id
  //     viewMode: "3D", // 是否为3D地图模式
  //     zoom: 4, // 初始化地图级别
  //     center: [116.397428, 39.90923], // 初始化地图中心点位置
  //     mapStyle:"amap://styles/7642bfd33d77595847844a3ed85fc2cf"
        
  //   });  
  //   // 添加地图的点击事件
  //   map.on('click', (e: any) => {
  //     const lnglat = e.lnglat;

  //     // 使用 Geocoder 进行逆地理编码（坐标 => 行政区）
  //     AMap.plugin('AMap.Geocoder', function () {
  //       const geocoder = new AMap.Geocoder({
  //         radius: 1000, // 逆地理编码的范围，单位：米
  //         extensions: 'all'
  //       });

  //       geocoder.getAddress(lnglat, function (status: string, result: any) {
  //         if (status === 'complete' && result.regeocode) {
  //           const addressComponent = result.regeocode.addressComponent;
  //           const name = addressComponent.province || addressComponent.city || addressComponent.district;
  //           console.log("点击了地图，行政区名为：", name);
  //           selectProvince({ name });
  //         } else {
  //           console.warn("未能获取地址信息", result);
  //         }
  //       });
  //     });
  //   });


  // })  
  // .catch((e) => {
  //   console.log(e);
  //   });  
  // 设置时间不断更新
  interval = setInterval(() => {
    time.value = getTime();
  }, 1000);

  
})

// 修改地图
const asyncGetMapOptions = async (name = null) => {
  mapOptions.value = await getMapOptions(name);
}

const fetchTest = () => {
  const name = "hsd";
  Test({ name }).then(res => {
    console.log("后端返回：", res);
  });
};


asyncGetMapOptions();

// 切换省份
const selectProvince = (e: any) => {
  if (e.name && e.name !== nowProvince.value) {
    nowProvince.value = e.name;
    // nowProvince.value = e.name;
    // 修改数据为该省份并重新渲染echarts图
    rightBottomOptions.value.series[0].data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 500) + 150)
    rightBottomOptions.value.series[1].data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 15)
    leftCenterOptions.value.series[0].data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 5) + 1);
    leftCenterOptions.value.series[1].data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 5) + 1.23);
    // 修改地图
    asyncGetMapOptions(e.name)
  }
}

// 设置地图为全国
const setChina = () => {
  nowProvince.value = '北京';
  nowProvince.value = '全国';
  // 修改数据为全国并重新渲染echarts图
  rightBottomOptions.value.series[0].data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 500) + 150)
  rightBottomOptions.value.series[1].data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 15)
  leftCenterOptions.value.series[0].data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 5) + 1);
  leftCenterOptions.value.series[1].data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 5) + 1.23);
  // 修改地图
  asyncGetMapOptions()
}
// 获取地图选项
// const asyncGetMapOptions = async (name = null) => {
//   mapOptions.value = await getMapOptions(name)
// }
// onUnmounted(() => {
//   map?.destroy();
// });
</script>
<template>
  <!-- <Header title="Value-Go" :noHome="true" /> -->
  <header>
    <!-- <img class="school" src="/assets/image/school.png"> -->
    <img class="group" src="/assets/image/group.png">
    <router-link style="text-decoration: none;" :to="isLogin ? '/blockchain' : '/login'" >
      <!-- :to="isLogin ? '/blockchain' : '/login'" -->
      <h4 class="blockchain btn">区块链浏览器</h4>
    </router-link>
    <!-- <el-button class="test" @click="fetchTest()" style="z-index:999;position:absolute;top:10px;right:20px;width:100px;height:40px;">测试使用</el-button> -->
    <router-link style="text-decoration: none;" :to="isLogin ? '/myApply' : '/login'">
      <!-- :to="isLogin ? '/myApply' : '/login'" -->
      <h4 class="wallet btn">我的代币</h4>
    </router-link>
    <h2>区块链+AI双轮驱动下的数据层级确权与安全流通平台</h2>
    <h4 class="time">{{ time }}</h4>
    <router-link style="text-decoration: none;" :to="isLogin ? '/message' : '/login'" >
      <!-- :to="isLogin ? '/message' : '/login'" -->
      <h4 class="btn login">{{ isLogin ? "消息" : "登录" }}</h4>
    </router-link>
  </header>
  <div class=" number">
    <ul>
      <div>
        <li><i>5615165461<em>位</em></i><span>当前注册用户数</span></li>
        <li><i>165416511<em>位</em></i><span>当前准入用户数</span></li>
      </div>
      <div>
        <li><i>1423412<em>位</em></i><span>今日注册用户数</span></li>
        <li><i>124141<em>位</em></i><span>今日准入用户数</span></li>
      </div>
    </ul>
  </div>

  <div class="leftCenter">
    <div class="title">本年度{{ nowProvince }}数据确权同比</div>
    <Circle />
    <div class="rateBg" />
    <v-chart class="type" :option="leftCenterOptions" autoresize />
  </div>

  <div class="center">
    <h4 class="setChina" v-if="nowProvince !== '全国'" @click="setChina">全国</h4>
    <v-chart class="map" :option="mapOptions" @click="selectProvince" autoresize />
     <!-- 使用id为mapContainer的div来放置高德地图 -->
    <!-- <div id="mapContainer" class="map"></div> -->
    <!-- <div id="mapContainer"></div>
    <div style="font-size: 12px;margin-left: 500px;margin-top: 60px;">
      地图审图号：GS(2024)1158号
    </div> -->
    <div class="button">
      <router-link style="text-decoration: none;" :to="isLogin ? '/manage' : '/login'">
        <!-- :to="isLogin ? '/manage' : '/login'" -->
        <h4>数据管理</h4>
      </router-link>
      <router-link style="text-decoration: none;" :to="isLogin ? '/verification/selectData' : '/login'">
        <!--  :to="isLogin ? '/verification/selectData' : '/login'" -->
        <h4>层级确权</h4>
      </router-link>
      <router-link style="text-decoration: none;" :to="isLogin ? '/circulation' : '/login'">
        <!-- :to="isLogin ? '/circulation' : '/login'" -->
        <h4>数据流通</h4>
      </router-link>
      <router-link style="text-decoration: none;" :to="isLogin ? '/ContractCheck' : '/login'">
        <!-- :to="isLogin ? '/ContractCheck' : '/login'"  -->
        <!-- :to="isLogin ? '/ContractCheck' : '/login'" -->
        <h4>合约监管</h4>
      </router-link>
    </div>
  </div>

  <div class="top5">
    <div class="title">上传数据体量TOP5</div>
    <ul>
      <li>
        <span>1</span>
        <span>超凡入圣</span>
        <span>北京市</span>
        <span>房山区</span>
        <span>995GB</span>
        <span>较昨日<img src="/assets/image/upward.png" class="ud">0.2%</span>
      </li>
      <li>
        <span>2</span>
        <span>超凡入圣</span>
        <span>上海市</span>
        <span>闵行区</span>
        <span>985GB</span>
        <span>较昨日<img src="/assets/image/down.png" class="ud">0.1%</span>
      </li>
      <li>
        <span>3</span>
        <span>超凡入圣</span>
        <span>北京市</span>
        <span>朝阳区</span>
        <span>885GB</span>
        <span>较昨日<img src="/assets/image/upward.png" class="ud">0.3%</span>
      </li>
      <li>
        <span>4</span>
        <span>出类拔萃</span>
        <span>广东省</span>
        <span>广州市</span>
        <span>865GB</span>
        <span>较昨日<img src="/assets/image/upward.png" class="ud">0.2%</span>
      </li>
      <li>
        <span>5</span>
        <span>出类拔萃</span>
        <span>浙江省</span>
        <span>杭州市</span>
        <span>845GB</span>
        <span>较昨日<img src="/assets/image/down.png" class="ud">0.5%</span>
      </li>
    </ul>
  </div>

  <div class="rightBottom">
    <div class="title">{{ nowProvince }}监管情况</div>
    <div class="rentAndSellBg" />
    <Circle2 />
    <v-chart class="rentAndSell" :option="rightBottomOptions" autoresize />
    <p style="font-size:small;width:300px;position:relative;left:500px;top:670px;">来源：高德地图——审图号：GS京(2022)1061号</p>
  </div>
 
</template>
<style lang="less" scoped>
// 引入字体
@font-face {
  font-family: 'DS-DIGIT';
  src: url('../assets/fonts/DS-DIGIT.TTF');
}

// 跳动动画
@keyframes jump {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-0.3rem);
  }

  100% {
    transform: translateY(0);
  }
}

header {
  img {
    position: absolute;
    object-fit: cover;
  }

  .school {
    height: 50px;
    top: 1.5rem;
    left: .5rem;
  }

  .blockchain {
    left: 3.5rem;
    border-radius: 8%;
  }

  .wallet {
    left: 12.5rem;
    border-radius: 8%;
  }

  .group {
    height: 80px;
    top: .8rem;
    left: 1rem;
  }

  h2 {
    margin: 0;
    color: #fff;
    text-align: center;
    position: relative;
    top: 2rem;
  }

  .time {
    background-image: -webkit-linear-gradient(bottom, #86919e, #fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
    text-align: right;
    padding: 2rem;
    position: absolute;
    top: .5rem;
    right: 3.5rem;
  }

  .btn {
    cursor: pointer;
    z-index: 3;
    margin: .5rem 1.5rem;
    position: absolute;
    top: 1.5rem;
    padding: .4rem;
    letter-spacing: 0.1rem;
    background-color: rgba(255, 255, 255, 0.2);
    color: #32e3f9;
  }

  .btn:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }

  .login {
    right: 0;
    border-radius: 15%;
  }
}

.number {
  width: 30%;
  height: 31%;
  background-image: url("/assets/image/sborder.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 4.5rem;
  left: -1rem;


  ul {
    display: flex;
    align-items: center;
    position: relative;
    top: 11%;
    left: 7%;

    li {
      width: 8.5rem;
      text-align: center;
      padding: .5rem 0;
      position: relative;
      font-family: DS-DIGIT;
      list-style: none;

      i {
        font-size: 1.5rem;
        font-family: DS-DIGIT;
        color: #f29701;
        display: block;

        em {
          font-size: .5rem;
          color: #fff;
          opacity: .7;
          ;
        }
      }

      span {
        font-size: 0.7rem;
        font-weight: lighter;
        color: #fff;
      }
    }
  }
}

.leftCenter {

  .rateBg {
    width: 26%;
    height: 52.5%;
    position: absolute;
    top: 46.5%;
    left: 1%;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
  }

  .title {
    position: absolute;
    left: -2%;
    top: 43%
  }

  .type {
    z-index: 2;
    width: 27%;
    height: 35%;
    position: absolute;
    bottom: 2%;
  }
}

.center {
  h4 {
    cursor: pointer;
    border-radius: 15%;
    z-index: 3;
    margin: .5rem 1.5rem;
  }

  .setChina {
    position: absolute;
    top: 11%;
    right: 27%;
    padding: .4rem;
    background-color: rgba(255, 255, 255, 0.2);
  }

  h4:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
 
  .map {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  #mapContainer{
    top:55px;
    left: 30%;
    width: 40%;
    height: 650px;
    z-index: 0;
    background-color: transparent !important; /* ✅ 强制透明背景 */
    // position: absolute;
  }

  .button {
    position: absolute;
    bottom: 0rem;
    left: 31%;
    display: flex;
    justify-content: space-around;

    h4 {
      transform: translate(-50%, -50%);
      font-size: 24px;
      background: linear-gradient(90deg, #03a9f4, #ff8d60, #60c4e0, #03a9f4);
      background-size: 400%;
      text-transform: uppercase;
      animation: sun 12s infinite;
      font-size: 1rem;
      padding: .8rem 1rem;
      color: #fff;
      text-decoration: none;
    }

    h4::before {
      content: "";
      position: absolute;
      left: -5px;
      right: -5px;
      top: -5px;
      bottom: -5px;
      background: linear-gradient(90deg, #03a9f4, #ff8d60, #60c4e0, #03a9f4);
      background-size: 400%;
      border-radius: 20px;
      filter: blur(10px);
      z-index: -1;
    }

    h4:hover {
      animation-play-state: paused;
    }

    @keyframes sun {
      100% {
        background-position: 400% 0;
      }

    }
  }
}

// 公共样式
.title {
  font-size: 0.8rem;
  padding-left: 4rem;
}

.title:before {
  width: .3rem;
  height: 1rem;
  position: absolute;
  content: "";
  background: #5fd2fa;
  border-radius: .3rem;
  left: 3rem;
  animation: jump 1s linear infinite;
}

.top5 {
  position: absolute;
  right: 1rem;
  top: 5rem;

  ul {

    li {
      line-height: 2.5rem;
      justify-content: center;

      span {
        margin-left: .5rem;
        font-size: .8rem;
        display: inline-block;
        text-align: center;
        font-weight: lighter;

        .ud {
          width: .8rem;
          height: .8rem;
          margin: 0 .5rem;
          animation: jump 1s linear infinite;
        }
      }

      span:nth-child(1) {
        color: #f29701;
        font-style: oblique;
        font-size: 1rem;
        font-weight: normal;
        padding-right: 0.5rem;
      }

      span:nth-child(2) {
        width: 4rem;
        display: inline-block;
        text-align: center;
        line-height: 1.6rem;
        vertical-align: center;
        border-radius: .3rem;
      }
    }

    li:nth-child(1) span:nth-child(2),
    li:nth-child(2) span:nth-child(2),
    li:nth-child(3) span:nth-child(2) {
      background: #f29701;
    }

    li:nth-child(4) span:nth-child(2),
    li:nth-child(5) span:nth-child(2) {
      background: #0ac1c7;
    }
  }

  ul,
  li {
    list-style: none;
  }
}

.rightBottom {
  .rentAndSellBg {
    width: 27%;
    height: 48%;
    position: absolute;
    top: 50%;
    right: .5%;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
  }

  .title {
    position: absolute;
    left: 70%;
    top: 45.5%;
  }

  .rentAndSell {
    width: 27%;
    height: 32%;
    position: absolute;
    bottom: 2%;
    right: .5rem;
  }
}
</style>