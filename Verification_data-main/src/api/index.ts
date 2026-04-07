import request from './request';
import Web3 from "web3";
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const base = 'http://localhost:8888';
const address = ref('')

export const connectBlockchain = () => {
  if (typeof window.ethereum !== "undefined") {
    window.ethereum.request({ method: 'eth_requestAccounts' }).then((res: any) => {
      address.value = res[0]
      ElMessage({
        message: '区块链连接成功',
        type: 'success'
      })
      // 获取钱包余额
      const web3 = new Web3(window.ethereum);
      web3.eth.getBlockNumber().then((res: any) => {
        console.log(res)
      })
    }).catch((err: any) => {
      console.log(err)
      if (err.code == 4001) {
        console.log('用户拒绝连接')
      }
    })
  } else
    ElMessage({
      message: '请安装MetaMask插件',
      type: 'error'
    });
}
//测试
export const Test =  (data:any) => request({
  url:`http://localhost:5000/hello`,method:'get',params:data
})


// 登录
export const login = (data: any) => request({
  url: `${base}/login`, method: 'post', params: data
});

// 获取验证码
export const sendMail = (address: any) => request({
  url: `${base}/sendMail/${address}`, method: 'get'
});

// 注册
export const register = (data: any) => request({
  url: `${base}/register`, method: 'post', params: data
});

// 审核人打分
export const score = (data: any) => request({
  url: `${base}/score`, method: 'post', params: data
});

// 查看用户是否通过审核
export const checkUser = (userId: any) => request({
  url: `${base}/isPass`, method: 'get', params: { userId }
});

// 获取数据
export const getData = (dataId: any) => request({
  url: `${base}/getData`, method: 'get', params: { dataId }
});

// 获取数据列表
export const getDatas = (userId: any) => request({
  url: `${base}/getDatas`, method: 'get', params: { userId }
});

// 获取未确权数据
export const getUnverifiedDatas = (userId: any) => request({
  url: `${base}/getUnverifiedDatas`, method: 'get', params: { userId }
});

// 上传数据
export const uploadData = (data: any) => request({
  url: `${base}/uploadData`, method: 'post', params: data
});

// 更新数据
export const updateData = (data: any) => request({
  url: `${base}/updateData`, method: 'post', params: data
});

// 删除数据
export const deleteData = (dataId: any) => request({
  url: `${base}/deleteData`, method: 'post', params: dataId
});

// 获取代币
export const getListTokens = (userId: any) => request({
  url: `${base}/getListTokens`, method: 'get', params: { userId }
});

// 获取所有NFT
export const getNFTs = (userId: any) => request({
  url: `${base}/getNFTs`, method: 'get', params: { userId }
});

// 获取所有SBT
export const getSBTs = (userId: any) => request({
  url: `${base}/getSBTs`, method: 'get', params: { userId }
});

// 获取代币（obj）
export const getObjToken = (userId: any) => request({
  url: `${base}/getObjToken`, method: 'get', params: { userId }
});

// 获取代币历史申请记录
export const getTokenHistory = (userId: any) => request({
  url: `${base}/getTokenHistory`, method: 'get', params: { userId }
});

// 获取NFT申请个数
export const getNFTCount = (userId: any) => request({
  url: `${base}/getNFTCount`, method: 'get', params: { userId }
});

// 获取SBT申请个数
export const getSBTCount = (userId: any) => request({
  url: `${base}/getSBTCount`, method: 'get', params: { userId }
});

// 获取NFT申请成功率
export const getNFTSuccessRate = (userId: any) => request({
  url: `${base}/getNFTSuccessRate`, method: 'get', params: { userId }
});

// 获取SBT申请成功率
export const getSBTSuccessRate = (userId: any) => request({
  url: `${base}/getSBTSuccessRate`, method: 'get', params: { userId }
});

// 插入代币
// 如果类型为SBT，则需要传入NFT的id，如果指定SBT，还需要传入SBT的id
export const insertToken = (data: any) => request({
  url: `${base}/insertToken`, method: 'post', params: data
});

// 获取交易市场列表
export const getStore = (data: any) => request({
  url: `${base}/getStore`, method: 'get'
});

// 发布交易
export const publish = (data: any) => request({
  url: `${base}/publish`, method: 'post', params: data
});

// 进行交易
export const transaction = (tradeId: any, buyerId: any) => request({
  url: `${base}/transaction`, method: 'post', params: { tradeId, buyerId }
});

// 获取交易记录
export const getTransactions = (isBuy: number, userId: any) => request({
  url: `${base}/getTradehistory`, method: 'get', params: { isBuy, userId }
});

// 删除交易
export const deleteTransaction = (id: any) => request({
  url: `${base}/deleteTradehistory`, method: 'post', params: { id }
});

// 获取数据详情
export const getDetail = (tradeId: any) => request({
  url: `${base}/getDetail`, method: 'get', params: { tradeId }
});

// 获取热门数据
export const getHotDatas = () => request({
  url: `${base}/getHotDatas`, method: 'get'
});

// 获取另外两个出售的数据
export const getOther = (tradeId: any) => request({
  url: `${base}/getOther`, method: 'get', params: { tradeId }
});

// 获取代币详情
export const getTokenDetail = (tokenId: any) => request({
  url: `${base}/getTokenDetail`, method: 'get', params: { tokenId }
});

// 获取另外两个代币
export const getOtherToken = (tokenId: any) => request({
  url: `${base}/getOtherToken`, method: 'get', params: { tokenId }
});

// 获取消息列表
export const getMessages = (userId: any) => request({
  url: `${base}/getHistory`, method: 'get', params: { userId }
});

// 获取消息详情
export const getMessage = (userId: any, id: any, type: string) => request({
  url: `${base}/getMessage`, method: 'get', params: { userId, id, type }
});

// //上传进行二级确权的数据详情
// export const insertdetailofNFTs = () => request({
//   url: `${base}/insertdetailofNFTs`, method: 'post', params: {  }
// });

//上传数据
// export const uploadData = () =>{

// }

//智能合约页面上传数据
export const uploadContractData = (data: any) => request({
  url: `${base}/uploadContractData`, method: 'post', params: data
});

//获取后端模型智能合约处理结果
export const getContractResult = () => request({
  url: `${base}/getContractData`, method: 'get'
});

//将不安全的智能合约传给后端修复模型
export const modifyContract = (data: any) => request({
  url: `${base}/modifyContract`, method: 'post', params: data
});

//调用gpt上传文件并且进行漏洞检测
export const gpt_detect = (data:any) => request({
  url: `http://localhost:8010/gpt`,method:'post',params:data
});