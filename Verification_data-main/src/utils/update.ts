// update.ts
import * as echarts from 'echarts';
import { isWhiteSpaceLike, type NumericLiteral } from 'typescript';
import {computed,ref, toRefs, type Ref} from 'vue'
import {ElMessage,ElMessageBox} from 'element-plus'
import { active } from '@/components/FunctionsVertify';


// //将页面的绑定信息 即从层级确权部分传参传到update实现
// export const show = ref(true);
// //在这里导入数据上传页面的数组长度 监听数组长度变化 当进行增加时 会使得show处闪动
// export function ShowBlink(){

// }
//数据管理页面的历史上传数据
interface User9{
  // name:string,
  date:string,
  TheDescibeOfDara:string,
  detail:string,
}
export const HistoryData :User9[]=[{
  date:'2024-2-3',
  TheDescibeOfDara:'这个是关于各省市在某一时间节点的网络的使用情况，数据由大到小排列',
  detail:'关于网络使用情况'
},{
  date:'2023-10-9',
  TheDescibeOfDara:'这个是关于各省市在某一时间节点的网络的使用情况，数据由大到小排列',
  detail:'各高校招收学生情况2022'
},{
  date:'2023-8-8',
  TheDescibeOfDara:'这个是关于各省市在某一时间节点的网络的使用情况，数据由大到小排列',
  detail:'广东高校情况总结'
},{
  date:'2021-8-9',
  TheDescibeOfDara:'这个是关于各省市在某一时间节点的网络的使用情况，数据由大到小排列',
  detail:'计算机专业各高校发展变化视图·'
},{
  date:'2020-9-9',
  TheDescibeOfDara:'这个是关于各省市在某一时间节点的网络的使用情况，数据由大到小排列',
  detail:'99公益日红花捐赠情况'
},{
  date:'2020-7-8',
  TheDescibeOfDara:'这个是关于各省市在某一时间节点的网络的使用情况，数据由大到小排列',
  detail:'暑期人流量情况'
},{
  date:'2020-2-4',
  TheDescibeOfDara:'这个是关于各省市在某一时间节点的网络的使用情况，数据由大到小排列',
  detail:'春节各铁路承运情况'
}]

export const drawer9 = ref(false)
export const direction9 = ref('rtl')

export const selectedRowData9: Ref<User9 | null> = ref(null);

export function showDetails9(rowData:User9) {
  selectedRowData9.value = rowData;
  drawer9.value = true; // 假设您已经有一个名为 drawer 的响应式变量来控制 el-drawer 的显示
}
//manage挪过来的



export function initAndUpdateChart(chartDom: HTMLElement) {
  const myChart = echarts.init(chartDom);
// 定义常量
const oneSecond: number = 1000; // 1秒钟的毫秒数

// 日期和数据的数组
const date: string[] = [];
const data: number[] = [];

function addData(shift: boolean) {
  // 获取当前时间
  let now = new Date();

  // 生成时间格式 '时:分:秒'
  const nowStr = [
    now.getHours().toString().padStart(2, '0'),
    now.getMinutes().toString().padStart(2, '0'),
    now.getSeconds().toString().padStart(2, '0')
  ].join(':');

  // 添加新数据
  date.push(nowStr);
  data.push(shift ? Math.random() * 10 : data[data.length - 1]); // 如果是shift就添加新随机数，否则复制上一个值

  // 如果数组长度超过需要的数据点数，则移除最老的数据
  if (date.length > 20) {
    date.shift();
    data.shift();
  }
}

// 初始化填充最初的20秒数据
for (let i = 20; i > 0; i--) {
  // 从20秒前开始，到当前时间，每个一秒填充一个点
  let pastTime = new Date(new Date().getTime() - i * oneSecond);
  let pastStr = [
    pastTime.getHours().toString().padStart(2, '0'),
    pastTime.getMinutes().toString().padStart(2, '0'),
    pastTime.getSeconds().toString().padStart(2, '0')
  ].join(':');

  date.push(pastStr);
  data.push(Math.random() * 10); // 这里填充随机数据或者是其他你需要的初始化数据
}
  const option: any = {
    backgroundColor:'rgba(10,193,199,0.1)',
    grid:{
      left:'10%',
      right: '10%',   // 右侧的距离
      top: '20%',     // 顶部的距离
      bottom: '10%'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date,
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      }
    },
    yAxis: {
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      },
      boundaryGap: [0, '50%'],
      type: 'value'
    },
    series: [
      {
        name: '成交',
        type: 'line',
        smooth: true,
        symbol: 'none',
        stack: 'a',
        areaStyle: {
            color: 'rgba(10,193,199, 0.3)' // 设置为绿色半透明
          },
        data: data
      }
    ]
  };


  //右侧charts动图
  myChart.setOption(option);

  setInterval(() => {
    addData(true);
    myChart.setOption({
      xAxis: {
        data: date
      },
      series: [
        {
          name: '成交',
          data: data
        }
      ]
    });
  }, 500);
};

