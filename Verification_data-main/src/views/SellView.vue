<script lang='ts'>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Header } from '@/components'
import { ElMessage } from 'element-plus'
import { Search, ChatLineRound, CloseBold } from '@element-plus/icons-vue'
import { getHotDatas, getStore, transaction } from '@/api'
import axios from 'axios'

export default {
  setup() {
    const router = useRouter()
    const popularData = ref([])
    const searchData = ref('')
    const message = ref('')
    const dataList = ref([])
    const displayDataList = ref([])
    const selectedDataList = ref([])
    
    const messageList = ref([
      {
        type: 'service',
        content: '您可以描述您想要的数据，我们会为您推荐。'
      }
    ])
    const type = ref('')
    const options = [
      {
        value: 'name',
        label: '名称',
      },
      {
        value: 'userid',
        label: '用户',
      },
      {
        value: 'keyword',
        label: '标签',
      },
      {
        value: 'detail',
        label: '描述',
      }
    ]
    const sellOrRent = ref('')
    const price = ref([0, 1000])
    const size = ref([0, 100])

    const clear = () => {
      sellOrRent.value = ''
      type.value = ''
      price.value = [0, 1000]
      size.value = [0, 1000]
      displayDataList.value = dataList.value
      selectedDataList.value = dataList.value
    }

    const fetchData = async () => {
      popularData.value = await getHotDatas();
      dataList.value = await getStore();
      displayDataList.value = dataList.value;
      selectedDataList.value = dataList.value;
    }

    // const sendMessage = async ()=>{
    //   //DS调用返回
    // // 调用 API 接口进行文件上传
    // const response = await axios({
    //       url: 'http://47.95.32.149:5000/gpt',  // 后端接口地址
    //       method: 'post',
    //       data: formData,  // 传递 FormData 数据
    //       headers: {
    //         'Content-Type': 'multipart/form-data',  // 告诉服务器数据是文件上传格式
    //       },
    //     }).then((response =>{

    //     }))
    // }
    
    // 购买
    const buy = async (data,id) => {
      //如果数据是特殊数据，则不能直接购买
      if(data.type==='2'){
        router.push(`/specialData/${id}/${0}`)
        ElMessage({
        message: '请联系卖方达成协议',
        type: 'info',
      })
      }else{
        await transaction(id, localStorage.getItem('userId'));
        ElMessage({
        message: '购买成功',
        type: 'success',
      })
      }
      
    }

    const handlerBuy = (data,id) => {
      // 阻止冒泡
      event.stopPropagation()
      buy(data,id);
      
      displayDataList.value = displayDataList.value.filter(item => item.id !== id)
      selectedDataList.value = selectedDataList.value.filter(item => item.id !== id)
      dataList.value = dataList.value.filter(item => item.id !== id)
    }

    const search = () => {
      // 如果搜索字段为空时，展示所有数据
      if (!searchData.value) {
        return
      }
      // 搜索类型为空时筛选所有
      if (!type.value) {
        displayDataList.value = dataList.value.filter(item => {
          // 先从标签中筛选
          for (const keyword of item.keyword) {
            if (keyword && keyword.includes(searchData.value)) {
              return true
            }
          }
          // 再从name,userid,detail中筛选
          return item.name && item.name.includes(searchData.value) || item.userid.includes(searchData.value) || item.detail && item.detail.includes(searchData.value)
        })
        searchData.value = ''
        selectedDataList.value = displayDataList.value
        return
      }

      // 如果筛选的是标签，需要遍历标签数组
      if (type.value === 'keyword') {
        displayDataList.value = dataList.value.filter(item => {
          for (const keyword of item[type.value]) {
            if (keyword.includes(searchData.value)) {
              return true
            }
          }
          return false
        })
        searchData.value = ''
        selectedDataList.value = displayDataList.value
        return
      }
      displayDataList.value = dataList.value.filter(item => item[type.value].includes(searchData.value))
      selectedDataList.value = displayDataList.value
      searchData.value = ''
    }

    const selectSellOrRent = () => {
      if (sellOrRent.value === '仅出售') {
        selectedDataList.value = displayDataList.value.filter(item => item.type === '0')
      } else if (sellOrRent.value === '仅出租') {
        selectedDataList.value = displayDataList.value.filter(item => item.type === '1')
      }else if (sellOrRent.value === '特殊数据') {
        selectedDataList.value = displayDataList.value.filter(item => item.type === '2')
      }
    }

    const selectPrice = () => {
      selectedDataList.value = displayDataList.value.filter(item => item.price >= price.value[0] && item.price <= price.value[1])
    }

    const selectSize = () => {
      selectedDataList.value = displayDataList.value.filter(item => item.size >= size.value[0] && item.size <= size.value[1])
    }

    const sendMessage = async () => {
      if (!message.value) {
        ElMessage({
          message: '请输入内容',
          type: 'warning',
        })
        return;
      }
      messageList.value.push({
        type: 'user',
        content: message.value
      })

      const userInput = message.value
      message.value = ''
    
      try{
        const res = await axios.post('http://47.95.32.149:5000/aimessage',
          {
            userId:localStorage.getItem("userId"),
            data:userInput
          }
        );
        console.log("res:",res)
        const reply = res.data;
        console.log("调用123")
         // 添加 AI 回复到列表
        messageList.value.push({
          content: reply,
          type: 'service'
        });
      }catch (error) {
        console.error('发送失败', error);
        messageList.value.push({
          content: '发送失败，请稍后重试。',
          type: 'service'
        });
      }
    }

    const goToDetail = (data,id) => {
      // 如果得到的id的数据类型是特殊数据，就不跳转到该页面，而是跳转到数据详情页
      
      console.log("data:",data.type)
      if(data.type === '2'){
        //跳转到特殊数据的页面
        router.push(`/specialData/${id}/${0}`)
      }else{
         router.push(`/dataDetail/${id}/${0}`)
      }
     
    }
    
    onMounted(() => {
      fetchData();
    })
    return {
      popularData,
      searchData,
      message,
      dataList,
      displayDataList,
      selectedDataList,
      messageList,
      type,
      options,
      sellOrRent,
      price,
      size,
      clear,
      handlerBuy,
      search,
      selectSellOrRent,
      selectPrice,
      selectSize,
      sendMessage,
      goToDetail,
      Search,
      ChatLineRound,
      CloseBold,
      
    }
  }
}

