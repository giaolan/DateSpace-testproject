<script setup lang='ts'>
import { UploadFilled } from '@element-plus/icons-vue'
import { onMounted, ref, reactive } from 'vue'
import { Header } from '@/components'
import { ElButton, ElInput } from 'element-plus'
import { initAndUpdateChart, data, tableRowClassName, filterTag, drawer, direction, showDetails, InitChart1, InitChart2, HistoryData, drawer9 } from '@/utils/update'
import { useTransition } from '@vueuse/core'
import { CancelLoading, ShowLoading } from '@/components/FunctionsVertify'
//上传按钮
import type { UploadInstance } from 'element-plus'
import { ElMessage } from 'element-plus';
import { getDatas, uploadData } from '@/api'
const uploadRef = ref<UploadInstance>()

//中间echarts1
const chart = ref<HTMLElement | null>(null);
const fileList = ref([])

const source = ref(0)
const outputValue = useTransition(source, {
  duration: 1500,
})
source.value = 172000
// import {tableData} from '@/utils/Sentdata'
const chartContainer = ref<HTMLElement | null>(null);
const chartDom = ref<HTMLElement | null>(null);
const chartDom2 = ref<HTMLElement | null>(null);
components: { ElButton, ElInput };
const radio1 = ref('true')
const userData = localStorage.getItem("userId");


onMounted(() => {
  if (chartContainer.value) {
    initAndUpdateChart(chartContainer.value);
  };
  if (chartDom.value) {
    InitChart1(chartDom.value)
  };
  if (chartDom2.value) {
    InitChart2(chartDom2.value)
  }
  setTimeout(() => {
    updateList()
  }, 1000);

  fetchgetDatas()
})

var ids = [];
// function GetId(){
//   for(var i=0;i<tableData.length;i++){
//    ids.push(tableData1[i].id)
//   }
// }


const reportTable = ref()

const tableData: any[] = []

for (let i = 0; i < data.length; i++) {
  tableData.push(data[i])
}
let scrollHeight = 0
let currentScrollTop = 0
let maxScrollTop = 0
let timeInter: number | null | undefined = null
let timeInter2: number | null | undefined = null
const tableNode = ref(null)

function updateList() {
  // 数据大于3条才会滑动
  if (tableData && tableData.length > 3) {
    // 获取滑动区域DOM 最新版本的element-plus节点有变化, 此版本为1.2.0-beta.3
    tableNode.value = reportTable.value.$refs.bodyWrapper.getElementsByClassName('el-scrollbar__wrap')[0]    // 设置每次滑动几行
    scrollHeight = tableNode.value.querySelectorAll('tr')[0].offsetHeight * 6
    // 设置每次滑动的PX和滑动区域的高度
    tableNode.value.style.height = `${scrollHeight}px`
    // 获取最大滑动空间
    maxScrollTop = tableNode.value.firstElementChild.offsetHeight - scrollHeight
    // 开始
    restTimeInter()
  }
}

function restTimeInter() {
  // 清除所有定时器
  clearAllInterval()
  // 设置定时器
  timeInter = setInterval(setMultiLine, 8000)
}
function clearAllInterval() {
  clearInterval(timeInter)
  clearInterval(timeInter2)
}
function setScrollTop() {
  tableNode.value.scrollTop++
  if (tableNode.value.scrollTop >= currentScrollTop) { // 达到下次应该滑动的位置
    clearInterval(timeInter2)
  }
  if (tableNode.value.scrollTop > maxScrollTop) { // 滑到底了
    tableNode.value.scrollTop = maxScrollTop
    clearInterval(timeInter2)
  }
}
function setMultiLine() {
  // 下次应该滑到哪
  currentScrollTop = (tableNode.value.scrollTop || 0) + scrollHeight + currentScrollTop % scrollHeight
  if (tableNode.value.scrollTop >= maxScrollTop) { // 滑完了 重置
    currentScrollTop = 0
    tableNode.value.scrollTop = 0
    restTimeInter()
  } else {
    // 清除上一个定时器
    clearInterval(timeInter2)
    // 开始滑
    timeInter2 = setInterval(setScrollTop, 5)
  }
}


//侧边框
import type { TabsPaneContext } from 'element-plus'
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

// 上传数据填写表单//上传显示与否
import type { FormProps } from 'element-plus'
const Fillable = ref(false)
const showUpload = ref(true)

