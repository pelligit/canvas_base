// 点方程
// 点
class Dot{
	constructor(x, y){
		let _x = x;
		let _y = y;

		this.x = x;
		this.y = y;

		this.get_x = function(){
			return _x;
		};

		this.get_y = function(){
			return _y;
		};
	}

	get _x(){
		return this.get_x();
	}

	get _y(){
		return this.get_y();
	}

	draw(ctx, r){
		ctx.beginPath();
		ctx.arc(this.x, this.y, (r||2), 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}

	opposite(x, y){
		// 求以参数为中心对称的对称点
		return {
			x: x + (x - this.x),
			y: y + (y - this.y)
		};
	}

	// 该点与参数坐标的距离
	distance(x, y){
		let dis_x = x - this.x;
		let dis_y = y - this.y;

		return Math.sqrt(dis_x * dis_x + dis_y * dis_y);
	}

	// 该点与参数坐标点的中点
	middle(x, y){
		return {
			x: x - (x - this.x)/2,
			y: y - (y - this.y)/2
		};
	}

	// 将位置移动到坐标（x, y）
	to(x, y){
		this.x = x;
		this.y = y;
	}

	// 将这个点设置为初始的值
	reset(){
		this.x = this._x;
		this.y = this._y;
	}

	// 向左移动dis个距离
	toLeft(dis){
		this.x = this.x + dis;
	}

	toRight(dis){
		this.x = this.x - dis;
	}

	toTop(dis){
		this.y = this.y - dis;
	}

	toBottom(dis){
		this.y = this.y + dis;
	}

	// 随机生成sum个点的坐标
	// static dotArray(sum){}
}

// 线段
// 水平线和竖直线会有问题
class Line{

	// y = ax + b;
	constructor(x1, y1, x2, y2){
		let d1 = {
			x: x1,
			y: y1
		};

		let d2 = {
			x: x2,
			y: y2
		};

		let length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

		// 如果x2 - x1 == 0，则表示是一条竖直的线
		// 如果y2 - y1 == 0，则表示是一条水平的线
		let dis_x = x2 - x1;
		let dis_y = y2 - y1;

		let a, b;
		if(dis_x === 0){
			a = 0;
			b = y1;
			// let a = dis_x === 0 ? 0 : (dis_y/dis_x).toFixed(6)/1;
			// let b = y1 - a * x1;
		}

		if(dis_y === 0){
			a == 0;
			b == 0;
		}

		if(dis_x !== 0 && dis_y !== 0){
			a = (dis_y/dis_x).toFixed(6)/1;
			b = y1 - a * x1;
		}

		this.x = function(y){
			return (y - b)/a;
		};

		this.y = function(x){
			return a * x + b;
		};

		// 是竖直线
		this.is_vertical_line = false;

		// 是水平线
		this.is_horizon_line = false;

		if(dis_x === 0){
			this.is_horizon_line = true;
			this.y = function(x){
				return y2;
			};

			this.x = function(y){
				return fasle;
			};
		}

		if(dis_y === 0){
			this.is_vertical_line = true;
			
			this.x = function(y){
				return x2;
			};

			this.y = function(x){
				return false;
			};
		}


		// // 斜率
		// this.a = ((y2 - y1)/(x2 - x1)).toFixed(6)/1;
		// // 位移
		// this.b = y1 - this.a * x1;

		// 第一个点
		this.d1 = d1;

		// 第二个点
		this.d2 = d2;

		this.get_a = function(){
			return a;
		};

		this.get_b = function(){
			return b;
		};

		this.get_d1 = function(){
			return d1;
		};

		this.get_d2 = function(){
			return d2;
		};

		this.get_length = function(){
			return length;
		};
	}

	get a(){
		return this.get_a();
	}

	get b(){
		return this.get_b();
	}

	get _d1(){
		return this.get_d1();
	}

	get _d2(){
		return this.get_d2();
	}

	// 只读属性：length
	get length(){
		return this.get_length();
	}

	// 将这条线重置为初始状态
	reset(){
		this.d1.x = this._d1.x;
		this.d1.y = this._d1.y;
		this.d2.x = this._d2.x;
		this.d2.y = this._d2.y;
	}

	// length

	// 将这条线画出来
	draw(ctx){
		let d1 = this.d1;
		let d2 = this.d2;

		ctx.moveTo(d1.x, d1.y);
		ctx.lineTo(d2.x, d2.y);
		ctx.stroke();

		return ctx;
	}