</script>
<template>
  <Header title="数据流通" />
  <router-link style="text-decoration: none;" to="/myMarket">
    <h4 class="blockchain btn">查看历史记录</h4>
  </router-link>
  <div class="select">
    <el-select class="type" v-model="type" filterable placeholder="选择" size="large">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-input class="input" v-model="searchData" placeholder="搜索" :prefix-icon="Search" size="large"
      @keyup.enter.native="search();" />
    <el-radio-group v-model="sellOrRent" size="large" @change="selectSellOrRent">
      <el-radio-button label="仅出售" value="onlySell" />
      <el-radio-button label="仅出租" value="onlyRent" />
      <el-radio-button label="特殊数据" value="special"/>
    </el-radio-group>
    <span style="font-weight: bold;">价格</span>
    <el-slider class="slider" v-model="price" range :min="0" :max="1000" :step="10" show-stops @change="selectPrice" />
    <span>元</span>
    <span style="font-weight: bold;">数据量</span>
    <el-slider class="slider" v-model="size" range :min="0" :max="100" :step="1" show-stops @change="selectSize" />
    <span>MB</span>
    <el-tooltip content="清除筛选" placement="top">
      <el-button type="primary" :icon="CloseBold" circle @click="clear" style="margin-left: 5px;" />
    </el-tooltip>
  </div>

  <!-- 数据列表展示区 -->
  <main>
    <el-card shadow="hover" v-for="data in selectedDataList" :key="data.id" @click="goToDetail(data,data.id)">
      <template #header>
        <span>{{ data.name ? data.name : "测试" }}</span>
        <el-button style="float: right;" type="primary" @click="handlerBuy(data,data.id)">购买</el-button>
      </template>
      <div>
        <el-tag style="margin-right: 10px;" effect="dark">{{ data.type === '2' ? '特殊数据' : (data.type === '1' ? '出租' : '出售') }}</el-tag>
        <el-tag style="margin-right: 10px;" v-for="keyword in data.keyword" :key="keyword">{{ keyword }}</el-tag>
      </div>
      <div class="detail">
        <p>出售用户：{{ data.userid }}</p>
        <p>数据量：{{ data.size }}MB</p>
        <p>价格：{{ data.price }}元</p>
        <p>数据描述：{{ data.detail ? data.detail : "测试" }}</p>
      </div>
    </el-card>
  </main>

  <div class="table">
    <div class="title">热门数据</div>
    <el-table :data="popularData">
      <el-table-column prop="name" label="名称" align="center" />
      <el-table-column prop="id" label="编号" width="180" align="center" />
      <el-table-column prop="userid" label="目前拥有用户" width="180" align="center" />
    </el-table>
  </div>

  <!-- 在线客服 -->
  <div class="chat">
    <el-card shadow="hover">
      <template #header>在线客服</template>
      <div class="main">
        <div class="message" v-for="item in messageList" :key="index">
          <div class="dialog" :class="item.type">
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
      <div class="input-area">
        <el-input class="input" v-model="message" placeholder="请输入" :prefix-icon="ChatLineRound" size="large"
          @keyup.enter.native="sendMessage" />
        <el-button class="submit" type="primary" @click="sendMessage">发送</el-button>
      </div>
    </el-card>
  </div>
