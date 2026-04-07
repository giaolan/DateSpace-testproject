<script setup lang="ts">
import { onMounted, onUnmounted, onUpdated, ref, setBlockTracking, toRefs } from 'vue'
import { ElLoading } from 'element-plus'
import { ChangeActiveOfSecond, Loading, ChangeActive, active } from './FunctionsVertify';
import { drawerofSecondAuthen2, showDetailsofSecondAuthen2, directionofSecondAuthen2, selectedRowDataofSecondAuthen2 } from '@/utils/update';
window.onload = function () {
  window.location.href = 'selectData'; // 替换为你的目标URL
};
//侧边框
import type { FormProps, TabsPaneContext } from 'element-plus'
// import { getSBTs } from '@/api';
import { getListTokens, getSBTs, getTokenDetail } from '@/api';
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
onMounted(() => {
  active.value = 4;
  fetchgetSBTs();
  //  fetchgetSBTdetail();
})

// const selectedRowDataofFirstAuthen = ref([]);
// const fetchgetSBTdetail = async ()=>{
//     const res = await getTokenDetail(localStorage.getItem('tokenId'));
//     selectedRowDataofFirstAuthen.value=res;
// }

const level2 = ref([]);
const fetchgetSBTs = async () => {
  const res = await getSBTs(localStorage.getItem('userId'));
  level2.value = res.reverse();
}
</script>
<template>

  <div class="left">

    <el-table :data="level2"
      style="height:500px;--el-table-border-color:none;position:absolute;width: 90%;left:40px;top:60px;border-radius: 3%"
      :header-cell-style="{ background: 'transparent', 'text-align': 'center' }" :cell-style="{ textAlign: 'center' }">

      <el-table-column prop="createtime" label="确权日期" width="200" style="text-align: center;" />
      <el-table-column prop="id" label="SBT" width="200" />
      <el-table-column prop="dataDtail" label="代币标准" width="100">ERC-721</el-table-column>
      <el-table-column fixed="right" label="详情" width="130">
        <template #default="scope">
          <el-button tag="a" style="border-width: 0cap;border-radius: 4px;background-color: transparent;"
            class="DetailButton" @click="showDetailsofSecondAuthen2(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer v-model="drawerofSecondAuthen2" title="数据详情" :direction="directionofSecondAuthen2">
      <div v-if="selectedRowDataofSecondAuthen2" style="color:black">
        <!-- <h3>{{ selectedRowData.date }}</h3>
          <p>{{ selectedRowData.dataDtail }}</p> -->
        <!-- <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" style="position: absolute;top:100px">
              <el-tab-pane label="上传日期" name="Third">{{ selectedRowDataofSecondAuthen2.createtiem }}</el-tab-pane>
              <el-tab-pane label="数据描述" name="first">{{ selectedRowDataofSecondAuthen2.id }}</el-tab-pane>
              <el-tab-pane label="数据关键词" name="second">{{selectedRowDataofSecondAuthen2.detail}}</el-tab-pane>
            </el-tabs> -->
        <h5> {{ selectedRowDataofSecondAuthen2.detail }} </h5>
      </div>
    </el-drawer>
  </div>
  <el-button
    style="border-radius: 20px;background-color: transparent;border-style: outset;border-width: 3px;position: absolute;left:85%;top:100%;color:white;font-size: medium;"
    v-loading.lock="Loading" @click="ChangeActiveOfSecond">完成</el-button>
</template>
<style scoped lang="less">
.my-custom-loading .el-loading-spinner {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 120px;
  left: 90px;
}

.left {
  padding: 15px;
  box-sizing: border-box;
  width: 750px;
  height: 700px;
  position: absolute;
  left: 10px;
  top: -60px;

  :deep(.el-table) {
    background-color: transparent;
    height: 600px;

    .DetailButton {
      color: #34c7e1;
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

  }
}
</style>