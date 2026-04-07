import { citys, worldLine, tjLine, tjDistrict } from "./constant"
import * as echarts from 'echarts'
import location from './location.json'
import useFileLoader from '@/hooks/useFileLoader';
import { getObjToken } from "../api";

const { requestData } = useFileLoader();

export const getMapOptions = async (name = null) => {
    if (name) {
        // 遍历location的每个属性,查找文件名字
        for (const key in location) {
            if (location[key].name.includes(name)) {
                // 如果后四位是0000，说明是省份
                const isProvince = location[key].adcode % 10000 === 0;
                // 注册地图
                const mapJSON = await requestData(`./map/${isProvince ? 'province' : 'city'}/${location[key].adcode}.json`);
                echarts.registerMap(name, mapJSON);
                break;
            }
        }
    }
    // 不传参数默认注册中国地图
    else {
        const china = await requestData('./map/china.json');
        echarts.registerMap('china', china);
    }
    return {
        legend: {
            show: false,
        },
        geo: {
            roam: true,
            map: name ? name : 'china',
            emphasis: {
                label: {
                    show: false,
                },
            },
            zoom: 0.8,
            itemStyle: {
                borderColor: 'rgb(255,209,163)', //区域边框颜色
                areaColor: 'rgba(73,86,166,.1)', //区域颜色
                borderWidth: 0.5, //区域边框宽度
                shadowBlur: 5,
                shadowColor: 'rgba(107,91,237,.7)',
                emphasis: {
                    borderColor: '#FFD1A3',
                    areaColor: 'rgba(102,105,240,.3)',
                    borderWidth: 1,
                    shadowBlur: 5,
                    shadowColor: 'rgba(135,138,255,.5)',
                },
            },
        },
        series: [
            {
                name: '地点',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke',
                },
                emphasis: {
                    label: {
                        show: true,
                        position: 'right',
                        formatter: '{b}',
                    },
                },
                symbolSize: 2,
                showEffectOn: 'render',
                itemStyle: {
                    color: '#46bee9',
                },
                data: name ? tjDistrict : citys,
            },
            {
                name: '线路',
                type: 'lines',
                coordinateSystem: 'geo',
                zlevel: 2,
                zoom: 1,
                large: true,
                effect: {
                    show: true,
                    constantSpeed: 30,
                    symbol: 'pin',
                    symbolSize: 3,
                    trailLength: 0,
                },
                lineStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: '#58B3CC',
                            },
                            {
                                offset: 1,
                                color: '#F58158',
                            },
                        ],
                        false
                    ),
                    width: 1,
                    opacity: 0.2,
                    curveness: 0.1,
                },
                data: name ? tjLine : worldLine,
            },
        ]
    }
}

export const rentAndSellOptions = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#dddc6b'
            }
        }
    },
    legend: {
        top: '0%',
        data: ['合法数据', '非法数据'],
        textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12',
        }
    },
    grid: {
        left: '10',
        top: '30',
        right: '15',
        bottom: '10',
        containLabel: true
    },

    xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLabel: {
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
            },
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.2)'
            }

        },

        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '10月', '11月', '12月']

    }, {

        axisPointer: { show: false },
        axisLine: { show: false },
        position: 'bottom',
        offset: 20,
    }],

    yAxis: [{
        type: 'value',
        axisTick: { show: false },
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.1)'
            }
        },
        axisLabel: {
            formatter: '{value} ',
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
            },
        },

        splitLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.1)'
            }
        }
    }],
    series: [
        {
            name: '合法数据',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {

                normal: {
                    color: '#0184d5',
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(1, 132, 213, 0.4)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(1, 132, 213, 0.1)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                }
            },
            itemStyle: {
                normal: {
                    color: '#0184d5',
                    borderColor: 'rgba(221, 220, 107, .1)',
                    borderWidth: 12
                }
            },
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500) + 150)

        },
        {
            name: '非法数据',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {

                normal: {
                    color: '#00d887',
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0, 216, 135, 0.4)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(0, 216, 135, 0.1)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                }
            },
            itemStyle: {
                normal: {
                    color: '#00d887',
                    borderColor: 'rgba(221, 220, 107, .1)',
                    borderWidth: 12
                }
            },
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 15)

        },

    ]

}