const ShowForm = () => {
  setTimeout(() => {
    ShowLoading().then(() => {
      Fillable.value = true;
      showUpload.value = false
    })
  }, 1000)
}

//RUleForm
interface RuleForm {
  Key: string,
  Detail: string
}
//上传表单之后复原
import ElLoading from 'element-plus'
import { table } from 'console'

const Reback = (action: string): void => {
  if (action == 'submit') {
    ShowLoading().then(() => {
      // ShowLoading 执行完成后，执行以下代码
      Fillable.value = false;
      showUpload.value = true;
      // 如果需要，这里也可以调用一个隐藏加载状态的方法
      // HideLoading();  // 假设你有一个方法来停止显示加载指示

      // 这里可以继续执行任何需要在加载完成后运行的代码
      formLabelAlign.id = '',
        formLabelAlign.name = ''
      upload();
      open2();

    }).catch((error) => {
      console.error("ShowLoading encountered an error:", error);
      // 处理错误情况，比如隐藏加载状态，显示错误消息等
    });
  }
  if (action == 'cancel') {
    CancelLoading().then(() => {
      Fillable.value = false;
      showUpload.value = true;
      formLabelAlign.id = '',
        formLabelAlign.name = ''
      open3()
    })
  }
};
//上传成功
const open2 = () => {
  ElMessage({
    message: '提交数据成功',
    type: 'success',
  })
}

//取消上传
const open3 = () => {
  ElMessage({
    message: '取消上传成功',
    type: 'warning',
  })
}
// const RebackOnly=()=>{
//   Fillable.value=false;
//   showUpload.value=true;
// }

const fetchUpload = async (file) => {
  await uploadData({
    file,
    userId: localStorage.getItem("userId")
  })
}

// 上传数据
const upload = (item) => {
  fetchUpload(item.file)
  console.log("调用上传函数")
}

const labelPosition = ref<FormProps['labelPosition']>('right')

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
});
const tableData1 = ref([]);
const fetchgetDatas = async () => {
  const res = await getDatas(localStorage.getItem('userId'));
  tableData1.value = res;
}

const selectedRowData = ref([]);
function showDetails(rowData: tableData1) {
  selectedRowData.value = rowData;
  drawer.value = true; // 假设您已经有一个名为 drawer 的响应式变量来控制 el-drawer 的显示
}

