<script setup lang="ts">
import { Header } from '@/components';
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
import { ElementPlus, UploadFilled } from '@element-plus/icons-vue'
import { Edit, Picture, Upload } from '@element-plus/icons-vue'
import {uploadContractData,getContractResult,modifyContract,gpt_detect} from '@/api'
import { ElMessage } from 'element-plus'
import RightTwo from '@/components/RightTwo.vue'
import LeftTwo from '@/components/LeftThree.vue'
import { defineComponent} from 'vue';
import axios from 'axios';
import { param } from 'jquery';
// 热力图和关系图的容器
const heatmapRef = ref<HTMLElement | null>(null);
const graphRef = ref<HTMLElement | null>(null);
const raceRef = ref<HTMLElement | null>(null);
const rightRef = ref<HTMLElement | null>(null);
//isSafe代表合约是否安全
const isSafe = ref(false);
//如果还没有上传智能合约
const isUploaded = ref(false);
const active = ref(0);
const Show_result = ref("");
const Bug = ref("");
const Show_bug = ref([])
const flag = ref(false)
const fixed_code = ref("")
const fixed_suggestions = ref("")
const loading = ref(false)
//留出空间来接收结果给模型
const resultofModel = ref('智能合约漏洞检测结果');
const loadingText = 'Loading...'.split('')

let heatmapChart: echarts.ECharts | null = null;
let graphChart: echarts.ECharts | null = null;
let raceChart: echarts.ECharts | null = null;
let myChart: echarts.ECharts | null = null;

