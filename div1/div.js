(function(){
	function TYPE(){
		this.is = function(o, type){
			return (Object.prototype.toString.call(o)).toLowerCase() === '[object '+ type.toLowerCase() +']';
		};

		this.isInt = function(o){
			if(this.is(o, 'number')){
				return o%1 === 1;
			}else{
				return false;
			}
		};
		
		this.isNumber = function(o){
			return this.is(o, 'number');
		};

		this.isString = function(o){
			return this.is(o, 'string');
		};

		this.isUndefined = function(o){
			return this.is(o, 'undefined');
		};

		this.isFloat = function(o){
			if(this.is(o, 'number')){
				return !(o%1 === 0);
			}else{
				return false;
			}
		};

		this.isFunction = function(o){
			return typeof o === 'function';
		};

		this.isArray = function(o){
			return this.is(o, 'array');
		};

		this.isObject = function(o){
			return this.is(o, 'object');
		};

		this.isEmptyObject = function(o){
			if(this.isObject(o)){
				// 如果是对象的话
				var count = 0;

				for(var name in o){
					count = count + 1;
				}

				return count === 0 ? true : false;
			}else{
				return false;
			}
		};

		// 简单类型：值类型，字符串，数字，null，undefined，Boolean
		this.isValue = function(o){
			return !(this.isObject(o) || this.isArray(o));
		};

		// 是颜色值:rgb,hsl,rgba, hsla, #ffeeaa
		this.isColor = function(val){

		};

		// 是边框样式：solid,dashed,
		this.isBorderStyle = function(val){};

		// 是长度值：1px，2px，3px之类的
		this.isLength = function(val){};

		// 是百分比单位
		this.isPercentage = function(val){};

		// 是图片路径
		this.isImgUrl = function(val){

		};
	}

	// 工具
	function Tools(){
		// 深刻隆
		this.deepClone = function(obj){
			var _obj, _this = this;

			if(_TYPE.isObject(obj)){
				_obj = {};
			}else if(_TYPE.isArray(obj)){
				_obj = [];
			}else{
				// 简单类型
				return obj;
			}

			for(var propName in obj){
				if(_TYPE.isValue(obj[propName])){
					_obj[propName] = obj[propName];
				}else{
					// 引用类型
					_obj[propName] = _this.deepClone(obj[propName]);
				}
			}

			return _obj;
		};
	}

	function KEY(){
		var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		var letter_sum = letters.length;

		// 唯一的key，类型，时间戳和随机6位字母组合
		this.getKey = function(type){
			return type + '_' + this.getCurTimestamp() + '_' + this.getLetters(6);			
		};

		// 获取随机的字母组合，
		// 参数：count表示字母的数位
		this.getLetters = function(count){
			if(count <= 1 || isNaN(count/1)){
				count = 1;
			}

			var arr = [];
			
			for(var i = 0; i < count; i++){
				arr.push(letters[(Math.random() * letter_sum | 0)]);
			}

			return arr.join('');
		};

		// 获取当前的时间戳
		this.getCurTimestamp = function(){
			return (new Date()).getTime();
		};
	}

	// 数据库
	function DATABASE(){
		// var _this = this;
		// 表
		function TABLE(name){
			this.name = name || _KEY.getLetters(6);
			
			// 真正的数据
			var _data = {
				// id1: {

				// },
				// id2: {},
				// id3: {},
			};

			var _index = [];

			this.add = function(data){
				var _id = id in data && data.id.length > 0 && data.id || false;
				var id = null;

				if(_id){
					id = _id;
				}else{
					id = _KEY.getKey(this.name);
				}

				_index.push(id);
				_data[id] = data;

				// 增加一条数据
				return id;
			};

			// id是字符串
			// index是数字
			// 两种数据类型，字符串和数字
			this.del = function(patter){
				// 序号,序号
				if(_TYPE.isNumber(patter)){
					var obj_id = this.id(patter);
					if(obj_id){
						// 返回了正确的ID
						delete _data[obj_id];
						
						// 删除这个序号
						_index = _index.splice(patter, 1);

						return true;
					}else{
						return false;
					}
					// 数字，根据序号删除数据
				}else if(_TYPE.isString(patter)){
					if(patter in _data){
						var obj_index = this.index(patter);

						delete _data[patter];
						_index = _index.splice(obj_index, 1);

						return true;
					}else{
						return false;
					}
				}else{
					return false;
				}
			};

			this.get = function(id){
				// 获取id为id的数据
				if(id in _data){
					var _i = 0;
					var len = _index.length;
					for(var i = 0; i < len; i++){
						if(_index[i] == id){
							_i = i;
							break;
						}
					}

					return {
						data: _data[id],
						index: _i
					}
					
				}else{
					// 不存在data中
					return false;
				}
			};

			this.modify = function(id, newData){
				// 修改数据
			};

			// 返回所有的
			this.all = function(){
				return _data;
			};

			// 根据顺序返回数据
			this.eq = function(i){
				var id = this.id(i);

				if(id){
					return _data[id];
				}else{
					return false;
				}
			};

			this.id = function(i){
				// 必须是整数
				if(_TYPE.isInt(i) && i >= 0 && i < _index.length){
					return _index[i];
				}else{
					return false;
				}
			};

			// 根据id返回顺序
			this.index = function(id){
				// 字符串
				if(_TYPE.isString(id)){
					var len = _index.length;
					for(var i = 0; i < len; i++){
						if(_index[i] == id){
							return i;
						}
					}

					return false;
				}else{
					return false;
				}
			};
		}
		
		/**
		 * [init description]
		 * @param  {[string||array]} name [初始化数据库]
		 * @return {[type]}      [description]
		 */
		this.init = function(name){
			if(name){
				if(_TYPE.isString(name)){
					console.log('字符串');
					this[name] = new TABLE(name);
				// }else if(Object.prototype.toString.call(name) === '[object Array]'){
				}else if(_TYPE.isArray(name)){
					// 数组
					var len = name.length;
					for(var i = 0; i < len; i++){
						this[name[i]] = new TABLE(name[i]);
					}
				}
			}
		};
	}

	// 数据类型
	var _TYPE = new TYPE();
	// 工具
	var _TOOL = new Tools();

	// 唯一的键
	var _KEY = new KEY();

	// 数据库
	var DB = new DATABASE();

	// 初始化数据库
	DB.init(['animate', 'event']);

	// 用户实例
	var USER_CASE = null;


	// // 单个对象的动画数据，内部使用
	// function ONE_ANIMATE(){
	// 	this.status = '0,1,2';// 0, 表示没有开始，1，表示正在进行，2，表示暂停

	// 	// 开始动画
	// 	this.start = function(){};

	// 	// 结束动画
	// 	this.end = function(){};

	// 	// 暂停动画
	// 	this.pause = function(){};

	// 	// 重新开始
	// 	this.restart = function(){};

	// 	// 翻转动画
	// 	this.reverse = function(){};
	// }

	// // 全局的动画循环
	// // 所有的动画都依赖这一个动画循环
	// // 而不是每次都重新创建动画循环
	// function GLOBAL_ANIMATE(){
	// 	// 帧计数，每次动画循环+1
	// 	this.frame_count = 0;

	// 	// 一共开始了多少时间
	// 	this.time_count = 0;
	// 	this.start_time = 0;
	// 	this.fps = 0;

	// 	// 动画循环的ID
	// 	this.id = null;
		
	// 	// 暂停
	// 	this.pause = function(){};

	// 	// 开始
	// 	this.start = function(){};

	// 	// 停止,结束
	// 	this.stop = function(){};

	// 	this.init = function(){};
	// }


	// div的路径
	// 顺序为：上，右，下，左
	// 顺时针方向
	function DivPath(ctx, baseObj){
		var _ctx = ctx;

		this.ctx = ctx;
		this.base = baseObj;

		var w = baseObj.width;
		var h = baseObj.height;
		var x = baseObj.left;
		var y = baseObj.top;

		// 四个顶点
		var vertex = {
			top_left: {
				x: x,
				y: y
			},
			top_right: {
				x: x + w,
				y: y
			},
			bottom_left: {
				x: x,
				y: y + h
			},
			bottom_right: {
				x: x + w,
				y: y + h
			}
		};

		// 前面已经做好了过滤
		var radius = baseObj.borderRadius || 0;

		// 确定矩形的圆角
		// if(w > h){
		// 	var half_h = h/2;
		// 	if(radius >= half_h){
		// 		// 圆角大于h
		// 		radius = half_h;
		// 	}
		// }else{
		// 	var half_w = w/2;
		// 	if(radius >= half_w){
		// 		radius = half_w;
		// 	}
		// }

		// 顶边
		var edge_top_line = {
			left: {
				x: x + radius,
				y: y
			},
			right: {
				x: x + w - radius,
				y: y
			}
		};

		// 右边
		var edge_right_line = {
			top: {
				x: x + w,
				y: y + radius
			},
			bottom: {
				x: x + w,
				y: y + h - radius
			}
		};

		// 底边
		var edge_bottom_line = {
			right: {
				x: x + w - radius,
				y: y + h
			},
			left: {
				x: x + radius,
				y: y + h
			}
		};

		// 左边
		var edge_left_line = {
			bottom: {
				x: x,
				y: y + h - radius
			},
			top: {
				x: x,
				y: y + radius
			}
		};

		var topLine = function(){
			_ctx.moveTo(edge_top_line.left.x, edge_top_line.left.y);
			_ctx.lineTo(edge_top_line.right.x, edge_top_line.right.y);
		};

		var topRightRadius = function(){
			var dot = vertex.top_right;
			_ctx.arcTo(dot.x, dot.y, edge_right_line.top.x, edge_right_line.top.x, radius);
		};
		
		var rightLine = function(){
			_ctx.lineTo(edge_right_line.bottom.x, edge_right_line.bottom.y);
		};
		
		var bottomRightRadius = function(){
			var dot = vertex.bottom_right;
			_ctx.arcTo(dot.x, dot.y, edge_bottom_line.right.x, edge_bottom_line.right.y, radius);
		};
		
		var bottomLine = function(){
			_ctx.lineTo(edge_bottom_line.left.x, edge_bottom_line.left.y);
		};
		
		var bottomLeftRadius = function(){
			var dot = vertex.bottom_left;
			_ctx.arcTo(dot.x, dot.y, edge_left_line.bottom.x, edge_left_line.bottom.y, radius);
		};
		
		var leftLine = function(){
			_ctx.lineTo(edge_left_line.top.x, edge_left_line.top.y);
		};
		
		var topLeftRadius = function(){
			var dot = vertex.top_left;
			_ctx.arcTo(dot.x, dot.y, edge_top_line.left.x, edge_top_line.left.y, radius);
		};

		this.createPath = function(){
			_ctx.beginPath();
			topLine();
			topRightRadius();
			rightLine();
			bottomRightRadius();
			bottomLine();
			bottomLeftRadius();
			leftLine();
			topLeftRadius();
			_ctx.closePath();
		};

		this.getVertex = function(){
			return _TOOL.deepClone(vertex);
		};

		this.getTopLine = function(){
			return _TOOL.deepClone(edge_top_line);
		}

		this.getRightLine = function(){
			return _TOOL.deepClone(edge_right_line);	
		};

		this.getBottomLine = function(){
			return _TOOL.deepClone(edge_bottom_line);
		}

		this.getLeftLine = function(){
			return _TOOL.deepClone(edge_left_line);
		};

		// 返回三个点
		this.getTopRightRadius = function(){
			// moveTo(dot1)
			// arcTo(dot2, dot3);
			return {
				dot1: {
					x: edge_top_line.right.x,
					y: edge_top_line.right.y
				},
				dot2: {
					x: vertex.top_right.x,
					y: vertex.top_right.y
				},
				dot3: {
					x: edge_right_line.top.x,
					y: edge_right_line.top.y
				}
			}
		}

		this.getBottomRightRadius = function(){
			return {
				dot1: {
					x: edge_right_line.bottom.x,
					y: edge_right_line.bottom.y
				},
				dot2: {
					x: vertex.bottom_right.x,
					y: vertex.bottom_right.y
				},
				dot3: {
					x: edge_bottom_line.right.x,
					y: edge_bottom_line.right.y
				}
			}
		};

		this.getBottomLeftRadius = function(){
			return {
				dot1: {
					x: edge_bottom_line.left.x,
					y: edge_bottom_line.left.y
				},
				dot2: {
					x: vertex.bottom_left.x,
					y: vertex.bottom_left.y
				},
				dot3: {
					x: edge_left_line.bottom.x,
					y: edge_left_line.bottom.y
				}
			}
		};

		this.getTopLeftRadius = function(){
			return {
				dot1: {
					x: edge_left_line.top.x,
					y: edge_left_line.top.y
				},
				dot2: {
					x: vertex.top_left.x,
					y: vertex.top_left.y
				},
				dot3: {
					x: edge_top_line.left.x,
					y: edge_top_line.left.y
				}
			}
		};
	}


	// div对象
	function DIV(obj, show_text){
		var _obj = obj || {};
		var _inner_text = show_text;
		// 功能
		// 解析css：边框，背景，尺寸，内容，子元素
		// 动画，交互

		// 过滤
		// 解析
		// 获取可用的css结果
		// 将五花八门的css样式，设置成统一的内容
		// 供后续处理
		var _PARSE = new Colation(_obj);

		// 获取到未统一的数据格式
		var _css = _PARSE.getResult();

		// 相对于父元素的位置
		// 格式化样式:缺少基本尺寸
		var _style = formatCss(_css);

		// 格式化后的css属性数据
		this.style = _style;

		// 影响整个div的样式属性
		var effective_style = {
			width: _style['width'],
			height: _style['height'],
			left: _style['left'],
			top: _style['top'],
			borderWidth: _style['borderWidth'],// 影响尺寸
			borderRadius: _style['borderRadius'],// 影响样式
			padding: _style['padding'],// 影响尺寸
		};

		this.id = '';
		this.klass = '';
		this.innerText = show_text || '';
		// 属性
		this.attr = {};

		// 父元素
		this.parent = null;

		// 子元素
		this.children = [];

		// 兄弟元素
		this.siblings = [];



		// 全局分析
		// 绘制顺序
		// 绘制
		// div的绘制方法是一样的
		// 绘制顺序确定好之后在绘制，只用确定同级元素的绘制顺序



		// 过滤用户传递进来的css样式内容
		// function CssFilter(){}
		// 
		// 
		// 如果有兄弟元素，则，根据zIndex分析兄弟元素的绘制顺序
		// 绘制顺序：如果小于0，则不绘制，分析所有兄弟元素的css样式，确定定位方法，是float定位还是position定位
		// 解析各兄弟元素的位置
		// 绘制

		// style规则
		// 不存在before，after伪元素
		// 如果有position属性，则忽略float相关属性
		// 尺寸和长度单位一律用像素，百分比一律是相对于父元素
		// 定位的位置，一律是相对于父元素的左上角（0,0）的位置
		// 对于用户传递的参数，如果不属于可用的属性，则忽略
		// 
		// 
		// 
		// 



		// this.style = {
		// 	width: 0,						// 宽度：确定元素的宽度，默认为0，如果为0，则不绘制
		// 	height: 0,						// 高度：同宽度
		// 	left: 0,						// left值，默认为0
		// 	top: 0,							// top值，默认为0
		// 	zIndex: 0,						// 所有默认为0
		// 	float: 'none',
		// 	borderLeft: '',
		// 	borderTop: '',
		// 	borderRight: '',
		// 	borderBottom: '',
		// 	borderTopLeftRadius: '',
		// 	borderTopRightRadius: '',
		// 	borderBottomLeftRadius: '',
		// 	borderBottomRightRadius: '',
		// 	paddingLeft: '',
		// 	paddingTop: '',
		// 	paddingBottom: '',
		// 	paddingRight: '',
		// 	backgroundColor: '',
		// 	backgroundImage: '',
		// 	backgroundPosition: '',
		// 	backgroundRepeat: '',
		// 	outlineStyle: '',// 轮廓线
		// 	outlineColor: '',
		// 	outlineWidth: '',
		// 	overflow: 'hidden'				// hidden // 对于当前绘制的div，使用clip，将绘制内容限制在此区域内

		// };
		// 
		

		// 该元素的绝对位置：相对于canvas左上角的位置
		this.absolute = function(){
			var _parent = this.parent && this.parent.absolute() || {
				x: 0,
				y: 0
			};

			return {
				x: _parent.x + this.style.x,
				y: _parent.y + this.style.y
			};
		};

		// 该元素的相对位置：相对父元素的位置
		this.relative = function(){
			return {
				x: this.style.x,
				y: this.style.y
			}
		};

		// 范围：边框和内容的范围
		this.range = function(){

		};

		// 所占的区域：返回一个路径
		this.area = function(){

		};

		// 参数是一个点
		// 判断该点是否在这个div区域内
		// 用以确定事件是否在该div区域内
		this.pointIn = function(x, y){
			return false;
			return true;
		};

		// function 

		// 绘制这个div
		this.draw = function(){
			// 准备工作结束以后
			// 将这个div绘制出来
			var _DRAW = new DRAW();

			// 画出来
			_DRAW.render(this.style, _inner_text);

			// 画完了，确定子元素
			if(this.children.length !== 0){
				console.log('画子元素');
				// 分析子元素的层次关系
				// 排序
				// 绘制
			}else{
				console.log('没有子元素可画');
			}
		};

		this.append = function(other_div){
			// 在这个元素下加入另外一个元素
			this.children.push(other_div);

			// 设置这个元素的父元素
			other_div.parent = this;

			var len = this.children;
			var temp_div = null;

			// 在子元素的兄弟元素中加入这个元素
			for(var i = 0; i < len; i++){
				temp_div = this.children[i];
				temp_div.siblings.push(other_div);
				
				// 向这个元素的兄弟元素中加入已经存在的其他兄弟元素
				other_div.siblings.push(temp_div);
			}
		};

		this.remove = function(){
			// 移除当前这个div
			// 更新画布
		};

		// this.css = function(cssObj){
		// 	// 更新属性
		// 	// 重新绘制
		// 	// 设置这个div的css样式
		// 	// 重新绘制在canvas上
		// };

		// 移动
		this.to = function(x_dis, y_dis){};

		// 向左移动
		this.toLeft = function(dis){};

		// 向右
		this.toRight = function(dis){};

		// 向上
		this.toTop = function(dis){};

		// 向下
		this.toBottom = function(dis){};

		// 动画
		this.animate = function(cssObj, miliSec, fn){

		};

		// 事件
		this.on = function(type, fn){};

		// // 点击事件
		// this.click = function(fn){};
	}

	
	// 构造函数
	function DOM(canvas){
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.width = canvas.width;
		this.height = canvas.height;

		// 用户实例
		USER_CASE = this;

		this.div = function(obj, txt){
			// obj是css样式，txt是innerText，div的文字
			// var _div = new DIV(obj, txt);
			return new DIV(obj, txt);
		};

		// 创建无序列表
		this.ul = function(obj){};

		// 有序列表
		this.ol = function(obj){};

		// 图片元素
		this.img = function(src){};
	}

	

	// 设置绘图句柄的属性
	// function SetCTXProperties(){
	// 	var obj = {
	// 		fillStyle: '',
	// 		'filter': '',
	// 		font: '',
	// 		globalAlpha: '',
	// 		lineCap: '',
	// 		lineDashOffset: '',
	// 		lineJoin: '',
	// 		lineWidth: '',
	// 		miterLimit: '',
	// 		shadowBlur: '',
	// 		shadowColor: '',
	// 		shadowOffsetX: '',
	// 		shadowOffsetY: '',
	// 		strokeStyle: '',
	// 		textAlign: '',
	// 		textBaseline: '',
	// 		globalCompositeOperation: '',
	// 		imageSmoothingEnabled: true,
	// 		imageSmoothingQuality: '',
	// 	};
	// }

	// 单纯的画一个div
	function DRAW(){
		// 确定画法
		var _ctx = USER_CASE.ctx;

		var _inner_text = null;
		// 第一步：阴影
		// 第二步：背景
		// 第三步：边框
		// 第四步：文字
		// 第五步：轮廓

		// 判断是否是圆形的
		// 绘制阴影
		var shadow = function(shadowCss, base_info){
			// 内容和边框的阴影
			// 多重阴影
			var shadow_properties = shadowCss['boxShadow'] || '';

			if(shadow_properties.length !== 0){
				var border_width = base_info['borderWidth'];
				var border_radius = base_info['borderRadius'];
				
				var obj = {
					width: base_info.width + border_width * 2,
					height: base_info.height + border_width * 2,
					left: base_info.left + border_width,
					top: base_info.top + border_width,
					borderRadius: border_radius
				};

				// 如果是多个属性叠加的话
				shadow_properties = shadow_properties.split(',');


				_ctx.save();

				var _path = new DivPath(_ctx, obj);

				// 创建路径
				_path.createPath();

				// 分析阴影属性
				// var boxShadow = '2px 3px 5px #ccc inset, 4px 3px 5px #aaa, 2px 4px 2px #ff0000';

				shadow_properties.forEach(function(item, index, arr){
					item = item && item.length === 0 ? '' : item;

					var cur_properties = item && item.splite(' ');
					var real_arr = [];
					var len = cur_properties.length;

					for(var i = 0; i < len; i++){
						if(cur_properties[i].length != 0){
							real_arr.push(cur_properties[i]);
						}
					}

					var off_x = real_arr[0] || 0;
					var off_y = real_arr[1] || 0;
					var blur = real_arr[2] || 0;
					var color = real_arr[3] || '#000';

					_ctx.shadowOffsetX = off_x;
					_ctx.shadowOffsetY = off_y;
					_ctx.shadowBlur = blur;
					_ctx.shadowColor = color;

					_ctx.stroke();

				});

				_ctx.restore();
			}
		};
		
		// 画背景
		var background = function(backgroundCss, base_info){
			// 背景包括边框的背景和内容的背景
			// 
			// 背景形状
			// 背景大小
			// 
			// 背景颜色
			
			// 背景图片：图片需要异步加载
			// 图片位置
			// 图片大小
			// 是否重复
			// 
			// 如果有图片的话，则需要将背景图片绘制在里另外一个canvas中
			// 另外一个canvas是与该canvas相互重叠的，同尺寸的
			// 在底层的一个
			var border_width = base_info['borderWidth'];
			var border_radius = base_info['borderRadius'];
			
			var obj = {
				width: base_info.width + border_width * 2,
				height: base_info.height + border_width * 2,
				left: base_info.left + border_width,
				top: base_info.top + border_width,
				borderRadius: border_radius
			};

			_ctx.save();
			
			var _path = new DivPath(_ctx, obj);

			// 创建路径
			// 创建背景区域
			_path.createPath();			
			
			// 分析背景内容
			var background_color = backgroundCss['backgroundColor'] || '#fff';
			var background_image = backgroundCss['backgroundImage'];

			// 填充的颜色值
			_ctx.fillStyle = background_color;
			
			// 填充
			_ctx.fill();
			
			// 如果有背景图片该怎么处理？
			
			_ctx.restore();
		};

		// 画边框
		var border = function(borderCss, base_info){
			// borderStyle
			// borderWidth
			// borderColor
			// borderRadius
			
			// 边框的样式
			var border_style = borderCss['borderStyle'] || 'solid';
			var border_width = borderCss['borderWidth'] || 1;
			var border_radius = borderCss['borderRadius'] || 0;
			var border_color = borderCss['borderColor'] || '#000';

			switch(border_style){
				case 'solid':
					var obj = {
						width: base_info.width + border_width,
						height: base_info.height + border_width,
						left: base_info.left,
						top: base_info.top,
						borderRadius: border_radius
					};

					_ctx.save();
					var _path = new DivPath(_ctx, obj);
					// 创建路径
					_path.createPath();
					_ctx.lineWidth = border_width;
					_ctx.strokeStyle = border_color;
					_ctx.stroke();
					_ctx.restore();
					break;
				case 'dashed':
					console.log('dashed border');
					break;
				case 'dotted':
					console.log('dotted border');
					break;
				case 'double':
					console.log('double border');
					break;
				case 'groove':
					console.log('groove border');
					break;
				case 'ridge':
					console.log('ridge border');
					break;
				case 'inset':
					console.log('inset border');
					break;
				case 'outset':
					console.log('outset border');
					break;
				default:
					console.log('other style border');
					break;
			}	
		};

		// 画轮廓：四方的
		var outline = function(outlineCss, base_info){
			// 不影响阴影
			// 不影响边框
			// 不影响其他元素
			// 不影响定位
			// outlineWidth
			// outlineStyle
			// outlineColor
			// 
			var outline_width = outlineCss['outlineWidth'] || 0;
			var outline_style = outlineCss['outlineStyle'] || 'solid';
			var outline_color = outlineCss['outlineColor'] || '#000';

			var border_width = base_info['borderWidth'];

			var obj = {
				width: base_info.width + border_width * 2 + outline_width * 2,
				height: base_info.height + border_width * 2 + outline_width * 2,
				left: base_info.left - border_width + outline_width,
				top: base_info.top - border_width + outline_width,
				borderRadius: 0
			};

			if(outline_width !== 0){
				switch(outline_style){
					case 'solid':
							// solid
							_ctx.save();
							var _path = new DivPath(_ctx, obj);
							// 创建路径
							_path.createPath();
							_ctx.lineWidth = outline_width;
							_ctx.strokeStyle = outline_color;
							_ctx.stroke();
							_ctx.restore();

						break;
					case 'dashed':
						console.log('dashed border');
						break;
					case 'dotted':
						console.log('dotted border');
						break;
					case 'double':
						console.log('double border');
						break;
					case 'groove':
						console.log('groove border');
						break;
					case 'ridge':
						console.log('ridge border');
						break;
					case 'inset':
						console.log('inset border');
						break;
					case 'outset':
						console.log('outset border');
						break;
					default:
						console.log('other style border');
						break;
				}
			}
		};

		// 写字
		var text = function(textCss, base_info){
			// 字体
			// 下划线，删除线
			// 斜体，粗体
			_ctx.fillStyle = textCss['color'] || '#000';

			var x = base_info.left;
			var y = base_info.top;


			// fontSize: '',		// 文字大小
			// fontWeight: '',		// 文字粗细
			// fontFamily: '',		// 字体
			// fontStretch: '',	// 
			// fontStyle: '',		// 
			// unicodeRange: '',	// 
			// textAlign: '',		// 对齐方式
			// textDecoration: '',	// 文字装饰，下划线、删除线等等
			// color: '',			// 文字颜色
			// letterSpacing: '',	// 文字间距
			// direction: '',		// 文字方向
			// lineHeight: '',		// 行高
			// textIndent: '',		// 
			// textShadow: '',		// 文字阴影
			// textTransform: '', 	// 文字变换
			// verticalAlign: '', 	// 纵向
			// whiteSpace: '',
			// wordSpacing: '',
			// textOverflow: '', 	// 文字溢出
			// wordWrap: '',		// 自动换行
			// wordBreak: '',		// 
			// textShadow: ''

			// font	设置或返回文本内容的当前字体属性
			// textAlign	设置或返回文本内容的当前对齐方式
			// textBaseline	设置或返回在绘制文本时使用的当前文本基线
			// 方法	描述
			// fillText()	在画布上绘制“被填充的”文本
			// strokeText()	在画布上绘制文本（无填充）
			// measureText()	返回包含指定文本宽度的对象
			// 这些的设置应该在分析的过程中就设置好了
			var font_family = textCss['fontFamily'] || '微软雅黑';
			var font_color = textCss['color'] || '#000';
			var font_size = textCss['fontSize'] || 16;
			var font_weight = textCss['fontWeight'] || 500;
			var text_align = textCss['textAlign'] || 'left';

			var font_arr = [font_family, font_size, font_weight];

			_ctx.font = font_arr.join('');
			_ctx.textAlign = text_align;
			_ctx.fillStyle = font_color;

			_ctx.fillText(_inner_text, x, y);
		};

		// 在canvas中显示内容,必须的css
		this.render = function(css, show_text){// 去除单位之后的属性集合
			_inner_text = show_text || '';
			// 基本位置
			var w = css.width;
			var h = css.height;
			var x = css.left;
			var y = css.top;

			// 相对于父元素
			var base = {
				left: css.left,
				top: css.top,
				width: css.width,
				height: css.height
			};

			// 过滤器
			var _filter = new Colation(css);

			// 文本相关样式
			var _text_css = _filter.text();
			// 阴影相关样式
			var _boxshadow_css = _filter.boxShadow();
			// 背景相关样式
			var _background_css = _filter.background();
			// 边框相关样式
			var _border_css = _filter.border();
			// 轮廓相关样式
			var _outline_css = _filter.outline();

			var radius = _border_css['borderRadius'] || 0;

			// 确定div的圆角
			if(w > h){
				var half_h = h/2;
				if(radius >= half_h){
					// 圆角大于h
					radius = half_h;
				}
			}else{
				var half_w = w/2;
				if(radius >= half_w){
					radius = half_w;
				}
			}

			_border_css['borderRadius'] = radius;
			base['borderRadius'] = radius;

			var borderWidth = _border_css['borderWidth'] || 1;
			_border_css['borderWidth'] = borderWidth;
			base['borderWidth'] = borderWidth;

			// 画阴影
			shadow(_boxshadow_css, base);

			// 画背景
			background(_background_css, base);

			// 画边框
			border(_border_css, base);

			// 画文字
			text(_text_css, base);

			// 画轮廓
			outline(_outline_css, base);
		};
	}

	// 过滤器
	function Colation(cssList){
		this.list = cssList || {};

		// 过滤原始数据，保留有用数据
		function deal(original_data, filter_data){
			if(original_data && !_TYPE.isEmptyObject(original_data)){
				var obj = {};

				for(var name in original_data){
					if(name in filter_data){
						obj[name] = original_data[name];
					}
				}

				return obj;
			}else{
				return {};
			}
		}

		// 将参数对象合并成一个对象
		function combineObject(){
			var len = arguments.length;
			var obj = {};

			var temp_obj = null;

			for(var i = 0; i < len; i++){
				temp_obj = arguments[i];

				if(_TYPE.isObject(temp_obj)){
					for(var name in temp_obj){
						obj[name] = temp_obj[name];
					}
				}
			}

			return obj;
		}

		this.getResult = function(){
			var _base = this.base();
			var _box_shadow = this.boxShadow();
			var _background = this.background();
			var _border = this.border();
			var _outline = this.outline();
			var _text = this.text();

			// 合并这几个样式
			return combineObject(_base, _box_shadow, _background, _border, _outline, _text);
		};

		// 基本样式：尺寸和位置
		this.base = function(){
			var base_obj = {
				width: '',
				height: '',
				left: '',
				top: ''
			};

			return deal(this.list, base_obj);
		};

		// 获取盒子模型的阴影样式
		// 可能是多重阴影
		this.boxShadow = function(){
			var boxshadow_obj = {
				boxShadow: ''
			};

			return deal(this.list, boxshadow_obj);
		};

		// 获取背景样式
		this.background = function(){
			var background_obj = {
				backgroundColor: '#red',
				backgroundImage: 'url(./path/fdsf.png)',
				backgroundRepeat: 'no-repeat',
				backgroundAttachment: '',
				backgroundPosition: '',
				background: '',
				backgroundClip: '',
				backgroundOrigin: '',
				backgroundSize: ''
			};

			return deal(this.list, background_obj);
		}

		// 边框样式
		this.border = function(){
			var border_obj = {
				border: '',// solid 1px red
				borderStyle: '',
				borderColor: '',
				borderWidth: '',
				borderImage: '',
				borderImageSource: '',
				borderImageSlice: '',
				borderImageWidth: '',
				borderImageWidth: '',
				borderImageOutset: '',
				borderImageRepeat: '',
				borderLeft: '',
				borderLeftStyle: '',
				borderLeftColor: '',
				borderLeftWidth: '',
				borderTop: '',
				borderTopStyle: '',
				borderTopColor: '',
				borderTopWidth: '',
				borderRight: '',
				borderRightStyle: '',
				borderRightColor: '',
				borderRightWidth: '',
				borderBottom: '',
				borderBottomStyle: '',
				borderBottomColor: '',
				borderBottomWidth: '',
				borderRadius: '',
				borderTopLeftRadius: '',
				borderTopRightRadius: '',
				borderBottomLeftRadius: '',
				borderBottomRightRadius: ''
			};

			return deal(this.list, border_obj);
		}

		// 获取与文字相关的css样式内容
		this.text = function(){
			// 影响文字内容的css样式
			var text_obj = {
				fontSize: '',		// 文字大小
				fontWeight: '',		// 文字粗细
				fontFamily: '',		// 字体
				fontStretch: '',	// 
				fontStyle: '',		// 
				unicodeRange: '',	// 
				textAlign: '',		// 对齐方式
				textDecoration: '',	// 文字装饰，下划线、删除线等等
				color: '',			// 文字颜色
				letterSpacing: '',	// 文字间距
				direction: '',		// 文字方向
				lineHeight: '',		// 行高
				textIndent: '',		// 
				textShadow: '',		// 文字阴影
				textTransform: '', 	// 文字变换
				verticalAlign: '', 	// 纵向
				whiteSpace: '',
				wordSpacing: '',
				textOverflow: '', 	// 文字溢出
				wordWrap: '',		// 自动换行
				wordBreak: '',		// 
				textShadow: ''
			};

			return deal(this.list, text_obj);
		}

		// 轮廓样式
		this.outline = function(){
			var outline_obj = {
				outlineColor: '',
				outlineStyle: '',
				outlineWidth: ''
			};

			return deal(this.list, outline_obj);
		};
	}

	// 分析器
	// 分析的结果是什么呢
	function Analysis(){
		this.boxShadow = function(obj){};
		this.border = function(obj){};
		this.outline = function(obj){};
		this.background = function(obj){};
		this.text = function(obj){};
	}

	function formatCss(obj){
		// var rgba = /^rgba\([0-2][0-9][0-9]\,\)/;

		if(obj && _TYPE.isObject(obj)){
			for(var name in obj){
				// 遍历每个值，并处理每个值
				var cur_value = obj[name];


			}
		}
		// 将css样式表格式化
		// 格式化颜色
		// 格式化单位
		// 格式化文字
		// 判断值有哪些
		return obj;
	}

	window.DOM = DOM;
})();
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// function drawDiv(ctx, obj){
// 	if(obj){
// 		// 不包括边框的矩形范围
// 		createDivPath(ctx, obj);
// 		ctx.stroke();