	// 线段分段，将这个线段一共分为sum段，返回分割点的集合
	split(sum){
		let s = sum && Math.abs(sum)|0 || 1;// 转换为整数
		s = s < 1 ? 1: s;// 排除0
		if(s === 1){
			return [this.d1, this.d2];
		}else{
			let arr = [];

			let d1 = this.d1;
			let d2 = this.d2;

			let step_x = (d2.x - d1.x)/s;
			let step_y = (d2.y - d1.y)/s;

			arr.push(d1);

			for(let i = 1; i < s; i++){
				arr.push({
					x: d1.x + step_x * i,
					y: d1.y + step_y * i
				});
			}

			arr.push(d2);

			return arr;
		}
	}

	/**
	 * [将这条线段炸成多条线]
	 * @param  {[number]} max [数目，将这条线段炸成max条线段]
	 * @param  {[boolean]} rdm [是否随机，默认为true，如果为false，则等长度]
	 * @return {[array]}     [返回炸完后的结果：
	 *         					[
	 *         						l1, // new Line()
	 *         						l2,
	 *         						l3
	 *         					]
	 * 						 ]
	 */
	boom(max, rdm){
		let m = max && max/1 || -1;
		let r = true;


		if(m <= 1 || isNaN(m)){
			return this;
		}else{
			if(rdm !== undefined){
				r = r && rdm;
			}

			let result = [];
			let _this = this;

			let d1 = _this.d1;
			let d2 = _this.d2;

			let getResult = function(arr){
				let len = arr.length;
				
				let result = [];

				arr.forEach(function(item, index, arr){
					if(index !== len - 1){
						result.push(new Line(item.x, item.y, arr[index + 1].x, arr[index + 1].y));
					}
				});

				return result;
			}


			let getRdm = function(min, max){
				return Math.random() * (max - min) + min;
			};

			let getSortedArr = function(name){
				let arr = [];

				for(let j = 0; j < m - 1; j++){
					// 竖直的线
					let temp = getRdm(d2[name], d1[name]);
					arr.push(temp);
				}

				// 从小到大排列
				arr = arr.sort(function(a, b){
					return a - b;
				});

				if(d2.x - d1.x > 0){
					return arr;
				}else{
					return arr.reverse();
				}
			};

			let rdmByX = function(){
				let arrX = getSortedArr('x');

				let arr_point = [];
				arrX.forEach(function(item, index, arr){
					let temp_y = _this.y(item);
					arr_point.push({
						x: item,
						y: temp_y
					});
				});

				return arr_point;
			};

			let rdmByY = function(){
				let arrY = getSortedArr('y');

				let arr_point = [];
				arrY.forEach(function(item, index, arr){
					let temp_x = _this.x(item);
					arr_point.push({
						x: temp_x,
						y: item
					});
				});

				return arr_point;
			};

			if(r){
				// 随机炸裂
				let points_arr = null;

				if(!_this.is_vertical_line){
					// 水平或者有斜率的线
					points_arr = rdmByX();
				}else{
					// 竖直的线
					points_arr = rdmByY();
				}

				// if(d1.x < points_arr[0].x && ){

				// }

				points_arr.unshift({
					x: d1.x,
					y: d1.y
				});

				points_arr.push({
					x: d2.x,
					y: d2.y
				});

				result = getResult(points_arr);
			}else{
				// 均匀爆炸
				let arr = _this.split(m);
				result = getResult(arr);
			}
			
			return result;
		}
	}

	vertex(){
		// 返回这个线段的顶点
		return [new Dot(this.d1.x, this.d1.y), new Dot(this.d2.x, this.d2.y)];
	}

	// 根据坐标点中心对称
	// 根据线段，镜像对称
	// 返回两个点
	mirror(l){
		// 镜像
	}

	// 完整包含这条线段的矩形范围，返回四个顶点
	// 根据这四个顶点连线绘制的矩形，会将整个线段包含进去
	range(){
		let d1 = this.d1;
		let d2 = this.d2;

		return [
			d1, 
			{
				x: d1.x,
				y: d2.y
			},
			d2,
			{
				x: d2.x,
				y: d1.y
			}
		];
	}


	// 线段的中点
	middle(){
		let x1 = this.d1.x;
		let x2 = this.d2.x;

		let y1 = this.d1.y;
		let y2 = this.d2.y;

		return {
			x: x1 + (x2 - x1)/2,
			y: y1 + (y2 - y1)/2
		};
	}

