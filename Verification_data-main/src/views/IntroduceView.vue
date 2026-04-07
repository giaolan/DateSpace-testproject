<script setup lang='ts'>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Header } from '@/components';
import { getMapOptions, rentAndSellOptions, rateOptions } from '@/utils/Options'
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import animate from "https://cdn.jsdelivr.net/npm/animateplus@2/animateplus.js";
import { MapContainer } from '@/components'

// 绘制echarts图
use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const isTop = ref(true)
const mapOptions = ref({})

// 修改地图
const asyncGetMapOptions = async () => {
  mapOptions.value = await getMapOptions();
  mapOptions.value.geo.zoom = 1.2
  // 设置不能放大缩小
  mapOptions.value.geo.roam = false
}

// 定义服务数据
const services = ref([
  {
    id: 1,
    image: "https://cdn-icons-gif.flaticon.com/6172/6172532.gif",
    title: "数据资源持有权",
    description: "数据资源持有权通常由数据管理员或组织机构拥有，持有权通常涉及数据的获取、存储、使用、更新、共享和保护等方面的决策和操作。",
    delay: 0,
  },
  {
    id: 2,
    image: "https://cdn-icons-gif.flaticon.com/6172/6172518.gif",
    title: "数据加工使用权",
    description: "数据加工使用权是指在数据加工过程中，对于原始数据的使用和加工产生的数据结果的使用所涉及的权利。这种权利通常由数据拥有者授予，并受到版权法、合同法等法律的保护。",
    delay: 300,
  },
  {
    id: 3,
    image: "https://cdn-icons-gif.flaticon.com/6172/6172512.gif",
    title: "数据产品经营权",
    description: "数据资源经加工、分析等形成数据产品的过程。对加工形成的数据产品依法占有、使用、收益和依法支配的权利。",
    delay: 500,
  },
]);

asyncGetMapOptions();

onMounted(() => {
  // 监听main滚动事件
  const main = document.querySelector('main')
  main.addEventListener('scroll', () => {
    // 下滚隐藏，上滚显示
    isTop.value = main.scrollTop === 0
  })

  // 设置照片墙
  const panels = document.querySelectorAll('.panel')

  panels.forEach(panel => panel.addEventListener('click', function (e) {
    // 阻止冒泡
    e.stopPropagation()
    this.classList.toggle('open')
    // 将其他的panel的open类去掉
    panels.forEach(p => {
      if (p !== this) {
        p.classList.remove('open')
      }
    })
  }))
  panels.forEach(panel => panel.addEventListener('transitionend', function (e) {
    if (e.propertyName.includes('flex')) {
      this.classList.toggle('open-active')
    }
  }));
  // 点击其他位置关闭panel
  window.addEventListener('click', (e) => {
    if (!e.target.classList.contains('panel')) {
      panels.forEach(panel => panel.classList.remove('open'))
    }
  }),
  // 动态框
  animate({
    elements: ".service-block",
    duration: 2000,
    delay: (index: number) => index * 100,
    transform: ["scale(0)", "scale(1)"],
  });
})