// 		// 边框宽度为10
// 		// 边框中心线
// 		ctx.save();
// 		ctx.lineWidth = 10;

// 		var dotCanvas = document.createElement('canvas');
// 		dotCanvas.width = 10;
// 		dotCanvas.height = 10;
// 		var dotCtx = dotCanvas.getContext('2d');
// 		// dotCtx.strokeStyle = '#ff0000';
// 		dotCtx.arc(5.5, 5.5, 5, 0, Math.PI * 2, true);
// 		dotCtx.stroke();

// 		ctx.strokeStyle = ctx.createPattern(dotCanvas, 'repeat');

// 		createDivPath(ctx, {
// 			width: obj.width + 10,
// 			height: obj.height + 10,
// 			left: obj.left - 10/2,
// 			top: obj.top - 10/2,
// 			borderRadius: obj.borderRadius
// 		});

// 		// switch(borderStyle){
// 		// 	case 'solid':
// 		// 		solidBorder();
// 		// 		break;
// 		// 	case 'dashed':
// 		// 		dashedBorder();
// 		// 		break;
// 		// }

// 		ctx.stroke();
// 		ctx.restore();
// 		// 根据这个绘制边框

// 		// div范围边线
// 		// 带边框的
// 		// 根据这部分绘制背景
// 		createDivPath(ctx, {
// 			width: obj.width + 10 * 2,
// 			height: obj.height + 10 * 2,
// 			left: obj.left - 10,
// 			top: obj.top - 10
// 		});

