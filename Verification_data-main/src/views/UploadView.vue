<script setup lang='ts'>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { Header } from '@/components'
import '/public//static//tree.min.js'
// import {show} from '@/utils/update'
// onMounted(()=>{
// 	location.reload();
// })

(function ($) {
	var Vector = function (x, y) {
		this.x = x || 0;
		this.y = y || 0;
	};
	Vector.prototype = {
		add: function (v) {
			this.x += v.x;
			this.y += v.y;
			return this;
		},
		length: function () {
			return Math.sqrt(this.x * this.x + this.y * this.y);
		},
		rotate: function (theta) {
			var x = this.x;
			var y = this.y;
			this.x = Math.cos(theta) * this.x - Math.sin(theta) * this.y;
			this.y = Math.sin(theta) * this.x + Math.cos(theta) * this.y;
			//this.x = Math.cos(theta) * x - Math.sin(theta) * y;
			//this.y = Math.sin(theta) * x + Math.cos(theta) * y;
			return this;
		},
		mult: function (f) {
			this.x *= f;
			this.y *= f;
			return this;
		}
	};

	var Apple = function (pos, radius, color, ctx) {
		this.pos = pos || new Vector();
		this.radius = radius || 5;
		this.color = color || 'rgba(255, 0, 0, 0.8)'; // 红色果实
		this.ctx = ctx;
	};

	Apple.prototype = {
		render: function () {
			var ctx = this.ctx;
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
			ctx.fill();
		}
	};

	var Leaf = function (p, r, c, ctx) {
		this.p = p || null;
		this.r = r || 0;
		this.c = c || 'rgba(255,255,255,1.0)';
		this.ctx = ctx;

	}



	Leaf.prototype = {

		render: function () {
			var that = this;
			var ctx = this.ctx;
			var f = Branch.random(1, 2)
			for (var i = 0; i < 5; i++) {
				(function (r) {
					setTimeout(function () {
						ctx.beginPath();
						ctx.fillStyle = that.color;
						ctx.moveTo(that.p.x, that.p.y);
						ctx.arc(that.p.x, that.p.y, r, 0, Branch.circle, true);
						ctx.fill();
					}, r * 60);
					// this.save();
				})(i);

			}

		}

	}

	// Leaf.prototype.save = function () {
	//     let leaves = JSON.parse(localStorage.getItem('leaves')) || [];
	//     leaves.push({x: this.p.x, y: this.p.y});
	//     localStorage.setItem('leaves', JSON.stringify(leaves));
	// };

	var Branch = function (p, v, r, c, t) {

		this.p = p || null;

		this.v = v || null;

		this.r = r || 0;

		this.length = 0;

		this.generation = 1;

		this.tree = t || null;

		this.color = c || 'rgba(255,255,255,1.0)';

		this.register();

	};


	var array = [{
		name: 'husu',
		color: 'green'
	}, {
		name: 'husu',
		color: 'green'
	}, {
		name: 'husu',
		color: 'green'
	}, {
		name: 'husu',
		color: 'green'
	}, {
		name: 'husu',
		color: 'green'
	}]

	var lengthofArray = array.length
	var times = 0;
	Branch.prototype = {

		register: function () {

			this.tree.addBranch(this);

		},

		draw: function () {

			var ctx = this.tree.ctx;
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.moveTo(this.p.x, this.p.y);
			ctx.arc(this.p.x, this.p.y, this.r, 0, Branch.circle, true);
			ctx.fill();

		},

		modify: function () {

			var angle = 0.18 - (0.10 / this.generation);
			this.p.add(this.v);
			this.length += this.v.length();
			this.r *= 0.99;
			this.v.rotate(Branch.random(-angle, angle)); //.mult(0.996);
			if (this.r < 0.8 || this.generation > 10) {
				this.tree.removeBranch(this);
				if ((this.length > Branch.random(0, 0))) {
					times++;
					if (times % 5 != 0) {
						var apple = new Apple(this.p, 5, 'rgba(193, 199, 10, 0.8)', this.tree.ctx);
						apple.render();
					} else if (times == 25) {
						var apple = new Apple(new Vector(400, 200), 40, 'rgba(193, 199, 10)', this.tree.ctx);
						apple.render();
					} else if (times == 55) {
						var apple = new Apple(new Vector(600, 100), 40, 'rgba(193, 199, 10, 1)', this.tree.ctx);
						apple.render();
					} else if (times == 15) {
						var apple = new Apple(new Vector(800, 100), 40, 'rgba(193, 199, 10, 1)', this.tree.ctx);
						apple.render();
					} else if (times == 35) {
						var apple = new Apple(new Vector(1000, 200), 40, 'rgba(193, 199, 10, 1)', this.tree.ctx);
						apple.render();
					} else if (times == 10) {
						var apple = new Apple(new Vector(1200, 200), 20, 'rgba(193, 199, 10, 1)', this.tree.ctx);
						apple.render();
						var apple = new Apple(new Vector(700, 200), 20, 'rgba(193, 199, 10, 1)', this.tree.ctx);
						apple.render();
						var apple = new Apple(new Vector(400, 100), 20, 'rgba(193, 199, 10, 1)', this.tree.ctx);
						apple.render();
						var apple = new Apple(new Vector(1200, 500), 20, 'rgba(193, 199, 10, 1)', this.tree.ctx);
						apple.render();
						var apple = new Apple(new Vector(300, 400), 20, 'rgba(193, 199, 10, 1)', this.tree.ctx);
						apple.render();
						var apple = new Apple(new Vector(480, 200), 26, 'rgba(193, 199, 10, 1)', this.tree.ctx);
						apple.render();
						var apple = new Apple(new Vector(890, 300), 20, 'rgba(193, 199, 10, 1)', this.tree.ctx);
						apple.render();
						var apple = new Apple(new Vector(200, 100), 20, 'rgba(193, 199, 10, 1)', this.tree.ctx);
						apple.render();
						var apple = new Apple(new Vector(700, 500), 20, 'rgba(193, 199, 10, 1)', this.tree.ctx);
						apple.render();
						var apple = new Apple(new Vector(740, 460), 20, 'rgba(193, 199, 10, 1)', this.tree.ctx);
						apple.render();
					}

					// this.hasFruit = true; // 标记已经生长出了果实
				}
				var l = new Leaf(this.p, 10, this.color, this.tree.ctx);
				l.render();

			}

		},

		grow: function () {

			this.draw();
			this.modify();
			this.fork();

		},

		fork: function () {

			var p = this.length - Branch.random(150, 250); // + (this.generation * 10);

			if (p > 0) {
				var n = Math.round(Branch.random(1, 3));
				this.tree.stat.fork += n - 1;
				for (var i = 0; i < n; i++) {

					if (i % 2 == 0) {
						Branch.clone(this, false);
					} else {
						Branch.clone(this, true);
					}
				}

				this.tree.removeBranch(this);
			}
		}
	};

	Branch.circle = 2 * Math.PI;

	Branch.random = function (min, max) {

		return Math.random() * (max - min) + min;

	};

	Branch.clone = function (b) {

		var r = new Branch(new Vector(b.p.x, b.p.y), new Vector(b.v.x, b.v.y), b.r, b.color, b.tree);

		r.generation = b.generation + 1;

		return r;

	};

	Branch.rgba = function (r, g, b, a) {

		return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

	};

	Branch.randomrgba = function (min, max, a) {

		return Branch.rgba(Math.round(Branch.random(min, max)), Math.round(Branch.random(min, max)), Math.round(Branch.random(min, max)), a);

	};



	var Tree = function () {

		var branches = [];

		var timer;

		this.stat = {

			fork: 0,

			length: 0

		};

		this.addBranch = function (b) {

			branches.push(b);

		};

		this.removeBranch = function (b) {

			for (var i = 0; i < branches.length; i++) {

				if (branches[i] === b) {

					branches.splice(i, 1);

					return;

				}

			}

		};

		this.render = function (fn) {

			var that = this;

			timer = setInterval(function () {
				fn.apply(that, arguments);
				if (branches.length > 0) {
					for (var i = 0; i < branches.length; i++) {
						branches[i].grow();
					}
				}
			}, 1000 / 1000);
		};
		this.init = function (ctx) {
			this.ctx = ctx;
		};

		this.abort = function () {

			branches = [];
			this.stat = {
				fork: 0,
				length: 0
			}

		};

	};
	// 创建响应式引用
	const textVisible = ref(false);

	// 定义一个函数用于更改 textVisible 的值
	function nextFunction() {
		textVisible.value = true; // 设置为 true，使文本可见
	}
	function init() {

		var $window = $(window);
		var $body = $("body");
		var canvas_width = $window.width();
		var canvas_height = $window.height() - 30;
		var center_x = canvas_width / 2;
		var stretch_factor = 600 / canvas_height;
		var y_speed = 3 / stretch_factor * 1.2;
		var $statMsg = $("#statMsg");
		var canvas = $('#canvas')[0];
		canvas.width = canvas_width;
		canvas.height = canvas_height;
		var ctx = canvas.getContext("2d");
		ctx.globalCompositeOperation = "lighter";
		var t = new Tree();

		t.init(ctx);

		for (var i = 0; i < 3; i++) {

			new Branch(new Vector(center_x, canvas_height), new Vector(Math.random(-1, 1), -y_speed), 15 / stretch_factor, Branch.randomrgba(0, 255, 0.3), t);
		}
		t.render(function () {
			$statMsg.html(this.stat.fork);

		});
		let savedLeaves = JSON.parse(localStorage.getItem('leaves')) || [];
		savedLeaves.forEach(leafData => {
			let p = new Vector(leafData.x, leafData.y);
			let l = new Leaf(p, 10, 'rgba(0,255,0,1.0)', ctx);  // 使用适当的颜色和上下文
			l.render();
		});
		t.render(() => {
			nextFunction();
			clearInterval(timer);
		})
	}

	onMounted(async () => {
		if (location.href.indexOf("#reloaded") == -1) {
			location.href = location.href + "#reloaded";
			location.reload();
		}
		// var apple = new Apple((1,2), 30, 'rgba(193, 199, 10, 0.8)', this.tree.ctx);
		// apple.render();
		init();

	})


})(jQuery);