export const rateOptions = {
    grid: {
        top: "25%",
        bottom: "10%"
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
            label: {
                show: true
            }
        }
    },
    legend: {
        data: ["确权数量", "同比"],
        top: "10%",
        textStyle: {
            color: "#fff"
        }
    },
    xAxis: {
        data: [
            "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
        ],
        axisLine: {
            show: true,
            lineStyle: {
                color: 'rgba(255,255,255,.2)'
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: "rgba(255,255,255,.5)" //X轴文字颜色
            }
        },

    },
    yAxis: [{
        type: "value",
        name: "千万",
        nameTextStyle: {
            color: "rgb(255,255,255)"
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: true
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: 'rgba(255,255,255,.1)'
            }
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: "rgba(255,255,255,.6)"
            }
        },

    },
    {
        type: "value",
        name: "同比",
        nameTextStyle: {
            color: "rgb(255,255,255)"
        },
        position: "right",
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisLabel: {
            show: true,
            formatter: "{value} %", //右侧Y轴文字显示
            textStyle: {
                color: "rgba(255,255,255,.5)"
            }
        }
    },
    {
        type: "value",
        gridIndex: 0,
        min: 50,
        max: 100,
        splitNumber: 8,
        splitLine: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        splitArea: {
            show: true,
            areaStyle: {
                color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
            }
        }
    }
    ],
    series: [{
        name: "同比",
        type: "line",
        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
        smooth: true, //平滑曲线显示
        showAllSymbol: true, //显示所有图形。
        symbol: "circle", //标记的图形为实心圆
        symbolSize: 10, //标记的大小
        itemStyle: {
            //折线拐点标志的样式
            color: "#058cff"
        },
        lineStyle: {
            color: "#058cff"
        },
        areaStyle: {
            color: "rgba(5,140,255, 0.2)"
        },
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 5) + 1)
    },
    {
        name: "确权数量",
        type: "bar",
        barWidth: 15,
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#00FFE3"
                },
                {
                    offset: 1,
                    color: "#4693EC"
                }
                ])
            }
        },
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 5) + 1.23)
    }
    ]
};