// 		// ctx.stroke();
// 	}
// }




// 创建div的绘制路径
// function createDivPath(ctx, baseObj){
// 	if(baseObj){
// 		var w = baseObj.width;
// 		var h = baseObj.height;
// 		var x = baseObj.left;
// 		var y = baseObj.top;

// 		// 数值：3,4,5，,5，之类的
// 		var radius = baseObj.borderRadius || 0;

// 		// 四个顶点
// 		var l_t_x = x;
// 		var l_t_y = y;

// 		var r_t_x = x + w;
// 		var r_t_y = y;

// 		var r_b_x = x + w;
// 		var r_b_y = y + h;

// 		var l_b_x = x;
// 		var l_b_y = y + h;

// 		// 确定矩形的圆角
// 		if(w > h){
// 			var half_h = h/2;
// 			if(radius >= half_h){
// 				// 圆角大于h
// 				radius = half_h;
// 			}
// 		}else{
// 			var half_w = w/2;
// 			if(radius >= half_w){
// 				radius = half_w;
// 			}
// 		}

// 		// 顶边
// 		var line_t_left_x = x + radius;
// 		var line_t_left_y = y;

// 		var line_t_right_x = x + w - radius;
// 		var line_t_right_y = y;

// 		// 右边
// 		var line_r_top_x = x + w;
// 		var line_r_top_y = y + radius;