//右侧租赁数据
interface User {
  index:number
  // date: string
  dataDtail: string
  usedTime: string
  state:string
  createTime:string
  bool:number
  reason:string
}


export const tableRowClassName = ({
  row,
}: {
  row: User,
  rowIndex: number
}) => {
  if (row.bool === 1) {
    return 'active-row';
  } else{
    return 'inactive-row';
  }
}

export const data :User[]=[{
  index:1,
  dataDtail: `图片`,
  usedTime: '120次',
  state: '安全',
  createTime: '2022-5-31 09:30:00',
  bool:1
},{
  index:2,
  dataDtail: `设备信息`,
  usedTime: '136次',
  // handlePersonnel: 'admin',
  state: '警告',
  createTime: '2022-5-31 09:30:00',
  bool:0,
  reason:'使用频率过高'
},{
  index:3,
  dataDtail: `设备购买记录`,
  usedTime: '120次',
  // handlePersonnel: 'admin',
  state: '安全',
  createTime: '2022-5-31 09:30:00',
  bool:1
},{
  index:4,
  dataDtail: `医疗记录`,
  usedTime: '120次',
  // handlePersonnel: 'admin',
  state: '安全',
  createTime: '2022-5-31 09:30:00',
  bool:1
},{
  index:5,
  dataDtail: `降水量`,
  usedTime: '104次',
  // handlePersonnel: 'admin',
  state: '安全',
  createTime: '2022-5-31 09:30:00',
  bool:1
},{
  index:6,
  dataDtail: `雪1`,
  usedTime: '190次',
  // handlePersonnel: 'admin',
  state: '警告',
  createTime: '2022-5-31 09:30:00',
  bool:0,
  reason:'试图将数据卖出'
},{
  index:7,
  dataDtail: `雪2`,
  usedTime: '120次',
  // handlePersonnel: 'admin',
  state: '警告',
  createTime: '2022-5-31 09:30:00',
  bool:0,
  reason:'试图将数据卖出'
},{
  index:8,
  dataDtail: `雪3`,
  usedTime: '110次',
  // handlePersonnel: 'admin',
  state: '警告',
  createTime: '2022-5-31 09:30:00',
  bool:1,
  reason:'试图将数据卖出'
},{
  index:9,
  dataDtail: `雪4`,
  usedTime: '90次',
  // handlePersonnel: 'admin',
  state: '警告',
  createTime: '2022-5-31 09:30:00',
  bool:0,
  reason:'试图将数据卖出'
},]

//左侧绑定状态
export interface Users{
  date:string
  name:string
  dataDtail:string
  id:string
  bool:number
  dataDetail:string
  price:string
}


export const drawer = ref(false)
// export const drawer2 = ref(false)
export const direction = ref('rtl')
export const radio1 = ref('Option 1')

export const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure you want to close this?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}


export const selectedRowData: Ref<Users | null> = ref(null);

