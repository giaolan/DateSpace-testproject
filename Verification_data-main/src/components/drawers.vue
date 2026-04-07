<!-- 以下是抽屉使用说明 -->
<!-- 当需要使用展示列表的导航时 使用label6 给予label6赋值 -->
<!-- 输入的label将和需要展示的数据数组里的key相同 -->
<!-- 因为数据一般展示确权时间 关键词 及其id 所以只显示了这三个性质 分别对应key值为date key id-->
<!-- 传入的direction1为抽屉出现的方向 其中“ltr”对应的是从左边弹出 “rtl”是从右弹出 “ttb”是从上方弹出 “btt”是从下方弹出 -->
<script setup lang='ts'>
import { watch,ref,type Ref} from 'vue'
const emit = defineEmits(['update:drawer1'])
const direction1 = ref('rtl')
const active = ref(true)

// 定义外部传入的props
const props = defineProps({
  //左上角的标签
  title: {  
    type: String,
    required: true
  },
  //内部导航标签
  //注意输入label值的时候要和自己想要展示的标签一样
  label1: {  
    type: String,
    required: false
  },
  label2:{
      type:String,
      reuqired:false
  },label3:{
      type:String,
      reuqired:false
  },
  label4:{
      type:String,
      reuqired:false
  },
  label5:{
      type:String,
      reuqired:false
  },
  label6:{
    type:Boolean,
    reuqired:false
  },
  drawer1:{
    type:Boolean,
    required:true
  },
  direction1:{
    type:String,
    required:true
  },
  //要展示的数据
  selectedRowData:{
    type:Object as () =>Record<string, any> | null,
    required:true
  },
  
});

const drawerState = ref(props.drawer1);

const handleClose = () => {
    drawerState.value = false; // 更新drawerState值为false
    emit('update:drawer1', drawerState.value); // 通过事件通知父组件
    console.log(props.label1)
}

// 观察props.drawer1的变化，并相应更新drawerState的值
watch(() => props.drawer1, (newVal) => {
  drawerState.value = newVal;
});

watch(()=>props.selectedRowData,(newVal)=>{
  console.log(props.selectedRowData)
})

const toggle=()=>{
   drawerState.value = !drawerState.value;
   emit('update:drawer1', drawerState.value); 
}

const getDataByLabel = (label: string | number) => {
  return props.selectedRowData?.[label];
};
</script>

<template>
<div>
      <el-drawer
        v-model="drawerState"
        :title="title"
        :direction="direction1"
        @close="handleClose"
      >
      <!-- 显示为导航的内容 可以选择使用 -->
          <div v-if="props.selectedRowData" style="color:black">
              <el-tabs v-model="active" class="demo-tabs" style="position: absolute;top:100px;">
                  <el-tab-pane v-if="label1" :label="label1" name="first" >{{ getDataByLabel(label1)}}</el-tab-pane>
                  <el-tab-pane v-if="label2" :label="label2" name="second">{{getDataByLabel(label2)}}</el-tab-pane>
                  <el-tab-pane v-if="label3" :label="label3" name="third">{{getDataByLabel(label3) }}</el-tab-pane>
                  <el-tab-pane v-if="label4" :label="label4" name="forth">{{ getDataByLabel(label4)}}</el-tab-pane>
                  <el-tab-pane v-if="label5" :label="label5" name="fifth">{{ getDataByLabel(label5)}}</el-tab-pane>
                  <!-- 如果想要展示包含数据的列表的话 一定要用label6 -->
                  <el-tab-pane v-if="label6" label="所包含数据" name="sixth" >
                  <el-table :data="props.selectedRowData?.datas" style="width: 380px;">
                    <el-table-column prop="date" label="日期" width="100px;"></el-table-column>
                    <el-table-column prop="key" label="数据关键词" width="100px;"></el-table-column>
                    <el-table-column prop="id" label="NFT"></el-table-column>
                  </el-table>  
                </el-tab-pane>
              </el-tabs>
          </div>
      </el-drawer>
  </div>
</template>

<style lang="less" scoped></style>
