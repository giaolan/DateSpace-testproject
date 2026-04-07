<script lang='ts'>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Header } from '@/components';
import { ElMessage } from 'element-plus'
// import { ShoppingCart, DArrowRight, PriceTag, Coin } from '@element-plus/icons-vue'
import { getDetail, getOther, getOtherToken, getTokenDetail, publish, transaction } from '@/api'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const type = ref(Number(route.params.type))  // type: 0-数据 1-代币
    const data = ref([
      {
        data1: 14.5,
        data2: 10.86,
        data3: 5.2,
        data4: 3.5,
        data5: 0.5,
        data6: 15.6,
        data7: 1.25
      },
      {
        data1: 10.26,
        data2: 8.86,
        data3: 4.2,
        data4: 2.5,
        data5: 0.8,
        data6: 15.6,
        data7: 1.98
      },
      {
        data1: 12.5,
        data2: 9.86,
        data3: 5.2,
        data4: 3.5,
        data5: 0.5,
        data6: 15.6,
        data7: 1.25
      },
      {
        data1: 14.5,
        data2: 10.86,
        data3: 5.2,
        data4: 3.5,
        data5: 0.5,
        data6: 15.6,
        data7: 1.25
      },
      {
        data1: 10.26,
        data2: 8.86,
        data3: 4.2,
        data4: 2.5,
        data5: 0.8,
        data6: 15.6,
        data7: 1.98
      },
      {
        data1: 12.5,
        data2: 9.86,
        data3: 5.2,
        data4: 3.5,
        data5: 0.5,
        data6: 15.6,
        data7: 1.25
      },
      {
        data1: 14.5,
        data2: 10.86,
        data3: 5.2,
        data4: 3.5,
        data5: 0.5,
        data6: 15.6,
        data7: 1.25
      },
      {
        data1: 10.26,
        data2: 8.86,
        data3: 4.2,
        data4: 2.5,
        data5: 0.8,
        data6: 15.6,
        data7: 1.98
      },
      {
        data1: 12.5,
        data2: 9.86,
        data3: 5.2,
        data4: 3.5,
        data5: 0.5,
        data6: 15.6,
        data7: 1.25
      },
      {
        data1: 14.5,
        data2: 10.86,
        data3: 5.2,
        data4: 3.5,
        data5: 0.5,
        data6: 15.6,
        data7: 1.25
      },
      {
        data1: 10.26,
        data2: 8.86,
        data3: 4.2,
        data4: 2.5,
        data5: 0.8,
        data6: 15.6,
        data7: 1.98
      },
      {
        data1: 12.5,
        data2: 9.86,
        data3: 5.2,
        data4: 3.5,
        data5: 0.5,
        data6: 15.6,
        data7: 1.25
      },
      {
        data1: 14.5,
        data2: 10.86,
        data3: 5.2,
        data4: 3.5,
        data5: 0.5,
        data6: 15.6,
        data7: 1.25
      },
      {
        data1: 10.26,
        data2: 8.86,
        data3: 4.2,
        data4: 2.5,
        data5: 0.8,
        data6: 15.6,
        data7: 1.98
      },
      {
        data1: 12.5,
        data2: 9.86,
        data3: 5.2,
        data4: 3.5,
        data5: 0.5,
        data6: 15.6,
        data7: 1.25
      },
      {
        data1: 14.5,
        data2: 10.86,
        data3: 5.2,
        data4: 3.5,
        data5: 0.5,
        data6: 15.6,
        data7: 1.25
      },
      {
        data1: 10.26,
        data2: 8.86,
        data3: 4.2,
        data4: 2.5,
        data5: 0.8,
        data6: 15.6,
        data7: 1.98
      },
      {
        data1: 12.5,
        data2: 9.86,
        data3: 5.2,
        data4: 3.5,
        data5: 0.5,
        data6: 15.6,
        data7: 1.25
      },
      {
        data1: 14.5,
        data2: 10.86,
        data3: 5.2,
        data4: 3.5,
        data5: 0.5,
        data6: 15.6,
        data7: 1.25
      },
      {
        data1: 10.26,
        data2: 8.86,
        data3: 4.2,
        data4: 2.5,
        data5: 0.8,
        data6: 15.6,
        data7: 1.98
      },
      {
        data1: 12.5,
        data2: 9.86,
        data3: 5.2,
        data4: 3.5,
        data5: 0.5,
        data6: 15.6,
        data7: 1.25
      },
      {
        data1: 14.5,
        data2: 10.86,
        data3: 5.2,
        data4: 3.5,
        data5: 0.5,
        data6: 15.6,
        data7: 1.25
      },
    ])
    const dataOverview = ref({})
    const otherData = ref([])
    const activities = ref([
      {
        type: '转移',
        price: 0,
        from: '1783445843648794627',
        to: '1783445843648794626',
        data: '2024-5-2'
      },
      {
        type: '出售',
        price: 100,
        from: '1783445843648794625',
        to: '1783445843648794627',
        data: '2024-5-2'
      },
      {
        type: '出售',
        price: 100,
        from: '1783445843648794624',
        to: '1783445843648794625',
        data: '2024-5-2'
      },
      {
        type: '项目刊登',
        price: 100,
        from: '1783445843648794624',
        to: '',
        data: '2024-5-2'
      },
      {
        type: '铸造',
        price: 0.008,
        from: '',
        to: '1783445843648794624',
        data: '2024-5-1'
      }
    ])
    const dialogFormVisible = ref(false);
    const isSell = ref(0)  // 0出售 1出租
    const form = ref({
      name: '',
      detail: '',
      price: 0,
    })

    const fetchData = async () => {
      dataOverview.value = await type.value === 0 ? await getDetail(route.params.id) : await getTokenDetail(route.params.id)
      otherData.value = type.value === 0 ? await getOther(route.params.id) : await getOtherToken(route.params.id)
    }

    const buy = async (id) => {
      await transaction(id, localStorage.getItem('userId'));
    }

    const handlerBuy = (is) => {
      if (type.value === 0) {
        buy(dataOverview.value.id);
        ElMessage({
          message: '购买成功',
          type: 'success',
        })
        router.push(`/circulation`);
      }
      else {
        dialogFormVisible.value = true;
        isSell.value = is;
      }
    }

    const submit = () => {
      publish({
        tokenId: dataOverview.value.id,
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
          // 跳转到流通
          router.push(`/circulation`);
        }
      })
    }

    const goToOtherData = (id: number) => {
      router.push(`/dataDetail/${id}/${type.value}`);
    }

    const dataKey = data.value.length ? Object.keys(data.value[0]) : []

    onMounted(() => {
      fetchData();
    })
    return {
      data,
      dataKey,
      dataOverview,
      activities,
      otherData,
      handlerBuy,
      goToOtherData,
      type,
      dialogFormVisible,
      form,
      submit,
      // ShoppingCart,
      // DArrowRight,
      // PriceTag,
      // Coin
    }
  }
}