export const getCircleOptions = (angle: number, value: number) => {
    const getCirlPoint = (x0, y0, r, angle) => {
        let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
        let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
        return {
            x: x1,
            y: y1
        }
    }

    return {
        title: {
            text: '{a|' + value + '}{c|%}',
            x: 'center',
            y: 'center',
            textStyle: {
                rich: {
                    a: {
                        fontSize: 15,
                        color: '#29EEF3'
                    },

                    c: {
                        fontSize: 15,
                        color: '#ffffff',
                        // padding: [5,0]
                    }
                }
            }
        },

        series: [
            // 紫色
            {
                name: "ring5",
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function (params, api) {
                    return {
                        type: 'arc',
                        shape: {
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                            startAngle: (0 + angle) * Math.PI / 180,
                            endAngle: (90 + angle) * Math.PI / 180
                        },
                        style: {
                            stroke: "#8383FA",
                            fill: "transparent",
                            lineWidth: 1.5
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {
                name: "ring5", //紫点
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function (params, api) {
                    let x0 = api.getWidth() / 2;
                    let y0 = api.getHeight() / 2;
                    let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6;
                    let point = getCirlPoint(x0, y0, r, (90 + angle))
                    return {
                        type: 'circle',
                        shape: {
                            cx: point.x,
                            cy: point.y,
                            r: 4
                        },
                        style: {
                            stroke: "#8450F9", //绿
                            fill: "#8450F9"
                        },
                        silent: true
                    };
                },
                data: [0]
            },
            // 蓝色

            {
                name: "ring5",
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function (params, api) {
                    return {
                        type: 'arc',
                        shape: {
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                            startAngle: (180 + angle) * Math.PI / 180,
                            endAngle: (270 + angle) * Math.PI / 180
                        },
                        style: {
                            stroke: "#4386FA",
                            fill: "transparent",
                            lineWidth: 1.5
                        },
                        silent: true
                    };
                },
                data: [0]
            },
            {
                name: "ring5", // 蓝色
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function (params, api) {
                    let x0 = api.getWidth() / 2;
                    let y0 = api.getHeight() / 2;
                    let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6;
                    let point = getCirlPoint(x0, y0, r, (180 + angle))
                    return {
                        type: 'circle',
                        shape: {
                            cx: point.x,
                            cy: point.y,
                            r: 4
                        },
                        style: {
                            stroke: "#4386FA", //绿
                            fill: "#4386FA"
                        },
                        silent: true
                    };
                },
                data: [0]
            },

            {
                name: "ring5",
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function (params, api) {
                    return {
                        type: 'arc',
                        shape: {
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                            startAngle: (270 + -angle) * Math.PI / 180,
                            endAngle: (40 + -angle) * Math.PI / 180
                        },
                        style: {
                            stroke: "#0CD3DB",
                            fill: "transparent",
                            lineWidth: 1.5
                        },
                        silent: true
                    };
                },
                data: [0]
            },
            // 橘色

            {
                name: "ring5",
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function (params, api) {
                    return {
                        type: 'arc',
                        shape: {
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                            startAngle: (90 + -angle) * Math.PI / 180,
                            endAngle: (220 + -angle) * Math.PI / 180
                        },
                        style: {
                            stroke: "#FF8E89",
                            fill: "transparent",
                            lineWidth: 1.5
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {
                name: "ring5",
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function (params, api) {
                    let x0 = api.getWidth() / 2;
                    let y0 = api.getHeight() / 2;
                    let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                    let point = getCirlPoint(x0, y0, r, (90 + -angle))
                    return {
                        type: 'circle',
                        shape: {
                            cx: point.x,
                            cy: point.y,
                            r: 4
                        },
                        style: {
                            stroke: "#FF8E89", //粉
                            fill: "#FF8E89"
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {
                name: "ring5", //绿点
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function (params, api) {
                    let x0 = api.getWidth() / 2;
                    let y0 = api.getHeight() / 2;
                    let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                    let point = getCirlPoint(x0, y0, r, (270 + -angle))
                    return {
                        type: 'circle',
                        shape: {
                            cx: point.x,
                            cy: point.y,
                            r: 4
                        },
                        style: {
                            stroke: "#0CD3DB", //绿
                            fill: "#0CD3DB"
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {
                name: '吃猪肉频率',
                type: 'pie',
                radius: ['52%', '40%'],
                silent: true,
                clockwise: true,
                startAngle: 90,
                z: 0,
                zlevel: 0,
                label: {
                    normal: {
                        position: "center",

                    }
                },
                data: [{
                    value: value,
                    name: "",
                    itemStyle: {
                        normal: {
                            color: { // 完成的圆环的颜色
                                colorStops: [{
                                    offset: 0,
                                    color: '#A098FC' // 0% 处的颜色
                                },
                                {
                                    offset: 0.3,
                                    color: '#4386FA' // 0% 处的颜色
                                },
                                {
                                    offset: 0.6,
                                    color: '#4FADFD' // 0% 处的颜色
                                },
                                {
                                    offset: 0.8,
                                    color: '#0CD3DB' // 100% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#646CF9' // 100% 处的颜色
                                }
                                ]
                            },
                        }
                    }
                },
                {
                    value: 100 - value,
                    name: "",
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#173164"
                        }
                    }
                }
                ]
            },
            {
                name: '吃猪肉频率',
                type: 'pie',
                radius: ['32%', '35%'],
                silent: true,
                clockwise: true,
                startAngle: 270,
                z: 0,
                zlevel: 0,
                label: {
                    normal: {
                        position: "center",

                    }
                },
                data: [{
                    value: value,
                    name: "",
                    itemStyle: {
                        normal: {
                            color: { // 完成的圆环的颜色
                                colorStops: [{
                                    offset: 0,
                                    color: '#00EDF3' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#646CF9' // 100% 处的颜色
                                }]
                            },
                        }
                    }
                },
                {
                    value: 100 - value,
                    name: "",
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#173164"
                        }
                    }
                }
                ]
            },

        ]
    }
};

// 关系图配置
export const getConnOptions = async () => {
    const userId = localStorage.getItem("userId");
    function setNodeData(arr, m, n, listdata) {
        for (var i = 0; i < arr.length; i++) {
            var itemStyle = {};
            if (arr[i].type) {
                if (arr[i].type === "NFT") {
                    itemStyle.color = "#fac858"
                }
            }
            listdata.push({
                id: m++,
                category: n,
                name: arr[i],
                symbolSize: 33,
                draggable: "true",
                itemStyle
            });
        }
    }

    function setLinkData(sourceList, m, links) {
        for (var i = 0; i < sourceList.length; i++) {
            links.push({
                "source": sourceList[i],
                "target": m,
                lineStyle: {
                    normal: {
                        color: 'source',
                    }
                }
            })
        }
    }

    const res = await getObjToken(userId);
    var myGraphData = [{ id: "1", type: "NFT", nft: [] },]
    for (let i = 0; i < res.length; i++) {
        var nft = [];
        if (res[i].type === 'SBT') {
            for (let n of res[i].nft) {
                nft.push(n.id)
            }
        }
        myGraphData.push({
            id: res[i].id,
            type: res[i].type,
            nft
        });
    }
    var listdata = [];
    var linksdata = [];

    var nodeData = myGraphData;
    var m = 0;
    var source = [];
    for (var i = 1; i < nodeData.length; i++) {
        var node = { id: nodeData[i].id, type: nodeData[i].type };
        var tx = [node];
        setNodeData(tx, m, 1, listdata);
        source.push(m);

        var Data = nodeData[i].nft;
        setNodeData(Data, m + 1, 2, listdata);

        var sourceList = [];
        for (var n = m + 1; n < m + Data.length + 1; n++) {
            sourceList.push(n);
        }
        setLinkData(sourceList, m, linksdata);
        m = m + Data.length + 1;
    }

    var tx7 = [];
    tx7.push(nodeData[0].id);
    setNodeData(tx7, m, 0, listdata);
    setLinkData(source, m, linksdata);
    return {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                if (params.data.name && params.data.category !== 0) {
                    if (params.data.name.id)
                        return "代币类型：" + params.data.name.type + "<br>代币ID：" + params.data.name.id;
                    else
                        return "代币类型：NFT" + "<br>代币ID：" + params.data.name;
                }
            },
            position: 'left',
        },
        animationDuration: 0,
        animationEasingUpdate: 'quinticInOut',
        series: [{
            name: '代币可视化',
            type: 'graph',
            layout: 'force',
            force: {
                repulsion: 100,
                gravity: 0.15,
                edgeLength: 80,
                layoutAnimation: true,
            },
            emphasis: {
                focus: 'adjacency',
                label: {
                    // position: 'right',
                    show: false
                }
            },
            data: listdata,
            links: linksdata,
            categories: [
                {
                    name: '我的账户',
                }, {
                    name: '层级一',
                }, {
                    name: '层级二',
                }],
            lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 1.5,
                    curveness: 0,
                }
            }
        }]
    }
};

// 本周代币申请图配置
export const weekTokenOptions = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(0, 255, 233,0)'
                    }, {
                        offset: 0.5,
                        color: 'rgba(255, 255, 255,1)',
                    }, {
                        offset: 1,
                        color: 'rgba(0, 255, 233,0)'
                    }],
                }
            },
        },
    },
    grid: {
        top: '10%',
        left: '10%',
        right: '10%',
        // bottom: '0%',
    },
    legend: {
        top: '10%',
        data: ['SBT', 'NFT'],
        textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12',
        }
    },
    xAxis: [{
        type: 'category',
        axisLine: {
            show: true
        },
        axisLabel: {
            color: '#fff'
        },
        data: Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - 6 + i);
            return `${date.getMonth() + 1}-${date.getDate()}`
        })
    }],

    yAxis: [{
        type: 'value',
        min: 0,
        splitNumber: 4,
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(255,255,255,0.1)'
            }
        },
        axisLine: {
            show: false,
        },
        axisLabel: {
            show: false,
            margin: 20,
            textStyle: {
                color: '#d1e6eb',
            },
        },
        axisTick: {
            show: false,
        },
    }],
    series: [{
        name: 'SBT',
        type: 'line',
        smooth: true, //是否平滑
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: {
            normal: {
                color: "#6c50f3",
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
            },
        },
        label: {
            show: true,
            position: 'top',
            textStyle: {
                color: '#6c50f3',
            }
        },
        itemStyle: {
            color: "#6c50f3",
            borderColor: "#fff",
            borderWidth: 3,
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
        },
        tooltip: {
            show: false
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(108,80,243,0.3)'
                },
                {
                    offset: 1,
                    color: 'rgba(108,80,243,0)'
                }
                ], false),
                shadowColor: 'rgba(108,80,243, 0.9)',
                shadowBlur: 20
            }
        },
        data: [1, 2, 2, 0, 3, 2, 5],
    },
    {
        name: 'NFT',
        type: 'line',
        smooth: true, //是否平滑
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: {
            normal: {
                color: "#00ca95",
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
            },
        },
        label: {
            show: true,
            position: 'top',
            textStyle: {
                color: '#00ca95',
            }
        },

        itemStyle: {
            color: "#00ca95",
            borderColor: "#fff",
            borderWidth: 3,
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
        },
        tooltip: {
            show: false
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0,202,149,0.3)'
                },
                {
                    offset: 1,
                    color: 'rgba(0,202,149,0)'
                }
                ], false),
                shadowColor: 'rgba(0,202,149, 0.9)',
                shadowBlur: 20
            }
        },
        data: [2, 5, 0, 3, 2, 2, 1],
    },
    ]
};