	toLeft(dis){
		this.d1.x = this.d1.x - dis||0;
		this.d2.x = this.d2.x - dis||0;

		return this;
	}

	toRight(dis){
		// 向右移动dis个距离
		this.d1.x = this.d1.x + dis||0;
		this.d2.x = this.d2.x + dis||0;

		return this;
	}

	toTop(dis){
		this.d1.y = this.d1.y - dis||0;
		this.d2.y = this.d2.y - dis||0;

		return this;
	}

	toBottom(dis){
		this.d1.y = this.d1.y + dis||0;
		this.d2.y = this.d2.y + dis||0;

		return this;
	}

	// 根据一个点，进行顺时针旋转
	rotate(x, y, deg){
		// 
	}

	// 坐标点到线段的距离
	distance(x, y){
		// y = ax + b;
		// let rad = Math.atan(this.a);
		if(this.is_vertical_line){
			// 如果是竖直线
			return x - this.x();
		}

		if(this.is_horizon_line){
			return y - this.y()
		}

		// 既不是水平线，也不是竖直线
		// 说明有斜率
		// 取得斜率的反正切值，与x轴的夹角
		let rad = Math.atan(this.a);

		// 在水平方向上画一条线，直到与线段相交
		// 取得相交点的坐标
		// 获取到相交点到实际点的距离
		// 已知夹角
		// 已知斜边
		// 根据三角函数，求得对边
		let xx = this.x(y);

		let dis = Math.abs(xx - x);

		return Math.sin(rad) * dis;
		
	}

	// 垂足
	vfoot(x, y){
		// 参数点（x, y）与这条线的垂足
		// 这个点到这条线的距离
		let dis = this.distance(x, y);


	}

	// 判断一个点是否在这条直线上
	// 因为精度问题，这里判断不是很准确
	on(x, y){
		if(this.is_vertical_line){
			return x === this.x();
		}

		if(this.is_horizon_line){
			return y === this.y();
		}

		return this.a * x + this.b === y;
	}

	// 线段与x坐标轴的弧度
	angle(){
		if(this.is_vertical_line){
			return 90 * (Math.PI/180);
		}

		if(this.is_horizon_line){
			return 0;
		}

		let a = this.a;

		// 弧度值
		let rad = Math.atan(a);

		return rad;
	}

	// 判断一条直线是否与这条直线垂直
	// 是否垂直
	vertical(l){
		let l_a = l.a;

		// 如果两条直线的斜率相乘为-1，则互相垂直
		return l_a * this.a === - 1;
	}

	// 是否平行
	parallel(l){
		let l_a = l.a;

		return l_a === this.a;
	}

	// 是否相反: 斜率互为相反数
	contrast(l){
		let l_a = l.a;

		return l_a === -this.a;
	}

	// 将会相交，只要斜率不一样，就肯定相交。直线相交
	willCross(l){
		let l_a = l.a;

		return l_a !== this.a ? true : false;
	}

	// 完全相交，线段相交
	// 判断是否相交
	// 如果相交，则返回交点
	// 如果不想交，则返回false
	cross(l){
		if(this.is_vertical_line && l.is_vertical_line){
			return this.x() === l.x();
		}

		if(this.is_horizon_line && l.is_horizon_line){
			return this.y() === l.y();
		}

		

		if(this.is_vertical_line || l.is_vertical_line){
			// 如果有一个为
		}

		let l_a = l.a;
		let l_b = l.b;

		let t_a = this.a;
		let t_b = this.b;
		// y = ax + b;
		// y = ax + b;


	}
}

// 平面
class Plane{
	// arr = [{x: 12, y: 345}, {x: 4, y: 45}, {x: 34, y: 45}];
	constructor(arr){
		// 点阵信息
		let step = [];

		arr.forEach(function(item, index, arr){
			step.push(item);
		});

		// 控制点
		this.control = arr;

		this.get_control = function(){
			return step;
		};
	}

	get _control(){
		return this.get_control();
	}

	// 将这条线画出来
	draw(ctx){
		let control = this.control;
		let len = control.length;

		ctx.beginPath();
		ctx.moveTo(control[0]['x'], control[0]['y']);
		for(let i = 1; i < len; i++){
			ctx.lineTo(control[i]['x'], control[i]['y']);
		}

		// 回到起点
		ctx.lineTo(control[0]['x'], control[0]['y']);

		ctx.closePath();
		ctx.fill();

		// 返回绘图句柄
		return ctx;
	}