</script>
<template>
  <header v-if="isTop">
    <Header title="数基智链" :noHome="true" />
  </header>
  <main>
    <!-- 第一部分：大标题 -->
    <section class="title">
      <div class="description">
        <div class="left">
          <h1>
            <span>数</span>
            <span>基</span>
            <span>智</span>
            <span>链</span>
            <!-- <span>u</span>
            <span>e</span>
            <span>-</span>
            <span>G</span>
            <span>o</span> -->
            <!-- <span>Z</span>
            <span>o</span>
            <span>n</span>
            <span>e</span> -->
          </h1>
          <h2>
            面向可信数据空间的数据要素基础设施系统 <br/>
            区块链与AI融合驱动的确权与监管系统
          </h2>
          <p>
            本平台基于可信层级确权的数据价值跨域流通，旨在解决数据流通过程中数据权属不明、数据滥用与侵权和数据隐私保护等问题，建立数据可信流通体系，在合规流通使用中激活数据价值。由于本平台面向企业、政府机构和个人用户，特别是对数据安全和隐私保护有高要求的用户群体，因此在保障数据依法有序自由流通的基础上，平台致力于提升流通全过程的安全性。其中平台利用可验证随机函数技术确保平台用户的主体可信性，利用NFT与SBT的特性对数据进行层级确权，实现数据所有权明晰。此外，平台对于用户注册、数据确权以及交易过程记录采用基于主从链模型技术进行区块链存证，实现全流程监管，促进数据要素的流通。
            <br />
            本平台支持特殊数据的确权和流通，流通方式与普通数据不同，用户可以自行编写智能合约，部署到中继链，实现特殊数据的安全流通，并且可以在流通过程中进行数据的隐私保护和安全审计。
          </p>
          <router-link style="text-decoration: none;" to="/home">
            <h4>进入确权</h4>
          </router-link>
        </div>
        <div class="right">
          <!-- <MapContainer /> -->
          
          <v-chart class="map" :option="mapOptions" autoresize />
         
        </div>
        </div>
        <p style="font-size:small;width:300px;position:relative;right:-100px;top:-100px;">来源：高德地图——审图号：GS京(2022)1061号</p>
      
      <div class="number">
        <div>
          <div class="spinner">
            <div class="spinner1"></div>
          </div>
          <h3>3800+</h3>
          <p>用户</p>
        </div>
        <div>
          <div class="spinner">
            <div class="spinner1"></div>
          </div>
          <h3>100w+</h3>
          <p>数据</p>
        </div>
        <div>
          <div class="spinner">
            <div class="spinner1"></div>
          </div>
          <h3>120w+</h3>
          <p>代币</p>
        </div>
        <div>
          <div class="spinner">
            <div class="spinner1"></div>
          </div>
          <h3>200w+</h3>
          <p>交易</p>
        </div>
      </div>
    </section>

    <!-- 第二部分：平台模块展示 -->
    <section class="picture" style="top:100px;position:relative">
      <div class="banter-loader">
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
      </div>
      <h2>
        我们的平台能做什么？
      </h2>
      <div class="panels">
        <div class="panel" style="background-image: url(/assets/image/admit.jpg);">
          <p>主体可信</p>
          <p>准入模块</p>
          <div>
            <p>对申请进入系统的用户进行审核，选取5名审核人，3名审核通过才可使用确权功能。</p>
          </div>
        </div>
        <div class="panel" style="background-image: url(/assets/image/manage.jpg);">
          <p>数据可信</p>
          <p>数据管理模块</p>
          <div>
            <p>对需要确权的数据进行上传，系统会对上传数据进行重复性检查，保证数据可信。</p>
          </div>
        </div>
        <div class="panel" style="background-image: url(/assets/image/verification.jpg);">
          <p>数据可信</p>
          <p>层级确权模块</p>
          <div>
            <p>本系统的主要模块，对所上传数据进行一级确权和二级确权，系统推荐二级确权。</p>
          </div>
        </div>
        <div class="panel" style="background-image: url(/assets/image/market.webp);">
          <p>过程可信</p>
          <p>价值流通模块</p>
          <div>
            <p>用户可对已确权数据进行交易，二级确权数据与用户进行灵魂绑定，只可出租。</p>
          </div>
        </div>
        <div class="panel" style="background-image: url(/assets/image/security.jpg);">
          <p>过程可信</p>
          <p style="margin-top: 20px;">监管模块</p>
          <div>
            <p>平台对确权全过程溯源，用户可在消息查看所有过程，保证所有过程对用户公开、透明、可追溯。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 第三部分：确权种类和产权类型 -->
    <section class="verification-type" style="top:260px;position:relative">
      <!-- 确权种类 -->
      <div class="banter-loader">
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
      </div>
      <h2>确权种类
      </h2>
      <div class="type type1">
        <el-card>
          <h4>数据资源确权</h4>
          <h5>数据库｜数据表</h5>
          <router-link style="text-decoration: none;" to="/home">
            <span>进入确权</span>
          </router-link>
        </el-card>
        <el-card>
          <h4>数据产品确权</h4>
          <h5>数据集｜数据API｜数据报告｜数据应用</h5>
          <router-link style="text-decoration: none;" to="/home">
            <span>进入确权</span>
          </router-link>
        </el-card>
      </div>

      <!-- 产权类型 -->
      <div class="banter-loader">
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
      </div>
  
      <h2>产权种类
      </h2>
      <!--
      <div class="type type2">
        <el-card>
          <img src="/assets/image/data_owner.svg" />
          <h4>数据资源持有权</h4>
          <h5>数据资源持有权通常由数据管理员或组织机构拥有，持有权通常涉及数据的获取、存储、使用、更新、共享和保护等方面的决策和操作。</h5>
        </el-card>
        <el-card>
          <img src="/assets/image/data_use.svg" />
          <h4>数据加工使用权</h4>
          <h5>数据加工使用权是指在数据加工过程中，对于原始数据的使用和加工产生的数据结果的使用所涉及的权利。这种权利通常由数据拥有者授予，并受到版权法、合同法等法律的保护。</h5>
        </el-card>
        <el-card>
          <img src="/assets/image/data_product.svg" />
          <h4>数据产品经营权</h4>
          <h5>数据资源经加工、分析等形成数据产品的过程。对加工形成的数据产品依法占有、使用、收益和依法支配的权利。</h5>
        </el-card>
      </div>
    </section> -->
    <!-- <section> -->
		<div class="our-service-sass hide-pr show-pr" style="background-color:transparent;">
    <div class="container">
      <!-- <div class="theme-title-one text-center">
        <div class="icon-box hide-pr">
        </div>
      </div> -->
      <div class="inner-wrapper">
        <div class="row">
          <div v-for="(service, index) in services" :key="index" class="col-lg-4 single-block" data-aos="fade-up">
            <div class="service-block" >
              <span v-for="n in 7" :key="n" class="snow-dot" style="font-size: 300px;"></span>
              <div class="hover-content"></div>
              
              <a class="detail-button">
                <i class="icon-img" >
				<!--  background  -->
				  <!-- <div class="background" style="width:100px;height:200px;position:absolute;background-color: white;"></div> -->
                  <img :src="service.image" style="width:100px;">
                </i>
              </a>
			  <i :class="service.iconClass"></i>
			  <br>
              <h5 class="title" ><a style="font-size:40px;color:rgb(20, 68, 116);left: -40px;position:relative;">{{ service.title }}</a></h5>
			  <br>
              <p style="font-size:20px;color:rgb(20, 68, 116);" >{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
	</section>
  <section class="picture" style="top:360px;position:relative">
      <div class="banter-loader">
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
      </div>
      <h2>算法支持
      </h2>
      <div class="show_ai">
        <div class="container1" >
           <h1 style="position:relative;top:20px;left:20px;font-size: 40px;">SolGPT——智能合约漏洞检测</h1>
          <p style="position:relative;top:20px;left:20px;font-size: 20px; width:97%;margin-bottom: 50px;">针对Solidity语言，平台使用GPT2模型，通过迁移学习、监督学习、无监督学习对模型进行了预训练，得到一个针对Solidity语言的智能合约漏洞检测模型。</p>
          <div class="show_ai_img" style="display:flex;flex-direction: row;"> 
          <img src="/2.png" style="width:40%;left:100px;position: relative;border-radius: 5%;"/>
           <img src="/1.png" style="width:40%;left:130px;position: relative;border-radius: 5%;"/>
            </div>
          </div>
      </div>
    </section>

    <!-- 第四部分：确权流程 -->
    <!-- <section class="verification-process">
      <div class="banter-loader">
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
      </div>
      <h2>确权流程
      </h2>
    </section> -->
  </main>
</template>

<style lang="less" scoped>

.container1{
	position: relative;
	top: 30px;
	left:100px;
	height: 600px;
  width: 90%;
  max-width: 1680px;
  min-width: 1040px;
	border: 0px solid #ffffff2e;
	backdrop-filter: blur(3px);
	background: hsla(216, 17%, 45%, 0.402);
	box-shadow: 0 6px 15px 0 #8e8e8e30;
	border-radius: 13px;
  margin-bottom: 100px;
}

.our-service-sass {
  background: url(https://1bp.blogspot.com/-iQC_lzn3m5M/Xcqk5qZe_MI/AAAAAAAAUA8/7MjE-2EJ18glxu5GZL8RpDOCojh9l9ZagCLcBGAsYHQ/s1600/region_map.png)
    no-repeat center bottom;
  background-size: 100%;
  background-position: center;
  position: relative;
  padding: 15px 0 115px;
  background-color: #f9f9f9;
  margin-bottom: 300px;
}

.theme-title-one .icon-box .icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.icon-img img
{
  border-radius: 50%;
    padding: 10px;
    background-color: #ffffff36;
}
.our-service-sass .service-block .title a {
  font-size: 22px;
  line-height: 32px;
  color: #253d5f;
  margin-bottom: 30px;
  width:300px;
  left:-30px;
}

.theme-title-one .icon-box {
  display: inline-block;
  margin-bottom: 25px;
  position: relative;
}

[class^="flaticon-"]:before,
[class*=" flaticon-"]:before,
[class^="flaticon-"]:after,
[class*=" flaticon-"]:after {
  font-family: Flaticon;
  font-size: inherit;
  font-style: normal;
  color: inherit;
}

.icon-img {
  float: left;
  width: 100px;
  height: 200px;
  position: absolute;
  top: 50px;
  text-align: center;
}

/************************/

/* .our-service-sass .inner-wrapper:after {
  content: url(../images/shape/shape-14.svg);
  position: absolute;
  bottom: -165px;
  right: -165px;
  z-index: -1;
} */
.single-block[data-v-c1c67312]{
  max-width:28%;
}
.our-service-sass .service-block {
  background: #fff;
  border: 1px solid #eff7ff;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  z-index: 5;
  padding: 180px 30px 25px 40px;
  -webkit-box-shadow: 0px 2px 10px 0px rgba(12, 0, 46, 0.06);
  box-shadow: 0px 2px 10px 0px rgba(12, 0, 46, 0.06);
  border: 1px solid #e6e4e4;
  margin-top: 45px;
}

.inner-wrapper .row {
  display: flex;
  flex-wrap: nowrap; /* 禁止换行 */
  justify-content: center; /* 居中对齐 */
  gap: 20px; /* 添加间距 */
}

.single-block {
  flex: 1; /* 让每个块均分宽度 */
  max-width: 30%; /* 让每个块不会太大 */
  min-width: 300px; /* 设置最小宽度，防止过小 */
}


.our-service-sass .service-block:before {
  content: "";
  width: 273px;
  height: 273px;
  background: rgb(18, 58, 92);
  border-radius: 50%;
  position: absolute;
  top: -148px;
  left: -83px;
  transform: scale(0);
}

.our-service-sass .service-block:hover:before {
  transform: scale(1);
  transition: all 0.5s linear;
  transition-delay: 0.1s;
}

.our-service-sass .service-block:hover {
  border-color: transparent;
}
.our-service-sass .service-block .icon-s {
  position: absolute;
  font-size: 65px;
  left: 40px;
  top: 52px;
}

.our-service-sass .single-block:nth-child(1) .service-block .icon-s {
  color: rgb(54, 113, 164);
}

.our-service-sass .single-block:nth-child(2) .service-block .icon-s {
  color: #25e5eb;
}

.our-service-sass .single-block:nth-child(3) .service-block .icon-s {
  color: #ff4ca5;
}

.our-service-sass .service-block .title a {
  font-size: 22px;
  line-height: 32px;
  color: #253d5f;
  margin-bottom: 30px;
}

.our-service-sass .service-block p {
  color: #737f92;
  padding-bottom: 20px;
}

.our-service-sass .service-block .detail-button {
  font-size: 40px;
  color: #cad5e5;
}

.our-service-sass .service-block .hover-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(75, 122, 164);
  z-index: -3;
  opacity: 0;
  transition: all 0.3s linear;
}

.our-service-sass .service-block:hover .hover-content {
  opacity: 1;
}

.our-service-sass .service-block .hover-content:before {
  content: "";
  width: 493px;
  height: 493px;
  background: rgb(28, 86, 138);
  border-radius: 50%;
  position: absolute;
  top: -250px;
  left: -180px;
  z-index: 1;
  transform: translate(-50%, -50%);
  opacity: 0;
}

.our-service-sass .service-block:hover .hover-content:before {
  opacity: 1;
  transform: translate(0, 0);
  transition: all 0.9s linear;
}

.our-service-sass .service-block .hover-content:after {
  content: "";
  width: 602px;
  height: 602px;
  background: rgb(41, 105, 160);
  border-radius: 50%;
  position: absolute;
  top: -196px;
  left: -180px;
  z-index: -1;
  transform: translate(-50%, -50%);
  opacity: 0;
}

.our-service-sass .service-block:hover .hover-content:after {
  opacity: 1;
  transform: translate(0, 0);
  transition: all 1.3s linear;
}

.our-service-sass .service-block .snow-dot {
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  background: rgba(255, 255, 255, 0.5);
  z-index: -1;
}

@-webkit-keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.our-service-sass .service-block .snow-dot:nth-child(1) {
  top: 25px;
  left: 41%;
  z-index: 1;
  animation: scale-upOne 1s alternate infinite ease-in;
}

.our-service-sass .service-block .snow-dot:nth-child(2) {
  top: 25px;
  left: 78%;
  animation: scale-upOne 1.1s alternate infinite ease-in;
}

.our-service-sass .service-block .snow-dot:nth-child(3) {
  top: 75px;
  left: 61%;
  animation: scale-upOne 0.8s alternate infinite ease-in;
}

.our-service-sass .service-block .snow-dot:nth-child(4) {
  top: 136px;
  left: 84%;
  animation: scale-upOne 1s alternate infinite ease-in;
}

.our-service-sass .service-block .snow-dot:nth-child(5) {
  bottom: 35px;
  right: 12%;
  animation: scale-upOne 1.2s alternate infinite ease-in;
}

.our-service-sass .service-block .snow-dot:nth-child(6) {
  bottom: 80px;
  right: 31%;
  animation: scale-upOne 0.9s alternate infinite ease-in;
}

.our-service-sass .service-block .snow-dot:nth-child(7) {
  bottom: 40px;
  right: 51%;
  animation: scale-upOne 1s alternate infinite ease-in;
}

.our-service-sass .service-block:hover .detail-button,
.our-service-sass .service-block:hover .icon-s,
.our-service-sass .service-block:hover .title a,
.our-service-sass .service-block:hover p {
  color: #fff !important;
}

.theme-more-feature.our-service-sass .inner-wrapper:after,
.theme-more-feature.our-service-sass .inner-wrapper:before,
.theme-more-feature.our-service-sass:after,
.theme-more-feature.our-service-sass:before {
  display: none;
}

.our-service-sass.theme-more-feature {
  background: 0 0;
  padding: 165px 0 180px;
}

.our-service-app {
  position: relative;
  padding: 260px 0 200px;
  border-bottom: 1px solid #ededed;
}

.our-service-app .main-content {
  max-width: 1450px;
  padding: 0 15px;
  margin: 90px auto 0;
}

.our-service-app .main-content .inner-wrapper {
  text-align: center;
  position: relative;
  margin-top: 50px;
}

.our-service-app .main-content .inner-wrapper .title a {
  font-size: 24px;
  color: #4e4e4e;
  margin: 45px 0 30px;
}

.our-service-app .main-content .inner-wrapper:hover .title a {
  color: #614ef9;
}

.our-service-app .main-content .inner-wrapper p {
  line-height: 30px;
  padding: 0 50px;
  color: #8c929d;
}

.our-service-app .main-content .inner-wrapper .illustration-box {
  display: inline-block;
  position: relative;
  min-height: 230px;
}

.our-service-app
  .main-content
  .single-block:nth-child(1)
  .illustration-box
  .bg-shape,
.our-service-app
  .main-content
  .single-block:nth-child(3)
  .illustration-box
  .bg-shape {
  animation: rotated 35s infinite linear;
}

.our-service-app
  .main-content
  .single-block:nth-child(1)
  .illustration-box
  .block-shape-one {
  position: absolute;
  top: 42px;
  left: -16px;
}

.our-service-app
  .main-content
  .single-block:nth-child(1)
  .illustration-box
  .block-shape-two {
  position: absolute;
  top: 42px;
  right: 0;
}

.our-service-app
  .main-content
  .single-block:nth-child(1)
  .illustration-box
  .block-shape-three {
  position: absolute;
  bottom: 24px;
  right: 0;
}
.our-service-app
  .main-content
  .single-block:nth-child(1)
  .illustration-box
  [class*="block-shape"] {
  transform: scale(1.5);
}

.our-service-app
  .main-content
  .single-block
  .illustration-box
  [class*="block-shape"] {
  opacity: 0;
  transition: all 1.5s ease-in-out;
}
.our-service-app
  .main-content
  .single-block:nth-child(2)
  .illustration-box
  .block-shape-one {
  position: absolute;
  top: 120px;
  left: 26px;
  transform: scale(1.5);
}

.our-service-app
  .main-content
  .single-block:nth-child(2)
  .illustration-box
  .block-shape-two {
  position: absolute;
  top: 0;
  left: 120px;
  transform: scale(1.5);
}

.our-service-app
  .main-content
  .single-block:nth-child(2)
  .illustration-box
  .block-shape-three {
  position: absolute;
  top: 66px;
  right: 6px;
  transform: scale(1.5);
}

.our-service-app
  .main-content
  .single-block:nth-child(2)
  .illustration-box
  .block-shape-four {
  position: absolute;
  top: 52px;
  right: 63px;
  transform: translateY(30px);
}

.our-service-app
  .main-content.show-pr
  .single-block:nth-child(2)
  .illustration-box
  [class*="block-shape"] {
  opacity: 1;
  transform: scale(1);
}

.our-service-app
  .main-content.show-pr
  .single-block:nth-child(2)
  .illustration-box
  .block-shape-four {
  transform: translateY(0);
}
.our-service-app
  .main-content
  .single-block:nth-child(3)
  .illustration-box
  .block-shape-one {
  position: absolute;
  top: 7px;
  left: 45px;
  transform: scale(1.5);
}

.our-service-app
  .main-content.show-pr
  .single-block:nth-child(1)
  .illustration-box
  [class*="block-shape"],
.our-service-app
  .main-content.show-pr
  .single-block:nth-child(2)
  .illustration-box
  [class*="block-shape"],
.our-service-app
  .main-content.show-pr
  .single-block:nth-child(3)
  .illustration-box
  [class*="block-shape"] {
  opacity: 1;
  transform: scale(1);
}

.our-service-app
  .main-content
  .single-block:nth-child(2)
  .illustration-box:after,
.our-service-app
  .main-content
  .single-block:nth-child(2)
  .illustration-box:before {
  content: "";
  position: absolute;
  width: 145px;
  height: 1px;
  border-top: 1px dashed #e6e6e6;
  top: 45%;
}

.our-service-app
  .main-content
  .single-block:nth-child(2)
  .illustration-box:before {
  right: -150px;
}

.our-service-app
  .main-content
  .single-block:nth-child(2)
  .illustration-box:after {
  left: -150px;
}

.our-service-app .main-content .more-button {
  display: block;
  width: 230px;
  line-height: 51px;
  border-radius: 30px;
  background: #614ef9;
  border: 2px solid #614ef9;
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;
  margin: 100px auto 0;
  text-align: center;
}

.our-service-app .main-content .more-button:hover {
  background: #fff;
  color: #614ef9;
}

.our-service-app .main-content .down-arrow {
  display: block;
  width: 60px;
  height: 60px;
  box-shadow: 0 15px 20px 0 rgba(209, 218, 235, 0.35);
  background: #fff;
  border-radius: 50%;
  margin: 0 0 0 -30px;
  line-height: 60px;
  text-align: center;
  color: #7494b5;
  font-size: 20px;
  position: absolute;
  bottom: -30px;
  left: 50%;
  z-index: 1;
}

.our-service-app .main-content .down-arrow span {
  display: block;
  transform: rotate(-90deg);
}

.our-service-app .main-content .down-arrow:hover {
  color: #fff;
  background: #614ef9;
}
// 引入字体
@font-face {
  font-family: 'PoetsenOne';
  src: url('../assets/fonts/PoetsenOne-Regular');
}

@keyframes colorChange {
  0% {
    background-image: radial-gradient(circle at 71.16% 35.69%, #def9fa 0.89%, #bef3f5 17.23%, #9dedf0 42.04%, #7de7eb 55.12%, #5ce1e6 71.54%, #33bbcf 100%);
  }

  25% {
    background-image: radial-gradient(circle at 71.16% 35.69%, #bef3f5 17.23%, #9dedf0 42.04%, #7de7eb 55.12%, #5ce1e6 71.54%, #33bbcf 100%, #def9fa 0.89%);
  }

  50% {
    background-image: radial-gradient(circle at 71.16% 35.69%, #9dedf0 42.04%, #7de7eb 55.12%, #5ce1e6 71.54%, #33bbcf 100%, #def9fa 0.89%, #bef3f5 17.23%);
  }

  75% {
    background-image: radial-gradient(circle at 71.16% 35.69%, #7de7eb 55.12%, #5ce1e6 71.54%, #33bbcf 100%, #def9fa 0.89%, #bef3f5 17.23%, #9dedf0 42.04%);
  }
}

@keyframes bounce {
  100% {
    top: -10px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .1),
      0 2px 0 rgba(255, 255, 255, .1),
      0 3px 0 rgba(255, 255, 255, .1),
      0 4px 0 rgba(255, 255, 255, .1),
      0 5px 0 rgba(255, 255, 255, .1),
      0 6px 0 rgba(255, 255, 255, .1),
      0 7px 0 rgba(255, 255, 255, .1),
      0 8px 0 rgba(255, 255, 255, .1),
      0 9px 0 rgba(255, 255, 255, .1),
  }
}

main {
  overflow: auto;
  height: 100%;
  /* Firefox */
  scrollbar-width: none;
  /* IE and Edge */
  -ms-overflow-style: none;
  position: absolute;
  top: 0;
  -webkit-font-smoothing: antialiased;

  section {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
      background-image: radial-gradient(circle at 71.16% 35.69%, #def9fa 0.89%, #bef3f5 17.23%, #9dedf0 42.04%, #7de7eb 55.12%, #5ce1e6 71.54%, #33bbcf 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
      animation: colorChange 2s infinite;
      font-size: 40px;
    }
  }

  .banter-loader {
    width: 72px;
    height: 72px;
    margin-left: -36px;
    margin-top: -36px;

    .banter-loader__box {
      float: left;
      position: relative;
      width: 20px;
      height: 20px;
      margin-right: 6px;
    }

    .banter-loader__box:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(circle at 71.16% 35.69%, #def9fa 0.89%, #bef3f5 17.23%, #9dedf0 42.04%, #7de7eb 55.12%, #5ce1e6 71.54%, #33bbcf 100%);
      animation: colorChange 2s infinite;
    }

    .banter-loader__box:nth-child(3n) {
      margin-right: 0;
      margin-bottom: 6px;
    }

    .banter-loader__box:nth-child(1):before,
    .banter-loader__box:nth-child(4):before {
      margin-left: 26px;
    }

    .banter-loader__box:nth-child(3):before {
      margin-top: 52px;
    }

    .banter-loader__box:last-child {
      margin-bottom: 0;
    }

    @keyframes moveBox-1 {
      9.0909090909% {
        transform: translate(-26px, 0);
      }

      18.1818181818% {
        transform: translate(0px, 0);
      }

      27.2727272727% {
        transform: translate(0px, 0);
      }

      36.3636363636% {
        transform: translate(26px, 0);
      }

      45.4545454545% {
        transform: translate(26px, 26px);
      }

      54.5454545455% {
        transform: translate(26px, 26px);
      }

      63.6363636364% {
        transform: translate(26px, 26px);
      }

      72.7272727273% {
        transform: translate(26px, 0px);
      }

      81.8181818182% {
        transform: translate(0px, 0px);
      }

      90.9090909091% {
        transform: translate(-26px, 0px);
      }

      100% {
        transform: translate(0px, 0px);
      }
    }

    .banter-loader__box:nth-child(1) {
      animation: moveBox-1 4s infinite;
    }

    @keyframes moveBox-2 {
      9.0909090909% {
        transform: translate(0, 0);
      }

      18.1818181818% {
        transform: translate(26px, 0);
      }

      27.2727272727% {
        transform: translate(0px, 0);
      }

      36.3636363636% {
        transform: translate(26px, 0);
      }

      45.4545454545% {
        transform: translate(26px, 26px);
      }

      54.5454545455% {
        transform: translate(26px, 26px);
      }

      63.6363636364% {
        transform: translate(26px, 26px);
      }

      72.7272727273% {
        transform: translate(26px, 26px);
      }

      81.8181818182% {
        transform: translate(0px, 26px);
      }

      90.9090909091% {
        transform: translate(0px, 26px);
      }

      100% {
        transform: translate(0px, 0px);
      }
    }

    .banter-loader__box:nth-child(2) {
      animation: moveBox-2 4s infinite;
    }

    @keyframes moveBox-3 {
      9.0909090909% {
        transform: translate(-26px, 0);
      }

      18.1818181818% {
        transform: translate(-26px, 0);
      }

      27.2727272727% {
        transform: translate(0px, 0);
      }

      36.3636363636% {
        transform: translate(-26px, 0);
      }

      45.4545454545% {
        transform: translate(-26px, 0);
      }

      54.5454545455% {
        transform: translate(-26px, 0);
      }

      63.6363636364% {
        transform: translate(-26px, 0);
      }

      72.7272727273% {
        transform: translate(-26px, 0);
      }

      81.8181818182% {
        transform: translate(-26px, -26px);
      }

      90.9090909091% {
        transform: translate(0px, -26px);
      }

      100% {
        transform: translate(0px, 0px);
      }
    }

    .banter-loader__box:nth-child(3) {
      animation: moveBox-3 4s infinite;
    }

    @keyframes moveBox-4 {
      9.0909090909% {
        transform: translate(-26px, 0);
      }

      18.1818181818% {
        transform: translate(-26px, 0);
      }

      27.2727272727% {
        transform: translate(-26px, -26px);
      }

      36.3636363636% {
        transform: translate(0px, -26px);
      }

      45.4545454545% {
        transform: translate(0px, 0px);
      }

      54.5454545455% {
        transform: translate(0px, -26px);
      }

      63.6363636364% {
        transform: translate(0px, -26px);
      }

      72.7272727273% {
        transform: translate(0px, -26px);
      }

      81.8181818182% {
        transform: translate(-26px, -26px);
      }

      90.9090909091% {
        transform: translate(-26px, 0px);
      }

      100% {
        transform: translate(0px, 0px);
      }
    }

    .banter-loader__box:nth-child(4) {
      animation: moveBox-4 4s infinite;
    }

    @keyframes moveBox-5 {
      9.0909090909% {
        transform: translate(0, 0);
      }

      18.1818181818% {
        transform: translate(0, 0);
      }

      27.2727272727% {
        transform: translate(0, 0);
      }

      36.3636363636% {
        transform: translate(26px, 0);
      }

      45.4545454545% {
        transform: translate(26px, 0);
      }

      54.5454545455% {
        transform: translate(26px, 0);
      }

      63.6363636364% {
        transform: translate(26px, 0);
      }

      72.7272727273% {
        transform: translate(26px, 0);
      }

      81.8181818182% {
        transform: translate(26px, -26px);
      }

      90.9090909091% {
        transform: translate(0px, -26px);
      }

      100% {
        transform: translate(0px, 0px);
      }
    }

    .banter-loader__box:nth-child(5) {
      animation: moveBox-5 4s infinite;
    }

    @keyframes moveBox-6 {
      9.0909090909% {
        transform: translate(0, 0);
      }

      18.1818181818% {
        transform: translate(-26px, 0);
      }

      27.2727272727% {
        transform: translate(-26px, 0);
      }

      36.3636363636% {
        transform: translate(0px, 0);
      }

      45.4545454545% {
        transform: translate(0px, 0);
      }

      54.5454545455% {
        transform: translate(0px, 0);
      }

      63.6363636364% {
        transform: translate(0px, 0);
      }

      72.7272727273% {
        transform: translate(0px, 26px);
      }

      81.8181818182% {
        transform: translate(-26px, 26px);
      }

      90.9090909091% {
        transform: translate(-26px, 0px);
      }

      100% {
        transform: translate(0px, 0px);
      }
    }

    .banter-loader__box:nth-child(6) {
      animation: moveBox-6 4s infinite;
    }

    @keyframes moveBox-7 {
      9.0909090909% {
        transform: translate(26px, 0);
      }

      18.1818181818% {
        transform: translate(26px, 0);
      }

      27.2727272727% {
        transform: translate(26px, 0);
      }

      36.3636363636% {
        transform: translate(0px, 0);
      }

      45.4545454545% {
        transform: translate(0px, -26px);
      }

      54.5454545455% {
        transform: translate(26px, -26px);
      }

      63.6363636364% {
        transform: translate(0px, -26px);
      }

      72.7272727273% {
        transform: translate(0px, -26px);
      }

      81.8181818182% {
        transform: translate(0px, 0px);
      }

      90.9090909091% {
        transform: translate(26px, 0px);
      }

      100% {
        transform: translate(0px, 0px);
      }
    }

    .banter-loader__box:nth-child(7) {
      animation: moveBox-7 4s infinite;
    }

    @keyframes moveBox-8 {
      9.0909090909% {
        transform: translate(0, 0);
      }

      18.1818181818% {
        transform: translate(-26px, 0);
      }

      27.2727272727% {
        transform: translate(-26px, -26px);
      }

      36.3636363636% {
        transform: translate(0px, -26px);
      }

      45.4545454545% {
        transform: translate(0px, -26px);
      }

      54.5454545455% {
        transform: translate(0px, -26px);
      }

      63.6363636364% {
        transform: translate(0px, -26px);
      }

      72.7272727273% {
        transform: translate(0px, -26px);
      }

      81.8181818182% {
        transform: translate(26px, -26px);
      }

      90.9090909091% {
        transform: translate(26px, 0px);
      }

      100% {
        transform: translate(0px, 0px);
      }
    }

    .banter-loader__box:nth-child(8) {
      animation: moveBox-8 4s infinite;
    }

    @keyframes moveBox-9 {
      9.0909090909% {
        transform: translate(-26px, 0);
      }

      18.1818181818% {
        transform: translate(-26px, 0);
      }

      27.2727272727% {
        transform: translate(0px, 0);
      }

      36.3636363636% {
        transform: translate(-26px, 0);
      }

      45.4545454545% {
        transform: translate(0px, 0);
      }

      54.5454545455% {
        transform: translate(0px, 0);
      }

      63.6363636364% {
        transform: translate(-26px, 0);
      }

      72.7272727273% {
        transform: translate(-26px, 0);
      }

      81.8181818182% {
        transform: translate(-52px, 0);
      }

      90.9090909091% {
        transform: translate(-26px, 0);
      }

      100% {
        transform: translate(0px, 0);
      }
    }

    .banter-loader__box:nth-child(9) {
      animation: moveBox-9 4s infinite;
    }
  }

  .title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 50px;

    .description {
      display: flex;
      flex-direction: row;
      margin-top: 100px;

      .left {
        width: 45%;

        h1 {
          font-size: 70px;
          margin: 20px;

          span {
            position: relative;
            top: 20px;
            display: inline-block;
            animation: bounce .4s ease infinite alternate;
            font-family: 'PoetsenOne';
            color: #00fefe;
          }

          span:nth-child(2) {
            animation-delay: .1s;
          }

          span:nth-child(3) {
            animation-delay: .2s;
          }

          span:nth-child(4) {
            animation-delay: .3s;
          }

          span:nth-child(5) {
            animation-delay: .4s;
          }

          span:nth-child(6) {
            animation-delay: .5s;
          }

          span:nth-child(7) {
            animation-delay: .6s;
          }

          span:nth-child(8) {
            animation-delay: .7s;
          }

          // span:nth-child(9) {
          //   animation-delay: .8s;
          // }

          // span:nth-child(10) {
          //   animation-delay: .9s;
          // }
        }

        h2 {
          margin: 5px 20px;
          font-size: 30px;
        }

        p {
          margin: 20px;
          font-size: 15px;
          line-height: 1.5;
        }

        h4 {
          transform: translate(-50%, -50%);
          font-size: 24px;
          background: linear-gradient(90deg, #03a9f4, #ff8d60, #60c4e0, #03a9f4);
          background-size: 400%;
          text-transform: uppercase;
          animation: sun 8s infinite;
          padding: 20px 30px;
          color: #fff;
          text-decoration: none;
          cursor: pointer;
          border-radius: 15%;
          margin: 80px 0 0 100px;
          width: 100px;
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
          background-color: rgba(255, 255, 255, 0.4);
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

      .right {
        width: 55%;
        display: flex;
        justify-content: center;
        align-items: center;
        // border: #00fefe 1px solid;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .number {
      display: flex;
      justify-content: space-around;
      width: 100%;
      margin-bottom: 50px;

      div {
        text-align: center;
        margin: 0 20px;
        display: flex;
        flex-direction: row;
        align-items: center;

        .spinner {
          background-image: linear-gradient(#a19897 35%, rgb(0, 225, 255));
          width: 40px;
          height: 40px;
          animation: spinning82341 1.7s linear infinite;
          text-align: center;
          border-radius: 50%;
          filter: blur(1px);
          box-shadow: 0px -5px 20px 0px #a19897, 0px 5px 20px 0px rgb(0, 225, 255);

          @keyframes spinning82341 {
            to {
              transform: rotate(360deg);
            }
          }
        }

        h3 {
          font-size: 30px;
          margin: 0;
        }

        p {
          font-size: 20px;
          color: #00fefe;
          margin: 10px;
        }
      }
    }
  }

  .picture {
    .panels {
      min-height: 500px;
      overflow: hidden;
      display: flex;
    }

    .panel {
      box-shadow: inset 0 0 0 5px rgba(255, 255, 255, 0.1);
      text-align: center;
      align-items: center;
      transition:
        font-size 0.7s,
        flex 0.2s cubic-bezier(0.61, -0.19, 0.7, -0.11),
        background 0.7s;
      font-size: 20px;
      background-size: cover;
      background-position: center;
      display: flex;
      flex-direction: column;
      flex: 0.5;
      justify-content: center;
      cursor: pointer;
      margin-right: 5px;
      border-radius: 2%;
      max-width: 200px;
      margin-top: 2%;
    }

    .panel:hover {
      flex:5;
      font-size:40px;
      min-width: 600px;;
    }
    .panel>* {
      margin: 0;
      width: 100%;
      transition: transform 0.5s;
      flex: 1 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .panel>*:first-child {
      transform: translateY(-100%);
      font-size: 30px;
    }

    .panel.open-active>*:first-child {
      transform: translateY(0);
    }

    .panel>*:last-child {
      transform: translateY(100%);
      background-color: rgba(255, 255, 255, 0.2);
      text-align: left;

      p {
        margin: 0 20px;
        font-size: 18px;
      }
    }

    .panel.open-active>*:last-child {
      transform: translateY(0);
    }

    .panel p {
      text-transform: uppercase;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.72), 0 0 14px rgba(0, 0, 0, 0.45);
      font-size: 2em;
    }

    .panel p:nth-child(2) {
      font-size: 1em;
      margin: 0 20px;
    }

    .panel.open {
      flex: 5;
      font-size: 40px;
      min-width: 600px;
    }
  }

  .verification-type {
    height: 130%;
    display: flex;
    flex-direction: column;
    margin-top: 15%;

    .type {
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 100%;
      margin: 0 0 3% 0;

      .el-card {
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
        border: none;
        font-size: 30px;
        min-height: 250px;
        margin: 0 3%;

        h4 {
          font-size: 30px;
          margin: 10px 0;
        }

        h5 {
          font-size: 18px;
          margin: 10px 0;
          font-weight: normal;
          margin-bottom: 50px;
        }

        span {
          font-size: 20px;
          color: #00fefe;
          cursor: pointer;
          text-decoration: none;
          background-color: rgba(255, 255, 255, .1);
          padding: 10px 20px;
          border-radius: 10px;
        }

        span:hover {
          background-color: rgba(255, 255, 255, .2);
        }
      }
    }

    .type1 {
      .el-card {
        width: 40%;
        margin-bottom: 5%;
      }
    }

    .type2 {
      .el-card {
        width: 20%;
        min-height: 350px;
        text-align: center;

        h4 {
          font-size: 24px;
        }

        h5 {
          font-size: 16px;
          font-weight: 100;
        }

        img {
          width: 150px;
          height: 120px;
          background-color: #fff;
          border-radius: 10%;
        }
      }
    }
  }
}
</style>