export const yearTokenOptions = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(0, 255, 233,0)'
                    }, {
                        offset: 0.5,
                        color: 'rgba(255, 255, 255,1)',
                    }, {
                        offset: 1,
                        color: 'rgba(0, 255, 233,0)'
                    }],
                }
            },
        },
    },
    grid: {
        top: '10%',
        left: '10%',
        right: '10%',
        // bottom: '0%',
    },
    legend: {
        top: '5%',
        data: ['出售', '售出'],
        textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12',
        }
    },
    xAxis: [{
        type: 'category',
        axisLine: {
            show: true
        },
        axisLabel: {
            color: '#fff'
        },
        // 当前月份以及前11个月
        data: Array.from({ length: 12 }, (_, i) => {
            const date = new Date();
            date.setMonth(date.getMonth() - 11 + i);
            return `${date.getMonth() + 1}月`
        })
    }],

    yAxis: [{
        type: 'value',
        min: 0,
        splitNumber: 4,
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(255,255,255,0.1)'
            }
        },
        axisLine: {
            show: false,
        },
        axisLabel: {
            show: false,
            margin: 20,
            textStyle: {
                color: '#d1e6eb',
            },
        },
        axisTick: {
            show: false,
        },
    }],
    series: [{
        name: '出售',
        type: 'line',
        smooth: true, //是否平滑
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: {
            normal: {
                color: "#6c50f3",
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
            },
        },
        label: {
            show: true,
            position: 'top',
            textStyle: {
                color: '#6c50f3',
            }
        },
        itemStyle: {
            color: "#6c50f3",
            borderColor: "#fff",
            borderWidth: 3,
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
        },
        tooltip: {
            show: false
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(108,80,243,0.3)'
                },
                {
                    offset: 1,
                    color: 'rgba(108,80,243,0)'
                }
                ], false),
                shadowColor: 'rgba(108,80,243, 0.9)',
                shadowBlur: 20
            }
        },
        data: [10, 8, 5, 2, 3, 2, 5, 10, 8, 5, 2, 3],
    },
    {
        name: '售出',
        type: 'line',
        smooth: true, //是否平滑
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: {
            normal: {
                color: "#00ca95",
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
            },
        },
        label: {
            show: true,
            position: 'top',
            textStyle: {
                color: '#00ca95',
            }
        },

        itemStyle: {
            color: "#00ca95",
            borderColor: "#fff",
            borderWidth: 3,
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2,
        },
        tooltip: {
            show: false
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0,202,149,0.3)'
                },
                {
                    offset: 1,
                    color: 'rgba(0,202,149,0)'
                }
                ], false),
                shadowColor: 'rgba(0,202,149, 0.9)',
                shadowBlur: 20
            }
        },
        data: [2, 5, 10, 8, 5, 2, 3, 2, 5, 10, 8, 5],
    },
    ]
};