onMounted(() => {
    // 初始化热力图
    if (heatmapRef.value) {
        heatmapChart = echarts.init(heatmapRef.value);
        const hours = [
            '12a', '1a', '2a', '3a', '4a', '5a', '6a',
            '7a', '8a', '9a', '10a', '11a',
            '12p', '1p', '2p', '3p', '4p', '5p',
            '6p', '7p', '8p', '9p', '10p', '11p'
        ];
        const days = ['周六', '周五', '周四', '周三', '周二', '周一', '周日'];

        // 生成 50-100 之间的随机数据
        const data = [];
        for (let i = 0; i < days.length; i++) {
            for (let j = 0; j < hours.length; j++) {
                data.push([j, i, Math.floor(Math.random() * (100 - 50 + 1)) + 50]);
            }
        }

        const heatmapOption = {
            tooltip: { position: 'top' },
            grid: { height: '80%', top: '4%' },
            xAxis: { type: 'category', data: hours, splitArea: { show: true }, axisLabel: { color: '#fff' } },
            yAxis: { type: 'category', data: days, splitArea: { show: true }, axisLabel: { color: '#fff' } },
            visualMap: { min: 50, max: 100, calculable: true, orient: 'horizontal', left: 'center', bottom: '33%', textStyle: { color: '#fff' } },
            series: [{
                name: 'Call times',
                type: 'heatmap',
                data: data,
                label: { show: true }, // 显示格子上的数字
                emphasis: {
                    itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' }
                }
            }]
        };

        heatmapChart.setOption(heatmapOption);
    }

    // 初始化关系图
    if (graphRef.value) {
        graphChart = echarts.init(graphRef.value);
        
        // 交易关系数据
        const graph = {
            nodes: [
                { id: '1783445843648794626', name: 'Myself', value: 15 },
                { id: '1785557673573941250', name: '用户B', value: 25 },
                { id: '1785557673573941346', name: '用户C', value: 10 },
                { id: '1568057673573941250', name: '用户D', value: 40 },
                { id: '1785523352173941250', name: '用户E', value: 18 },
                { id: '1568057673573941251', name: '用户D', value: 40 },
                { id: '1568057673573941252', name: '用户D', value: 12 },
                { id: '1568057673573941253', name: '用户D', value: 33 },
                { id: '1568057673573941254', name: '用户D', value: 21 },
                { id: '1568057673573941255', name: '用户D', value: 22 },
                { id: '1568057673573941256', name: '用户D', value: 4},
            ],
            links: [
                { source: '1785557673573941250', target: '1783445843648794626', value: 10 },
                { source: '1785557673573941250', target: '1783445843648794626', value: 5 },
                { source: '1568057673573941250', target: '1783445843648794626', value: 20 },
                { source: '1785557673573941346', target: '1783445843648794626', value: 8 },
                { source: '1785523352173941250', target: '1783445843648794626', value: 30 },
                { source: '1568057673573941251', target: '1783445843648794626', value: 8 },
                { source: '1568057673573941252', target: '1783445843648794626', value: 21 },
                { source: '1568057673573941253', target: '1783445843648794626', value: 32 },
                { source: '1568057673573941254', target: '1783445843648794626', value: 18 },
                { source: '1568057673573941255', target: '1783445843648794626', value: 12 },
                { source: '1568057673573941256', target: '1783445843648794626', value: 1 },
            ]
        };

        // 计算颜色深度（基于交易次数）
        function getColor(value: number) {
            let intensity = Math.min(1, value / 30); // 归一化交易次数（假设30为最大值）
            return `rgba(255, 255, 0, ${0.3 + 0.7 * intensity})`; // 蓝色，交易次数越多，透明度越低
        }

        const graphOption = {
            tooltip: {
                trigger: 'item',
                formatter: function (params: any) {
                    if (params.dataType === 'node') {
                        return `${params.data.name}（交易频率: ${params.data.value}）`;
                    } else {
                        return `交易次数: ${params.data.value}`;
                    }
                }
            },
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    force: {
                        repulsion: 200
                    },
                    data: graph.nodes.map(node => ({
                        ...node,
                        symbolSize: node.value, // 交易频率决定节点大小
                        itemStyle: { color: 'yellow' } // 统一蓝色
                    })),
                    links: graph.links.map(link => ({
                        ...link,
                        lineStyle: { color: getColor(link.value), width: Math.max(1, link.value / 10) } // 交易次数决定颜色深度和线宽
                    })),
                    roam: true,
                    label: {
                        show: true,
                        position: 'right',
                        color: '#fff'
                    }
                }
            ]
        };

        graphChart.setOption(graphOption);
    }

    if(raceRef.value){
        raceChart = echarts.init(raceRef.value)
        // 图表配置
  const appConfig = {
    position: 'insideBottom' as const,
    distance: 15,
    align: 'left' as const,
    verticalAlign: 'middle' as const,
    rotate: 90
  }
  
  const labelOption: BarLabelOption = {
    show: true,
    position: appConfig.position,
    distance: appConfig.distance,
    align: appConfig.align,
    verticalAlign: appConfig.verticalAlign,
    rotate: appConfig.rotate,
    formatter: '{c}%  ',
    fontSize: 7,
    rich: {
      name: {}
    }
  }
  
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params: any) {
        let result = params[0].name + '<br>'
        params.forEach((item: any) => {
          const value = item.value ? `${item.value}${item.seriesName === '准确率' ? '%' : ''}` : '-'
          result += `${item.marker} ${item.seriesName} : ${value}<br>`
        })
        return result
      },
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // 设置提示框背景颜色
      textStyle: {
        color: '#FFFFFF' // 设置提示框字体颜色
      }
    },
    legend: {
      data: ['可重入', '委托调用', '时间戳', '整数溢出'],
      textStyle: {
        fontSize: 12,
        color: '#FFFFFF'
      }
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['准确率', '精确率', '召回率', 'F1分数'],
        axisLabel: {
          color: '#7EB7FD',
          fontSize: 13
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        max: 100,  // 调整最大值，原本为100
        axisLabel: {
          formatter: '{value}%', // Y轴显示百分比
          color: '#7EB7FD',
          fontSize: 12
        },
        splitLine: {
          show: false
        }
      }
    ],
  
    series: [
      {
        name: '时间戳',
        type: 'bar',
        barWidth: 13,  // 调整柱宽
        barGap: '30%',  // 调整柱间距
        label: {
          ...labelOption
        },
        emphasis: {
          focus: 'series'
        },
        data: [88.46, 92.45, 85.96, 89.09],
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0],
          color: '#37a2da'
        }
      },
      {
        name: '委托调用',
        type: 'bar',
        barWidth: 13,
        barGap: '30%',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [96.55, 100, 90, 94.74],
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0],
          color: '#32c5e9'
        }
      },
      {
        name: '整数溢出',
        type: 'bar',
        barWidth: 13,
        barGap: '30%',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [91.46, 82.14, 92, 86.79],
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0],
          color: '#67e0e3'
        }
      },
      {
        name: '可重入',
        type: 'bar',
        barWidth: 13,
        barGap: '30%',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [97.53, 100, 91.67, 95.65],
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0],
          color: '#9fe6b8'
        }
      }
    ],
    grid: {
      containLabel: true,
      left: '2%',
    //   right: '6%',
      bottom: '16%',
      top: '16%'
    }}
   raceChart.setOption(option);
    }


    if (rightRef.value) {
    // 初始化 ECharts 图表
    myChart = echarts.init(rightRef.value);
    
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#fff',
          },
        },
      },
      legend: {
        top: '0%',
        data: ['生成', '修复', '检测'],
        textStyle: {
          color: 'white',
        },
      },
      grid: {
        left: '10',
        top: '30',
        right: '10',
        bottom: '10',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 12,
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.2)',
            },
          },
          data: [
            '01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12',
            '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
          ],
        },
        {
          axisPointer: { show: false },
          axisLine: { show: false },
          position: 'bottom',
          offset: 20,
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)',
            },
          },
          axisLabel: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 12,
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)',
            },
          },
        },
      ],
      series: [
        {
          name: '检测',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            color: '#00d887',
            width: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 216, 135, 0.4)' },
              { offset: 0.8, color: 'rgba(0, 216, 135, 0.1)' },
            ], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
          },
          itemStyle: {
            color: '#00d887',
            borderColor: 'rgba(221, 220, 107, .1)',
            borderWidth: 12,
          },
          data: [
            5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4,
          ],
        },
        {
          name: '修复',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            color: '#0179c1',
            width: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 216, 135, 0.4)' },
              { offset: 0.8, color: 'rgba(0, 216, 135, 0.1)' },
            ], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
          },
          itemStyle: {
            color: '#0179c1',
            borderColor: 'rgba(221, 220, 107, .1)',
            borderWidth: 12,
          },
          data: [
            8, 5, 12, 10, 3, 14, 7, 9, 2, 13, 11, 6, 4, 1, 10, 3, 13, 7, 8, 6, 14, 2,
            11, 4,
          ],
        },
        {
          name: '生成',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            color: '#00d8c1',
            width: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 216, 135, 0.4)' },
              { offset: 0.8, color: 'rgba(0, 216, 135, 0.1)' },
            ], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
          },
          itemStyle: {
            color: '#00d887',
            borderColor: 'rgba(221, 220, 107, .1)',
            borderWidth: 12,
          },
          data: [
            11, 4, 9, 8, 13, 7, 3, 6, 14, 5, 2, 10, 1, 12, 4, 13, 7, 11, 9, 2, 8, 14,
            10, 6,
          ],
        },
      ],
    };

    myChart.setOption(option);

  }
});

