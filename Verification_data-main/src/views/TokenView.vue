<script setup lang='ts'>
import { onMounted, onUnmounted, onUpdated, ref ,setBlockTracking,toRefs} from 'vue'
import { Header } from '@/components'
import { ElButton, ElInput } from 'element-plus'
import {search,filterTableData,handleEdit,tableData,showDetails1,drawer1,direction1,selectedRowData1, deleteRow} from '@/utils/update'
import{initAndUpdateChart} from '@/utils/update'
import{initEChart2,initEChart3}from '@/utils/Rentdata2'
//右上一
const chartContainer = ref<HTMLElement | null>(null);
const chartContainer2 = ref<HTMLElement | null>(null);
const chartContainer3 = ref<HTMLElement | null>(null);
const radio1 = ref('true')
const confirmEvent = () => {
  console.log('confirm!')
}
const cancelEvent = () => {
  console.log('cancel!')
}
components:{ElInput} 
onMounted(()=>{
  if(chartContainer.value ){
    initAndUpdateChart(chartContainer.value);
  };
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
  <Header title="代币管理" />
  <div ref="chartContainer2" style="position:absolute;left:890px;top:420px;height: 300px; width: 500px;background-color: rgba(10,193,199,0.1);" ></div>
  <div ref="chartContainer3" style="position:absolute;left:890px;width: 500px; height: 300px;background-color: rgba(10,193,199,0.1);"></div>
  <!-- 右侧详情框 接口接详细内容 -->
  <el-drawer
    v-model="drawer1"
    title="数据详情"
    :direction="direction1"
  >
      <div v-if="selectedRowData1" style="color:black">
    <!-- <p>NFT:</p>
  <img :src="selectedRowData1.imageUrl" style="position:absolute;left:80px;top:100px;width:70px;height:70px"/> -->
  <!-- <h3>{{ selectedRowData1.date }}</h3>
  <p>{{ selectedRowData1.name }}</p> -->
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" style="position: absolute;top:180px">
          <el-tab-pane label="NFT" name="third" >{{ selectedRowData1.id }}</el-tab-pane>
          <el-tab-pane label="数据" name="second">{{selectedRowData1.address}}</el-tab-pane>
          <el-tab-pane label="数据描述" name="first">{{ selectedRowData1.dataDetail }}</el-tab-pane>
        </el-tabs>
      </div>
</el-drawer>
<div class="left">
  <el-table :data="filterTableData" height="400" style="--el-table-border-color:none;position:absolute;width: 800px;left:10px;top:18%;border-radius: 3%" :header-cell-style="{background:'transparent','text-align':'center'}" :cell-style="{textAlign:'center'}">
    <el-table-column prop="date" label="绑定日期" width="130"/>
    <el-table-column prop="id" label=" NFT" width="130" >
        <template #default="scope">
          <el-tooltip :content="scope.row.id" placement="top">
              <span>{{ scope.row.id.slice(0,6)+'...' }}</span>
          </el-tooltip>
        </template>
    </el-table-column>
    <!-- <el-table-column prop="name" label="Name" width="130" /> -->
    <el-table-column prop="name" label="数据关键词" />

  <el-table-column fixed="right" label="详情">
    <template #default="scope">
      <el-button style="border-width: 0cap;border-radius: 4px;background:transparent" class="DetailButton" @click="showDetails1(scope.row)">查看详情</el-button>
    </template>
  </el-table-column>

  <el-table-column fixed="left" label="全选">
      <template #default>
        <el-table-column  type="selection" width="70" />
      </template>
  </el-table-column>
<el-table-column fixed="right">
   <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
  </template>
  <template #default="{row}">
        <el-button type="danger" @click="deleteRow(row.id)">删除</el-button>
      </template>
</el-table-column>
  <!-- <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template> -->
  </el-table>
  <div class="buttons">
    <div class="bg1">
      <img src="/assets/image/CircleGreen.png" style="width:100px;height:100px;position: absolute;">
    </div>
    <div class="bg">
      <img src="/assets/image/CircleGreen.png" style="width:100px;height:100px;position: absolute;">
    </div>
        <div class="circle">
          <el-button style="background-color: transparent;color: aliceblue;border-radius: 3px;position: absolute;top:35px;left:8px;border:none;cursor:pointer;" >申请SBT</el-button>
        </div>

    <div class="secondbg1">
      <img src="/assets/image/CircleGreen.png" style="width:100px;height:100px;position: absolute;">
    </div>
    <div class="secondbg">
      <img src="/assets/image/CircleGreen.png" style="width:100px;height:100px;position: absolute;">
    </div>
    <div class="circle2">
          <el-button style="background-color: transparent;color: aliceblue;border-radius: 3px;position: absolute;top:35px;left:8px;border:none;cursor:pointer;" >申请NFT</el-button>
     </div>

     <div class="Thirdbg1">
      <img src="/assets/image/CircleGreen.png" style="width:100px;height:100px;position: absolute;">
    </div>
    <div class="Thirdbg">
      <img src="/assets/image/CircleGreen.png" style="width:100px;height:100px;position: absolute;">
    </div>
    <div class="circle3">
          <el-button style="background-color: transparent;color: aliceblue;border-radius: 3px;position: absolute;top:35px;left:10px;border:none;cursor:pointer;" >更新NFT</el-button>
     </div>
    </div>

</div>
  
</template>
<style lang="less" scoped>
@import '../assets/css/animation.less'; // 引入动画

.left{
  padding: 15px;
	box-sizing: border-box;
  width:400px;
  height:500px;

  :deep(.el-table){
  background-color: transparent;
  height:500px;
  
  .DetailButton{
    color:#34c7e1;
  }
  // border: none;
  th {
			background-color: transparent;
		}
		tr {
			color: #fff;
			background-color: transparent;
			&.el-table__row--striped {
				td.el-table__cell {
					background-color: transparent;
				}
			}
			&:hover {
				td.el-table__cell {
					background-color: transparent;
				}
			}
		}

}}

.buttons{
   position: absolute;
   left:100px;
   top:560px;
   width:70px;
   
   .bg{
    position: absolute;
    left:13px;
    width:100px;
    height:100px;
    top:15px;
    animation: rotate12 1s infinite;

    // background: url("..//../public/assets/image/CircleGreen.png") no-repeat;
   }
   .bg1{
    position: absolute;
    left:13px;
    width:100px;
    height:100px;
    top:15px;
    animation: rotate 2s infinite;
    // background: url("..//../public/assets/image/CircleGreen.png") no-repeat;
   }

   .secondbg{
    position: absolute;
    left:150px;
    width:100px;
    height:100px;
    top:15px;
    animation: rotate 1s infinite;
    // background: url("..//../public/assets/image/CircleGreen.png") no-repeat;
   }
   .secondbg1{
    position: absolute;
    left:150px;
    width:100px;
    height:100px;
    top:15px;
    animation: rotate12 2s infinite;
    // background: url("..//../public/assets/image/CircleGreen.png") no-repeat;
   }

   .Thirdbg{
    position: absolute;
    left:287px;
    width:100px;
    height:100px;
    top:15px;
    animation: rotate 1s infinite;
    // background: url("..//../public/assets/image/CircleGreen.png") no-repeat;
   }
   .Thirdbg1{
    position: absolute;
    left:287px;
    width:100px;
    height:100px;
    top:15px;
    animation: rotate12 2s infinite;
    // background: url("..//../public/assets/image/CircleGreen.png") no-repeat;
   }
  .circle{
    // background:url('..//..//public/assets/image/CircleGreen.png')no-repeat center;
    position: absolute;
    left:13px;
    top:14px;
    width:100px;
    height: 100px;
    
  }

  .circle2{
    // background:url('..//..//public/assets/image/CircleGreen.png')no-repeat center;
    position: absolute;
    left:150px;
    top:14px;
    width:100px;
    height: 100px;
  }

  .circle3{
    // background:url('..//..//public/assets/image/CircleGreen.png')no-repeat center;
    position: absolute;
    left:285px;
    top:14px;
    width:100px;
    height: 100px;
  }
}
</style>
