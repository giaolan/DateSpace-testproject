<script lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
const w = document.documentElement.clientWidth / 80;
document.documentElement.style.fontSize = w + 'px';

//resize重新渲染
window.onresize = function () {
  const w = document.documentElement.clientWidth / 80;
  document.documentElement.style.fontSize = w + 'px';
}

export default {
  setup() {
    const route = useRoute()
    return { route }
  }
}
</script>

<template>
  <RouterView :key="route.fullPath" />
</template>

<style scoped></style>