// 模拟合约结果获取函数
function deployContract() {
    //设置安全标志
    isSafe.value = true; // 重置合约安全状态
    // 模拟合约部署逻辑
    setTimeout(() => {
        isSafe.value = true; // 假设合约部署成功且安全
        console.log('合约部署成功！');
        ElementPlus.ElMessage.success('合约部署成功！'); // 使用 Element Plus 的消息提示
    }, 2000); // 模拟延迟
}

function handleChange(file: any) {
  //防止文件重复上传
  if(!isUploaded.value){
    isUploaded.value = true; // 文件上传状态为已上传
     // 处理文件上传逻辑
    console.log('Uploaded file:', file.raw);
    //调用上传函数
    uploadFile(file.raw);
   
    active.value=+1; // 设置当前步骤为第二步
  }  
}
// 复制到剪贴板的方法
const copyToClipboard = () => {
      // 将 fixed_suggestions 和 fixed_code 合并成一个字符串
      const contentToCopy = `修复建议：\n${fixed_suggestions.value}\n\n修复后的代码：\n${fixed_code.value}`;
      
      // 使用 Clipboard API 复制到剪贴板
      navigator.clipboard.writeText(contentToCopy).then(() => {
        // 提示复制成功
        ElMessage.success('内容已复制到剪贴板！');
      }).catch((err: any) => {
        // 提示复制失败
        ElMessage.error('复制失败，请重试！');
      });
    };