const selectedRowData9 = ref([]);
function showDetails9(rowData: tabelData1) {
  selectedRowData9.value = rowData;
  drawer9.value = true; // 假设您已经有一个名为 drawer 的响应式变量来控制 el-drawer 的显示
}
</script>
<template>
  <Header title="数据管理" />

  <div style="position:absolute;top:550px;left:240px">收入概况</div>
  <div class="title1" style="position: absolute;left:46%;top:520px">历史上传数据</div>
  <!-- 历史上传数据 -->
  <div class="historicalData" style="padding:20px;">
    <el-table :data="tableData1" style="height: 89%;position:absolute;top:30px;width:450px"
      :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ textAlign: 'center', padding: '10px' }">
      <el-table-column prop="time" label="上传日期" width="190px"></el-table-column>
      <el-table-column prop="keyword" label="数据关键词"></el-table-column>
      <el-table-column label="详情">
        <template #default="scope">
          <el-button tag="a" style="border-width: 0cap;border-radius: 4px;background-color: transparent;"
            class="DetailButton" @click="showDetails9(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- drawer展示 -->
  <el-drawer v-model="drawer9" title="数据详情" :direction="direction">
    <div v-if="selectedRowData9" style="color:black">
      <!-- <h3>{{ selectedRowData.date }}</h3>
  <p>{{ selectedRowData.dataDtail }}</p> -->
      <!-- <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" style="position: absolute;top:100px">
    <el-tab-pane label="绑定hash值" name="Third">{{ selectedRowData9.hash}}</el-tab-pane>
    <el-tab-pane label="数据基本情况" name="first">{{ selectedRowData9.keyword }}</el-tab-pane>
    <el-tab-pane label="数据id" name="second">{{selectedRowData9.id}}</el-tab-pane>
  </el-tabs> -->
      <h5>{{ selectedRowData9.detail }}</h5>
    </div>
  </el-drawer>

  <!-- 上传文件 -->
  <div class="uploaddiv" v-if="showUpload">
    <el-upload 
    ref="uploadRef" 
    class="upload-demo" 
    drag multiple  
    @change="ShowForm()"
    :auto-upload="false"
    :file-list="fileList"

    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text" style="color:white;width:100px;position:absolute;left:40%;">
        拖拽或<em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip" style="color:white">
          点击/拖拽 上传数据
        </div>
      </template>
    </el-upload>
  </div>

  <!-- 点击上传弹出填写内容 -->
  <div class="inputForm" v-if="Fillable"
    style="position:absolute;left:37%;top:200px;width:29%;height: 240px;background-color: rgba(10,193,199,0.1);border-top:1px dashed var(--el-border-color);border-right: 1px dashed var(--el-border-color);border-bottom:1px dashed var(--el-border-color);border-left: 1px dashed var(--el-border-color);border-radius: 10px;">

    <div style="margin: 20px" />
    <el-form :label-position="labelPosition" label-width="auto" :model="formLabelAlign" style="max-width: 600px;">
      <el-form-item label="数据关键词" style="color: aliceblue;position: absolute;left:10%;width:80%" class="First">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="数据详情" class="Second" size="large" style="position: absolute;left:10%;top:30%;width:80%">
        <el-input type="textarea" v-model="formLabelAlign.id" />
      </el-form-item>
    </el-form>
    <el-button style="position:absolute;left:80%;top:80%" @click="Reback('submit')">提交</el-button>
    <!-- <el-button  style="position:absolute;left:50%;top:80%" @click="Reback('cancel')">取消上传</el-button> -->
  </div>
  <!-- echarts中间图 -->
  <!-- <div ref="chartDom2" style="position:absolute;left:530px;width:440px;height:400px;top:130px;"></div> -->
  <!-- echarts图折线加柱状图 -->
  <div ref="chartDom" style="position:absolute;top:59%;left:20px;width:500px;height:340px;"></div>

  <!-- 已租出数据使用情况 -->
  <div class="alarm-infoList">
    <div style="position:absolute;left:78%;top:17%;">已租出数据使用情况</div>
    <el-table ref="reportTable" :data="tableData" style="position:absolute;left:67%;top:21%;width: 30%;height:36%;"
      :row-class-name="tableRowClassName" :cell-style="{ textAlign: 'center', padding: '1px;' }"
      :header-cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="index" label="序号" :key="tableData.id" />
      <el-table-column prop="dataDtail" label="数据" width="110px" />
      <el-table-column prop="usedTime" label="使用次数" />
      <el-table-column prop="createTime" label="使用时间" width="160px" />
      <!-- <el-table-column prop="state" label="状态"/> -->
    </el-table>
  </div>

  <!-- 全部数据 -->
  <div class="left">
    <div class="Datastate" style="position:absolute;top:20px;left:45%;">全部数据</div>
    <el-table :data="tableData1" :default-sort="{ prop: 'date', order: 'descending' }" height="290"
      style="--el-table-border-color:none;position:absolute;width: 100%;left:-14px;top:70px;border-radius: 3%"
      :header-cell-style="{ background: 'transparent', 'text-align': 'center' }"
      :cell-style="{ textAlign: 'center', padding: '2px;' }">

      <el-table-column prop="time" label="上传时间" width="200" />
      <!-- <el-table-column prop="name" label="Name" width="130" /> -->
      <el-table-column prop="keyword" label="数据关键词" width="123" />

      <el-table-column fixed="right" label="详情">
        <template #default="scope">
          <el-button tag="a" style="border-width: 0cap;border-radius: 4px;background-color: transparent;"
            class="DetailButton" @click="showDetails(scope.row)">查看详情</el-button>
        </template>

      </el-table-column>
      <!-- 选择更新的插槽 -->
      <el-table-column fixed="right" label="选择更新">
        <template #default="scope">
          <el-upload ref="upload" class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1" :auto-upload="true"
            :cell-style="{ textAlign: 'center', margin: 'px', height: '32px' }">
            <template #trigger>
              <el-button type="primary"
                style="border-width: 0cap;border-radius: 4px;background-color: transparent;font-family: '微软雅黑';"
                class="DetailButton">更新数据</el-button>
            </template>
          </el-upload>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-drawer v-model="drawer" title="数据详情" :direction="direction">
    <div v-if="selectedRowData" style="color:black">

      <!-- <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" style="position: absolute;top:100px">
    <el-tab-pane label="hash值" name="Third">{{ selectedRowData.hash }}</el-tab-pane>
    <el-tab-pane label="数据基本情况" name="second">{{ selectedRowData.detail }}</el-tab-pane>
    <el-tab-pane label="数据id" name="first">{{selectedRowData.id}}</el-tab-pane>
  </el-tabs> -->
      <h5>{{ selectedRowData9.detail }}</h5>
    </div>
  </el-drawer>


  <div style="position:absolute;left:76%;top:520px">数据实时使用情况</div>
  <div ref="chartContainer" class="chart-container" style="position:absolute;left:67%;top:59%;width:30%; height: 40%;">
  </div>

  <div class="statistic1" style="position:absolute;left:6%;top:12%;width:500px;color:rgba(10,193,199)">已绑定数据量:</div>
  <div claas="content1" style="position:absolute;left:15%;top:11%;color:#f29701;font-size:30px;">268500</div>

  <div class="statistic1" style="position:absolute;left:28%;top:12%;width:500px;color:rgba(10,193,199)">待绑定数据量:</div>
  <div claas="content1" style="position:absolute;left:37%;top:11%;color:#f29701;font-size:30px;">2390</div>

  <div class="statistic1" style="position:absolute;left:49%;top:12%;width:500px;color:rgba(10,193,199)">已租出数据量:</div>
  <div claas="content1" style="position:absolute;left:58%;top:11%;color:#f29701;font-size:30px;">2390</div>

  <div class="statistic1" style="position:absolute;left:72%;top:12%;width:300px;color:rgba(10,193,199)">数据收入:</div>
  <div claas="content1" style="position:absolute;left:78%;top:11%;color:#f29701;font-size:30px;">2390 元</div>

