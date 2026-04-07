<script setup lang='ts'>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { getConnOptions, weekTokenOptions } from '@/utils/Options';
import { Header } from '@/components'
import { ElMessage } from 'element-plus'
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import { getTokenHistory, getNFTCount, getSBTCount, getNFTSuccessRate, getSBTSuccessRate, publish } from '@/api';

// 绘制echarts图
use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const tokenOptions = ref({});
const weekOptions = ref(weekTokenOptions);
const nftCount = ref(0);
const sbtCount = ref(0);
const nftSuccessRate = ref(0);
const sbtSuccessRate = ref(0);
const historyData = ref([]);
const dialogFormVisible = ref(false);
const form = ref({
  name: '',
  detail: '',
  price: ''
})
const name = ref('') // 准备出售的代币
const isSell = ref(0) // 0 出售 1 出租

// is: 0 出售 1 出租
const handleClick = async (is) => {
  dialogFormVisible.value = true;
  isSell.value = is;
}

const submit = async () => {
  dialogFormVisible.value = false;
  if (!form.value.price) {
    ElMessage({
      message: '请填写完整信息',
      type: 'error'
    });
    return;
  }
  publish({
    tokenId: name.value,
    type: isSell.value,
    keyword: form.value.name,
    detail: form.value.detail,
    price: form.value.price
  }).then(res => {
    if (res !== 'success') {
      ElMessage({
        message: res,
        type: 'error'
      });
    } else {
      ElMessage({
        message: `${isSell.value === 0 ? '出售' : '出租'}成功`,
        type: 'success',
      });
      name.value = '';
    }
  })

}

const selectToken = (e) => {
  if (e.data.source || e.data.category === 0) {
    return;
  }
  if (e.data.category === 1) {
    // 选择相同返回
    if (name.value === e.data.name.id) {
      return;
    }
    name.value = e.data.name.id;
  }
  else if (e.data.category === 2) {
    // 选择相同返回
    if (name.value === e.data.name) {
      return;
    }
    name.value = e.data.name;
  }
  ElMessage({
    message: `您选中了ID为${name.value}的代币，可右键查看详情或出售。`,
    type: 'success',
  });
}

const fetchData = async () => {
  // 获取代币关系图
  tokenOptions.value = await getConnOptions();
  // 获取代币历史记录
  const tokenHistory = await getTokenHistory(localStorage.getItem('userId'));
  for (let i = 0; i < tokenHistory.length; i++) {
    historyData.value.push({
      time: new Date(tokenHistory[i].time).toLocaleString(),
      type: tokenHistory[i].type,
      issuccess: tokenHistory[i].issuccess ? '成功' : '失败',
      msg: tokenHistory[i].msg ? tokenHistory[i].msg : '/'
    });
  }
  // 获取代币数量
  nftCount.value = await getNFTCount(localStorage.getItem('userId'));
  sbtCount.value = await getSBTCount(localStorage.getItem('userId'));
  // 获取代币成功率
  nftSuccessRate.value = await getNFTSuccessRate(localStorage.getItem('userId'));
  sbtSuccessRate.value = await getSBTSuccessRate(localStorage.getItem('userId'));
}

onMounted(() => {
  fetchData();
  const conn = document.getElementsByClassName('connMap')[0];
  const rightMenu = document.getElementById('rightMenu');
  conn.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    // 未选中代币
    if (!name.value) {
      return;
    }
    rightMenu.style.display = 'block';
    rightMenu.style.left = e.clientX + 'px';
    rightMenu.style.top = e.clientY + 'px';
  });
  document.addEventListener('click', () => {
    rightMenu.style.display = 'none';
  });
});

</script>