export function showDetails(rowData:Users) {
  selectedRowData.value = rowData;
  drawer.value = true; // 假设您已经有一个名为 drawer 的响应式变量来控制 el-drawer 的显示
}

export const filterTag = (value:string,row:Users)=>{
  return row.id === value
}

export const tableData1 :Users[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    dataDtail: '北京企业',
    price:'数据量：2GB;\n价格：100元;',
    id:"已绑定",
    bool:1,
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    dataDtail: '疫情节点',
    price:'数据量：2GB;\n价格：100元;',
    id:"已绑定",
    bool:1,
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    dataDtail: '春运',
    price:'数据量：2GB;\n价格：100元;',
    id:"已绑定",
    bool:1,
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    dataDtail: '疫情清零',
    price:'数据量：2GB;\n价格：100元;',
    id:"未绑定",
    bool:0,
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。'
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    dataDtail: '双11',
    price:'数据量：2GB;\n价格：100元;',
    id:"已绑定",
    bool:1,
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。'
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    dataDtail: '双12',
    price:'数据量：2GB;\n价格：100元;',
    id:"未绑定",
    bool:0,
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。'
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    dataDtail: '房价跌涨',
    price:'数据量：2GB;\n价格：100元;',
    id:"未绑定",
    bool:0,
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。'
  }, {
    date: '2016-05-07',
    name: 'Tom',
    dataDtail: '房价跌涨',
    price:'数据量：2GB;\n价格：100元;',
    id:"未绑定",
    bool:0,
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。'
  }, {
    date: '2016-05-07',
    name: 'Tom',
    dataDtail: '房价跌涨',
    price:'数据量：2GB;\n价格：100元;',
    id:"未绑定",
    bool:0,
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。'
  }, {
    date: '2016-05-07',
    name: 'Tom',
    dataDtail: '房价跌涨',
    price:'数据量：2GB;/n价格：100元;',
    id:"未绑定",
    bool:0,
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。'
  },
]

//代币管理表格
export interface User3 {
  date: string
  name: string
  address: string
  imageUrl:string
  id:string
  dataDetail:string
  datas:object
  standard:string
}
//搜索功能
export const search = ref('')
export const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
export const handleEdit = (index: number, row: User3) => {
  console.log(index, row)
}

export const drawer1 = ref(false)
export const drawer21 = ref(false)
export const direction1 = ref('rtl')
export const radio11 = ref('Option 1')

export function cancelClick1() {
  drawer21.value = false
}


export const selectedRowData1: Ref<User3 | null> = ref(null);

//SelectData
export const selectionRows:Ref<Users[]> = ref([]);
export const dialogFormVisible = ref(false)
export function handleSelectionChange(selection:Users[]){
  selectionRows.value = selection;
  console.log(selectionRows.value.length)
}

export const isSelect= () =>{
  return selectionRows.value.length > 0;
}

export function nextStep(){
      if(isSelect()){
        dialogFormVisible.value=true;
        active.value++;
      }else{
        ElMessage({
          message: '至少选择一个数据',
          type: 'warning',
        })
      }
}


export const dialogFormVisibleOfFirstAuthen = ref(false)
//OfFirstAuthen
export const selectionRowsOfFirstAuthen:Ref<User3[]> = ref([]);

export function handleSelectionChangeOfFirstAuthen(selection:User3[]){
  selectionRowsOfFirstAuthen.value = selection;
  console.log(selectionRowsOfFirstAuthen.value.length)
}

export const isSelectOfFirstAuthen= () =>{
  return selectionRowsOfFirstAuthen.value.length > 0;
}

export function nextStepOfFirstAuthen(){
      if(isSelectOfFirstAuthen()){
        dialogFormVisibleOfFirstAuthen.value=true;
        active.value++;
      }else{
        ElMessage({
          message: '至少选择一个数据',
          type: 'warning',
        })
      }
}
//响应盒子
export function showDetails1(rowData:User3) {
  selectedRowData1.value = rowData;
  drawer1.value = true; // 假设您已经有一个名为 drawer 的响应式变量来控制 el-drawer 的显示
}

