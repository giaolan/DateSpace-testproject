import { checkUser } from '@/api';

export default async function checkAdmit(route) {
  const requiresAuth = route.meta.requiresAuth;

  // 检查是否需要身份验证
  if (requiresAuth) {
    const currentUser = localStorage.getItem('userId');

    // 检查用户是否登录，如果未登录，则重定向到登录页
    // if (!currentUser) {
    //   return { authorized: false, redirect: '/login' };
    // }

    // 检查用户角色是否审核通过
    const isPass = await checkUser(currentUser);
    if (isPass === 'pass') {
      return { authorized: true };
    }

    // 用户角色不满足所需的角色，则重定向到未授权页面
    return { authorized: false, redirect: '/' };
  }

  // 不需要身份验证，直接返回授权通过
  return { authorized: true };
}
