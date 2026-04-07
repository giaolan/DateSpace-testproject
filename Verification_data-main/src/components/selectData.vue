<script lang='ts'>
import { onUnmounted, reactive, ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import {
  drawerofFirstAuthen,
  directionofFirstAuthen,
  selectedRowDataofFirstAuthen,
  showDetailsofFirstAuthen,
  handleSelectionChange,
  dialogFormVisible,
  nextStep,
  selectionRows,
} from '@/utils/update'
import { ChangeActive, LoadingView, active, LoadingViewOfLoading } from '@/components/FunctionsVertify'
import { ElMessage } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'
import { useRouter } from 'vue-router';
import { getUnverifiedDatas, insertToken } from '@/api'
//上传数据成功

export default {

  setup() {
    const router = useRouter();
    const tableData1 = ref([]);
    const open2 = () => {
      return new Promise((resolve) => {
        ElMessage({
          message: '认证成功',
          type: 'success',
          onClose: () => {
            resolve(true);
          }
        })
      })
    }
    //取消成功
    const open3 = () => {
      ElMessage({
        message: '取消确权成功',
        type: 'warning',
      })
    }
    //表单提交按钮
    const FirstFormSubmit = () => {
      // 为每一个数据添加token
      selectionRows.value.forEach(async (item) => {
        await insertToken({
          dataId: item.id,
          userId: localStorage.getItem('userId'),
          type: 'NFT'
        });
      })
      ChangeActive().then(() => {
        router.push('FirstAuthen')
      })
    }

    const Active1 = () => {
      active.value++
    }
    const Active0 = () => {
      active.value--
      open3();
    }

    const formLabelWidth = '140px'

    const form = reactive({
      name: '',
      detail: ''
    })

    const fetchData = async () => {
      const res = await getUnverifiedDatas(localStorage.getItem('userId'));
      tableData1.value = res;
    }

    onMounted(() => {
      fetchData();
    })

    onUnmounted(() => {
      selectionRows.value = []
    })
    //侧边框
    const activeName = ref('first')

    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }

    const JumptoSecond = () => {
      LoadingViewOfLoading().then(() => {
        active.value = active.value + 2;
        router.push('FirstAuthen')
      })

    }
    return {
      FirstFormSubmit,
      Active1,
      Active0,
      formLabelWidth,
      form,
      activeName,
      handleClick,
      tableData1,
      handleSelectionChange,
      nextStep,
      drawerofFirstAuthen,
      directionofFirstAuthen,
      selectedRowDataofFirstAuthen,
      dialogFormVisible,
      showDetailsofFirstAuthen,
      JumptoSecond,

    }
  }
}
</script>

<template>
  <!-- 已上传数据情况 -->
  <div class="left">
    <div class="Datastate" style="position:absolute;top:4%;left:44%;">已上传数据情况</div>
    <el-table :data="tableData1"
      style="height:470px;--el-table-border-color:none;position:absolute;width: 750px;left:0%;top:60px;border-radius: 3%"
      :header-cell-style="{ background: 'transparent', 'text-align': 'center' }" :cell-style="{ textAlign: 'center' }"
      @selection-change="handleSelectionChange">

      <!-- 选择器 -->
      <el-table-column fixed="left" label="">
        <template #default>
          <el-table-column type="selection" width="100" />
        </template>
      </el-table-column>
      <el-table-column prop="time" label="上传日期" width="180" style="text-align: center;" />
      <el-table-column prop="id" label="数据ID" width="180" style="text-align: center;" />
      <el-table-column prop="keyword" label="数据关键词" width="140"><template #default="scope">
          <el-tag v-if="scope.row.keyword" v-for="(keyword, index) in scope.row.keyword.split(',').slice(0, 1)"
            :key="index" style="margin-right: 5px;">{{ keyword }}</el-tag>
          <!-- v-for="(keyword, index) in scope.row.keywords" :key="index" -->
          <el-tag v-else style="margin-right: 5px;">无</el-tag>
        </template></el-table-column>
      <el-table-column fixed="right" label="详情" width="130">
        <template #default="scope">
          <el-button tag="a"
            style="border-width: 0cap;border-radius: 4px;background-color: transparent;font-size: medium;"
            class="DetailButton" @click="showDetailsofFirstAuthen(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button plain @click="JumptoSecond"
      style="border-radius: 20px;background-color: transparent;border-style: outset;border-width: 3px;position: absolute;left:400px;top:550px;color:white;font-size: medium;">二级确权</el-button>
    <el-button plain @click="nextStep"
      style="border-radius: 20px;background-color: transparent;border-style: outset;border-width: 3px;position: absolute;left:550px;top:550px;color:white;font-size: medium;">一级确权</el-button>
    <!-- </div> -->
    <el-drawer v-model="drawerofFirstAuthen" title="数据详情" :direction="directionofFirstAuthen">
      <div v-if="selectedRowDataofFirstAuthen" style="color:black">
        <!-- <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" style="position: absolute;top:100px"> -->
        <!-- <el-tab-pane label="上传时间" name="Third">{{ selectedRowDataofFirstAuthen.time }}</el-tab-pane>
          <el-tab-pane label="数据描述" name="first">{{ selectedRowDataofFirstAuthen.detail }}</el-tab-pane>
          <el-tab-pane label="数据关键词" name="second">{{ selectedRowDataofFirstAuthen.keyword }}</el-tab-pane> -->
        <!-- </el-tabs> -->
        <h5 style="font-family: '微软雅黑';">{{ selectedRowDataofFirstAuthen.detail }}</h5>
      </div>
    </el-drawer>
  </div>


  <div class="FillForm" style="position: absolute;top:100px;">

    <el-dialog v-model="dialogFormVisible" title="数据描述" width="500" style="position: absolute;top:100px;left:450px"
      :show-close="false">
      <el-form :model="form">
        <el-form-item label="关键词" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item><el-form-item label="详细描述" :label-width="formLabelWidth">
          <el-input v-model="form.detail" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <a @click="dialogFormVisible = false; Active0()"
            style="border-width: 0;color:gray;cursor: pointer;margin: 9px;">取消</a>
          <a type="primary" @click="dialogFormVisible = false; FirstFormSubmit()"
            style="text-decoration: none;cursor: pointer;color: gray;">提交</a>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.left {
  padding: 15px;
  box-sizing: border-box;


  :deep(.el-table) {
    background-color: transparent;

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
