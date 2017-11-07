class Color{
	constructor(){
		this.aliceblue = '#F0F8FF';
		this.antiquewhite = '#FAEBD7';
		this.aqua = '#00FFFF';
		this.aquamarine = '#7FFFD4';
		this.azure = '#F0FFFF';
		this.beige = '#F5F5DC';
		this.bisque = '#FFE4C4';
		this.black = '#000000';
		this.blanchedalmond = '#FFEBCD';
		this.blue = '#0000FF';
		this.blueviolet = '#8A2BE2';
		this.brown = '#A52A2A';
		this.burlywood = '#DEB887';
		this.cadetblue = '#5F9EA0';
		this.chartreuse = '#7FFF00';
		this.chocolate = '#D2691E';
		this.coral = '#FF7F50';
		this.cornflowerblue = '#6495ED';
		this.cornsilk = '#FFF8DC';
		this.crimson = '#DC143C';
		this.cyan = '#00FFFF';
		this.darkblue = '#00008B';
		this.darkcyan = '#008B8B';
		this.darkgoldenrod = '#B8860B';
		this.darkgray = '#A9A9A9';
		this.darkgreen = '#006400';
		this.darkkhaki = '#BDB76B';
		this.darkmagenta = '#8B008B';
		this.darkolivegreen = '#556B2F';
		this.darkorange = '#FF8C00';
		this.darkorchid = '#9932CC';
		this.darkred = '#8B0000';
		this.darksalmon = '#E9967A';
		this.darkseagreen = '#8FBC8F';
		this.darkslateblue = '#483D8B';
		this.darkslategray = '#2F4F4F';
		this.darkturquoise = '#00CED1';
		this.darkviolet = '#9400D3';
		this.deeppink = '#FF1493';
		this.deepskyblue = '#00BFFF';
		this.dimgray = '#696969';
		this.dodgerblue = '#1E90FF';
		this.feldspar = '#D19275';
		this.firebrick = '#B22222';
		this.floralwhite = '#FFFAF0';
		this.forestgreen = '#228B22';
		this.fuchsia = '#FF00FF';
		this.gainsboro = '#DCDCDC';
		this.ghostwhite = '#F8F8FF';
		this.gold = '#FFD700';
		this.goldenrod = '#DAA520';
		this.gray = '#808080';
		this.green = '#008000';
		this.greenyellow = '#ADFF2F';
		this.honeydew = '#F0FFF0';
		this.hotpink = '#FF69B4';
		this.indianred = '#CD5C5C';
		this.indigo = '#4B0082';
		this.ivory = '#FFFFF0';
		this.khaki = '#F0E68C';
		this.lavender = '#E6E6FA';
		this.lavenderblush = '#FFF0F5';
		this.lawngreen = '#7CFC00';
		this.lemonchiffon = '#FFFACD';
		this.lightblue = '#ADD8E6';
		this.lightcoral = '#F08080';
		this.lightcyan = '#E0FFFF';
		this.lightgoldenrodyellow = '#FAFAD2';
		this.lightgrey = '#D3D3D3';
		this.lightgreen = '#90EE90';
		this.lightpink = '#FFB6C1';
		this.lightsalmon = '#FFA07A';
		this.lightseagreen = '#20B2AA';
		this.lightskyblue = '#87CEFA';
		this.lightslateblue = '#8470FF';
		this.lightslategray = '#778899';
		this.lightsteelblue = '#B0C4DE';
		this.lightyellow = '#FFFFE0';
		this.lime = '#00FF00';
		this.limegreen = '#32CD32';
		this.linen = '#FAF0E6';
		this.magenta = '#FF00FF';
		this.maroon = '#800000';
		this.mediumaquamarine = '#66CDAA';
		this.mediumblue = '#0000CD';
		this.mediumorchid = '#BA55D3';
		this.mediumpurple = '#9370D8';
		this.mediumseagreen = '#3CB371';
		this.mediumslateblue = '#7B68EE';
		this.mediumspringgreen = '#00FA9A';
		this.mediumturquoise = '#48D1CC';
		this.mediumvioletred = '#C71585';
		this.midnightblue = '#191970';
		this.mintcream = '#F5FFFA';
		this.mistyrose = '#FFE4E1';
		this.moccasin = '#FFE4B5';
		this.navajowhite = '#FFDEAD';
		this.navy = '#000080';
		this.oldlace = '#FDF5E6';
		this.olive = '#808000';
		this.olivedrab = '#6B8E23';
		this.orange = '#FFA500';
		this.orangered = '#FF4500';
		this.orchid = '#DA70D6';
		this.palegoldenrod = '#EEE8AA';
		this.palegreen = '#98FB98';
		this.paleturquoise = '#AFEEEE';
		this.palevioletred = '#D87093';
		this.papayawhip = '#FFEFD5';
		this.peachpuff = '#FFDAB9';
		this.peru = '#CD853F';
		this.pink = '#FFC0CB';
		this.plum = '#DDA0DD';
		this.powderblue = '#B0E0E6';
		this.purple = '#800080';
		this.red = '#FF0000';
		this.rosybrown = '#BC8F8F';
		this.royalblue = '#4169E1';
		this.saddlebrown = '#8B4513';
		this.salmon = '#FA8072';
		this.sandybrown = '#F4A460';
		this.seagreen = '#2E8B57';
		this.seashell = '#FFF5EE';
		this.sienna = '#A0522D';
		this.silver = '#C0C0C0';
		this.skyblue = '#87CEEB';
		this.slateblue = '#6A5ACD';
		this.slategray = '#708090';
		this.snow = '#FFFAFA';
		this.springgreen = '#00FF7F';
		this.steelblue = '#4682B4';
		this.tan = '#D2B48C';
		this.teal = '#008080';
		this.thistle = '#D8BFD8';
		this.tomato = '#FF6347';
		this.turquoise = '#40E0D0';
		this.violet = '#EE82EE';
		this.violetred = '#D02090';
		this.wheat = '#F5DEB3';
		this.white = '#FFFFFF';
		this.whitesmoke = '#F5F5F5';
		this.yellow = '#FFFF00';
		this.yellowgreen = '#9ACD32';
	}

	rgb(r, g, b){
		// 返回一个rgb表示的颜色值
		// hsl，十六进制颜色的画
		// 参数：23，4，34// rgb格式颜色
		// 参数：#786677 // 十六进制颜色
		// 参数：8, 78%, 48% // hsl颜色
		return 'rgb('+ r +', '+ g +', '+ b +')';
	}

	rgba(r, g, b, a){
		return 'rgba('+ r +', '+ g +', '+ b +', '+ a +')';
	}

	hsl(h, s, l){
		return 'hsl('+ h +', '+ s +', '+ l +')';
	}

	hsla(h, s, l, a){
		return 'hsl('+ h +', '+ s +', '+ l +', '+ a +')';
	}

	hex(val){
		let len = val.length;

		// #fff
		// aa3422
		// #aa3422
		if(len !== 3 || len !== 6 || len !== 7){
			return '';
		}

		// 如果取值区间不对，则不可以

		// 判断是否是16进制
		// 判断长度是否是6位或者7位
		if(val.indexOf('#') < 0){
			return '#' + val;
		}

		return val;
	}

	// 颜色值转换
	static rgb2hsl(r, g, b){}

	static hsl2rgb(h, s, l){}

	static hex2rgb(val){}

	static rgb2hex(r, g, b){}

	static hex2hsl(val){}

	static hsl2hex(h, s, l){}

	static hsla2rgba(h, s, l, a){}

	static rgba2hsla(r, g, b, a){}
}

class Angle{
	constructor(){
		// 一度 === 这么多弧度
		this.deg = Math.PI * 2/360;

		// 一弧度 === 这么多°
		this.rad = 180/(Math.PI);
	}

	// 参数是角度值，返回一个弧度值,
	degree(val){
		return (Math.PI/180) * val;
	}

	// 参数是角度值，返回弧度值
	// 和上面的一样
	radian(val){
		// val/180 = Math.PI /180;
		return val / (180/Math.PI);
	}
}


// 点方程
// 所有的参数都没有检测
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

	on(x, y){
		// 判断一个坐标点是否在这个平面里
	}
}

class Help{
	constructor(){}


	// 线段与水平的夹角（0, 360）逆时针方向
	angle(x1, y1, x2, y2){}

	// 角度转换



}






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
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
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

	circle(x, y, r){
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
		this.ctx.closePath();
		this.ctx.stroke();
	}

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


}