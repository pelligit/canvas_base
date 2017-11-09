// (function(){
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

	// 解析css样式
	var _PARSE = new Parse();

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

	// 单个对象的事件
	function ONE_EVENT(){

	}

	

	// 构造函数
	function DOM(canvas){
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.width = canvas.width;
		this.height = canvas.height;

		// 事件不能添加到outline上
		// 

		this.div = function(obj){
			// obj也是样式，用来设置div的初始样式
			// 解析完，立刻绘制在canvas上
			
			var elem = {
				id: '',
				klass: '',
				attr: {},
				style: {
					width: '',
					height: '',
					left: '',
					top: '',
					zIndex: '',
					borderLeft: '',
					borderTop: '',
					borderRight: '',
					borderBottom: '',
					borderTopLeftRadius: '',
					borderTopRightRadius: '',
					borderBottomLeftRadius: '',
					borderBottomRightRadius: '',
					paddingLeft: '',
					paddingTop: '',
					paddingBottom: '',
					paddingRight: '',
					backgroundColor: '',
					backgroundImage: '',
					backgroundPosition: '',
					backgroundRepeat: '',
					outlineStyle: '',// 轮廓线
					outlineColor: '',
					outlineWidth: '',
				},
				children: [],
				siblings: [],
				parent: null,
				create: function(style){
					// 创建一个div，传递一个参数
				},
				append: function(div){
					// 在这个元素中添加一个元素
				},
				remove: function(){
					// 把这个元素移除
				},
				prepend: function(){},
				css: function(obj){
					// 样式文件
					// 获取解析结果
					var restult = _PARSE.getResult(obj);

					// 设置好
					this.style = result;
				},
				on: function(type, fn){
					// 事件
				},
				draw: function(){
					// 
					// 背景
					// 四条边
					// 外边框
					// 子元素
				},
				animate: function(obj, milisec, fn){},
				attr: function(obj){},
				before: function(){},
				after: function(){}
			};
		};
	}


	function Parse(){
		// 解析css样式
		function parseStyle(obj){
			// 颜色：red, #ff0000, rgb(255, 0, 0), hsl(), rgba(), hsla(),
			// 单位: 34， 50%，
			// 边框的样式
				
			// 基本样式：确定大小和位置
			var base_data = {
				width: '',
				height: '',
				left: '',
				top: '',
				zIndex: ''
			};

			var border_data = {
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

			// 背景的样式
			var background_data = {
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

			// 外框的样式
			var outline_data = {
				outline: '',
				outlineStyle: '',
				outlineColor: '',
				outlineWidth: ''
			};

			// 内部字体的样式
			var font_data = {
				fontStretch: '',
				fontStyle: '',
				fontWeight: '',
				unicodeRange: '',
				fontFamily: ''
			};

			// 内边距的样式
			var padding_data = {
				padding: '',
				paddingLeft: '',
				paddingTop: '',
				paddingRight: '',
				paddingBottom: ''
			};

			var text = {
				textAlign: '',
				textDecoration: '',
				color: '',
				letterSpacing: '',
				direction: '',
				lineHeight: '',
				textIndent: '',
				textShadow: '',
				textTransform: '',
				verticalAlign: '',
				whiteSpace: '',
				wordSpacing: '',
				textOverflow: '',
				wordWrap: '',
				wordBreak: ''
			};

			var cursor = {
				cursor: 'pointer'
			};

			var box = {
				overflowX: '',
				overflowY: '',
				overflowStyle: '',
				rotation: '',
				torationPoint: '',
			};

			var color = {
				opacity: '',
				colorProfile: '',
				renderingIntent: ''
			};
		}




		// 解析css样式
		this.getResult = function(obj){
			// 返回结果
			var style = {};

			// 返回一个画图时候依赖的样式对象
			// 因为传递过来的参数里面有很多信息可能是不需要的

			return style;
		};

		// 驼峰
		// 短横线
		// 过滤器

		// 解析边框样式
		this.border = function(){};

		// 解析背景样式
		this.background = function(){};

		// 解析padding样式
		this.padding = function(){};

		// 解析外边框的样式
		this.outline = function(){};

		// 解析内部字体的样式
		this.font = function(){};

		this.text = function(){};
	}

	// 设置绘图句柄的属性
	function SetCTXProperties(){
		var obj = {
			fillStyle: '',
			'filter': '',
			font: '',
			globalAlpha: '',
			lineCap: '',
			lineDashOffset: '',
			lineJoin: '',
			lineWidth: '',
			miterLimit: '',
			shadowBlur: '',
			shadowColor: '',
			shadowOffsetX: '',
			shadowOffsetY: '',
			strokeStyle: '',
			textAlign: '',
			textBaseline: '',
			globalCompositeOperation: '',
			imageSmoothingEnabled: true,
			imageSmoothingQuality: '',
		};
	}

	function DRAW(ctx){
		// 确定画法
		
		// 画背景
		this.background = function(){};

		// 画边框
		this.border = function(){};

		// 画轮廓：四方的
		this.outline = function(){

		};

		// 绘制内容，子元素
		this.content = function(){};

		// 写字
		this.text = function(){};
	}

	window.DOM = DOM;
// })();