export const tableData=ref<User3[]>([
  {
    date:'123',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles在每个清晨的第一缕阳光中，我看到了无限可能的希望，感受到生命的无穷活力，心中涌动着对美好未来的渴望。无论遇到怎样的挑战和困难，我都愿意勇敢面对，坚定前行，因为我知道，只要心怀梦想，努力奋斗，终将迎来辉煌的人生。愿我们都能成为自己生命中最出色的那个人，活出精彩，活出自我，活出无悔。',
    imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href,
    id:'1236576898545234378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }
  ]},
  {
    date: '2016-05-02',
    name: 'John',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/布丁.png', import.meta.url).href,
    id:'5678998765456774378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },
  {
    date: '2016-05-04',
    name: 'Morgan',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
    id:'4567890098765454378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },
  {
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
    id:'5678909876545684378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },{
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/蛋糕.png', import.meta.url).href,
    id:'5678909876543454378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },{
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/饼干.png', import.meta.url).href,
    id:'7656876893456784378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },{
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href,
    id:'6871739274892984378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },{
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href,
    id:'8176232387183914378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },{
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href,
    id:'8278361739113094378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },{
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href,
    id:'1723612891789384378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },{
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href,
    id:'1276378247196184378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },{
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href,
    id:'1763218564169794378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },{
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href,
    id:'8725678908765434378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },{
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href,
    id:'1763761637169874378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },{
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href,
    id:'8725678908765434378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },{
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href,
    id:'8725678908765434378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },{
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href,
    id:'8725678908765434378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },{
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href,
    id:'8725678908765434378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },{
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href,
    id:'8725678908765434378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },{
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href,
    id:'8725678908765434378',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  },{
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href,
    id:'1764978191175544833',
    dataDetail:'这项数据交易是关于用户在社交媒体平台上的行为数据。该数据包括用户的个人资料信息、发帖内容、点赞和评论记录等。通过分析这些数据，可以揭示用户的兴趣爱好、行为习惯以及社交网络结构。这些信息对于个性化推荐、广告定向投放和社交网络营销具有重要的参考意义。我们可以通过这些数据来帮助企业更好地了解目标用户群体，提高营销效果和用户参与度。同时，我们也严格遵守数据隐私保护法律法规，确保用户数据安全和隐私保护。',
    standard:'ERC-721',
    datas:[{
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href,
      id:'4567890098765454378'
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href,
      id:'5678909876545684378'
    }]
  }
]
)

//消息弹出框
// import { ElMessage, ElMessageBox } from 'element-plus'


// 更新的open函数，现在接收一个回调函数作为参数
const open = (onConfirm: () => void) => {
  ElMessageBox.confirm(
    '将会把NFT删除！！需要再次上传数据使用',
    '警告',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  .then(onConfirm) // 如果用户确认，那么执行回调函数
  .catch(() => {
    ElMessage({
      type: 'info',
      message: '取消删除',
    });
  });
}

// deleteRow函数现在调用open，并在用户确认删除时执行删除逻辑
export const deleteRow = (id: number) => {
  open(() => {
    tableData.value = tableData.value.filter((data) => data.id !== id);
    ElMessage({
      type: 'success',
      message: '删除成功',
    });
  });
};
// export const open = () => {
//   ElMessageBox.confirm(
//     '您确定要删除您的代币吗?该操作会使得代币所绑定数据转回未绑定数据',
//     '警告',
//     {
//       confirmButtonText: '确定',
//       cancelButtonText: '取消',
//       type: 'warning',
//     },
   
//   )
//     .then(() => {

//       ElMessage({
//         type: 'success',
//         message: '已删除',
//       })
//     })
//     .catch(() => {
//       ElMessage({
//         type: 'info',
//         message: '删除取消',
//       })
//     })
// }




//中间echarts图1‘
export const InitChart1=(chartDom:HTMLElement)=>{
type EChartsOption = echarts.EChartsOption;

// var chartDom = document.getElementById('main')!;
var myChart = echarts.init(chartDom);
var option: EChartsOption;

// Generate data
let category = [];
let dottedBase = new Date();
let lineData = [];
let barData = [];
let oneWeekAgo = dottedBase.getTime()-(3600*24*19*1000);
for (let i = 0; i < 20; i++) {
  let date = new Date((oneWeekAgo + 3600 * 24 * i* 1000));
  category.push(
    [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
  );
  let b = Math.random() * 200;
  let d = Math.random() * 200;
  barData.push(b);
  lineData.push(d + b);
}

// option
option = {
  backgroundColor: 'rgba(10,193,199,0.1)',
  grid:{
    left:'10%',
    right: '10%',   // 右侧的距离
    top: '10%',     // 顶部的距离
    bottom: '20%'
  },
  // title: {
  //   text:'收入概况',
  //   left: 'center',
  //   top:'5%',
  //   textStyle: {
  //     color: 'white',
  //     fontFamily:'微软雅黑'
  //   }
  // },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  // legend: {
  //   right:'100',
  //   data: ['line'],
  //   textStyle: {
  //     color: '#ccc'
  //   }
  // },
  xAxis: {
    data: category,
    axisLine: {
      lineStyle: {
        color: '#ccc'
      }
    }
  },
  yAxis: {
    splitLine: { show: false },
    axisLine: {
      lineStyle: {
        color: '#ccc'
      }
    }
  },
  series: [
    {
      name: 'line',
      type: 'line',
      smooth: true,
      showAllSymbol: true,
      symbol: 'emptyCircle',
      symbolSize: 15,
      data: lineData
    },
    {
      name: 'line',
      type: 'bar',
      barGap: '-100%',
      barWidth: 10,
      itemStyle: {
        borderRadius: 5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#14c8d4' },
          { offset: 1, color: '#43eec6' }
        ])
      },
      z: -12,
      data: lineData
    }
  ]
};

option && myChart.setOption(option);}


//echartszhongjiantushang1
export const InitChart2=(chartDom2:HTMLElement)=>{
type EChartsOption2 = echarts.EChartsCoreOption;
var myChart2 = echarts.init(chartDom2);
var option2: EChartsOption2;

option2 = {
  // backgroundColor:'rgba(10,193,199,0.1)',
  title: {
    text: '数据类型租赁趋势',
    // subtext: 'Fake Data',
    textStyle:{
      color:'white'
    },
    top: 50,
    left: 10
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    type: 'scroll',
    bottom: 20,
    data: (function () {
      var list = [];
      for (var i = 18; i <= 25; i++) {
        list.push(i + 2000 + '');
      }
      return list;
    })()
  },
  visualMap: {
    top: 'middle',
    right: 10,
    color: ['red', 'yellow'],
    calculable: true
  },
  radar: {
    indicator: [
      { text: '图片', max: 400 },
      { text: '数字', max: 400 },
      { text: '视频', max: 400 },
      { text: '音频', max: 400 },
      { text: '文本', max: 400 }
    ]
  },
  series: (function () {
    var series = [];
    for (var i = 1; i <= 28; i++) {
      series.push({
        type: 'radar',
        symbol: 'none',
        lineStyle: {
          width: 1
        },
        
        emphasis: {
          areaStyle: {
            color: 'rgba(0,250,0,0.3)'
          }
        },
        data: [
          {
            value: [
              (40 - i) * 10,
              (38 - i) * 4 + 60,
              i * 5 + 10,
              i * 9,
              (i * i) / 2
            ],
            name: i + 2000 + ''
          }
        ]
      });
    }
    return series as echarts.RadarSeriesOption;
  })()
};

option2 && myChart2.setOption(option2);}


//层级确权二级确权的数据列表
interface User10{
  date:string,
  id:string,
  key:string,
  hash:string,
  standard:string
}

export const level2: User10[] =[{
  date:'2024-3-5',
  id:'8725678908765434378',
  key:'北京',
  hash:'4a2516ed86d68141c2ce4e16228c223b',
  standard:'ERC-721'

  },
  
  {
    date:'2024-3-4',
    id:'0987654321234567889',
    key:'上海',
    hash:'4a2516ed86d68141c2ce4e16228c223b',
    standard:'ERC-721'
  },

  {
    date:'2024-3-4',
    id:'0987654321234567889',
    key:'上海',
    hash:'4a2516ed86d68141c2ce4e16228c223b',
    standard:'ERC-721'
  },


  {
    date:'2024-3-4',
    id:'0987654321234567889',
    key:'上海',
    hash:'4a2516ed86d68141c2ce4e16228c223b',
    standard:'ERC-721'
  },


  {
    date:'2024-3-4',
    id:'0987654321234567889',
    key:'上海',
    hash:'4a2516ed86d68141c2ce4e16228c223b',
    standard:'ERC-721'
  },


  {
    date:'2024-3-4',
    id:'0987654321234567889',
    key:'上海',
    hash:'4a2516ed86d68141c2ce4e16228c223b',
    standard:'ERC-721'
  },

  {
    date:'2024-3-4',
    id:'0987654321234567889',
    key:'上海',
    hash:'4a2516ed86d68141c2ce4e16228c223b',
    standard:'ERC-721'
  },

  {
    date:'2024-3-4',
    id:'0987654321234567889',
    key:'上海',
    hash:'4a2516ed86d68141c2ce4e16228c223b',
    standard:'ERC-721'
  },

  {
    date:'2024-3-4',
    id:'0987654321234567889',
    key:'上海',
    hash:'4a2516ed86d68141c2ce4e16228c223b',
    standard:'ERC-721'
    
  },


  
]


//层级确权的选择数据的drawer
export const drawerofFirstAuthen = ref(false)
// export const drawer2 = ref(false)
export const directionofFirstAuthen = ref('rtl')

export const selectedRowDataofFirstAuthen: Ref<Users | null> = ref(null);

export function showDetailsofFirstAuthen(rowData:Users) {
  selectedRowDataofFirstAuthen.value = rowData;
  drawerofFirstAuthen.value = true; // 假设您已经有一个名为 drawer 的响应式变量来控制 el-drawer 的显示
}


//层级确权的一级确权的drawer
export const drawerofFirstAuthen1 = ref(false)
// export const drawer2 = ref(false)
export const directionofFirstAuthen1 = ref('rtl')

export const selectedRowDataofFirstAuthen1: Ref<User3 | null> = ref(null);

export function showDetailsofFirstAuthen1(rowData:User3) {
  selectedRowDataofFirstAuthen1.value = rowData;
  drawerofFirstAuthen1.value = true; // 假设您已经有一个名为 drawer 的响应式变量来控制 el-drawer 的显示
}

//层级确权的er级确权的drawer
export const drawerofSecondAuthen2 = ref(false)
// export const drawer2 = ref(false)
export const directionofSecondAuthen2 = ref('rtl')

export const selectedRowDataofSecondAuthen2: Ref<User10 | null> = ref(null);

export function showDetailsofSecondAuthen2(rowData:User10) {
  selectedRowDataofSecondAuthen2.value = rowData;
  drawerofSecondAuthen2.value = true; // 假设您已经有一个名为 drawer 的响应式变量来控制 el-drawer 的显示
}

export interface SBT {
  value:string
  label:string
}
export const SBToptions : SBT[]= [{
value:'34567890987654',
label:'334567890987654'
},{
  value:'98765434567899',
  label:'498765434567899'
},{
  value:'456987654345690',
  label:'2456987654345690'
},{
  value:'64567809976543',
  label:'464567809976543'
},{
  value:'87654567890987',
  label:'287654567890987'
}]