const uploadFile = async (file) => {
    try {
      console.log("调用")
        loading.value = true;
        const formData = new FormData();
        // formData.append('file', file.raw); // 假设 file 是你要上传的文件对象
        formData.append('file', file); 
         // ✅ 加入 userId 参数（假设你有个变量保存了 userId）
        const user_Id = localStorage.getItem("userId");  // 请根据你的登录逻辑动态获取
        formData.append('userId', user_Id);  // ✅ 加到 formData 里
        console.log("formData:",formData.get('userId'))
        console.log("user_Id",user_Id)

        // 调用 API 接口进行文件上传
        const response = await axios({
          url: 'http://47.95.32.149:5000/gpt',  // 后端接口地址
          method: 'post',
          data: formData,  // 传递 FormData 数据
          
        }).then((response =>{
          console.log("121111111111111111111111111111111111")
          console.log("res:",response.data);
          Show_result.value = response.data.GPT;
          console.log("Show_result:",Show_result._rawValue);
          Bug.value = Show_result._rawValue;
          
          if(Bug.value.delegatecall === "没有漏洞"){
            Show_bug.value[0]="不存在委托调用漏洞";
            
          }else {
            Show_bug.value[0]="存在委托调用漏洞";
          }

          if(Bug.value.integreoverflow === "没有漏洞"){
            Show_bug.value[1]="不存在整数溢出漏洞";
          }else {
            Show_bug.value[1]="存在整数溢出漏洞";
          }

          if(Bug.value.reentrancy === "没有漏洞"){
            Show_bug.value[2]="不存在可重入漏洞";
          }else {
            Show_bug.value[2]="存在可重入漏洞";
          }

          if(Bug.value.timestamp_bug === "没有漏洞"){
            Show_bug.value[3]="不存在时间戳漏洞";
          }else {
            Show_bug.value[3]="存在时间戳漏洞";
          }

          flag.value = true;
          console.log("bug:",Show_bug.value)
          console.log("fixed code:",response.data.restore.restored_code)

          // 下面是关于智能合约修复的内容
          if(response.data.restore.restored_code != null){
            isSafe.value = false;
            // 弹出警告提示
            ElMessage({
                message: '您的智能合约代码存在漏洞，系统已为您修复，请您在确认该智能合约安全之后再次部署智能合约！',
                type: 'warning',  // 弹出警告消息
                duration: 5000,  // 持续时间，单位是毫秒，5秒后自动消失
            });

            fixed_code.value = response.data.restore.restored_code;
            fixed_suggestions.value = response.data.restore.detectors_output;
            console.log("fixed code:",fixed_code.value)
            console.log("fixed suggestions:",fixed_suggestions.value)
          }else{
            isSafe.value = true;
            // 弹出成功提示
            ElMessage({
                message: '您的智能合约代码没有漏洞，您的合约已成功部署！',
                type: 'success',  // 弹出成功消息
                duration: 5000,  // 持续时间，单位是毫秒，5秒后自动消失
            });
          }
        }))
        

        


        // 处理上传成功后的逻辑
        isUploaded.value = true; // 设置文件已上传
        loading.value = false;
        // // 获取合约结果并打印
        // resultofModel.value = await getContractResult();
        // console.log(resultofModel.value);

        // // 判断合约是否安全
        // if (response.data.isSafe) {
        //     isSafe.value = true; // 合约安全
        //     console.log('合约安全');
        //     active.value=+1;
        //     // 处理合约安全的逻辑，例如部署合约等
        //     deployContract(); // 调用部署合约的函数
        // } else {
        //     isSafe.value = false; // 合约不安全
        //     console.log('合约不安全');

        //     // 如果合约不安全，则调用漏洞修复模块
        //     try {
        //         const repairResponse = await modifyContract(file);
        //         console.log('合约修复成功:', repairResponse.data);
        //         // 处理修复成功后的逻辑
        //         isSafe.value = true; // 合约安全
        //         active.value=+1;
        //         deployContract(); // 调用部署合约的函数
        //         console.log('合约修复成功，准备部署合约！');
        //     } catch (error) {
        //         console.error('Error modifying contract:', error);
        //         // 可以在这里给用户一个提示，例如
        //         alert('合约修复失败，请稍后重试。');
        //     }
        // }
    } catch (error) {
        console.error('Error uploading file:', error);
        // 上传失败时的处理逻辑，例如提示用户上传失败
        alert('文件上传失败，请检查文件格式或网络连接。');
    }

    // 处理上传成功后的逻辑（文件上传成功的地方）
    console.log('File uploaded successfully:', file);
}


