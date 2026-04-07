<script setup lang="ts">
import { onMounted, onBeforeUnmount, onUpdated, ref } from 'vue'

import { getTime, dashed } from '@/utils'
import { route } from '@/utils/constant'

let time = ref(getTime()); // header时间
let interval: number;

onMounted(() => {
    dashed() // 绘制虚线
    // 设置时间不断更新
    interval = setInterval(() => {
        time.value = getTime();
    }, 1000);
})

onUpdated(() => {
    dashed()
})

onBeforeUnmount(() => {
    clearInterval(interval)
})
</script>

<template>
    <header class="header">
        <h4>{{ time }}</h4>
    </header>
    
    <div class="main">
        <div class="left function">
            <ul>
                <router-link v-for="i in 5" :key="i" :to="func[i - 1].route">
                    <li>
                        <div class="cicle"></div>
                        <div class="li-content">
                            <span>{{ func[i - 1].name }}</span>
                        </div>
                    </li>
                </router-link>
            </ul>
        </div>

        <div class="total">
            <div class="data1">
                <span>本年生成NFT</span>
                <p>56847108</p>
            </div>
            <div class="data2">
                <span>本月生成NFT</span>
                <p>1457104</p>
            </div>
            <div class="data3">
                <span>本周生成NFT</span>
                <p>564710</p>
            </div>
            <div class="data4">
                <span>今日生成NFT</span>
                <p>14504</p>
            </div>
            <canvas class="dashed"></canvas>
            <div class="sphere">
                <div class="sphere-bg"></div>
                <div class="sum">
                    <span>目前共有NFT</span>
                    <p>568971401</p>
                </div>
            </div>
            <div class="cicle3"></div>
            <div class="cicle4"></div>
            <div class="cicle5"></div>
            <div class="cicle6"></div>
            <div class="cicle7"></div>
            <div class="cicle8">
                <span>20%</span>
                <p>同比增长</p>
            </div>
            <div class="cicle9">
                <span>98%</span>
                <p>申请成功率</p>
            </div>
            <div class="cicle10">
                <span>80%</span>
                <p>出售成功率</p>
            </div>
            <div class="cicle11">
                <span>89%</span>
                <p>绑定成功率</p>
            </div>
        </div>

        <div class="right function">
            <ul>
                <router-link v-for="i in 5" :key="i" :to="func[i + 4].route">
                    <li>
                        <div class="cicle"></div>
                        <div class="li-content">
                            <span>{{ func[i + 4].name }}</span>
                        </div>
                    </li>
                </router-link>
            </ul>
        </div>
    </div>

    <div class="bottom">
        <h4>Value-Go</h4>
    </div>
</template>

<style scoped lang="less">
@import '../assets/css/animation.less'; // 引入动画

// 引入字体
@font-face {
    font-family: 'DS-DIGIT';
    src: url('../assets/fonts/DS-DIGIT.TTF');
}

.header {
    height: 80px;
    background-image: -webkit-linear-gradient(bottom, #86919e, #fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    h4 {
        margin: 0;
        text-align: right;
        padding: 2rem;
    }
}