	// 多边形的每条边线
	edge(){
		let control = this.control;
		let len = control.length;

		let _edge = [];

		for(let i = 1; i < len; i++){
			// 每条边
			_edge.push(new Line(
				control[i - 1]['x'],
				control[i - 1]['y'],
				control[i]['x'], 
				control[i]['y']
			));
		}

		_edge.push(new Line(
			control[len - 1]['x'],
			control[len - 1]['y'],
			control[0]['x'], 
			control[0]['y']
		));


		return _edge;
	}

	// 周长
	perimeter(){
		let lines = this.edge();
		let len = lines.length;

		let length = 0;
		for(let i = 0; i < len; i++){
			length = length + lines[i].length;
		}

		return length;
	}

	// 该多边形的范围
	range(){
		// 该形状的范围
		// 返回四个点，这四个点是某矩形的四个定点，
		let x_arr = [];
		let y_arr = [];
		
		let control = this.control;

		control.forEach(function(item, index, arr){
			x_arr.push(item.x);
			y_arr.push(item.y);
		});

		let x_min = Math.min.apply(Math, x_arr);
		let x_max = Math.max.apply(Math, x_arr);

		let y_min = Math.min.apply(Math, y_arr);
		let y_max = Math.max.apply(Math, y_arr);

		return [
			{
				x: x_min,
				y: y_min
			},
			{
				x: x_max,
				y: y_min
			},
			{
				x: x_max,
				y: y_max
			},
			{
				x: x_min,
				y: y_max
			}
		];
	}

	// 像素面积
	area(){
		// 面积，这个形状占据的面积是多少
		// 创建离屏canvas，在canvas上绘制这个形状，然后生成图片信息，
		// 遍历生成的图片信息
		// 有像素值的为正确，
		let canva = document.createElement('canvas');
		let size_range = this.range();
		let size_min = size_range[0];
		let size_max = size_range[2];
		let width = size_max['x'] - size_min['x'];
		let height = size_max['y'] - size_min['y'];

		canva.width = width;
		canva.height = height;

		let o_ctx = canva.getContext('2d');
		this.draw(o_ctx);

		let imgData = o_ctx.getImageData(0, 0, width, height);
		let _data = imgData.data;
		let len = _data.length;

		let arr = [];

		for(let i = 0; i < len; i = i + 4){
			let empty = false;

			let r = _data[i];
			let g = _data[i + 1];
			let b = _data[i + 2];
			let alpha = _data[i + 3];

			// 值都是255
			if(alpha !== 0){
				// 不为空
				arr.push({
					index: i/4,// 位置
					r: r,
					g: g,
					b: b,
					a: alpha
				});
			}
		}

		return {
			area: arr.length,
			data: arr,// 所有的像素数据
			width: imgData.width,
			height: imgData.height
		};
	}

	reset(){
		let arr = [];
		let len = this._control;

		let temp_dot = null;
		for(let i = 0; i < len; i++){
			temp_dot = this._control[i];
			arr.push(temp_dot);
		}

		this.control = arr;
	}

	// 整体移动
	// to(){}

	toLeft(dis){
		this.control.forEach(function(item, index, arr){
			item.x = item.x - dis;
		});

		return this;
	}

	toRight(dis){
		this.control.forEach(function(item, index, arr){
			item.x = item.x + dis;
		});

		return this;
	}

	toTop(dis){
		this.control.forEach(function(item, index, arr){
			item.y = item.y - dis;
		});

		return this;
	}

	toBottom(dis){
		this.control.forEach(function(item, index, arr){
			item.y = item.y + dis;
		});

		return this;
	}

	// centrosymmetry
	// 以参数坐标点中心对称变换
	centrosymmetry(x, y){

		this.control.forEach(function(item, index, arr){
			let _x = item.x;
			let _y = item.y;

			item.x = x + (x - _x);
			item.y = y + (y - _y);
		});
	}

	// 根据直线进行镜像变换
	mirror(l){
		// 
	}

	// 根据一个点，进行旋转
	rotate(x, y){}

	on(x, y){
		// 判断一个坐标点是否在这个平面里
	}

	// 爆炸
	boom(max){}
}