// 组件销毁时，释放 ECharts 资源
onUnmounted(() => {
    if (heatmapChart) {
        heatmapChart.dispose();
        heatmapChart = null;
    }
    if (graphChart) {
        graphChart.dispose();
        graphChart = null;
    }
    if(raceChart){
        raceChart.dispose();
        raceChart = null;
    }
    if(rightRef){
        myChart.dispose();
        myChart = null;
    }
});
</script>

<template>
    <Header title="智能合约检测与修复" />
      <div class="container">
          <div class="steps" style="height: 600px; max-width: 600px;left:640px;position:relative;top:20px;">
            <el-steps direction="vertical" :active="active">
              <el-step title="上传文件" :icon="Edit" />
              <el-step title="漏洞检测" :icon="Upload" />
              <el-step title="合约部署" :icon="Picture" />
            
            </el-steps>
          </div>
          <div class="chart-container" >
              <RightTwo></RightTwo>
              <div class="topTwo" >
                  
                  <div ref="raceRef" class="chart-boxmin"></div>
                  <!-- <div ref="graphRef" class="chart-boxmin"></div> -->
                  
              </div>
             
              <!-- <div ref="heatmapRef" class="chart-box"></div> -->
            </div>

          <!-- 检测智能合约 -->
          <div class="check-container">
            <el-upload
                class="upload-demo"
                drag
                action="http://47.95.32.149:5000/gpt"
                multiple
                :onChange="handleChange"
                
              >
              <el-icon class="el-icon--upload" ><upload-filled style="background-color:transparent"/></el-icon>
              <div class="el-upload__text">
                拖拽或者<em>点击上传</em>
              </div>
              <!-- <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 500kb
                </div>
              </template> -->
            </el-upload>
            <div class="check-box">
              
                <div class="check-title">检测智能合约</div>
                <!-- 写一个三行的按钮来进行三种智能合约的检测 -->
                <!-- <div class="check-button-container">
                    <el-button class="check-button" type="primary">检测NFT申请合约</el-button>
                    <el-button class="check-button" type="primary">检测SBT申请合约</el-button>
                    <el-button class="check-button" type="primary">检测数据交易合约</el-button>
                </div> -->
                <!-- 结果输出区域 -->
                <div class="result-contanier">
                  <div v-if="!flag">
                    {{resultofModel}}
                  </div>
                  <div v-else class="bug-list" style="text-align: center;">
                  <div v-for="(item, index) in Show_bug" :key="index" class="bug-item">
                    {{ item }}
                  </div>
                </div>
                </div>
            </div>
            <div class="check-box1">
              <div v-if="!isUploaded" style="margin-top:-10px;">
                    <!-- 如果没有上传文件，显示一个图片 -->
                  <el-empty image="/assets/image/null.png" description="请上传文件" style="margin-top:70px;"/>
                    <!-- <p>请上传文件以继续</p> -->
              </div>
                <div v-if="loading" class="loading-text">
                  <span v-for="(char, index) in loadingText" :key="index" :style="{ animationDelay: `${index * 0.1}s` }">
                    {{ char }}
                  </span>
                </div>
                <div v-if="!isSafe" class="loading-text">
               
                      <div v-if="Show_bug.length > 0" class="code-container">
                        <div class="code-scroll">
                          <p class="animated-label">修复建议：</p>
                          <pre>{{ fixed_suggestions }}</pre>
                          <p class="animated-label">修复后的代码：</p>
                          <pre>{{ fixed_code }}</pre>
                          <el-button @click="copyToClipboard" type="primary" style="position:relative;right:-340px;">复制到剪贴板</el-button>
                        </div>
                      </div>
               </div>
               <div v-else class="loading-text">
                  <p class="animated-label">您的合约不存在漏洞，已部署成功！</p>
                </div>
             </div>
         </div> 
         <div class="rightRef" style="width:300px;height:800px;display:flex;flex-direction: column;">
            <div ref="rightRef" class="PingTai" style="width:500px;height:470px;right:330px;top:0px;"></div>
            <div ref="heatmapRef" class="chart-box" style="right:350px;"></div>
          </div>
     </div>