var show = ref(false)
var data = ref([] || null);
function ShowBLink() {
	if (data.value.length)
		show = true;
}
</script>
<template>
	<Header title="上传数据" />
	<div class="canvas-container">
		<canvas id="canvas" ref="canvas" width="400" height="200"></canvas>
		<div>
			<div id="overlay-text"><a href="baidu.com" style="text-decoration: none;color:rgb(8, 47, 66)">数字</a></div>
			<div id="overlay-text1"><a href="baidu.com" style="text-decoration: none;color:rgb(8, 47, 66)">文本</a></div>
			<div id="overlay-text2"><a href="baidu.com" style="text-decoration: none;color:rgb(8, 47, 66)">音频</a></div>
			<div id="overlay-text3"><a href="baidu.com" style="text-decoration: none;color:rgb(8, 47, 66)">视频</a></div>
			<div v-if="show" class="imgsdiv">
				<img class="imgs" src="..//..//public/assets/image/Blinkstars.png"
					style="position: absolute;top:134px;left:397px;width:80px;height:100px;z-index:1">
			</div>
			<!-- <div v-if="show" class="imgsdiv1" >
		<img class="imgs" src="..//..//public/assets/image/Blinkstars.png" style="position: absolute;top:170px;left:340px;width:70px;height:90px;z-index:1">
	</div> -->
			<!-- <div v-if="show" class="imgsdiv2" >
		<img class="imgs" src="..//..//public/assets/image/star.png" style="position: absolute;top:170px;left:340px;width:70px;height:90px;z-index:1">
	</div>
	<div v-if="show" class="imgsdiv3" >
		<img class="imgs" src="..//..//public/assets/image/star.png" style="position: absolute;top:170px;left:340px;width:70px;height:90px;z-index:1">
	</div> -->
		</div>
	</div>
