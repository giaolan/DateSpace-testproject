<script setup lang='ts'>
import { ref ,type Ref} from 'vue'
import drawers from '@/components/drawers.vue'
import {tableData,
        handleSelectionChangeOfFirstAuthen,
        type User3} from '@/utils/update'

//drawer是控制抽屉的出现 
const drawer = ref(false)
const title='表单标题'
const direction = 'rtl'
const label1='standard'
const label2 = 'id'
const label3 = '3'

defineProps({
  title: String,
})

//定义一个需要绑定的变量
const selectedRowData : Ref<User3 | null> = ref(null);

function showDetailsofFirstAuthen1(rowData:User3) {
  selectedRowData.value = rowData;//用来补充现在选择的一项的展示内容
  drawer.value = true; // 假设您已经有一个名为 drawer 的响应式变量来控制 el-drawer 的显示
}
</script>

<template>
  <div class="left">
  <el-table :data="tableData" height="350" style="--el-table-border-color:none;position:absolute;width: 680px;left:12px;top:18%;border-radius: 3%" :header-cell-style="{background:'transparent','text-align':'center'}" :cell-style="{textAlign:'center'}"
            @selection-change="handleSelectionChangeOfFirstAuthen">
            <el-table-column prop="date" label="确权日期" width="130"/>
            <el-table-column prop="id" label=" NFT" width="170" style="height: 40px;" ></el-table-column>
            <el-table-column prop="name" label="数据关键词" width="100px;"/>
            <el-table-column prop="standard" label="代币标准"></el-table-column>
            <!-- 查看详情按钮 和showDetailsofFirstAuthen1函数链接 -->
            <el-table-column fixed="right" label="详情">
                <template #default="scope">
                    <el-button style="border-width: 0cap;border-radius: 4px;background:transparent;font-family: 宋体" class="DetailButton" @click="showDetailsofFirstAuthen1(scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
          <!-- 选择器 -->
            <el-table-column fixed="left">
                <template #default>
                    <el-table-column  type="selection" width="70" />
                </template>
            </el-table-column>
  </el-table>
</div>
<!-- 上面是列表 供展示 -->
<!-- 以下是抽屉部分 -->
  <div style="position: absolute;left:100px;">
    <drawers :title="title"
            :label1="label1"
            :label3="label3"
            :drawer1="drawer"
            :label2="label2"
            :lable6="true"
            :direction1="direction"
            :selectedRowData="selectedRowData"  
            @update:drawer1="drawer = $event">
          </drawers>
          <!-- 这里的selectedRowData是与上面的绑定的 和查看详情函数里有关联 按上方函数修改即可 -->
  </div>
</template>

<style lang="less" scoped></style>
