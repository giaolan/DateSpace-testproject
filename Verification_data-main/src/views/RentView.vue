<script setup lang='ts'>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { Header } from '@/components'
import {selector1,options,search,tableData,filterTableData,drawer,direction,selectedRowData,activeName,handleClick,handleRowClick} from '@/utils/RentData'
//charts1图
import { initEChart ,InitChart2} from '@/utils/Rentdata2';
const chartContainer=ref<HTMLElement | null>(null);
const chartDom = ref<HTMLElement | null>(null);
let myChart:echarts.ECharts | null = null;

onMounted(()=>{
  if(chartContainer.value !== null && chartDom.value){
    initEChart(chartContainer.value);
    InitChart2(chartDom.value);
  }
});

const value = ref([10,100])
const currentDate = ref(new Date())
</script>
<template>
  <Header title="租赁数据" />
  <h style="position:absolute;left:1060px;">购买租赁比例散点图</h>
  <div ref="chartContainer" style="position:absolute;left:900px;top:80px;width:500px;height: 300px;"></div>
  <div ref="chartDom" style="position:absolute;top:330px;left:925px;width:430px;height:400px;"></div>
  <div class="main">
  <el-drawer
    v-model="drawer"
    title="数据示例"
    :direction="direction"
  >
  <div v-if="selectedRowData" style="color:black">
  <p>{{ selectedRowData.address }}</p>
  </div>
</el-drawer>
  <!-- 数据类型 -->
  <div class="types" style="position:absolute;left:115px;top:185px;">数据类型</div>
  <div class="TypeOfData">
    <el-select
    v-model="selector1"
    filterable
    placeholder=""
    style="width: 240px;position: absolute;left:50px;"
    clearable
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
    </el-select>
  </div>

  <!-- 价格选择器 -->
  <div class="slider-demo-block" >
    <label style="width:50px;position:absolute;left:0px;">价格  </label>
    <el-slider v-modle="search" range show-stops :max="200" :step="10" style="position:absolute;left:60px"/>
  </div>

  <!-- 搜索框 -->
  <div class="search">
    <label style="position:absolute;left:470px;top:185px">搜索关键词</label>
    <el-input v-model="search" style="width:200px;position:absolute;left:573px;top:179px;" placeholder="" />
  </div>

  <!-- 发布时间 -->
  

  <!-- 查看数据内容 -->

  <!-- 产品展示区 -->
  <div class="product" >
    <!-- <el-table>
    <ul v-for="data in tableData">
      <li>
        <img :src="data.imageUrl" style="width:50px;">
      </li>
    </ul> -->
  <!-- </el-table> -->
  <el-table :data="filterTableData" style="height:500px;width:800px" :header-cell-style="{background:'transparent'}" @row-click="handleRowClick">
    
    <el-table-column prop="imageURL" width="130" style="height: 90px;">
      <!-- <img src="..//../public/assets/nft/冰棍.png" style="width:40px"> -->
      <template #default="scope">
          <img :src="scope.row.imageUrl" alt="图片" style="width:60px;height:60px;"/>
      </template>
    </el-table-column >
        
    <el-table-column prop="Keyword" >
      <template #default="{row}">
      <span style="color:white">{{ row.Keyword }}</span></template>
    </el-table-column>

    <el-table-column prop="price">
      <template #default="{row}">
          <span style="color:white">{{ row.price }}</span>
      </template>
    </el-table-column>

    <el-table-column fixed="right">
      <template #default>
        <el-button @click.stop>租赁或购买</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</div>
</template>
<style lang="less" scoped>
.product{
  position:absolute;
  left:30px;
  top:220px;
}
.TypeOfData{ 
  position:absolute;
  left:150px;
  top:180px;
}
.slider-demo-block {
  display: flex;
  align-items: center;
  width:500px;
  position:absolute;
  left:150px;
  top:140px;
  :deep(.slider-demo-block){  
  margin-top: 0;
  margin-left: 123px;
  }
}
.time {
  font-size: 12px;
  // color: #999;
}

.product{
  padding: 15px;
	box-sizing: border-box;
  width:1400px;
  height:500px;
  color:white;

  :deep(.el-table){
  background-color: transparent;
  height:500px;
  
  .el-table__row{
    background-color: transparent;
  }
  .el-table__row:hover {
    background-color: rgba(10,193,199,0.3); /* 鼠标悬停时的背景颜色 */
    cursor: pointer; /* 鼠标指针样式 */
  }

  .DetailButton{
    color:#34c7e1;
  }
  // border: none;
  th {
			background-color: transparent;
		}
		tr {
			// color: #fff;
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

</style>
