//数据类型选择器
import * as echarts from 'echarts';
import { isWhiteSpaceLike, type NumericLiteral } from 'typescript';
import {computed,ref, toRefs, type Ref} from 'vue'

 export const value =ref('')
export const options = [
  {
    value: '图片',
    label: '图片',
  },
  {
    value: '数字',
    label: '数字',
  },
  {
    value: '视频',
    label: '视频',
  }]

export const selector1 = ref('')
export const search = ref('')
export const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      (!search.value ||
      data.Keyword.toLowerCase().includes(search.value.toLowerCase())) && (!selector1.value || data.kindOfdata === selector1.value)
))

//详情框

//侧边框
export const activeName = ref('first')

export const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
export const drawer = ref(false)
export const direction = ref('rtl')
export const handleRowClick = (row) => {
  showDetails()
}

interface User3 {
    date: string
    name: string
    address: string
    Keyword:string
    kindOfdata:string
    price:string
    imageUrl:string
  }

export const selectedRowData: Ref<User3 | null> = ref(null);  
export const selectedRowData1: Ref<User3 | null> = ref(null);
export const tableData: User3[] = [
    {
      date:'123',
      name: 'Tom',
      address: '北京企业',
      Keyword:'2019年疫情分布情况',
      kindOfdata:'图片',
      price:'0.002 Pol',
      imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href
    },
    {
      date: '2016-05-02',
      name: 'John',
      address: 'No. 189, Grove St, Los Angeles',
      Keyword:'2020年疫情清零时间节点',
      kindOfdata:'数字',
      price:'0.002 Pol ',
      imageUrl:new URL('../../public/assets/nft/布丁.png', import.meta.url).href
    },
    {
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
      Keyword:'2020年双十一京东各产品销售数额',
      kindOfdata:'数字',
      price:'0.002 Pol ',
      imageUrl:new URL('../../public/assets/nft/橙子.png', import.meta.url).href
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      Keyword:'2021年双十一京东各产品销售数额',
      kindOfdata:'数字',
      price:'0.002 Pol ',
      imageUrl:new URL('../../public/assets/nft/葱花.png', import.meta.url).href
    },{
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      Keyword:'2023年春运每天各高铁站人数',
      kindOfdata:'数字',
      price:'0.002 Pol ',
      imageUrl:new URL('../../public/assets/nft/蛋糕.png', import.meta.url).href
    },{
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      Keyword:'2023年各高校招生本科生人数',
      kindOfdata:'数字',
      price:'0.002 Pol ',
      imageUrl:new URL('../../public/assets/nft/饼干.png', import.meta.url).href
    },{
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      Keyword:'2024年元旦各景点人流量',
      kindOfdata:'数字',
      price:'0.002 Pol ',
      imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href
    },{
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
      Keyword:'2024年元旦各景点某一时间点图片',
      kindOfdata:'图片',
      price:'0.002 Pol ',
      imageUrl:new URL('../../public/assets/nft/冰棍.png', import.meta.url).href
    }
  ]

  export function showDetails(rowData:User3) {
    selectedRowData.value = rowData;
    drawer.value = true; // 假设您已经有一个名为 drawer 的响应式变量来控制 el-drawer 的显示
  }

  