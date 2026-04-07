<script setup lang='ts'>
import { onMounted, onBeforeUnmount, onUpdated, ref } from 'vue'
import { Header } from '@/components'
import { BaseEarth } from '@/utils';
import TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';
import useFileLoader from '@/hooks/useFileLoader';
import useCountry from '@/hooks/useCountry';
import useCoord from '@/hooks/useCoord';
import useConversionStandardData from '@/hooks/useConversionStandardData';
import useMapMarkedLightPillar from '@/hooks/map/useMapMarkedLightPillar';
import useCSS2DRender from '@/hooks/useCSS2DRender';

let baseEarth: any = null;
let centerXY = [0, 0];

const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 重置
const resize = () => {
  baseEarth.resize();
};

const { requestData } = useFileLoader();
const { transfromGeoJSON } = useConversionStandardData();
const { getBoundingBox } = useCoord();
const { createCountryFlatLine } = useCountry();
const { initCSS2DRender, create2DTag } = useCSS2DRender();
const { createLightPillar } = useMapMarkedLightPillar({
  scaleFactor: 1.2,
});

const texture = new THREE.TextureLoader();
const textureMap = texture.load('/assets/image/gz-map.jpg');
const texturefxMap = texture.load('/assets/image/gz-map-fx.jpg');
const rotatingApertureTexture = texture.load('/assets/image/rotatingAperture.png');
const rotatingPointTexture = texture.load('/assets/image/rotating-point2.png');
const circlePoint = texture.load('/assets/image/circle-point.png');
const sceneBg = texture.load('/assets/image/scene-bg2.png');
textureMap.wrapS = texturefxMap.wrapS = THREE.RepeatWrapping;
textureMap.wrapT = texturefxMap.wrapT = THREE.RepeatWrapping;
textureMap.flipY = texturefxMap.flipY = false;
textureMap.rotation = texturefxMap.rotation = THREE.MathUtils.degToRad(45);
const scale = 0.128;
textureMap.repeat.set(scale, scale);
texturefxMap.repeat.set(scale, scale);
const topFaceMaterial = new THREE.MeshPhongMaterial({
  map: textureMap,
  color: 0xb4eeea,
  combine: THREE.MultiplyOperation,
  transparent: true,
  opacity: 1,
});
const sideMaterial = new THREE.MeshLambertMaterial({
  color: 0x123024,
  transparent: true,
  opacity: 0.9,
});
const bottomZ = -0.2;
// 初始化旋转光圈
const initRotatingAperture = (scene, width: number) => {
  let plane = new THREE.PlaneBufferGeometry(width, width);
  let material = new THREE.MeshBasicMaterial({
    map: rotatingApertureTexture,
    transparent: true,
    opacity: 1,
    depthTest: true,
  });
  let mesh = new THREE.Mesh(plane, material);
  mesh.position.set(...centerXY, 0);
  mesh.scale.set(1.1, 1.1, 1.1);
  scene.add(mesh);
  return mesh;
};
// 初始化旋转点
const initRotatingPoint = (scene, width: number) => {
  let plane = new THREE.PlaneBufferGeometry(width, width);
  let material = new THREE.MeshBasicMaterial({
    map: rotatingPointTexture,
    transparent: true,
    opacity: 1,
    depthTest: true,
  });
  let mesh = new THREE.Mesh(plane, material); // 创建一个平面几何体
  mesh.position.set(...centerXY, bottomZ - 0.02); // 设置位置
  mesh.scale.set(1.1, 1.1, 1.1); // 设置缩放
  scene.add(mesh);
  return mesh;
};
// 初始化背景
const initSceneBg = (scene, width: number) => {
  let plane = new THREE.PlaneBufferGeometry(width * 4, width * 4);
  let material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    map: sceneBg,
    transparent: true,
    opacity: 1,
    depthTest: true,
  });

  let mesh = new THREE.Mesh(plane, material);
  mesh.position.set(...centerXY, bottomZ - 0.2);
  scene.add(mesh);
};
// 初始化原点
const initCirclePoint = (scene, width: number) => {
  let plane = new THREE.PlaneBufferGeometry(width, width);
  let material = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
    map: circlePoint,
    transparent: true,
    opacity: 1,
    // depthTest: false,
  });
  let mesh = new THREE.Mesh(plane, material);
  mesh.position.set(...centerXY, bottomZ - 0.1);
  // let mesh2 = mesh.clone()
  // mesh2.position.set(...centerXY, bottomZ - 0.001)
  scene.add(mesh);
};
// 创建顶部底部边线
const initBorderLine = (data, mapGroup) => {
  let lineTop = createCountryFlatLine(
    data,
    {
      color: 0xffffff,
      linewidth: 0.0015,
      transparent: true,
      depthTest: false,
    },
    'Line2'
  );
  lineTop.position.z += 0.305;
  let lineBottom = createCountryFlatLine(
    data,
    {
      color: 0x61fbfd,
      linewidth: 0.002,
      // transparent: true,
      depthTest: false,
    },
    'Line2'
  );
  lineBottom.position.z -= 0.1905;
  //  添加边线
  mapGroup.add(lineTop);
  mapGroup.add(lineBottom);
};
// 创建光柱
const initLightPoint = (properties, mapGroup) => {
  if (!properties.centroid && !properties.center) {
    return false
  }
  // 创建光柱
  let heightScaleFactor = 1.6 + random(1, 5) / 5;
  let lightCenter = properties.centroid || properties.center;
  let light = createLightPillar(...lightCenter, heightScaleFactor);
  light.position.z = 0.31;
  mapGroup.add(light);
};
// 创建标签
const initLabel = (properties, scene) => {
  if (!properties.centroid && !properties.center) {
    return false
  }
  // 设置标签的显示内容和位置
  var label = create2DTag('标签', 'map-32-label');
  scene.add(label);
  let labelCenter = properties.center; //centroid || properties.center
  label.show(properties.name, new THREE.Vector3(...labelCenter, 0.31));
};
onMounted(async () => {
  // 地图数据
  // let mapData = await requestData('./map/province/520000.json');
  let mapData = await requestData('./map/china.json');
  mapData = transfromGeoJSON(mapData);

  class CurrentEarth extends BaseEarth {
    constructor(props) {
      super(props);
    }
    initCamera() {
      let { width, height } = this.options;
      let rate = width / height;
      // 设置45°的透视相机,更符合人眼观察
      this.camera = new THREE.PerspectiveCamera(45, rate, 0.001, 90000000);
      this.camera.up.set(0, 0, 1);
      this.camera.position.set(102.11652004273252, 10.389677347071373, 21.23455053268795); //相机在Three.js坐标系中的位置
      this.camera.lookAt(...centerXY, 0);
    }
    initModel() {
      try {
        // 创建组
        this.mapGroup = new THREE.Group();
        // 标签 初始化
        this.css2dRender = initCSS2DRender(this.options, this.container);

        mapData.features.forEach((elem) => {

          // 定义一个地图对象
          const mapObj = new THREE.Object3D();

          // 坐标
          const coordinates = elem.geometry.coordinates;
          // 属性
          const properties = elem.properties;

          // 循环坐标
          coordinates.forEach((multiPolygon) => {
            multiPolygon.forEach((polygon) => {

              const shape = new THREE.Shape();
              // 绘制shape
              // 如果polygon[0]是数组，说明是多边形
              if (polygon[0] instanceof Array) {
                polygon.forEach((line, index) => {
                  if (index === 0) {
                    shape.moveTo(...line);
                  } else {
                    shape.lineTo(...line);
                  }
                });
              } else
                shape.moveTo(...polygon);

              // 拉伸设置
              const extrudeSettings = {
                depth: 0.2,
                bevelEnabled: true,
                bevelSegments: 1,
                bevelThickness: 0.1,
              };
              const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
              const mesh = new THREE.Mesh(geometry, [topFaceMaterial, sideMaterial]);
              mapObj.add(mesh);
            });
          });
          this.mapGroup.add(mapObj);
          // 创建标点和标签
          initLightPoint(properties, this.mapGroup);
          initLabel(properties, this.scene);
        });
        // 创建上下边框
        initBorderLine(mapData, this.mapGroup);

        let earthGroupBound = getBoundingBox(this.mapGroup);
        centerXY = [earthGroupBound.center.x, earthGroupBound.center.y];
        let { size } = earthGroupBound;
        let width = size.x < size.y ? size.y + 1 : size.x + 1;
        // 添加背景，修饰元素
        this.rotatingApertureMesh = initRotatingAperture(this.scene, width);
        this.rotatingPointMesh = initRotatingPoint(this.scene, width - 2);
        initCirclePoint(this.scene, width);
        initSceneBg(this.scene, width);

        // 将组添加到场景中
        this.scene.add(this.mapGroup);
      } catch (error) {
        console.log(error);
      }
    }
    initControls() {
      super.initControls();
      this.controls.target = new THREE.Vector3(...centerXY, 0);
    }
    initLight() {
      //   平行光1
      let directionalLight1 = new THREE.DirectionalLight(0x7af4ff, 1);
      directionalLight1.position.set(...centerXY, 30);
      //   平行光2
      let directionalLight2 = new THREE.DirectionalLight(0x7af4ff, 1);
      directionalLight2.position.set(...centerXY, 30);
      // 环境光
      let ambientLight = new THREE.AmbientLight(0x7af4ff, 1);
      // 将光源添加到场景中
      this.addObject(directionalLight1);
      this.addObject(directionalLight2);
      this.addObject(ambientLight);
    }
    initRenderer() {
      super.initRenderer();
      // this.renderer.outputEncoding = THREE.sRGBEncoding
    }
    loop() {
      this.animationStop = window.requestAnimationFrame(() => {
        this.loop();
      });
      this.renderer.render(this.scene, this.camera);
      // 控制相机旋转缩放的更新
      if (this.options.controls.visibel && this.controls) {
        // this.controls.target.set(...centerXY, 0)
        this.controls.update();
      }
      if (this.rotatingApertureMesh) {
        this.rotatingApertureMesh.rotation.z += 0.0005;
      }
      if (this.rotatingPointMesh) {
        this.rotatingPointMesh.rotation.z -= 0.0005;
      }
      // 渲染标签
      if (this.css2dRender) {
        this.css2dRender.render(this.scene, this.camera);
      }
      TWEEN.update();
      // console.log(this.camera.position)
    }
    resize() {
      super.resize();
      this.renderer.render(this.scene, this.camera);
      this.renderer.setPixelRatio(window.devicePixelRatio);

      if (this.css2dRender) {
        this.css2dRender.setSize(this.options.width, this.options.height);
      }
    }
  }
  baseEarth = new CurrentEarth({
    container: '#map',
    axesVisibel: true,
    controls: {
      enableDamping: true, // 阻尼
      maxPolarAngle: (Math.PI / 2) * 0.98,
    },
  });
  baseEarth.run();
  window.addEventListener('resize', resize);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', resize);
});


</script>

<template>
  <Header title="系统代币申请情况" />
  <main class="main" id="map" />
</template>
<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
