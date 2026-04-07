import { ref } from "vue";

export const isLogin = ref(true);

export const setIsLogin = () => {
  isLogin.value = !isLogin.value;
}