</template>
<style lang="less" scoped>
// 通用按钮
.btn {
  cursor: pointer;
  border-radius: 8%;
  z-index: 3;
  margin: .5rem 1.5rem;
  position: absolute;
  top: 4.5rem;
  right: .5rem;
  padding: .4rem;
  letter-spacing: 0.1rem;
  background-color: rgba(255, 255, 255, 0.2);
  color: #32e3f9;
}

.btn:hover {
  background-color: rgba(255, 255, 255, 0.4);
}

.select {
  margin: 0 0 20px 50px;
  display: flex;
  align-items: center;

  .type {
    width: 80px;
    margin-right: 5px;
  }

  .input {
    width: 180px;
    margin-right: 5px;
  }

  span {
    margin: 0 5px;
    font-size: 14px;
  }

  .slider {
    width: 150px;
    margin: 0 8px 0 15px;
  }
}

main {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-content: start;
  margin-left: 2%;
  overflow: auto;
  height: 80%;
  /* Firefox */
  scrollbar-width: none;
  /* IE and Edge */
  -ms-overflow-style: none;
  width: 65%;

  .el-card {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: none;
    width: 30%;
    margin: 1% 1.5%;
    max-height: 260px;
    cursor: pointer;

    .detail {
      font-size: 15px;
      margin-top: 5px;

      p {
        margin: 0;
        padding: 5px 0;
      }
    }
  }

}

// 跳动动画
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
  right: 4%;
  background-color: transparent;
  width: 30%;

  :deep(.el-table) {
    background-color: transparent;
    margin-left: 2.2rem;
    color: #fff;
    width: 100%;
    height: 16.5rem;

    th {
      background-color: transparent;
    }

    tr {
      color: #fff;
      background-color: transparent;
      height: 50px;

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

.chat {
  position: absolute;
  bottom: 1%;
  right: 1%;
  width: 31%;
  height: 45%;

  .el-card {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: none;
    margin: 1%;
    height: 100%;

    .main {
      overflow: auto;
      height: 240px;
      /* Firefox */
      scrollbar-width: none;
      /* IE and Edge */
      -ms-overflow-style: none;
      margin-bottom: 10px;

      .message {
        width: 96%;

        .dialog {
          position: relative;
          display: inline-block;
          padding: 10px;
          max-width: 90%;
          color: #555;
          font-size: 16px;
        }

        .service {
          margin: 20px 0 5px 15px;
          background: #e0f2ff;
        }

        .service:before {
          content: "";
          position: absolute;
          top: 50%;
          left: -28px;
          margin-top: -15px;
          border: 15px solid transparent;
          border-right: 15px solid #e0f2ff;
        }

        .user {
          float: right;
          clear: both;
          margin: 20px 15px 0 0;
          background: #409eff;
          color: #fff;
        }

        .user:before {
          content: "";
          position: absolute;
          top: 50%;
          left: 100%;
          margin-top: -15px;
          border: 15px solid transparent;
          border-left: 15px solid #409eff;
        }

        p {
          margin: 0;
          padding: 0;
        }
      }
    }

    .input-area {
      display: flex;
      align-items: center;
      justify-content: center;

      .input {
        height: 45px;
        margin-bottom: 1%;
      }

      .submit {
        height: 45px;
        margin-left: 5px;
        margin-bottom: 1%;
      }
    }
  }

}
</style>