</template>

<style lang="less" scoped>
// .el-empty__image img{
//   top:-30px;
// }
.animated-label {
  font-weight: bold;
  font-size: 18px;
  background: linear-gradient(90deg, #ff004c, #ff00ae, #d400ff);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: gradientText 3s linear infinite;
}

@keyframes gradientText {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 100% center;
  }
}

.loading-text {
  display: flex;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  left:200px;
  top:70px;
}

.loading-text span {
  display: inline-block;
  animation: bounce 1.2s infinite ease-in-out, colorShift 2s infinite linear;
  background: linear-gradient(90deg, #ff6ec4, #7873f5, #4facfe, #00f2fe);
  background-size: 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes colorShift {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
.code-container {
    width: 100%;   /* 使容器宽度为 100% */
    height: 300px; /* 设置固定高度 */
    overflow-y: auto; /* 当内容超出高度时，显示垂直滚动条 */
    border: 1px solid transparent; /* 可选，添加边框 */
    padding: 10px; /* 可选，内部填充 */
    background-color:transparent; /* 可选，背景颜色 */
}

.code-scroll {
    white-space: pre-wrap; /* 保留空格和换行 */
    word-wrap: break-word; /* 允许长单词换行 */
    font-family: 'Courier New', Courier, monospace; /* 设置等宽字体 */
    font-size: 20px; /* 调整字体大小 */
}

.el-upload-dragger{
  background-color:transparent !important;
}
.element.style{
  left:-200px !important;
} 
.PingTai{
width: 100%;
height: 100%;
margin: 0 auto;
position: relative;
top:20px;
right:240px;
}
.el-empty{
  --el-empty-padding:0px;
}
.el-empty__description p{
  color:white;
}
.chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 220px;
    // left:-1100px;
    margin-left:150px;
    margin-top:0px;
    // position:absolute;
    // left:100px
}

.topTwo{
    display:flex;
    flex-direction:row;
    gap:10px;
    width:800px;
    height:400px;
}

.chart-boxmin{
    width:510px !important;
    height:500px;
    position:relative;
    left:-100px;
    top:120px;
}

.chart-box {
    width: 580px;
    height:700px !important;
    position:relative;
    top:10px;
}

.el-upload .el-upload-dragger{
  background-color:transparent !important;
}

.check-container{
    display:flex;
    flex-direction:column;
    position:relative;
    right:330px;
}

.check-box{
    background:rgba(10, 193, 199, 0.2);
    height:200px;
    width:500px;
    margin: 10px;
}

.check-box1{
  background:rgba(10, 193, 199, 0.2);
    height:330px;
    width:500px;
    margin: 10px;
}
.container {
    display: flex; /* 让子元素横向排列 */
    justify-content: center; /* 居中 */
    align-items: flex-start; /* 顶部对齐 */
    gap: 20px; /* 两个容器之间的间距 */
    margin-top: 20px; /* 调整整体位置 */
    width:100%;
    
}

.check-title{
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
}

.check-button-container{
    display: flex;
    flex-direction: row; /* 垂直排列 */
    justify-content: center;
    align-items: center; /* 居中 */
    gap: 40px; /* 按钮之间的间距 */
    margin-top: 30px; /* 调整按钮位置 */
    margin-bottom: 10px; /* 调整按钮位置 */
    // margin-left: -420px; /* 调整按钮位置 */
}

.check-button{
    height:50px;
}

.result-contanier{
    // background-color: rgba(10, 193, 199, 0.5);
    width:90%;
    height: 140px;
    margin-left:28px;
    border:1px dashed #fff;
    display: flex;
    justify-content: center;   
    //垂直居中
    align-items: center; 
}
</style>