// 		var line_r_bottom_x = x + w;
// 		var line_r_bottom_y = y + h - radius;

// 		// 底边
// 		var line_b_right_x = x + w - radius;
// 		var line_b_right_y = y + h;

// 		var line_b_left_x = x + radius;
// 		var line_b_left_y = y + h;

// 		// 左边
// 		var line_l_bottom_x = x;
// 		var line_l_bottom_y = y + h - radius;

// 		var line_l_top_x = x;
// 		var line_l_top_y = y + radius;


// 		ctx.beginPath();

// 		function topBorder(){
// 			// 开始绘画
// 			// 顶边
// 			ctx.moveTo(line_t_left_x, line_t_left_y);
// 			ctx.lineTo(line_t_right_x, line_t_right_y);
// 		}

// 		function topRightRadius(){
// 			// ctx.moveTo(line_t_right_x, line_t_right_y);

// 			// 上-右
// 			ctx.arcTo(r_t_x, r_t_y, line_r_top_x, line_r_top_y, radius);
// 		}

// 		function rightBorder(){
// 			// 右边
// 			ctx.lineTo(line_r_top_x, line_r_top_y);
// 			ctx.lineTo(line_r_bottom_x, line_r_bottom_y);
// 		}

// 		function bottomRightRadius(){
// 			// ctx.moveTo(line_r_bottom_x, line_r_bottom_y);
// 			// 右-底
// 			ctx.arcTo(r_b_x, r_b_y, line_b_right_x, line_b_right_y, radius);
// 		}

