<script setup lang='ts'>
import { onUnmounted, onUpdated, ref, onMounted } from 'vue'
import { Header } from '@/components'
import { DArrowRight } from '@element-plus/icons-vue'
import { getMessages, getMessage } from '@/api'

const messages = ref([])
const nowDetail = ref(null)
// detail里key英文和中文的对应
const keyMap = {
  sender: '发送方',
  time: '时间',
  hash: "哈希值",
  contractAddress: '合约地址',
  blockNumber: '区块号',
  dataId: '数据ID',
  dataHash: '数据哈希',
  tokenType: '代币类型',
  tokenId: '代币ID',
  from: '出售者',
  to: '购买者',
  price: '价格',
  userId: '用户ID'
}
const hash = '0x636f6d2e70656f706c65646174612e707265737572652e73797374656d2e646f6d61696e2e50726573757265446174617265636f72644033333039653235635b0a202069643d31303037390a20207573657249643d31303037350a2020656e74657270726973654e616d653de6b599e6b19fe4b8ade59bbde5b08fe59586e59381e59f8ee99b86e59ba2e882a1e4bbbde69c89e99990e585ace58fb80a20206e616d653de4b989e4b98cc2b7e4b8ade59bbde5b08fe59586e59381e68c87e695b00a20206465736372697074696f6e3de2809ce4b989e4b98ce68c87e695b0e2809de58c85e590abe2809ce4bbb7e6a0bce68c87e695b0e2809de38081e2809ce699afe6b094e68c87e695b0e2809defbc8ce585b6e4b8adefbc9ae2809ce4bbb7e6a0bce68c87e695b0e2809de58c85e590abe59cbae58685e78eb0e8b4a7e4baa4e69893e4bbb7e6a0bce68c87e695b0e38081e59cbae58685e8aea2e58d95e4baa4e69893e4bbb7e6a0bce68c87e695b0e38081e59cbae58685e587bae58fa3e4baa4e69893e4bbb7e6a0bce68c87e695b0e38081e7bd91e4b88ae4baa4e69893e4bbb7e6a0bce68c87e695b0efbc9be2809ce699afe6b094e68c87e695b0e2809de58c85e68bace4baa4e69893e9a29de68c87e695b0e38081e4baa4e69893e9878fe68c87e695b0e38081e4babae6b094e68c87e695b0e38081e59381e7a78de689a9e5bca0e5baa6e68c87e695b0e38081e59586e59381e6af9be588a9e9a29de68c87e695b0e38081e59586e59381e591a8e8bdace6aca1e695b0e68c87e695b0e38081e8b584e98791e591a8e8bdace6aca1e695b0e68c87e695b0e38081e688b7e59d87e6af9be588a9e9a29de68c87e695b0e38082e794b1e5b882e59cbae7aea1e79086e59198e6af8fe591a8e5ae9ae69c9fe98787e99b86e38082e8afa5e695b0e68daee8b584e6ba90e4b8bae4b989e4b98ce68c87e695b0e8aea1e7ae97e5ae8ce68890e5908ee79a84e68c87e695b0e695b0e68daee58f8ae98787e99b86e79a84e58e9fe5a78be695b0e68daee380820a202063617465676f72793d310a202070726f64756374547970653d0a2020747970653d320a202064617461547970653d320a2020736f757263653d330a2020636f7665726167653d310a202069735075626c6973683d3c6e756c6c3e0a2020726566757365526561736f6e3d3c6e756c6c3e0a202070726f636573735374617475733d320a20206e756d6265723d31303030303030300a2020756e69743d340a2020737461727454696d653d467269204a616e2030312030303a30303a30302043535420323031360a2020656e6454696d653d467269204e6f762032342030303a30303a30302043535420323032330a20206672657175656e63793d320a2020697353656e7369746976653d4e0a20207363656e653d6531340a2020696e6475737472793d7331310a5d'

const goToDetail = (id, type) => {
  fetchDetail(id, type)
}

const fetchData = async () => {
  messages.value = await getMessages(localStorage.getItem('userId'))
}

const fetchDetail = async (id, type) => {
  nowDetail.value = await getMessage(localStorage.getItem('userId'), id, type)
}

onMounted(() => {
  fetchData();
})

</script>
<template>
  <Header title="消息中心"></Header>
  <main>
    <el-timeline class="timeline">
      <el-timeline-item v-for="(item, index) in messages" :key="index" :timestamp="item.time" placement="top">
        <span v-if="!item.id">{{ item.content }}</span>
        <el-card v-else>
          <el-button link style="float: right;" type="primary" :icon="DArrowRight"
            @click="goToDetail(item.id, item.type)">链上查证</el-button>
          <h4>{{ item.type }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-card class="detail">
      <div v-if="nowDetail" class="info">
        <div class="generaInfo">
          <p class="key">状态</p>
          <p>已完成</p>
        </div>
        <div class="generaInfo">
          <p class="key">交易类型</p>
          <p>EXCHANGE</p>
        </div>
        <template v-for="(value, key) in nowDetail" :key="key">
          <div class="generaInfo" v-if="value && keyMap[key]">
            <p class="key">{{ keyMap[key] }}</p>
            <p>{{ value }}</p>
          </div>
        </template>
        <div class="generaInfo">
          <p class="key">数据加密</p>
          <el-input class="hash" :autosize="{ minRows: 2, maxRows: 7 }" type="textarea" :placeholder="hash" disabled />
        </div>
      </div>
      <el-empty v-else image="/assets/image/null.png" description="未选择消息" />
    </el-card>
  </main>
</template>
<style lang="less" scoped>
main {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;

  .timeline {
    width: 30%;
    overflow-y: auto;
    height: 36rem;
    /* Firefox */
    scrollbar-width: none;
    /* IE and Edge */
    -ms-overflow-style: none;

    span {
      color: white;
    }
  }

  .detail {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;

    .info {

      .generaInfo {
        display: flex;
        justify-content: space-between;
        width: 160%;
        padding: 0.5rem;
        margin-left: -30%;
        font-size: 16px;

        p {
          margin: .3rem 1rem;
        }

        .key {
          color: rgba(255, 255, 255, 0.5);
        }

        .hash {
          max-width: 80%;
        }
      }

    }
  }

  .el-card {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: none;
  }

}
</style>
