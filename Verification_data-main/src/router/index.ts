import { createRouter, createWebHistory } from 'vue-router'
import { route } from '../utils/constant'
import { checkAdmit } from '@/utils'

const routes = route.map((item) => {
  return {
    path: item.route,
    name: item.name,
    component: () => import(`../views/${item.component}.vue`),
    children: item.children,
    meta: item.meta
  }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('../views/MarketView.vue')
    // },
    // {
    //   path: '/home',
    //   name: 'pastHome',
    //   component: () => import('../views/HomeView.vue')
    // },
    // // 暂定介绍页
    // {
    //   path: '/introduce',
    //   name: 'introduce',
    //   component: () => import('../views/IntroduceView.vue')
    // },
    {
      path: '/',
      name: 'introduce',
      component: () => import('../views/IntroduceView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/MarketView.vue')
    },
    ...routes
  ]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // const { authorized, redirect } = checkAdmit(to);
  next()
  // if (authorized) {
  //   // 授权通过，继续访问
  //   next();
  // } else {
  //   next();
  // }
});

export default router
