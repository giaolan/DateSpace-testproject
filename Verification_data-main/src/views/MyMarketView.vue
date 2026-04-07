<script setup lang='ts'>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { weekTokenOptions, yearTokenOptions } from '@/utils/Options'
import { historySellData, historyBuyData } from '@/utils/constant';
import { Header } from '@/components'
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
// import { on } from 'events';
import { getTransactions, deleteTradehistory, deleteTransaction } from '@/api';

// 绘制echarts图
use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const weekOptions = ref(weekTokenOptions);
const yearOptions = ref(yearTokenOptions);
const historyData = ref([]);

const fetchData = async (isBuy) => {
  const res = await getTransactions(isBuy, localStorage.getItem('userId'));
  for (let i = 0; i < res.length; i++) {
    const date = new Date(res[i].time);
    res[i].date = date.toLocaleDateString();
    res[i].time = date.toLocaleTimeString();
    res[i].token = res[i].type;
    res[i].method = isBuy ? '购买' : '出售';
    res[i].user = isBuy ? res[i].sellerid : res[i].buyerid;
  }
  historyData.value = res;
}

const handleSelect = (key: string, keyPath: string[]) => {
  if (key === '0') {
    fetchData(0);
  } else {
    fetchData(1);
  }
}

const deleteTradehistory = async (id) => {
  const res = await deleteTransaction(id);
  if (res === 'success') {
    fetchData(0);
  }
}

const handleDelete = (row) => {
  deleteTradehistory(row.id);
}

onMounted(() => {
  fetchData(0);
})

</script>

<template>
  <Header title="数据流通历史" />
  <div class="table">
    <!-- <div class="title">数据流通历史</div> -->
    <el-menu default-active="0" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
      <div class="flex-grow" />
      <el-menu-item index="0">我出售的</el-menu-item>
      <el-menu-item index="1">我购买的</el-menu-item>
    </el-menu>
    <el-table :data="historyData">
      <el-table-column prop="date" label="日期" width="100" align="center" />
      <el-table-column prop="time" label="时间" width="100" align="center" />
      <el-table-column prop="token" label="流通代币类型" width="110" align="center" />
      <el-table-column prop="method" label="流通方式" width="100" align="center" />
      <el-table-column prop="user" label="流通用户" width="180" align="center" />
      <el-table-column prop="hash" label="流通哈希" align="center" />
      <el-table-column label="操作" width="100" align="center">

        <template #default="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="weekLine">
    <div class="title">本周数据流通情况</div>
    <v-chart class="lineMap" :option="weekOptions" autoresize />
  </div>
  <div class="yearLine">
    <div class="title">年度数据流通情况</div>
    <v-chart class="lineMap" :option="yearOptions" autoresize />
  </div>
</template>

<style lang="less" scoped>
// 公共样式
.title {
  font-size: 0.8rem;
  padding-left: 4rem;
  margin-bottom: .5rem;
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

.table {
  position: absolute;
  top: 13%;
  background-color: transparent;
  width: 65%;
  height: 87%;

  :deep(.el-menu) {
    background-color: transparent;
    position: relative;
    left: 2.3rem;

    .el-menu-item {
      color: #fff;
      background-color: transparent;
    }
  }

  :deep(.el-table) {
    background-color: transparent;
    margin-left: 2.2rem;
    color: #fff;
    width: 100%;
    height: 35rem;

    th {
      background-color: transparent;
    }

    tr {
      color: #fff;
      background-color: transparent;
      height: 2.5rem;

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

.weekLine {
  position: absolute;
  top: 20%;
  right: 20%;

  .lineMap {
    width: 25rem;
    height: 16rem;
    position: absolute;
    left: 10%;
  }
}

.yearLine {
  position: absolute;
  top: 58%;
  right: 20%;

  .lineMap {
    width: 25rem;
    height: 17.2rem;
    position: absolute;
    left: 10%;
  }
}
</style>