// 		function bottomBorder(){

// 			// 底边
// 			ctx.lineTo(line_b_right_x, line_b_right_y);
// 			ctx.lineTo(line_b_left_x, line_b_left_y);
// 		}

// 		function bottomLeftRadius(){
// 			// ctx.moveTo(line_b_left_x, line_b_left_y);
// 			// 底-左
// 			ctx.arcTo(l_b_x, l_b_y, line_l_bottom_x, line_l_bottom_y, radius);
// 		}

// 		function leftBorder(){

// 			// 左边
// 			ctx.lineTo(line_l_bottom_x, line_l_bottom_y);
// 			ctx.lineTo(line_l_top_x, line_l_top_y);
// 		}

// 		function topLeftRadius(){
// 			// ctx.moveTo(line_l_top_x, line_l_top_y);
// 			// 左-上
// 			ctx.arcTo(l_t_x, l_t_y, line_t_left_x, line_t_left_y, radius);	
// 		}

// 		topBorder();
// 		topRightRadius();
// 		rightBorder();
// 		bottomRightRadius();
// 		bottomBorder();
// 		bottomLeftRadius();
// 		leftBorder();
// 		topLeftRadius();

// 		ctx.closePath();
// 	}
// }



// 盒子模型


// 基本的样式：尺寸和位置
// function DrawBorder(ctx, base_style, border_style){
// 	// base_style:确定尺寸和位置
// 	// border_style:确定边框样式
// 	// 
// 	// borderWidth
// 	// borderStyle
// 	// borderColor
// 	// borderRadius
// 	// borderImage
// 	// 
// 	// 
// 	// 默认值
// 	var _Border_Style = new BorderStyle(ctx);
// 	ctx.save();
// 	if(border_style in _Border_Style){
// 		// 确定路径
// 		var all_path = _Border_Style[border_style]();
// 	}
// 	ctx.restore();
// }