</template>


<style lang="less" scoped>
@import '../assets/css/animation.less'; // 引入动画

.inputForm {
  :deep(.el-form-item__label) {
    color: aliceblue !important;
  }
}

.historicalData {
  width: 450px;
  position: absolute;
  left: 34.5%;
  top: 59%;
  height: 302px;
  background-color: rgba(10, 193, 199, 0.1);

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

.uploaddiv {
  height: 550px;
  position: absolute;
  top: 12%;
  left: 35%;
  width: 29%;

  .upload-demo {

    position: absolute;
    top: 20%;
    left: 0%;
    width: 100%;
    background-color: transparent;

    ::v-deep .el-upload {
      --el-upload-dragger-padding-horizontal: 80px;
      --el-upload-dragger-padding-vertical: 200px;
    }

    ::v-deep .el-upload-dragger {
      background-color: rgba(10, 193, 199, 0.1);
    }

    :deep .el-upload-list__item-name {
      color: white
    }
  }
}


.img {
  display: block;
  // margin:200px auto;
  -webkit-animation: rotation 1s linear infinite;
  animation: rotation 1s linear infinite;
}

.buttons {
  position: absolute;
  left: 350px;
  top: 540px;

  .zoom-image {
    position: absolute;
    left: 202px;
    top: 62px;
    transform-origin: center;
    animation: zoom-animation 2s infinite ease-in-out;
  }

  .zoom-image2 {
    position: absolute;
    left: 202px;
    top: 62px;
    transform-origin: center;
    animation: zoom-animation1 2s infinite ease-in-out;
  }

  .bg {
    background: no-repeat;
    background: url("/assets/image/circle2.png") no-repeat;
    width: 104px;
    height: 104px;
    top: 600px;
    left: 70px;
  }

  .secondbg {
    background: url("/assets/image/circle2.png") no-repeat;
    width: 104px;
    height: 104px;
    position: absolute;
    left: 200px;
    top: 60px;
  }

  .bg:hover {
    background: url("/assets/image/circle1.png");
  }

  .secondbg:hover {
    background: url("/assets/image/circle1.png");
  }
}

.left {
  padding: 15px;
  box-sizing: border-box;
  position: absolute;
  left: 10px;
  width: 550px;

  .option {
    position: absolute;
    top: 100px;
    left: 360px;
  }

  :deep(.cell) {
    height: 42px;
    ;
  }

  :deep(.el-table) {
    .el-table__cell {
      padding: 1px;
    }

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

.Datastate {
  position: absolute;
  top: 100px;
  left: 190px;
}

.alarm-infoList {
  padding: 15px;
  box-sizing: border-box;

  :deep(.el-table) {
    background-color: transparent;
    color: #fff;

    .active-row {
      color: rgb(255, 255, 255);
    }

    .inactive-row {
      color: red;
    }

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