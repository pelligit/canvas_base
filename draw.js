// 基本2d图形
// 简单的绘制，静态图形，没有交互
class Draw{
	constructor(canvasId){
		let c = document.getElementById(canvasId) || null;
		this.canvas = c;
		this.ctx = c && c.getContext('2d');

		this.width = c.width;
		this.height = c.height;
	}

	// 基本图形
	// 矩形
	// 三角形
	// 圆形
	// 椭圆
	// 五边形
	// 六边形
	// 五角星
	// 平行四边形
	// 梯形
	// 菱形

	// 矩形
	// rect
	line(x1, y1, x2, y2){
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
		this.ctx.closePath();
	}

	rect(x, y, w, h){
		// 画一个矩形
		this.ctx.strokeRect(x, y, w, h);
	}

	square(x, y, w){
		this.ctx.strokeRect(x, y, w, w );
	}

	// 三角形
	triangle(x1, y1, x2, y2, x3, y3){
		// this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.lineTo(x3, y3);
		this.ctx.lineTo(x1, y1);
		this.ctx.stroke();
		// this.ctx.closePath();
	}

	// 圆
	circle(x, y, r){
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
		this.ctx.closePath();
		this.ctx.stroke();
	}

	// 半圆
	semiCircle(x, y, r){
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, Math.PI, true);
		this.ctx.closePath();
		this.ctx.stroke();
	}


	// 三个点确定一个平行四边形：
	// 两个相邻的顶点
	// 一个中心点
	parallelogram(x1, y1, x2, y2, x3, y3){
		let x = x3;
		let y = y3;

		let x11 = x + (x - x1);
		let y11 = y + (y - y1);

		let x22 = x + (x - x2);
		let y22 = y + (y - y2);

		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.lineTo(x11, y11);
		this.ctx.lineTo(x22, y22);
		this.ctx.lineTo(x1, y1);
		this.ctx.stroke();
	}

	// 菱形
	// 两个点（相对的顶点）和边长确定一个菱形
	// 三个相邻的顶点
	diamond(x1, y1, x3, y3, l){
		// 相对的顶点相连互相垂直的两条线
		let l1 = Math.abs((x3 - x1)/2);
		let l3 = l;
		// let l2 = 
		// let l3 = Math.sqrt((l2 * l2 + l1 * l1));
		// l1 * l1 + l2 * l2 = l3 * l3;

		let l2 = Math.sqrt(l3 * l3 - l1 * l1);

		// 确定中点
		let x = x1 + (x3 - x1)/2;
		let y = y1 + (y3 - y1)/2;

		this.ctx.moveTo(x1, y1);
		// this.ctx.lineTo(x2, y2);
		this.ctx.lineTo(x3, y3);
		// this.ctx.lineTo(x4, y4);
		// this.ctx.lineTo(x1, y1);
		this.ctx.stroke();
	}

	heart(){
		// 心形
	}


}

// 交互
// 动画队列
// 事件队列