// 确定各种边框样式的路径
// 单独绘制还是确定好路径后再进行绘制？
// function BorderStyle(ctx){
// 	var _ctx = ctx;
// 	// 
// 	// 点：间隔相同的点
// 	this.dotted = function(){
// 		var obj = {
// 			data: [{
// 				x: 3,
// 				y: 3,
// 				r: 3
// 			}],
// 			path: function(obj){
// 				_ctx.beginPath();
// 				_ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2, true);
// 				_ctx.closePath();
// 			}
// 		};

// 		// 确定数据obj.data
// 		// 用path方法确定路径
// 		// 绘制

// 		// 路径列表
// 		return obj;
// 	};
// 	// 短横线
// 	this.dashed = function(){
// 		var obj = {
// 			data: [{
// 				x1: 45,
// 				y1: 45,
// 				x2: 34,
// 				y2: 88
// 			}],
// 			path: function(obj){
// 				_ctx.beginPath();
// 				_ctx.moveTo(obj.x1, obj.y1);
// 				_ctx.lineTo(obj.x2, obj.y2);
// 				_ctx.closePath();
// 			}
// 		};

// 		// 路径列表
// 		return obj;
// 	};
// 	this.solid = function(){
// 		// 确定四个点，确定四条线
// 		return this.dashed();
// 	};
// 	this.double = function(){
// 		var path_list = [];
// 		ctx.beginPath();
// 		ctx.closePath();
// 		// 路径列表
// 		return path_list;
// 	};
// 	this.groove = function(){
// 		var path_list = [];
// 		ctx.beginPath();
// 		ctx.closePath();
// 		// 路径列表
// 		return path_list;
// 	};
// 	this.ridge = function(){
// 		var path_list = [];
// 		ctx.beginPath();
// 		ctx.closePath();
// 		// 路径列表
// 		return path_list;
// 	};
// 	this.inset = function(){
// 		var path_list = [];
// 		ctx.beginPath();
// 		ctx.closePath();
// 		// 路径列表
// 		return path_list;
// 	};
// 	this.outset = function(){
// 		var path_list = [];
// 		ctx.beginPath();
// 		ctx.closePath();
// 		// 路径列表
// 		return path_list;
// 	};
// }

// 绘制矩形和圆角矩形很容易
// 绘制背景
// 绘制边框
// 轮廓线
// 有弧度的圆点曲线