</template>
<style lang="less" scoped>
//闪烁动画
@keyframes blink {
	10% {
		opacity: 0.4;
	}

	20% {
		opacity: 0.3;
	}

	30% {
		opacity: 0.2;
	}

	40% {
		opacity: 0.1;
	}

	50% {
		opacity: 0;
	}

	60% {
		opacity: 0.5;
	}

	70% {
		opacity: 0.6;
	}
}

.canvas-container {
	position: relative;
	width: 100%;
	height: 100%;

	.imgs {
		animation: blink 0.5s step-start infinite;
	}
}

#canvas {
	width: 100%;
	height: 100%;
}

#overlay-text {
	position: absolute;
	top: 205px;
	/* 居中 */
	left: 25%;
	transform: translate(-50%, -50%);
	/* 居中 */
	color: rgb(8, 47, 66);
	/* 文本颜色 */
	font-weight: 800;
	font-size: 30px;
}

#overlay-text1 {
	position: absolute;
	top: 105px;
	/* 居中 */
	left: 37.5%;
	transform: translate(-50%, -50%);
	/* 居中 */
	color: rgb(8, 47, 66);
	/* 文本颜色 */
	font-weight: 800;
	font-size: 30px;
}

#overlay-text2 {
	position: absolute;
	top: 105px;
	/* 居中 */
	left: 50%;
	transform: translate(-50%, -50%);
	/* 居中 */
	color: rgb(8, 47, 66);
	/* 文本颜色 */
	font-weight: 800;
	font-size: 30px;
}

#overlay-text3 {
	position: absolute;
	top: 205px;
	/* 居中 */
	left: 62.5%;
	transform: translate(-50%, -50%);
	/* 居中 */
	color: rgb(8, 47, 66);
	/* 文本颜色 */
	font-weight: 800;
	font-size: 30px;
}
</style>