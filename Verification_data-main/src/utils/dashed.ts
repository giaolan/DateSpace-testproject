// 绘制中间的虚线
const dashed=() =>{
  var canvas = document.querySelector('.dashed')
  var ctx = canvas.getContext('2d')
  var w = canvas.width = document.querySelector('.total').clientWidth
  var h = canvas.height = document.querySelector('.total').clientHeight / 3 * 2
  ctx.lineWidth = 3
  ctx.setLineDash([3, 3]);
  ctx.fillStyle = '#93f8fb'
  ctx.shadowOffsetX = 0;
  // 阴影的y偏移
  ctx.shadowOffsetY = 0;
  // 阴影颜色
  ctx.shadowColor = '#93f8fb';
  // 阴影的模糊半径
  ctx.shadowBlur = 15;
  ctx.save()  //缓存初始状态
  // 绘制第一条曲线
  ctx.beginPath()
  var grd = ctx.createLinearGradient(w / 11 * 2, h / 3, w / 5 * 2, h);
  grd.addColorStop(0, "#54e2e6");
  grd.addColorStop(1, "#065261");
  ctx.strokeStyle = grd;
  ctx.moveTo(w / 5 * 2, h)
  ctx.quadraticCurveTo(w / 5, h / 6 * 5, w / 11 * 2, h / 3);
  ctx.stroke();
  // 绘制第一条曲线上的圆光效果
  ctx.beginPath()
  ctx.moveTo(w / 11 * 2, h / 3)
  ctx.arc(w / 11 * 2, h / 3, 5, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
  ctx.save()
  // 绘制第二条线
  ctx.beginPath()
  var grd = ctx.createLinearGradient(w / 11 * 3.3, h / 2, w / 3 * 1.1, h / 6 * 5);
  grd.addColorStop(0, "#e08d03");
  grd.addColorStop(1, "#2e6a5c");
  ctx.strokeStyle = grd;
  ctx.moveTo(w / 3 * 1.1, h / 6 * 5)
  ctx.quadraticCurveTo(w / 5 * 1.5, h / 6 * 4.2, w / 11 * 3.3, h / 2);
  ctx.stroke();
  // 绘制第二条曲线上的圆光效果
  ctx.beginPath()
  ctx.moveTo(w / 11 * 3.3, h / 2)
  ctx.arc(w / 11 * 3.3, h / 2, 5, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
  ctx.save()
  // 绘制第三条线
  ctx.beginPath()
  var grd = ctx.createLinearGradient(w / 3 * 1.4, h / 5, w / 5 * 2, h / 2);
  grd.addColorStop(0, "#e08d03");
  grd.addColorStop(1, "#2e6a5c");
  ctx.strokeStyle = grd;
  ctx.moveTo(w / 5 * 2, h / 2)
  ctx.quadraticCurveTo(w / 3 * 1.2, h / 4 * 1.4, w / 3 * 1.4, h / 5);
  ctx.stroke();
  // 绘制第三条曲线上的圆光效果
  ctx.beginPath()
  ctx.moveTo(w / 3 * 1.4, h / 5)
  ctx.arc(w / 3 * 1.4, h / 5, 5, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
  ctx.save()
  // 绘制第四条线
  ctx.beginPath()
  var grd = ctx.createLinearGradient(w / 5 * 3.1, h / 3 * 1.2, w / 5 * 3.2, h / 2 * 1.5);
  grd.addColorStop(0, "#e08d03");
  grd.addColorStop(1, "#2e6a5c");
  ctx.strokeStyle = grd;
  ctx.moveTo(w / 5 * 3.2, h / 2 * 1.5)
  ctx.quadraticCurveTo(w / 5 * 3.35, h / 2 * 1.2, w / 5 * 3.1, h / 3 * 1.2);
  ctx.stroke();
  // 绘制第四条曲线上的圆光效果
  ctx.beginPath()
  ctx.moveTo(w / 5 * 3.1, h / 3 * 1.2)
  ctx.arc(w / 5 * 3.1, h / 3 * 1.2, 5, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
  ctx.save()
  // 绘制第五条线
  ctx.beginPath()
  var grd = ctx.createLinearGradient(w / 5 * 3.3, h / 4, w / 5 * 3.2, h / 2 * 1.9);
  grd.addColorStop(0, "#e08d03");
  grd.addColorStop(1, "#2e6a5c");
  ctx.strokeStyle = grd;
  ctx.moveTo(w / 5 * 3.03, h / 2 * 1.9)
  ctx.quadraticCurveTo(w / 5 * 3.8, h / 2 * 1.2, w / 5 * 3.3, h / 4);
  ctx.stroke();
  // 绘制第五条曲线上的圆光效果
  ctx.beginPath()
  ctx.moveTo(w / 5 * 3.3, h / 4)
  ctx.arc(w / 5 * 3.3, h / 4, 5, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
  ctx.save()
  // 绘制第六条线
  ctx.beginPath()
  var grd = ctx.createLinearGradient(w / 5 * 3.8, h / 2 * 1.2, w / 5 * 2.9, h);
  grd.addColorStop(0, "#e08d03");
  grd.addColorStop(1, "#2e6a5c");
  ctx.strokeStyle = grd;
  ctx.moveTo(w / 5 * 2.9, h)
  ctx.quadraticCurveTo(w / 5 * 3.7, h / 2 * 1.6, w / 5 * 3.8, h / 2 * 1.2);
  ctx.stroke();
  // 绘制第六条曲线上的圆光效果
  ctx.beginPath()
  ctx.moveTo(w / 5 * 3.8, h / 2 * 1.2)
  ctx.arc(w / 5 * 3.8, h / 2 * 1.2, 5, 0, Math.PI * 2)
  ctx.fill()
}

export default dashed