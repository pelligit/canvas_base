// 基本2d图形
// 简单的绘制，静态图形
class Draw{
	constructor(canvasId){
		let c = document.getElementById(canvasId) || null;
		this.canvas = c;
		this.ctx = c && c.getContext('2d');

		this.width = c.width;
		this.height = c.height;

		this.fillStyle = '#000';
		this.stokeStyle = '#000';
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

	// 矩形
	rect(x, y, w, h){
		// 画一个矩形
		this.ctx.strokeRect(x, y, w, h);
	}

	// 圆角矩形
	radiusRect(x, y, w, h, radius){
		if(w > h){
			if(radius > h){
				radius = h;
			}
		}else{
			if(radius > w){
				radius = w;
			}
		}

		this.ctx.beginPath();
		this.ctx.moveTo(x + radius, y);
		this.ctx.lineTo(x + w - radius, y);
		this.ctx.arcTo(x + w, y, x + w, y + radius, radius);
		this.ctx.lineTo(x + w, y + h - radius);
		this.ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
		this.ctx.lineTo(x + radius, y + h);
		this.ctx.arcTo(x, y + h, x, y + h - radius, radius);
		this.ctx.lineTo(x, y + radius);
		this.ctx.arcTo(x, y, x + radius, y, radius);
		this.ctx.closePath();
		this.ctx.fill();
	}

	// 正方形
	/**
	 * [square description]
	 * @param  {[type]} x [左上角x坐标]
	 * @param  {[type]} y [左上角y坐标]
	 * @param  {[type]} w [正方形的宽度]
	 * @return {[type]}   [description]
	 */
	square(x, y, w){
		this.ctx.strokeRect(x, y, w, w );
	}

	// 三角形
	/**
	 * [triangle description]
	 * @param  {[type]} x1 [第一个点x]
	 * @param  {[type]} y1 [第一个点y]
	 * @param  {[type]} x2 [第二个点x]
	 * @param  {[type]} y2 [第二个点y]
	 * @param  {[type]} x3 [第三个点x]
	 * @param  {[type]} y3 [第三个点y]
	 * @return {[type]}    [description]
	 */
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
	/**
	 * [circle description]
	 * @param  {[type]} x [圆心x]
	 * @param  {[type]} y [圆心y]
	 * @param  {[type]} r [圆的半径]
	 * @return {[type]}   [description]
	 */
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

	test_heart(){
		// 心形
		this.ctx.beginPath();
		this.ctx.moveTo(75, 40);
		this.ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
		this.ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
		this.ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
		this.ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
		this.ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
		this.ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
		this.ctx.closePath();
		this.ctx.fill();
	}

	// 心型
	heart(x, y){
		this.ctx.beginPath();
		this.ctx.moveTo(75, 40);
		this.ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
		this.ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
		this.ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
		this.ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
		this.ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
		this.ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
		this.ctx.closePath();
		this.ctx.fill();
	}

	// 圆环
	ring(x, y, r1, r2){
		this.ctx.beginPath();
		this.ctx.arc(x, y, r1, 0, Math.PI * 2, true);
		this.ctx.arc(x, y, r2, 0, Math.PI * 2, false);
		this.ctx.closePath();
		this.ctx.fill();
	}

	// 扇形
	/**
	 * [fan description]
	 * @param  {[type]} x   [description]
	 * @param  {[type]} y   [description]
	 * @param  {[type]} r   [description]
	 * @param  {[type]} deg [description]
	 * @return {[type]}     [description]
	 */
	fan(x, y, r, deg){
		let real_rad = (Math.PI/180) * deg;
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(x + r, y);
		this.ctx.arc(x, y, r, 0, real_rad, false);
		this.ctx.closePath();
		this.ctx.fill();
	}

	// 扇形
	fan1(x, y, r1, r2, deg){
		let real_rad = (Math.PI/180) * deg;
		this.ctx.beginPath();
		this.ctx.arc(x, y, r1, 0, real_rad, false);
		this.ctx.arc(x, y, r2, real_rad, 0, true);
		this.ctx.closePath();
		this.ctx.fill();
		// this.ctx.stroke();
	}

	// 箭头
	/**
	 * [arrow description]
	 * @param  {[type]} x [左上角坐标x]
	 * @param  {[type]} y [左上角坐标y]
	 * @param  {[type]} w [箭头尾巴的宽度]
	 * @param  {[type]} h [箭头尾巴的高度]
	 * @return {[type]}   [description]
	 */
	arrow(x, y, w, h){
		this.ctx.beginPath();
		this.ctx.moveTo(x, y + h);
		this.ctx.lineTo(x + w, y + h);
		this.ctx.lineTo(x + w, y);
		this.ctx.lineTo(x + w + 0.75 * w, y + h + h/2);
		this.ctx.lineTo(x + w, y + h + h + h);
		this.ctx.lineTo(x + w, y + h + h);
		this.ctx.lineTo(x, y + h + h);
		this.ctx.closePath();
		this.ctx.fill();
	}

	// 正多边形
	/**
	 * [polygon description]
	 * @param  {[type]} cx          [中心点坐标x]
	 * @param  {[type]} cy          [中心点坐标y]
	 * @param  {[type]} edge_sum    [总的边数目]
	 * @param  {[type]} edge_length [边的长度]
	 * @return {[type]}             [description]
	 */
	polygon(cx, cy, edge_sum, edge_length){
		this.ctx.beginPath();
		
		let per_rad = (2 * Math.PI)/edge_sum;

		for(let i = 0; i < edge_sum; i++){
			let x = Math.cos(per_rad * i);
			let y = Math.sin(per_rad * i);
			this.ctx.lineTo(x * edge_length + cx, y * edge_length + cy);
		}

		this.ctx.closePath();
		this.ctx.fill();
	}

	// 网格
	net(x, y, w, h, x_distance, y_distance){
		x_distance = x_distance || 10;
		y_distance = y_distance || 10;

		let x_sum = Math.floor(w/x_distance);
		let y_sum = Math.floor(h/y_distance);

		if(x%2 === 0){
			x = x + 0.5;
		}

		if(y%2 === 0){
			y =  y + 0.5;
		}

		for(let i = 1; i <= x_sum; i++){
			this.ctx.moveTo(x + x_distance * i, y);
			this.ctx.lineTo(x + x_distance * i, y + h);
		}

		for(let j = 1; j <= y_sum; j++){
			this.ctx.moveTo(x, y + y_distance * j);
			this.ctx.lineTo(x + w, y + y_distance * j);
		}

		// 边框
		this.ctx.strokeRect(x, y, w, h);

		this.ctx.stroke();
	}

	// 十字
	/**
	 * [cross description]
	 * @param  {[type]} x   [中心点位置，x坐标]
	 * @param  {[type]} y   [中心点位置，y坐标]
	 * @param  {[type]} len [线的长度]
	 * @return {[type]}     [description]
	 */
	cross(x, y, len){
		let real_len = Math.abs(len/1);
		let half = real_len/2;
		
		if(x%2 === 0){
			x = x + 0.5;
		}

		if(y%2 === 0){
			y = y + 0.5;
		}

		this.ctx.moveTo(x - half, y);
		this.ctx.lineTo(x + half, y);

		this.ctx.moveTo(x, y - half);
		this.ctx.lineTo(x, y + half);

		this.ctx.stroke();
	}

	// 月亮
	moon(x, y, r, deg){
		let start_rad = Math.PI/180 * (-60);
		let end_rad = Math.PI/180 * deg;

		// true是逆时针
		this.ctx.arc(x, y, r, start_rad, end_rad, true);

		// this.ctx.arc(x - 100, y, r * 3, start_rad, end_rad, false);

		this.ctx.stroke();
	}

	// 波
	/**
	 * [wave description]
	 * @param  {[number]} x [开始坐标，x]
	 * @param  {[number]} y [开始坐标，y]
	 * @param  {[number]} w [一个周期的宽度，width]
	 * @param  {[number]} h [波峰的高度，或者，波谷的深度]
	 * @param  {[number]} sum [周期数]
	 */
	wave(x, y, w, h, sum){
		let per_deg = Math.PI/180;

		let temp_x, temp_y;
		let temp_rad;
		let round = 0;

		let path = w/360;

		// 总的周期数量
		let sum_round = (sum*360)/1 || 360;

		this.ctx.fontStyle = '微软雅黑 14px';
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		for(let i = 0; i < sum_round; i++){
			temp_rad = per_deg * i;
			temp_x = i * path + x;
			temp_y = h * Math.sin(temp_rad) + y;
			this.ctx.lineTo(temp_x, temp_y);
		}
		this.ctx.stroke();
		// this.ctx.fill();
	}

	// 连续线，y是x的函数
	// y的值根据x的变化而变化
	path(x, y){
		let per_deg = Math.PI/180;

		this.ctx.beginPath();
		for(let i = 0; i < 1000; i++){
			let temp_rad = i * per_deg + per_deg;
			let temp_x = i + x;
			let temp_y = temp_x/5 + Math.cos(temp_rad * 20) - ((x * x) * Math.cos(temp_rad))/(10 * x);

			if(i === 0){
				this.ctx.moveTo(temp_x, temp_y);
			}else{
				this.ctx.lineTo(temp_x, temp_y);
			}
		}
		this.ctx.stroke();
	}

	// 轨迹演示
	path1(x, y){
		let count = 0;
		let per_deg = Math.PI/180;
		let _this = this;

		this.ctx.beginPath();


		setInterval(function(){
			let temp_rad = count * per_deg + per_deg;
			let temp_x = count + x;
			let temp_y = temp_x/5 + Math.cos(temp_rad * 20) - ((x * x) * Math.cos(temp_rad))/(10 * x);

			if(count === 0){
				_this.ctx.moveTo(temp_x, temp_y);
			}else{
				_this.ctx.lineTo(temp_x, temp_y);
				_this.ctx.stroke();
			}
			
			count = count + 1;
		}, 10);

	}
}

// icon图标库
class Icon{
	constructor(w, h){
		this.width = w || 36;
		this.height = h || 36;
		this.color = '#999';

		this.debug = false;

		let canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;

		this.ctx = canva.ctx;
	}
}
