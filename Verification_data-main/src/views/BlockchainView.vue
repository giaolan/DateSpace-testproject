<script setup lang='ts'>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { Header } from '@/components'
import { blockOptions, blockSizeOptions } from '@/utils/Options'
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import { DArrowRight } from '@element-plus/icons-vue'
import { connectBlockchain } from '@/api';

// 绘制echarts图
use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const blockchainOptions = ref(blockOptions)
const sizeOptions = ref(blockSizeOptions)
const transactionOptions = ref(blockSizeOptions)

onMounted(() => {
  connectBlockchain()
})

</script>
<template>
  <Header title="区块链浏览器" />
  <div class="index">
    <ul>
      <li>
        <b class="animation-1"></b><b class="animation-2"></b><b class="animation-3"></b>
        <strong>5649845</strong>
        <p>区块链节点数</p>
      </li>
      <li>
        <b class="animation-1"></b><b class="animation-2"></b><b class="animation-3"></b>
        <strong>45616548</strong>
        <p>今日交易数</p>
      </li>
      <li>
        <b class="animation-1"></b><b class="animation-2"></b><b class="animation-3"></b>
        <strong>$4236.32</strong>
        <p>交易数额</p>
      </li>
      <li>
        <b class="animation-1"></b><b class="animation-2"></b><b class="animation-3"></b>
        <strong>174.62GB</strong>
        <p>区块链大小</p>
      </li>
      <li>
        <b class="animation-1"></b><b class="animation-2"></b><b class="animation-3"></b>
        <strong>124EH/s</strong>
        <p>总哈希率</p>
      </li>
    </ul>
  </div>

  <div class="center-area">
    <div class="pandect-area">
      <h3>
        <p>事件数目<sub>万</sub></p>
        <strong>总览</strong>
        <em> 当前区块数：25644687863</em>
      </h3>
      <span class="pandect-area-left">
        <b></b>
      </span>
      <div class="pandect-area-center">
        <v-chart class="line" :option="blockchainOptions" autoresize />
      </div>
      <span class="pandect-area-right">
        <b></b>
      </span>
    </div>
    <div class="details1-area">
      <span class="detailsl-area-left"></span>
      <div class="details1-area-center">
        <h3>平均区块大小(MB)</h3>
      </div>
      <span class="detailsl-area-right"></span>
      <v-chart class="blockSize smallChart" :option="sizeOptions" autoresize />

    </div>
    <div class="details2-area">
      <span class="details2-area-left"></span>
      <div class="details2-area-center">
        <h3>区块平均交易</h3>
      </div>
      <span class="details2-area-right"></span>
      <v-chart class="blockTransaction smallChart" :option="transactionOptions" autoresize />
    </div>
  </div>

  <div class="right">
    <el-card>
      <template #header>
        <span>最近10个区块</span>
        <el-button link style="float: right;margin-top: 5px;" type="primary" :icon="DArrowRight">查看更多</el-button>
      </template>
      <div class="block" v-for="(i, index) in 2" :key="index">
        <div class="number">#{{ 10815698 - i }}</div>
        <div class="detail">
          <div style="font-size: 18px;">Hash: </div>
          <div>0x44e02ebc576eeffd0c87ca051dae2c4727...</div>
          <div>包含<span>0</span>笔交易</div>
          <div style="color: rgba(255, 255, 255, 0.8);">Proposed By
            0xe6bd34aafbc05751bfa165...</div>
        </div>
      </div>
    </el-card>
    <el-card>
      <template #header>
        <span>最近10笔交易</span>
        <el-button link style="float: right;margin-top: 5px;" type="primary" :icon="DArrowRight">查看更多</el-button>
      </template>
      <div class="block" v-for="(i, index) in 2" :key="index">
        <div class="ribbon">
          <svg t="1712918312859" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1600" width="64" height="64">
            <path
              d="M512 351.99912m-207.99948 0a207.99948 207.99948 0 1 0 415.99896 0 207.99948 207.99948 0 1 0-415.99896 0Z"
              fill="#409eff" p-id="1601"></path>
            <path
              d="M200.03278 422.526944a18.015955 18.015955 0 0 1 6.559984 24.383939 81.407796 81.407796 0 0 0 0.575998 81.087797 81.407796 81.407796 0 0 0 69.951825 41.055897 18.175955 18.175955 0 0 1 17.823956 17.823956c0.128 8.479979 1.919995 16.511959 4.479988 24.223939L193.408796 950.461624a31.99992 31.99992 0 0 0 22.783944 40.575898l127.99968 31.99992a31.99992 31.99992 0 0 0 38.527903-22.239944l87.99978-307.93523a81.791796 81.791796 0 0 0 82.495794 0l87.99978 307.93523a31.99992 31.99992 0 0 0 38.527904 22.239944l127.99968-31.99992a32.06392 32.06392 0 0 0 22.783943-40.575898l-105.919736-339.423152c2.495994-7.679981 4.287989-15.679961 4.415989-24.159939a18.175955 18.175955 0 0 1 17.823956-17.823956 81.375797 81.375797 0 0 0 69.951825-41.055897c14.591964-25.279937 14.815963-55.615861 0.575999-81.087797a18.047955 18.047955 0 0 1 6.559983-24.383939C849.023157 407.550981 863.99912 381.183047 863.99912 351.99912s-14.975963-55.551861-40.0319-70.527824a18.015955 18.015955 0 0 1-6.559984-24.383939 81.407796 81.407796 0 0 0-0.575998-81.087797 81.407796 81.407796 0 0 0-69.951825-41.055897 18.175955 18.175955 0 0 1-17.823956-17.823956 82.495794 82.495794 0 0 0-82.175794-81.023797c-13.855965 0-27.679931 3.615991-39.9679 10.495974a18.335954 18.335954 0 0 1-24.383939-6.559984C567.551861 14.975963 541.183927 0 512 0s-55.551861 14.975963-70.527824 40.0319a18.271954 18.271954 0 0 1-24.383939 6.559984 82.175795 82.175795 0 0 0-39.9999-10.495974A82.495794 82.495794 0 0 0 294.976543 117.119707a18.175955 18.175955 0 0 1-17.823956 17.823956A81.375797 81.375797 0 0 0 207.168762 175.99956a81.375797 81.375797 0 0 0-0.575998 81.087797c4.799988 8.639978 1.919995 19.327952-6.559984 24.383939C174.976843 296.447259 160.00088 322.815193 160.00088 351.99912s14.975963 55.551861 40.0319 70.527824z m129.695676 530.910672l-65.087838-16.255959 85.599786-274.207314c8.479979 3.007992 17.439956 4.927988 26.879933 4.927987 12.735968 0 25.311937-3.391992 36.831908-9.247977l-84.223789 294.783263z m429.630926-16.255959l-65.087838 16.255959-84.223789-294.783263c11.519971 5.855985 24.09594 9.279977 36.863908 9.279977 9.439976 0 18.399954-1.951995 26.879933-4.959987l85.567786 274.207314zM232.832698 336.447159a81.727796 81.727796 0 0 0 29.631926-110.559724 17.823955 17.823955 0 0 1 0.128-17.887955 17.791956 17.791956 0 0 1 15.423961-9.055977c44.767888-0.639998 80.319799-36.15991 80.959798-80.927798 0.192-14.943963 15.96796-21.631946 26.911932-15.551961 37.471906 20.927948 88.703778 7.039982 110.559724-29.631926 4.767988-7.99998 12.479969-8.831978 15.551961-8.831978s10.783973 0.863998 15.551961 8.831978c21.855945 36.671908 73.055817 50.559874 110.559724 29.631926 10.879973-6.111985 26.687933 0.639998 26.943932 15.551961 0.639998 44.767888 36.15991 80.319799 80.927798 80.959798 9.279977 0.096 13.887965 6.335984 15.423961 9.023977a17.855955 17.855955 0 0 1 0.128 17.919955 81.727796 81.727796 0 0 0 29.631926 110.527724c7.99998 4.767988 8.831978 12.479969 8.831978 15.551961s-0.863998 10.783973-8.831978 15.551961a81.727796 81.727796 0 0 0-29.631926 110.559724 17.823955 17.823955 0 0 1-0.128 17.887955 17.791956 17.791956 0 0 1-15.391961 9.055977c-44.799888 0.639998-80.319799 36.15991-80.959798 80.927798-0.223999 14.911963-15.99996 21.631946-26.943932 15.551961-37.439906-20.927948-88.703778-7.039982-110.559724 29.631926-4.767988 7.99998-12.479969 8.831978-15.551961 8.831978s-10.783973-0.863998-15.551961-8.831978a82.559794 82.559794 0 0 0-70.559824-40.0639 82.239794 82.239794 0 0 0-39.9999 10.431974c-10.815973 6.079985-26.719933-0.639998-26.943932-15.551961a81.663796 81.663796 0 0 0-80.927798-80.959798 17.791956 17.791956 0 0 1-15.423961-9.023977 17.855955 17.855955 0 0 1-0.128-17.919955 81.727796 81.727796 0 0 0-29.631926-110.527724C224.832718 362.783093 224.00072 355.071112 224.00072 351.99912s0.863998-10.783973 8.831978-15.551961z"
              fill="#409eff" p-id="1602"></path>
            <path
              d="M512 575.99856c123.519691 0 223.99944-100.479749 223.99944-223.99944s-100.479749-223.99944-223.99944-223.99944-223.99944 100.479749-223.99944 223.99944 100.479749 223.99944 223.99944 223.99944z m0-415.99896c105.887735 0 191.99952 86.111785 191.99952 191.99952s-86.111785 191.99952-191.99952 191.99952-191.99952-86.111785-191.99952-191.99952 86.111785-191.99952 191.99952-191.99952z"
              fill="#409eff" p-id="1603"></path>
          </svg>
        </div>
        <div class="detail">
          <div style="font-size: 18px;">TX: </div>
          <div>0x44e02ebc576eeffd0c87ca051dae2c4727...</div>
          <div class="user">
            <div>
              <div>From:</div>
              <div>0x44e02ebc576eeffd...</div>
            </div>
            <div>
              <div>To:</div>
              <div>0x44e02ebc576eeffd...</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<style lang="less" scoped>