</script>
<template>
  <Header :title="type === 0 ? '出售详情' : '代币详情'" />
  <div class="main">
    <div class="left">
      <!-- 数据示例 -->
      <el-card>
        <template #header>数据示例</template>
        <div class="table">
          <el-table :data="data">
            <el-table-column v-for="item in dataKey" width="70" :key="item" :prop="item" :label="item"
              align="center"></el-table-column>
            <!-- 伪造更多数据 -->
            <el-table-column prop="data1" label="data8" width="70" align="center"></el-table-column>
            <el-table-column prop="data2" label="data9" width="70" align="center"></el-table-column>
            <el-table-column prop="data3" label="data10" width="80" align="center"></el-table-column>
          </el-table>
        </div>
      </el-card>
      <div class="detail">
        <!-- 代币详情 -->
        <el-card class="token">
          <template #header>代币详情</template>
          <p>合约地址：0xb04d...85e1a9e22e3b</p>
          <p>代币ID：{{ type === 0 ? dataOverview.tokenId : dataOverview.id }}</p>
          <p>代币标准：ERC-721</p>
          <p>链：Base</p>
          <p>最后更新日期：{{ new Date(dataOverview.date).toLocaleDateString() }}</p>
        </el-card>
        <!-- 数据介绍 -->
        <el-card class="data">
          <template #header>数据介绍</template>
          <p>数据名称：{{ dataOverview.name }}</p>
          <p>
            数据描述：{{ dataOverview.detail }}
          </p>
        </el-card>
      </div>
    </div>
    <div class="right">
      <div class="buyData">
        <!-- 数据概览 -->
        <el-card style="width: 38%;">
          <template #header>
            <span>数据概览</span>
            <el-button style="float: right;" type="primary" @click="handlerBuy(0)">{{ type === 0 ? '购买' : '出售'
              }}</el-button>
            <el-button v-if="type === 1" style="float: right;margin: 0 10px;" type="primary"
              @click="handlerBuy(1)">出租</el-button>
          </template>

          <div>
            <div>
              <el-tag v-show="type === 0" style="margin-right: 10px;" effect="dark">{{ dataOverview.type }}</el-tag>
              <el-tag style="margin-right: 10px;" v-for="tag in dataOverview.keyword" :key="tag">{{ tag }}</el-tag>
            </div>
            <div style="margin-top: 15px;">
              <p v-show="type === 0">出售用户：{{ dataOverview.owner }}</p>
              <p>数据量：{{ dataOverview.size }}GB</p>
              <p v-show="type === 0">价格：{{ dataOverview.price }}元</p>
              <p>数据格式：{{ dataOverview.format }}</p>
              <p>数据类型：{{ dataOverview.dataType }}</p>
              <p v-show="type === 1">
                备注：您的数据已经在平台确权，请勿告诉别人您的哈希。您可点击出售按钮进行出售。</p>
            </div>
          </div>
        </el-card>
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
        <!-- 其他推荐 -->
        <el-card style="width: 60%;">
          <template #header>{{ type === 0 ? "该用户的其他出售" : "您的其他代币" }}</template>
          <div class="otherRecommend">
            <el-card v-for="item in otherData" :key="item.id">
              <template #header>
                <span>{{ type === 0 ? item.name : item.id.slice(0, 15) }}...</span>
              </template>
              <div>
                <p>{{ type === 0 ? "出售" : "拥有" }}时间：{{ new Date(type === 0 ? item.time :
    item.createtime).toLocaleDateString()
                  }}
                </p>
                <p>{{ type === 0 ? '价格' : '代币类型' }}：{{ type === 0 ? item.price : item.type }}{{ type === 0 ? "元"
    : ""
                  }}
                </p>
                <el-button type="primary" @click="goToOtherData(item.id)">查看</el-button>
              </div>
            </el-card>
          </div>
        </el-card>
      </div>
      <!-- 数据活动 -->
      <el-card>
        <template #header>代币活动</template>
        <div class="table">
          <el-table :data="activities">
            <el-table-column label="事件" width="150" align="center">
              <template #default="scope">
                <!-- <el-icon size="20">
                  <ShoppingCart v-if="scope.row.type === '出售'" />
                  <DArrowRight v-else-if="scope.row.type === '转移'" />
                  <PriceTag v-else-if="scope.row.type === '项目刊登'" />
                  <Coin v-else-if="scope.row.type === '铸造'" />
                </el-icon> -->
                <!-- 改用svg -->
                <div style="display: flex;align-content: center;justify-content: center;">
                  <svg v-if="scope.row.type === '出售'" style="width: 20px;height: 20px;margin-right: 10px;"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                    <path fill="currentColor"
                      d="M432 928a48 48 0 1 1 0-96 48 48 0 0 1 0 96m320 0a48 48 0 1 1 0-96 48 48 0 0 1 0 96M96 128a32 32 0 0 1 0-64h160a32 32 0 0 1 31.36 25.728L320.64 256H928a32 32 0 0 1 31.296 38.72l-96 448A32 32 0 0 1 832 768H384a32 32 0 0 1-31.36-25.728L229.76 128zm314.24 576h395.904l82.304-384H333.44l76.8 384z">
                    </path>
                  </svg>
                  <svg v-else-if="scope.row.type === '转移'" style="width: 20px;height: 20px;margin-right: 10px;"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                    <path fill="currentColor"
                      d="M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L764.736 512 452.864 192a30.592 30.592 0 0 1 0-42.688m-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L508.736 512 196.864 192a30.592 30.592 0 0 1 0-42.688z">
                    </path>
                  </svg>
                  <svg v-else-if="scope.row.type === '项目刊登'" style="width: 20px;height: 20px;margin-right: 10px;"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                    <path fill="currentColor"
                      d="M224 318.336V896h576V318.336L552.512 115.84a64 64 0 0 0-81.024 0zM593.024 66.304l259.2 212.096A32 32 0 0 1 864 303.168V928a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V303.168a32 32 0 0 1 11.712-24.768l259.2-212.096a128 128 0 0 1 162.112 0z">
                    </path>
                    <path fill="currentColor"
                      d="M512 448a64 64 0 1 0 0-128 64 64 0 0 0 0 128m0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256">
                    </path>
                  </svg>
                  <svg v-else-if="scope.row.type === '铸造'" style="width: 20px;height: 20px;margin-right: 10px;"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                    <path fill="currentColor"
                      d="m161.92 580.736 29.888 58.88C171.328 659.776 160 681.728 160 704c0 82.304 155.328 160 352 160s352-77.696 352-160c0-22.272-11.392-44.16-31.808-64.32l30.464-58.432C903.936 615.808 928 657.664 928 704c0 129.728-188.544 224-416 224S96 833.728 96 704c0-46.592 24.32-88.576 65.92-123.264z">
                    </path>
                    <path fill="currentColor"
                      d="m161.92 388.736 29.888 58.88C171.328 467.84 160 489.792 160 512c0 82.304 155.328 160 352 160s352-77.696 352-160c0-22.272-11.392-44.16-31.808-64.32l30.464-58.432C903.936 423.808 928 465.664 928 512c0 129.728-188.544 224-416 224S96 641.728 96 512c0-46.592 24.32-88.576 65.92-123.264z">
                    </path>
                    <path fill="currentColor"
                      d="M512 544c-227.456 0-416-94.272-416-224S284.544 96 512 96s416 94.272 416 224-188.544 224-416 224m0-64c196.672 0 352-77.696 352-160S708.672 160 512 160s-352 77.696-352 160 155.328 160 352 160">
                    </path>
                  </svg>
                  <span>{{ scope.row.type }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="价格" width="150" align="center"></el-table-column>
            <el-table-column prop="from" label="自" width="150" align="center"></el-table-column>
            <el-table-column prop="to" label="至" width="150" align="center"></el-table-column>
            <el-table-column prop="data" label="日期" align="center"></el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>
<style lang="less" scoped>
.main {
  padding: 0 1%;
  display: flex;
  justify-content: space-around;
  margin-top: -20px;

  .left {
    width: 40%;

    .table {
      display: flex;
      justify-content: center;
      align-content: center;
      background-color: transparent;

      :deep(.el-table) {
        height: 395px;
      }
    }

    .detail {
      display: flex;
      justify-content: space-between;

      .token {
        width: 48%;
      }

      .data {
        width: 48%;
      }

    }
  }

  .right {
    width: 56%;

    .buyData {
      display: flex;
      justify-content: space-between;

      .otherRecommend {
        display: flex;
        justify-content: space-between;
        align-content: center;

        .el-card {
          width: 48%;
        }

        .el-button {
          float: right;
          margin-bottom: 15px;
        }
      }
    }

    .table {
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-content: center;

      :deep(.el-table) {
        height: 360px;

        tr {
          height: 60px;
        }
      }
    }
  }
}

// 通用样式
.el-card {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  margin-bottom: 10px;
}

:deep(.el-table) {
  background-color: transparent;
  color: #fff;

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

p {
  font-size: 15px;
  margin: 0;
  padding: 5px 0;
}
</style>