<template>
  <Header title="我的代币" />

  <div class="conn">
    <div class="title">代币关系展示图</div>
    <div class="connBg" />
    <v-chart ref="conn" @click="selectToken" class="connMap" :option="tokenOptions" autoresize />
    <!-- 树状图解释说明 -->
    <div class="connExplain">
      <div class="connExplainItem">
        <div class="connExplainItemColor" style="background-color: #5470c6;"></div>
        <span>我的账户</span>
      </div>
      <div class="connExplainItem">
        <div class="connExplainItemColor" style="background-color: #9fe080;"></div>
        <span>SBT</span>
      </div>
      <div class="connExplainItem">
        <div class="connExplainItemColor" style="background-color: #fac858;"></div>
        <span>NFT</span>
      </div>
    </div>
    <!--右键弹出菜单-->
    <div id="rightMenu" style="display: none;">
      <button @click="handleClick(0)">出售</button>
      <button @click="handleClick(1)">出租</button>
      <!-- <router-link style="text-decoration: none;" :to="`/dataDetail/${name}/${1}`"> -->
      <router-link style="text-decoration: none;" :to="`/dataDetail/1785572280329895937/${1}`">
        <button>查看详情</button>
      </router-link>
    </div>
    <!-- 数据描述 -->
    <el-dialog v-model="dialogFormVisible" title="数据描述" width="400" style="position: absolute;top:100px;left:450px">
      <el-form :model="form">
        <el-form-item label="关键词" label-width="80px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item><el-form-item label="详细描述" label-width="80px">
          <el-input v-model="form.detail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="80px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <a @click="dialogFormVisible = false;"
            style="border-width: 0;color:gray;cursor: pointer;margin-right: 13px;">取消</a>
          <a @click="dialogFormVisible = false; submit()" style="border-width: 0;color:gray;cursor: pointer;">提交</a>
        </div>
      </template>
    </el-dialog>
  </div>

  <div class="number">
    <div class="list">
      <ul>
        <li>
          <div class="detail" id="detail">{{ nftCount }}</div>
          <span>总申请NFT个数</span>
        </li>
        <li>
          <div class="detail">{{ sbtCount }}</div>
          <span>总申请SBT个数</span>
        </li>
        <li>
          <div class="detail">{{ Math.round(nftSuccessRate * 100) }}%</div>
          <span>申请NFT成功率</span>
        </li>
        <li>
          <div class="detail">{{ Math.round(sbtSuccessRate * 100) }}%</div>
          <span>申请SBT成功率</span>
        </li>
      </ul>
    </div>
  </div>

  <div class="table">
    <div class="title">代币申请历史</div>
    <el-table :data="historyData">
      <el-table-column prop="time" label="时间" width="200" align="center" />
      <el-table-column prop="type" label="申请代币类型" width="150" align="center" />
      <el-table-column prop="issuccess" label="申请结果" width="150" align="center" />
      <el-table-column prop="msg" label="原因" align="center" />
    </el-table>
  </div>

  <div class="line">
    <div class="title">本周代币申请情况</div>
    <v-chart class="lineMap" :option="weekOptions" autoresize />
  </div>
</template>

<style lang="less" scoped>
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

// 旋转动画
@keyframes myfirst {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes myfirst2 {
  0% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

// 引入字体
@font-face {
  font-family: 'DS-DIGIT';
  src: url('../assets/fonts/DS-DIGIT.TTF');
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

.conn {

  .connBg {
    width: 45%;
    height: 80%;
    position: absolute;
    top: 18%;
    left: 2%;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
  }

  .connExplain {
    position: absolute;
    top: 20%;
    left: 3%;
    display: flex;
    justify-content: space-between;
    font-size: 15px;

    .connExplainItem {
      display: flex;
      align-items: center;
      margin-right: 1rem;

      .connExplainItemColor {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin-right: .5rem;
      }
    }
  }

  .connMap {
    pointer-events: all;
    width: 45%;
    height: 78%;
    position: absolute;
    top: 20%;
    left: 2%;
  }

  #rightMenu {
    position: absolute;
    width: 4rem;
    height: 5rem;
    background-color: #fff;
    border-radius: .3rem;
    box-shadow: 0 0 5px #000;
    z-index: 999;
    padding: 0;

    button {
      width: 100%;
      height: 33.3%;
      border: none;
      border-radius: .3rem;
      background-color: transparent;
      cursor: pointer;
      font-size: .8rem;
      color: rgba(0, 0, 0, 0.8);
      text-align: center;
      line-height: 1.5rem;
      transition: background-color .3s;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
}

.number {
  position: absolute;
  top: 12%;
  left: 44%;

  .list {
    ul {
      list-style: none;

      li {
        float: left;
        width: 50%;
        padding: 10px 0;
        text-align: center;

        .detail {
          width: 100px;
          height: 100px;
          margin: 0 auto 5px auto;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
          color: #f29701;
          font-family: DS-DIGIT;
        }

        .detail:before {
          position: absolute;
          width: 100%;
          height: 100%;
          content: "";
          background: url(/assets/image/img1.png) center center;
          border-radius: 100px;
          background-size: 100% 100%;
          opacity: .5;
          left: 0;
          top: 0;
          animation: myfirst2 15s infinite linear;
        }

        .detail:after {
          position: absolute;
          width: 86%;
          background: url(/assets/image/img2.png) center center;
          border-radius: 100px;
          background-size: 100% 100%;
          opacity: .5;
          height: 86%;
          content: "";
          left: 7%;
          top: 7%;
          animation: myfirst 15s infinite linear;
        }

        span {
          opacity: .8;
          font-size: 14px;
        }
      }
    }
  }
}

.table {
  position: absolute;
  top: 50%;
  left: 45%;
  background-color: transparent;
  width: 50%;

  :deep(.el-table) {
    background-color: transparent;
    margin-left: 2.2rem;
    color: #fff;
    width: 100%;
    height: 19.6rem;

    th {
      background-color: transparent;
    }

    tr {
      color: #fff;
      background-color: transparent;
      height: 2.8rem;

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

.line {
  position: absolute;
  top: 15%;
  right: 20%;

  .lineMap {
    width: 25rem;
    height: 16rem;
    position: absolute;
    left: 10%;
  }
}
</style>