// 引入字体
@font-face {
  font-family: 'DS-DIGIT';
  src: url('../assets/fonts/DS-DIGIT.TTF');
}

.index {
  position: absolute;
  left: 4rem;
  top: 15%;
  overflow: hidden;

  ul {
    padding: 0;

    li {
      cursor: pointer;
      position: relative;
      display: inline-block;
      overflow: hidden;
      width: 115px;
      height: 80px;
      padding: 5px 15px;
      background: url(/assets/image/bg01bigindex.png) 0 0 no-repeat;
      margin-right: 35px;

      strong {
        display: block;
        font-size: 30px;
        margin-top: 4px;
        font-family: DS-DIGIT;
        text-align: center;
        margin: 0;
      }

      p {
        display: block;
        color: #b8b9bb;
        font-size: 12px;
        // padding-bottom: 4px;
        margin: 0;
        text-align: center;
      }

      .animation-1 {
        position: absolute;
        left: 12px;
        bottom: 35px;
        height: 3px;
        width: 345px;
        background: url(/assets/image/bg04bigindex.png) 0 0 repeat-x;
      }

      .animation-2 {
        position: absolute;
        right: 0;
        top: 1px;
        height: 16px;
        width: 15px;
        background: url(/assets/image/bg02bigindex.png) 0 0 no-repeat;
      }

      .animation-3 {
        position: absolute;
        right: -1px;
        bottom: 35px;
        height: 4px;
        width: 4px;
        background: url(/assets/image/bg03bigindex.png) 50% 50% no-repeat;
      }
    }

    li:hover .animation-2 {
      background: url(/assets/image/bg02bigindex_.png) 0 0 no-repeat;
    }

    li:hover .animation-3 {
      background: url(/assets/image/bg03bigindex_.png) 50% 50% no-repeat;
    }
  }

}

