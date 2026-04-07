<script setup>
import { onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

let map = null;

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "df765ec91119fcf06080438ee63cfff8",
  };
  AMapLoader.load({
    key: "fc6be70094b42237fbb26ba49fc79013", // 申请好的Web端开发者Key，首次调用 load 时必填
    // version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 4, // 初始化地图级别
        center: [116.397428, 39.90923], // 初始化地图中心点位置
        // mapStyle:"amap://styles/7642bfd33d77595847844a3ed85fc2cf"
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

        
onUnmounted(() => {
  map?.destroy();
});
</script>

<template>
  <!-- <div id="container"></div>
  <div style="font-size: 12px;margin-top:550px;">
    地图审图号：GS(2024)1158号
  </div> -->
  <div style="display: flex; flex-direction: column; align-items: center;">
  <div id="container"></div>
  <div style="font-size: 12px; margin-top: 10px;">
    地图审图号：GS京(2024)1158号
  </div>
</div>

</template>

<style scoped>
#container {
  width: 800px;
  height: 600px;
  z-index: 0;
  /* border: #00fefe 1px solid; */
}
</style>
