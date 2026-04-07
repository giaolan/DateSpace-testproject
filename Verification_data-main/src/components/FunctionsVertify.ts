import {ref,watch} from 'vue'
import {ElLoading} from 'element-plus'
import { ElMessage } from 'element-plus';
//上传数据成功
const open2 = () => {
  ElMessage({
    message: '认证成功',
    type: 'success',
  })
}
//取消成功
const open3 = () => {
  ElMessage({
    message: '取消确权成功',
    type: 'warning',
  })
}
export const LoadingView=()=>{
  return new Promise<void>((resolve) => {
    const loading = ElLoading.service({
      lock: true,
      text: '认证中...',
      background: 'rgba(0, 0, 0, 0.7)',
      customClass: 'my-custom-loading'
    });

    // 设置定时器来模拟长时间运行的任务
    // 在这个例子中，我们等待2秒
    setTimeout(() => {
      loading.close(); // 关闭加载动画
      resolve(); // 这时，Promise完成了它的工作
    }, 2000); // 延迟2000毫秒
  });}

  export const LoadingViewOfLoading=()=>{
    return new Promise<void>((resolve) => {
      const loading = ElLoading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'my-custom-loading'
      });
  
      // 设置定时器来模拟长时间运行的任务
      // 在这个例子中，我们等待2秒
      setTimeout(() => {
        loading.close(); // 关闭加载动画
        resolve(); // 这时，Promise完成了它的工作
      }, 2000); // 延迟2000毫秒
    });}
//修改active值
export const active = ref(0)

export const ChangeActive=()=>{
  return new Promise<void>((resolve)=>{
    LoadingView().then(()=>{// FillFormOfSelect();
    // active.value++;
    
    open2();
    if (active.value > 5) {
      active.value = 0;
    };   
    resolve();
  });
  console.log(active.value);
 })
 
}

// function LoadingView(): Promise<void> {
//   return new Promise((resolve, reject) => {
//       setTimeout(() => {
//           console.log("Loading 完成");
//           resolve();
//       }, 1000);
//   });
// }
//已完成第二步确权的
export const Loading = ref(false)
export const ChangeActiveOfSecond = () =>{
  const loading = ElLoading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'my-custom-loading'
  })
  setTimeout(() => {
    loading.close()
  }, 2000)
  window.location.href="/myApply";
}

//弹出loading
export const ShowLoading = (): Promise<void> => {
  return new Promise((resolve) => { // 明确返回 Promise<void>
    const loading = ElLoading.service({
      lock: true,
      text: '认证中...',
      background: 'rgba(0, 0, 0, 0.7)',
      customClass: 'my-custom-loading'
    });
    setTimeout(() => {
      loading.close();
      resolve(); // 当定时器完成后，解决 Promise
    }, 1000);
  });
};

export const CancelLoading = ():Promise<void>=>{
  return new Promise((resolve) => {
    const loading = ElLoading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'my-custom-loading'
  });
  setTimeout(() => {
    loading.close();
    resolve();
  }, 1000)
  });
}  