.main {
    width: 100%;
    height: 78%;
    padding: 0 2.5%;
    box-sizing: border-box;
    position: relative;

    .function {
        width: 16%;
        height: 80%;
        float: left;
        z-index: 2;

        ul {
            width: 100%;
            height: 100%;

            li {
                width: 100%;
                height: 20%;
                margin-top: 5%;
                position: relative;
                cursor: pointer;
                list-style: none;

                .li-content {
                    width: 90%;
                    height: 100%;
                    background: url(../assets/image/border.png) no-repeat center;
                    background-size: contain;
                    font-size: 0.8rem;
                    padding-left: 15%;
                    padding-top: 6%;
                    color: #fff;
                    box-sizing: border-box;
                    text-align: center;

                    span {
                        margin-right: 2rem;
                        line-height: 3rem;
                    }
                }

                .cicle {
                    content: '';
                    display: block;
                    position: absolute;
                    width: 1.7rem;
                    height: 1.7rem;
                    background: url(../assets/image/green.png) no-repeat center;
                    background-size: 100%;
                    left: -1.3rem;
                    bottom: 0.8rem;
                    animation: rotate 5s linear infinite;
                }
            }

            li:hover {
                .li-content {
                    background: url(../assets/image/border2.png) no-repeat center;
                    background-size: contain;
                }

                .cicle {
                    background: url(../assets/image/orange.png) no-repeat center;
                    background-size: 100%;
                }
            }
        }
    }

    .left {
        position: relative;
        left: 5rem;
    }

    .right {
        position: relative;
        left: -7rem;
    }

    .total {
        width: 67%;
        height: 100%;
        float: left;
        position: relative;

        .data1,
        .data2,
        .data3,
        .data4 {
            width: 8rem;
            height: 4rem;
            position: absolute;

            span {
                color: #0ac1c7;
                font-size: 0.8rem;
                font-family: '宋体';
                display: block;
                text-align: center;
            }

            p {
                font-family: DS-DIGIT;
                font-size: 1.5rem;
                color: #f29701;
                margin: 0;
                text-align: center;
            }
        }

        .data1 {
            left: 10%;
            top: 12%;
        }

        .data2 {
            left: 39%;
            top: 3%;
        }

        .data3 {
            left: 58%;
            top: 7%;
        }

        .data4 {
            left: 68%;
            top: 30%;
        }

        .dashed {
            position: absolute;
            left: 0;
            top: 0;
        }

        .sphere {
            width: 20rem;
            height: 20rem;
            position: relative;
            margin: 14% auto 0;

            .sphere-bg {
                position: absolute;
                z-index: 100;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: url(../assets/image/earth.png) no-repeat center;
                background-size: contain;
                animation: rotate 50s linear infinite;
            }

            .sum {
                position: absolute;
                z-index: 100;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: url(../assets/image/cloud.png) no-repeat center;
                background-size: 55%;

                span {
                    display: block;
                    margin-top: 32%;
                    color: #005a79;
                    font-size: 0.9rem;
                    text-align: center;
                }

                p {
                    margin-top: 2%;
                    text-align: center;
                    color: #003c63;
                    font-family: 'LCdd';
                    font-size: 2rem;
                    margin: 0;
                }
            }
        }

        .cicle3 {
            width: 35rem;
            height: 35rem;
            background: url(../assets/image/circle.png) no-repeat center;
            background-size: 100%;
            position: absolute;
            top: 20%;
            left: 50%;
            transform-style: preserve-3d;
            transform: translateX(-50%) rotateX(75deg);
            animation: rotate3 20s linear infinite;
        }

        .cicle4 {
            width: 15rem;
            height: 15rem;
            position: absolute;
            top: 60%;
            left: 50%;
            transform-style: preserve-3d;
            background: url(../assets/image/gqright.png) no-repeat center;
            background-size: 100%;
            transform: translateX(-50%) rotateX(75deg);
            animation: rotate3 2s linear infinite;
        }

        .cicle5 {
            width: 15rem;
            height: 15rem;
            position: absolute;
            top: 62%;
            left: 50%;
            transform-style: preserve-3d;
            background: url(../assets/image/gqleft.png) no-repeat center;
            background-size: 100%;
            transform: translateX(-50%) rotateX(75deg);
            animation: rotate4 2s linear infinite;
        }

        .cicle6 {
            width: 12rem;
            height: 12rem;
            position: absolute;
            top: 70%;
            left: 50%;
            transform-style: preserve-3d;
            background: url(../assets/image/gqbottomright.png) no-repeat center;
            background-size: 100%;
            transform: translateX(-50%) rotateX(75deg);
            animation: rotate3 2s linear infinite;
        }

        .cicle7 {
            width: 12rem;
            height: 12rem;
            position: absolute;
            top: 72%;
            left: 50%;
            transform-style: preserve-3d;
            background: url(../assets/image/gqbottomleft.png) no-repeat center;
            background-size: 100%;
            transform: translateX(-50%) rotateX(75deg);
            animation: rotate4 2s linear infinite;
        }

        .cicle8,
        .cicle9,
        .cicle10,
        .cicle11 {
            width: 5rem;
            height: 5rem;
            position: absolute;
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 100;
            margin-left: -2.5rem;
            border-radius: 50%;

            span {
                font-family: 'LCdd';
                display: block;
                margin-left: 25%;
                font-size: 1.5rem;
                margin-top: 20%;
            }

            p {
                text-align: center;
                font-size: 0.7rem;
                margin: 0;
            }
        }

        .cicle8 {
            background: url(../assets/image/circle1.png) no-repeat;
            background-size: 100%;
            animation: rotate5 20s linear infinite;
            color: #f29701;
        }

        .cicle9 {
            background: url(../assets/image/circle2.png) no-repeat;
            background-size: 100%;
            animation: rotate6 20s linear infinite;
            color: #0ac1c7
        }

        .cicle10 {
            background: url(../assets/image/circle1.png) no-repeat;
            background-size: 100%;
            animation: rotate7 20s linear infinite;
            color: #f29701;
        }

        .cicle11 {
            background: url(../assets/image/circle2.png) no-repeat;
            background-size: 100%;
            color: #0ac1c7;
            animation: rotate8 20s linear infinite;
        }
    }
}

.bottom {
    width: 100%;
    height: 10%;
    background: url(../assets/image/bottomsjbg.png) no-repeat bottom center;
    background-size: 100%;
    text-align: center;

    h4 {
        height: 40%;
        display: table;
        margin: auto;
        line-height: 2.7rem;
    }
}
</style>