.center-area {
  width: 60%;
  position: absolute;
  top: 29%;
  left: 3%;

  .pandect-area {
    background: url(/assets/image/bg02pandect.png) center top no-repeat;
    background-size: 1000px 390px;
    height: 390px;
    margin: 0 50px;
    position: relative;

    b {
      position: absolute;
      top: -5px;
      display: block;
      width: 16px;
      height: 22px;
    }

    .pandect-area-center {
      margin-top: 20px;
      overflow: hidden;

      .line {
        width: 900px;
        height: 340px;
      }
    }

    .pandect-area-left {
      position: absolute;
      left: -68px;
      top: 0;
      display: block;
      width: 68px;
      height: 390px;
      background-image: url(/assets/image/bg01pandect.png);
      background-size: 68px 390px;

      b {
        left: -5px;
        background: url(/assets/image/bg04pandect.png) center top no-repeat;
      }
    }

    .pandect-area-right {
      position: absolute;
      right: -68px;
      top: 0;
      display: block;
      width: 68px;
      height: 390px;
      background-image: url(/assets/image/bg03pandect.png);
      background-size: 68px 390px;

      b {
        right: -7px;
        background: url(/assets/image/bg05pandect.png) center top no-repeat;
      }
    }

    h3 {
      font-weight: normal;
      text-align: center;
      position: relative;
      top: 10px;
      z-index: 1;
      border-bottom: 1px solid #666;
      margin: 0 -55px;

      p {
        position: absolute;
        left: 0;
        top: 0;
        background: #000;
        color: rgba(255, 255, 255, .8);
        font-size: 14px;
      }

      strong {
        border: 1px solid #ababab;
        padding: 1px 14px;
        line-height: 1;
        position: relative;
        bottom: -8px;
        z-index: 1;
        background: #000;
      }

      em {
        position: absolute;
        right: 0;
        font-size: 20px;
        font-family: DS-DIGIT;
      }

      sub {
        display: block;
        color: rgba(255, 255, 255, .3);
        text-align: right;
      }
    }
  }

  .details1-area {
    position: absolute;
    text-align: center;
    height: 150px;
    margin-left: 80px;

    h3 {
      text-align: right;
    }

    .detailsl-area-left {
      display: block;
      width: 122px;
      height: 150px;
      position: absolute;
      left: -122px;
      top: 0;
      background: url(/assets/image/bg01details03.png) center bottom no-repeat;
    }

    .detailsl-area-right {
      display: block;
      width: 121px;
      height: 150px;
      position: absolute;
      right: -121px;
      top: 0;
      background: url(/assets/image/bg01details05.png) center bottom no-repeat;
    }

    .details1-area-center {
      width: 200px;
      height: 150px;
      float: left;
      background: url(/assets/image/bg01details04.png) center bottom repeat-x;
    }
  }

  .details2-area {
    position: absolute;
    right: 10px;
    height: 150px;
    text-align: center;
    margin-right: 70px;

    h3 {
      text-align: left;
    }

    .details2-area-left {
      display: block;
      width: 122px;
      height: 150px;
      position: absolute;
      left: -122px;
      top: 0;
      background: url(/assets/image/bg01details01.png) center bottom no-repeat;
    }

    .details2-area-right {
      display: block;
      width: 121px;
      height: 150px;
      position: absolute;
      right: -121px;
      top: 0;
      background: url(/assets/image/bg01details02.png) center bottom no-repeat;
    }

    .details2-area-center {
      height: 150px;
      width: 200px;
      float: left;
      background: url(/assets/image/bg01details06.png) center bottom repeat-x;
    }
  }

  .details1-area h3,
  .details2-area h3 {
    margin-top: 5px;
    font-size: 14px;
  }

  .smallChart {
    width: 200px;
    height: 120px;
    position: relative;
    top: 20px;

  }
}

.right {
  position: absolute;
  right: 2%;
  top: 6.5rem;
  width: 31%;

  .el-card {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: none;
    cursor: pointer;
    margin-bottom: 25px;
  }

  .block {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ebeef5;

    .number {
      width: 70px;
      height: 70px;
      background: #409eff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5%;
      margin-right: 10px;
      padding: 10px;
      font-size: 15px;
    }

    .ribbon {
      width: 70px;
      height: 70px;
      padding: 10px;
      margin-right: 10px;
    }

    .detail {
      font-size: 15px;

      .user {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        div {
          margin-right: 10px;

          div {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
