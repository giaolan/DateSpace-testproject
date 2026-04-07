<script setup lang='ts'>
import { onMounted, onUnmounted, onUpdated, ref,onBeforeUnmount} from 'vue'
import { useRouter } from 'vue-router'
import { Header } from '@/components'
import { ElButton, ElInput } from 'element-plus'
import {search,filterTableData,handleEdit,tableData,showDetails1,drawer1,direction1,selectedRowData1} from '@/utils/update'
import{initAndUpdateChart} from '@/utils/update'
import{initEChart2,initEChart3, initEChartBig}from '@/utils/Rentdata2'
import { RouterView } from 'vue-router';
import {ChangeActive, active} from '@/components/FunctionsVertify'

onBeforeUnmount(()=>{
  active.value=0
})
//右上一
const chartContainer = ref<HTMLElement | null>(null);
const chartContainer2 = ref<HTMLElement | null>(null);
const chartContainer3 = ref<HTMLElement | null>(null);
const chartContainerBig = ref<HTMLElement | null>(null);
const radio1 = ref('true')
const confirmEvent = () => {
  console.log('confirm!')
}
const cancelEvent = () => {
  console.log('cancel!')
}
components:{ElInput} 
onMounted(()=>{
  if(chartContainerBig.value){
    initEChartBig(chartContainerBig.value)
  }
  if(chartContainer3.value){
    initEChart2(chartContainer3.value)
  }
  if(chartContainer2.value){
    initEChart3(chartContainer2.value)
  }
})
interface DataItem {
  // Assuming your data is an array of [timestamp, value]
  time: number;
  value: number;
}

import type { TabsPaneContext } from 'element-plus'

//侧边框
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}



</script>
<template>
  <Header title="层级确权" />

  <!-- 统计图 -->
<el-row :gutter="16" class="Statistic">
    <el-col :span="20">
      <div class="statistic-card1" >
        <el-statistic :value="98500" >
          <template #title>
            <div style="display: inline-flex; align-items: center;color:aliceblue;font-size: large;">
              今日确权数量
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <img src="/assets/image/upward.png" style="width:7%" class="img">
            <span>较昨日上涨</span>
            <span class="green" style="color:greenyellow">
              24%
            </span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="statistic-card2">
        <el-statistic :value="693700">
          <template #title>
            <div style="display: inline-flex; align-items: center;color:aliceblue;font-size: large;top:10px;">
              月活跃数量
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <img src="/assets/image/down.png" style="width:7%" class="img">
            <span>较上月下降</span>
            <span class="red" style="color:red">
              12%
              <!-- <el-icon>
                <CaretBottom />
              </el-icon> -->
            </span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="statistic-card3">
        <el-statistic :value="72000" title="New transactions today">
          <template #title>
            <div style="display: inline-flex; align-items: center;color: aliceblue;font-size: large;">
              今日交易数量
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <img src="/assets/image/upward.png" style="width:7%" class="img">
            <span>较昨日上涨</span>
            <span class="green" style="color:greenyellow">
              16%
              <el-icon>
                <CaretTop />
              </el-icon>
            </span>
          </div>
          <!-- <div class="footer-item">
            <el-icon :size="14">
              <ArrowRight />
            </el-icon>
          </div> -->
        </div>
      </div>
    </el-col>
  </el-row>

  <div ref="chartContainer2" style="position:absolute;left:75%;top:65%;height: 28%; width: 23%;background-color: rgba(10,193,199,0.1);" ></div>
  <div ref="chartContainer3" style="position:absolute;left:53%;top:65%;width:20%; height: 28%;background-color: rgba(10,193,199,0.1);"></div>
  <div ref="chartContainerBig" style="position:absolute;left:53%;top:30%;width:45%; height: 34%;background-color: rgba(10,193,199,0.1);"></div>
  <!-- <childComponent :parentFunction="parentFunction" style="position:absolute;left:260px;top:140px;width:700px;"></childComponent> -->
  <!-- <selectData @clickFatherOne="clickFatherOne" style="position: absolute;left:800px;"/> -->
  <div style="position:absolute;top:16%;height:60%;width:700px;left:6%;" class="Process">
    <el-steps :active="active" finish-status="success" >
      <el-step title="选择数据" class="custom-title-1" />
      <el-step title="一级确权" class="custom-title-2" />
      <el-step title="选择NFT" class="custom-title-1" />
      <el-step title="二级确权" class="custom-title-1" />
      <!-- 完成返回代币管理 -->
    </el-steps>
   
  </div>
  <!-- 展示框 router-view -->
  <div class="show">
    <RouterView />
  </div>
    
</template>
<style lang="less" scoped>
// 引入动画
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
.Statistic{
  position:absolute;
  top:12%;
  left:55%;
  width:400px;

  .statistic-card1{
    width:200px;
    padding:10px;
    position:absolute;
    top:20px;
    font-size: large;
    left:0%;
    background-color: rgba(10, 199, 193, 0.2);
    border-radius:10%;
    :deep(.el-statistic__content){
      color:#f29701
    }
    
  }
  .statistic-card2{
    width:200px;
    padding:10px;
    position:absolute;
    left:250px;
    top:20px;
    background-color: rgba(10, 199, 193, 0.2);
    border-radius:10%;
    :deep(.el-statistic__content){
      color:#f29701
    }

  }
  .statistic-card3{
    width:200px;
    padding:10px;
    position:absolute;
    left:500px;
    top:20px;
    background-color: rgba(10, 199, 193, 0.2);
    border-radius:10%;
    :deep(.el-statistic__content){
      color:#f29701
    }
  }

  .statistic-footer{

    .footer-item{
      
      .img{
        animation:jump 1s linear infinite;;
      }
    }
  }
}

.Process{
  :deep(.el-steps){
    .el-step__title.is-process {
    color:rgb(27, 90, 94)
}
      .el-step__title.is-wait{
        color:rgb(50, 191, 212)
      }
  }
}
.show{
  position:absolute;
  left:4%;
  top:30%;
  background-color: rgba(10, 193, 199, 0.1);

  // border-width:10px;
  // border-style:outset;
  // border-color:aqua;
  width:46%;
  height:60%;
}
</style>
