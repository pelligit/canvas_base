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

	function KEY(){
		var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		var letter_sum = letters.length;

		// 唯一的key，类型，时间戳和随机6位字母组合
		this.getKey = function(type){
			return type + '_' + (new Date().getTime()) + '_' + this.getLetters(6);			
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

	// 唯一的键
	var _KEY = new KEY();

	// 数据库
	var DB = new DATABASE();

	// 初始化数据库
	DB.init(['animate', 'event']);

	// 用户实例
	var USER_CASE = null;

	

	// 单个对象的动画数据，内部使用
	function ONE_ANIMATE(){
		this.status = '0,1,2';// 0, 表示没有开始，1，表示正在进行，2，表示暂停

		// 开始动画
		this.start = function(){};

		// 结束动画
		this.end = function(){};

		// 暂停动画
		this.pause = function(){};

		// 重新开始
		this.restart = function(){};

		// 翻转动画
		this.reverse = function(){};
	}

	// 全局的动画循环
	// 所有的动画都依赖这一个动画循环
	// 而不是每次都重新创建动画循环
	function GLOBAL_ANIMATE(){
		// 帧计数，每次动画循环+1
		this.frame_count = 0;

		// 一共开始了多少时间
		this.time_count = 0;
		this.start_time = 0;
		this.fps = 0;

		// 动画循环的ID
		this.id = null;
		
		// 暂停
		this.pause = function(){};

		// 开始
		this.start = function(){};

		// 停止,结束
		this.stop = function(){};

		this.init = function(){};
	}


	function DIV(obj){
		var _obj = obj || {};
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

		// 格式化样式:缺少基本尺寸
		var _style = formatCss(_css);

		// 格式化后的css属性数据
		this.style = _style;

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

		this.id = '';
		this.klass = '';
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

		// 属性
		this.attr = {};

		// 父元素
		this.parent = null;

		// 子元素
		this.children = [];

		// 兄弟元素
		this.siblings = [];

		// function 

		// 初始化一个div
		this.init = function(){
			// 初始化是将用户传递进来的参数进行过滤，解析
			var _cssObj = praseObj(_obj);
		};

		// 绘制这个div
		this.draw = function(){
			// 准备工作结束以后
			// 将这个div绘制出来
			var _DRAW = new DRAW();

			// 画出来
			_DRAW.render(this.style);
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

		this.css = function(cssObj){
			// 更新属性
			// 重新绘制
			// 设置这个div的css样式
			// 重新绘制在canvas上
		};

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

		// 点击事件
		this.click = function(fn){};
	}

	

	// 构造函数
	function DOM(canvas){
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.width = canvas.width;
		this.height = canvas.height;

		USER_CASE = this;

		// 获取canvas元素在页面中的位置


		// 事件不能添加到outline上
		// 

		this.div = function(obj){
			var _div = new DIV(obj);

			// obj也是样式，用来设置div的初始样式
			// 解析完，立刻绘制在canvas上

			var _pen = new DRAW(this.ctx);

			// 绘制之前，分析绘制的顺序
			// 层次管理，
			// 
			// 根据分析好的样式表进行绘制
			_pen.render(_div.style);
			
			return _div;
		};
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
	function DRAW(ctx){
		// 确定画法
		var _ctx = ctx;
		// 跟层次无关的绘制
		// 
		// 
		// 先确定大小、形状、位置

		// 第一步：阴影
		// 第二步：背景
		// 第三步：边框
		// 第四步：文字
		// 第五步：轮廓

		// // 位置解析
		// this.position = function(){
		// 	// 解析位置
		// 	// 确定当前元素的位置
		// 	// 在div初始化的时候，就确定该元素和兄弟元素的关系，
		// 	// 确定结束之后再绘制
		// };

		// 判断是否是圆形的
		// 绘制阴影
		this.shadow = function(shadowCss, position){
			// 内容和边框的阴影
			// 多重阴影
		};
		
		// 画背景
		this.background = function(backgroundCss, position){
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
		};

		// 画边框
		this.border = function(borderCss, position){

		};

		// 画轮廓：四方的
		this.outline = function(outlineCss, position){
			// 不影响阴影
			// 不影响边框
			// 不影响其他元素
			// 不影响定位
		};

		// 写字
		this.text = function(textCss, position){
			// 字体
			// 下划线，删除线
			// 斜体，粗体
		};

		// 在canvas中显示内容,必须的css
		this.render = function(css){// 去除单位之后的属性集合
			// 基本位置
			var w = css.width;
			var h = css.height;
			var x = css.left;
			var y = css.top;

			// 相对于父元素
			var base = {
				x: css.left,
				y: css.top,
				w: css.width,
				h: css.height
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

			// 画阴影
			this.shadow(_text_css, base);

			// 画背景
			this.background(_background_css, base);

			// 画边框
			this.border(_border_css, base);

			// 画文字
			this.text(_text_css, base);

			// 画轮廓
			this.outline(_outline_css, base);




			// 分解css样式内容
			// 分别传递给不同的方法
			// 
			// 
			// 开始画图
			// 根据css的内容，绘出合适的内容
			// 分析字体样式
			// 分析背景样式
			// 分析轮廓样式
			// 分析边框样式
			// 分析文字样式
			// 分析鼠标样式
			// 分析层次：根据分析出来的层次，调整绘制结果
			// 
			// 
			// 分析结束，先画背景
			// 然后边框
			// 然后轮廓
			// 然后阴影
			// 然后文字
			// 
			// 子元素是另外一个div，接着绘制
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
function drawDiv(ctx, obj){
	if(obj){
		// 不包括边框的矩形范围
		createDivPath(ctx, obj);
		ctx.stroke();

		// 边框宽度为10
		// 边框中心线
		createDivPath(ctx, {
			width: obj.width + 10,
			height: obj.height + 10,
			left: obj.left - 10/2,
			top: obj.top - 10/2
		});

		// 根据这个绘制边框
		ctx.stroke();

		// div范围边线
		// 带边框的
		// 根据这部分绘制背景
		createDivPath(ctx, {
			width: obj.width + 10 * 2,
			height: obj.height + 10 * 2,
			left: obj.left - 10,
			top: obj.top - 10
		});

		ctx.stroke();
	}
}


// 创建div的绘制路径
function createDivPath(ctx, baseObj){
	if(baseObj){
		var w = baseObj.width;
		var h = baseObj.height;
		var x = baseObj.left;
		var y = baseObj.top;

		// 数值：3,4,5，,5，之类的
		var radius = baseObj.borderRadius || 0;

		// 四个顶点
		var l_t_x = x;
		var l_t_y = y;

		var r_t_x = x + w;
		var r_t_y = y;

		var r_b_x = x + w;
		var r_b_y = y + h;

		var l_b_x = x;
		var l_b_y = y + h;

		// 确定矩形的圆角
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

		// 顶边
		var line_t_left_x = x + radius;
		var line_t_left_y = y;

		var line_t_right_x = x + w - radius;
		var line_t_right_y = y;

		// 右边
		var line_r_top_x = x + w;
		var line_r_top_y = y + radius;

		var line_r_bottom_x = x + w;
		var line_r_bottom_y = y + h - radius;

		// 底边
		var line_b_right_x = x + w - radius;
		var line_b_right_y = y + h;

		var line_b_left_x = x + radius;
		var line_b_left_y = y + h;

		// 左边
		var line_l_bottom_x = x;
		var line_l_bottom_y = y + h - radius;

		var line_l_top_x = x;
		var line_l_top_y = y + radius;

		ctx.beginPath();

		// 开始绘画
		// 顶边
		ctx.moveTo(line_t_left_x, line_t_left_y);
		ctx.lineTo(line_t_right_x, line_t_right_y);

		// 上-右
		ctx.arcTo(r_t_x, r_t_y, line_r_top_x, line_r_top_y, radius);

		// 右边
		ctx.lineTo(line_r_top_x, line_r_top_y);
		ctx.lineTo(line_r_bottom_x, line_r_bottom_y);

		// 右-底
		ctx.arcTo(r_b_x, r_b_y, line_b_right_x, line_b_right_y, radius);

		// 底边
		ctx.lineTo(line_b_right_x, line_b_right_y);
		ctx.lineTo(line_b_left_x, line_b_left_y);

		// 底-左
		ctx.arcTo(l_b_x, l_b_y, line_l_bottom_x, line_l_bottom_y, radius);

		// 左边
		ctx.lineTo(line_l_bottom_x, line_l_bottom_y);
		ctx.lineTo(line_l_top_x, line_l_top_y);

		// 左-上
		ctx.arcTo(l_t_x, l_t_y, line_t_left_x, line_t_left_y, radius);

		ctx.closePath();
	}
}

