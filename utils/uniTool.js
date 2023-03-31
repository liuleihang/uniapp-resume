export function copyData(str,toastStr='复制成功',duration=2000){
  // const copyTip = toastStr || '复制成功';
  // const duration = duration || 2000;
  uni.setClipboardData({
    data: str, //要被复制的内容
    success: () => { //复制成功的回调函数
      uni.hideToast();
      uni.showToast({
        title: toastStr,
        duration: 2000,
        icon: 'none'
      });
    }
  });
}