var xData = function () {
    var data = [];
    for (var i = 1; i < 31; i++) {
        data.push(i + "日");
    }
    return data;
}();

// 区块链交易数目
export const blockOptions = {
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
            textStyle: {
                color: "#fff"
            }
        },
    },
    grid: {
        borderWidth: 0,
        top: 6,
        bottom: 50,
        left: 45,
        right: 120,
        textStyle: {
            color: "#fff"
        }
    },
    legend: {
        x: '46%',
        top: '1%',
        textStyle: {
            color: '#90979c',
        },
        data: ['交易量', '申请量']
    },
    xAxis: [{
        type: "category",
        axisLine: {
            lineStyle: {
                color: "rgba(204,187,225,0.5)",
            }
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        data: xData,
    }],

    yAxis: [{
        type: "value",
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: "rgba(204,187,225,0.5)",
            }
        },

    }],
    dataZoom: [{
        show: true,
        height: 20,
        xAxisIndex: [0],
        bottom: 30,

        "start": 10,
        "end": 80,
        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '110%',
        handleStyle: {
            color: "#05b1ff",
        },
        textStyle: {
            color: "rgba(204,187,225,0.5)",
        },
        fillerColor: "rgba(5, 177, 255,0.2)",
        borderColor: "rgba(204,187,225,0.5)",

    }, {
        type: "inside",
        show: true,
        height: 15,
        start: 1,
        end: 35
    }],
    series: [{
        name: "申请量",
        type: "line",
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
            color: "#05b1ff",
        },
        data: [
            509, 917, 2455, 2610, 2719, 3033, 3044, 3085, 2708, 2809, 2117, 2000, 1455, 1210, 719,
            733, 944, 2285, 2208, 3372, 3936, 3693, 2962, 2810, 3519, 2455, 2610, 2719, 2484, 2078
        ],
    }, {
        name: "交易量",
        type: "line",
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
            color: "#00fefe",
        },
        data: [
            2136, 3693, 2962, 3810, 3519, 3484, 3915, 3823, 3455, 4310, 4019, 3433, 3544, 3885, 4208, 3372,
            3484, 3915, 3748, 3675, 4009, 4433, 3544, 3285, 4208, 3372, 3484, 3915, 3823, 4265, 4298
        ]
    },]
}

let data = [];
let now = new Date(1997, 9, 3);
let oneDay = 24 * 3600 * 1000;
let value = Math.random() * 1000;
for (var i = 0; i < 1000; i++) {
    data.push(randomData());
}
function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
        ]
    };
}
export const blockSizeOptions = {
    tooltip: {
        show: false,
    },
    grid: {
        left: 0,
        right: 0,
        bottom: 10,
        top: 15,
        containLabel: true
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: false
        },
        axisLabel: {
            show: false
        },
        axisLine: {
            show: true
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        },
        axisLabel: {
            show: false
        },
        axisLine: {
            show: true
        }
    },
    series: [
        {
            itemStyle: {
                color: "#fff",
            },
            type: 'line',
            showSymbol: false,
            data: data
        }
    ]
};