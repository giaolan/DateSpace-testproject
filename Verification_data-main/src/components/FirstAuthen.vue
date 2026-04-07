<script lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  showDetailsofFirstAuthen1,
  drawerofFirstAuthen1,
  directionofFirstAuthen1,
  selectedRowDataofFirstAuthen1,
  nextStepOfFirstAuthen,
  handleSelectionChangeOfFirstAuthen,
  dialogFormVisibleOfFirstAuthen,
  selectionRowsOfFirstAuthen,
  type User3
} from '@/utils/update'
import { ChangeActive, active } from './FunctionsVertify';
import { SBToptions } from '@/utils/update'
// import { ElDrawer, ElTable, ElTableColumn, ElTabs, ElTabPane } from 'element-plus';
import { ChangeActiveOfSecond } from './FunctionsVertify';
import { ElMessage } from 'element-plus';
import type { TabsPaneContext } from 'element-plus'
import { getDatas, getListTokens, getNFTCount, getNFTs, getSBTs, insertToken } from '@/api';
import { reverse } from 'dns';
export default {
  setup() {

    const router = useRouter()
    window.onload = function () {
      window.location.href = 'selectData'; // 替换为你的目标URL
    };
    onMounted(() => {
      active.value = 2;
      fetchNFTTokens();
      fetchgetSBTs()
    })
    //取消成功
    const open3 = () => {
      ElMessage({
        message: '取消确权成功',
        type: 'warning',
      })
    }

    const SecondFormSubmit = () => {
      ChangeActive().then(() => {
        selectionRowsOfFirstAuthen.value.forEach(async (item) => {
          const data = {
            NFT: item.id,
            userId: localStorage.getItem('userId'),
            type: 'SBT',
            keyword: form.name,
            detail: form.detail
          }
          // 如果选择了SBT编号
          if (value.value) {
            data['SBT'] = value.value
          }
          await insertToken(data);
        });

        router.push('SecondAuthen')
        // open2()
      })
    }
    const Active1 = () => {
      active.value++
    }
    const Active0 = () => {
      active.value--
      open3()
    }
    //侧边框

    // import type { on } from 'events';
    const activeName = ref('first')

    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }

    const dialogFormVisible = ref(false)
    const formLabelWidth = '140px'

    const form = reactive({
      name: '',
      detail: ''
    })

    const value = ref('')

    function open2() {
      throw new Error('Function not implemented.');
    }

    const tableData = ref([]);
    const fetchNFTTokens = async () => {
      const res = await getNFTs(localStorage.getItem('userId'));
      tableData.value = res.reverse();
      // console.log(tableData.value)
    }
    //获得SBT的编号
    const SBTs = ref([]);
    const fetchgetSBTs = async () => {
      const res = await getSBTs(localStorage.getItem('userId'));
      SBTs.value = res;
    }

    //插入NFT到SBT当中
    // const fetchinsertSBTs = async()=>{
    //   const res = await insertToken(localStorage.getItem(
    //     'userId',

    //   ))
    // }
    return {
      SecondFormSubmit,
      open3,
      open2,
      Active1,
      Active0,
      activeName,
      dialogFormVisible,
      formLabelWidth,
      form,
      value,
      handleSelectionChangeOfFirstAuthen,
      showDetailsofFirstAuthen1,
      ChangeActiveOfSecond,
      nextStepOfFirstAuthen,
      drawerofFirstAuthen1,
      directionofFirstAuthen1,
      selectedRowDataofFirstAuthen1,
      handleClick,
      dialogFormVisibleOfFirstAuthen,
      SBTs,
      tableData
    }
  }
}

</script>

<template>
  <div class="left">
    <el-table :data="tableData" height="470"
      style="--el-table-border-color:none;position:absolute;width: 680px;left:40px;top:18%;border-radius: 3%"
      :header-cell-style="{ background: 'transparent', 'text-align': 'center' }" :cell-style="{ textAlign: 'center' }"
      @selection-change="handleSelectionChangeOfFirstAuthen">
      <el-table-column prop="createtime" label="确权时间" width="164" />
      <el-table-column prop="dataid" label=" NFT" width="140" style="height: 40px;">
        <template #default="scope">
          <el-tooltip :content="scope.row.id" placement="top">
            <span>{{ scope.row.id.slice(0, 10) + '...' }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="keyword" label="数据关键词" width="120px;"><template #default="scope">
          <el-tag>{{ scope.row.keyword ? scope.row.keyword : "无" }}</el-tag>
          <!-- v-for="(keyword, index) in scope.row.keywords" :key="index" -->
        </template></el-table-column>
      <el-table-column prop="standard" label="代币标准" width="87px">ERC-721</el-table-column>
      <el-table-column fixed="right" label="详情">
        <template #default="scope">
          <el-button
            style="border-width: 0cap;border-radius: 4px;background:transparent;font-family: '微软雅黑';font-size: medium;"
            class="DetailButton" @click="showDetailsofFirstAuthen1(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>

      <el-table-column fixed="left">
        <template #default>
          <el-table-column type="selection" width="70" style="width:100px" />
        </template>
      </el-table-column>

    </el-table>
    <el-button plain @click="ChangeActiveOfSecond"
      style="border-radius: 20px;background-color: transparent;border-style: outset;border-width: 3px;position: absolute;left:60%;top:590px;color:white;font-size: medium;">结束确权</el-button>
    <el-button plain @click="nextStepOfFirstAuthen"
      style="border-radius: 20px;background-color: transparent;border-style: outset;border-width: 3px;position: absolute;left:73%;top:590px;color:white;font-size: medium;">二级确权</el-button>
  </div>

  <el-drawer v-model="drawerofFirstAuthen1" title="数据详情" style="font-family: '微软雅黑';color:black"
    :direction="directionofFirstAuthen1">
    <div v-if="selectedRowDataofFirstAuthen1" style="color:black">
      <h5 style="font-family: '微软雅黑';">{{ selectedRowDataofFirstAuthen1.detail }}</h5>
    </div>
  </el-drawer>

  <div class="FillForm">

    <el-dialog v-model="dialogFormVisibleOfFirstAuthen" title="数据描述" width="500"
      style="position: absolute;top:100px;left:450px" :show-close="false">
      <el-form :model="form">

        <el-form-item label="关键词" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细描述" :label-width="formLabelWidth">
          <el-input v-model="form.detail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form :label-width="formLabelWidth">
          <el-form-item label="SBT编号">
            <el-select v-model="value" placeholder="选择编号" style="width: 240px;left: 0%;">
              <el-option v-for="item in SBTs" :key="item.id" :label="item.id" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form>
        <el-alert type="info" show-icon :closable="false"
          style="position: absolute;left:32%;top:70%;width:50%;height:10%">
          <p>如果不选择将自动为您生成SBT</p>
        </el-alert>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <a @click="dialogFormVisibleOfFirstAuthen = false; Active0()"
            style="border-width: 0;color:gray;cursor:hand;margin: 9px;cursor: pointer;">取消</a>
          <a type="primary" @click="dialogFormVisibleOfFirstAuthen = false; SecondFormSubmit()"
            style="text-decoration: none;cursor: pointer;color: gray;"> 提交</a>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.left {
  padding: 15px;
  box-sizing: border-box;
  width: 750px;
  height: 500px;
  position: absolute;
  left: -30px;
  top: -60px;

  :deep(.el-table) {
    background-color: transparent;
    height: 500px;

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