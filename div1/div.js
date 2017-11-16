(function(){
	// 全局变量
	// 会一直使用的变量

	// 数据类型
	var _G_TYPE = new TYPE();

	// 工具
	var _G_TOOL = new Tools();

	// 唯一的键
	var _G_KEY = new KEY();

	// 用户实例
	var USER_CASE = null;

	// 用户的动画循环
	var USER_A = new Animation();

	// 用户数据库
	var USER_DB = new DATABASE();

	// 初始化用户数据表
	USER_DB.init(['animate', 'event', 'element', 'snapshoot']);

	// 内部使用的数据库
	var INNER_DB = new DATABASE();

	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------

	// 工具类
	// 类型判断
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

		// 可用于计算的数字类型
		this.isCanCalculateNumber = function(o){
			// 不是NaN
			// 不是infinite
			return this.isNumber(o) && !isNan(o) && isFinite(o);
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

		// 是不是事件的名字
		this.isEventName = function(o){
			if(!o || !_G_TYPE.isString(o)){
				return false;
			}

			var event_list = EVENT_LIST();
			var arr = [];
			var event_arr = arr.concat(event_list['elem_event'], event_list['doc_event']);
			var len = event_arr.length;

			for(var i = 0; i < len; i++){
				if(event_arr[i] == o.toLowerCase()){
					return true;
				}
			}

			return false;
		};

		this.isKeyBoardEventName = function(name){
			if(name && (name.toLowerCase() === 'keydown' || name.toLowerCase() === 'keypress' || name.toLowerCase() === 'keyup')){
				return true;
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

	// 工具，杂项工具
	function Tools(){
		// 深刻隆
		this.deepClone = function(obj){
			var _obj, _this = this;

			if(_G_TYPE.isObject(obj)){
				_obj = {};
			}else if(_G_TYPE.isArray(obj)){
				_obj = [];
			}else{
				// 简单类型
				return obj;
			}

			for(var propName in obj){
				if(_G_TYPE.isValue(obj[propName])){
					_obj[propName] = obj[propName];
				}else{
					// 引用类型
					_obj[propName] = _this.deepClone(obj[propName]);
				}
			}

			return _obj;
		};

		// 创建canvas元素
		this.createCanvas = function(w, h){
			var _w = w && _G_TYPE.isCanCalculateNumber(w) ? w : 300;
			var _h = h && _G_TYPE.isCanCalculateNumber(h) ? h : 150;

			var canva = document.createElement('canvas');
			canva.width = _w;
			canva.height = _h;

			return canva;
		};

		// canvas所有属性的名字
		this.canvasProperties = function(){
			return {
				fillStyle: '',
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
				imageSmoothingQuality: ''
			};
		};

		// 将参数对象合并成一个对象
		this.combineObject = function(){
			var len = arguments.length;
			var obj = {};

			var temp_obj = null;

			for(var i = 0; i < len; i++){
				temp_obj = arguments[i];

				if(_G_TYPE.isObject(temp_obj)){
					for(var name in temp_obj){
						obj[name] = temp_obj[name];
					}
				}
			}

			return obj;
		};
	}

	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// 唯一ID

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

	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// 数据库模型

	// 数据表
	function TABLE(name){
		this.name = name || _G_KEY.getLetters(6);
		
		// 真正的数据
		var _data = {
			// id1: {

			// },
			// id2: {},
			// id3: {},
		};

		// 数据索引
		var _index = [];

		this.add = function(data){
			var _id = id in data && data.id.length > 0 && data.id || false;
			var id = null;

			if(_id){
				id = _id;
			}else{
				id = _G_KEY.getKey(this.name);
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
			if(_G_TYPE.isNumber(patter)){
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
			}else if(_G_TYPE.isString(patter)){
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

		// 根据序号返回ID
		this.id = function(i){
			// 必须是整数
			if(_G_TYPE.isInt(i) && i >= 0 && i < _index.length){
				return _index[i];
			}else{
				return false;
			}
		};

		// 根据id返回顺序
		this.index = function(id){
			// 字符串
			if(_G_TYPE.isString(id)){
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

		// 获取该ID的元素
		this.getById = function(id){
			return (this.get(id))['data'];
		};

		// 根据序号返回元素
		this.getByIndex = function(index){
			var _id = this.id(index);
			return (this.get(_id))['data'];
		};
	}


	// 数据库
	function DATABASE(){
		/**
		 * [init description]
		 * @param  {[string||array]} name [初始化数据库]
		 * @return {[type]}      [description]
		 */
		this.init = function(name){
			if(name){
				if(_G_TYPE.isString(name)){
					console.log('字符串');
					this[name] = new TABLE(name);
				// }else if(Object.prototype.toString.call(name) === '[object Array]'){
				}else if(_G_TYPE.isArray(name)){
					// 数组
					var len = name.length;
					for(var i = 0; i < len; i++){
						if(_G_TYPE.isString(name[i])){
							this[name[i]] = new TABLE(name[i]);
						}
					}
				}
			}
		};

		// 新增一个table
		this.addTable = function(name){
			if(name && _G_TYPE.isString(name)){
				// 如果已经存在了这个表，则直接返回
				if(name in this){
					return this[name];
				}else{
					this[name] = new TABLE(name[i]);

					return this[name];
				}
			}else{
				// 如果不存在名字或者名字的值不是字符串
				// 则返回false
				return false;
			}
		};

		// 删除表
		this.delTable = function(name){
			if(name && _G_TYPE.isString(name)){
				// 如果已经存在了这个表，则直接返回
				if(name in this){
					this[name] = null;
					delete this[name];

					return true;
				}else{
					return false;
				}
			}else{
				// 如果不存在名字或者名字的值不是字符串
				// 则返回false
				return false;
			}
		};
	}

	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	

	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// 实例化event表
	var event_table_ok = addEventTable();

	function addEventTable(){
		var event_list = EVENT_LIST();

		// 全局
		var doc = event_list['doc_event'];

		doc.forEach(function(item, index, arr){
			var _obj = {
				id: item,
				callback: []
			};

			USER_DB.event.add(_obj);
		});

		var elem = event_list['elem_event'];

		elem.forEach(function(item, index, arr){
			var _obj = {
				id: item,
				callback: []
			};

			USER_DB.event.add(_obj);
		});

		return true;
	}

	// 事件列表
	function EVENT_LIST(){
		// 鼠标事件
		var mouse_event = [
			'click',
			'contextmenu',
			'dblclick',
			'mousedown',
			'mouseenter',
			'mouseleave',
			'mousemove',
			'mouseover',
			'mouseout',
			'mouseup',
			'wheel'
		];

		// 键盘事件
		var keyboard_event = [
			'keydown',
			'keyup',
			'keypress'
		];

		// 移动端事件
		var h5_event = [
			'touchstart',
			'touchmove',
			'touchend',
			'touchcancel',
			'tap',
			'longTap',
			'singleTap',
			'doubleTap',
			'swipe',
			'swipeLeft',
			'swipeRight',
			'swipeUp',
			'swipeDown',
		];

		var canvas_event = mouse_event.concat(h5_event);

		return {
			elem_event: canvas_event,
			doc_event: keyboard_event
		}
	}


	function ELEM_ADD_EVENT(elem){
		var event_list = EVENT_LIST();
		var canvas_event = event_list['elem_event'];

		canvas_event.forEach(function(item, index, arr){
			// 判断事件发生的位置是否在这个元素区域内部
			// 如果在元素区域内部
			// 则执行事件，如果不在元素区域内部，则不执行
			// 
			elem['on' + item] = function(_event){
				operatEvent(item, _event);
			};
		});

		// 全局事件
		var document_event = event_list['doc_event'];
		document_event.forEach(function(item, index, arr){
			document.body['on' + item] = function(_event){
				operatEvent(item, _event);
			};
		});

		function operatEvent(item, _event){
			var event_nameval = _event.type;

			// 读取事件队列里面的内容
			var callbacks = (USER_DB.event.get(item))['callback'];

			for(var name in callbacks){
				var elem_id = name;

				var elem_obj = USER_DB.element.getById(elem_id);
				var fn_list = callbacks[name];

				if(_G_TYPE.isKeyBoardEventName(event_nameval)){

					fn_list.forEach(function(item, index, arr){
						if(item && _G_TYPE.isFunction(item)){
							item.call(elem_obj, _event);
						}
					});
				}else{
					// 鼠标或者移动端手势事件
					// 判断位置
					// 这里需要进行位置转换
					var x = _event.x;
					var y = _event.y;

					if(elem_obj.isPointInArea(x, y)){
						fn_list.forEach(function(item, index, arr){
							if(item && _G_TYPE.isFunction(item)){
								item.call(elem_obj, _event);
							}
						});
					}else{
						console.log('鼠标位置不在该元素区域，不触发事件');
					}
				}
			}
		}
	}

	// 在元素上添加事件方法
	// 传递一个对象
	function AddEventMethod($_this){
		// 事件
		$_this.on = function(type, fn){
			// 添加事件
			// _this[type]
			if(_G_TYPE.isEventName(type)){
				// 如果是事件的名字
				if(fn && _G_TYPE.isFunction(fn)){
					$_this[type](fn);
				}
			}
		};

		// 事件函数
		var event_list = EVENT_LIST();
		var obj_event = event_list['canvas_event'];
		var global_event = event_list['doc_event'];

		obj_event.forEach(function(item, index, arr){
			addElemEventMethod(item);
		});

		global_event.forEach(function(item, index, arr){
			addElemEventMethod(item);
		});

		function addElemEventMethod(item){
			$_this[item] = function(fn){
				if(fn && _G_TYPE.isFunction(fn)){
					var _id = $_this.id;

					var cur_fns = ((USER_DB.event.get(item))['callback'])[_id]['fns'];

					cur_fns.push(fn);
				}
			};
		}

		return $_this;
	}

	// 事件处理
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// 动画名字列表
	function AninationName(){
		return [
			'toLeft',
			'toRight',
			'toTop',
			'toBottom',
			'to',

		];
	}

	// 动画处理
	function Animation(){
		var animation_id = null;
		var _this = this;

		this.frame_counter = 0;

		function animationQueue(){
			_this.frame_counter++;

			// 清空画布
			USER_CASE.clear();

			var list = USER_DB.animate.all();
			var cur_queue = null;
			var cur_obj = null;

			for(name in list){
				cur_queue = list[name]['queue'];
				cur_obj = USER_DB.element.getById(name);

				cur_queue.forEach(function(item, index, arr){
					// 更新元素属性
					item['fn_name'].apply(cur_obj ,item['params']);
				});

				// 重绘动画帧
				cur_obj.draw();
			}

			cur_queue = null;
		}

		// 开始执行动画
		this.start = function(){
			// 开始
			animation_id = requestAnimationFrame(animationQueue);
		};

		// 停止动画
		this.stop = function(){
			cancelAnimationFrame(animation_id);
		};
	}
	// 
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// 离屏canvas
	// 用离屏canvas保存快照
	function OffsetCanvas(w, h){
		var o_canvas = _G_TOOL.createCanvas(w, h);
		var o_ctx = o_canvas.getContext('2d');

		this._canvas = o_canvas;
		this._ctx = o_ctx;
		this._width = o_canvas.width;
		this._height = o_canvas.height;

	}

	// 单个快照
	// 放在这里只用声明一次
	// 如果放在dom的方法里面，则每次调用都需要重新声明一次
	function SnapShoot(){
		var a_snap_shoot = new OffsetCanvas(USER_CASE.width, USER_CASE.height);
		a_snap_shoot._ctx.drawImage(USER_CASE.canvas, 0, 0, USER_CASE.width, USER_CASE.height);

		// 创建快照的时间
		this.timeStamp = (new Date()).getTime();
		this.snapData = a_snap_shoot;// 快照就是这个离屏canvas
		this.id = _G_KEY.getKey('snapshoot');
		this.width = a_snap_shoot._width;
		this.height =a_snap_shoot._height;


		// 向数据库中保存快照：只一个图？
		// 可以保存状态，所有的内容
		// 包括当前canvas中的元素
		USER_DB.snapshoot.add(a_snap_shoot);
	}

	// 
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------

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
			return _G_TOOL.deepClone(vertex);
		};

		this.getTopLine = function(){
			return _G_TOOL.deepClone(edge_top_line);
		}

		this.getRightLine = function(){
			return _G_TOOL.deepClone(edge_right_line);	
		};

		this.getBottomLine = function(){
			return _G_TOOL.deepClone(edge_bottom_line);
		}

		this.getLeftLine = function(){
			return _G_TOOL.deepClone(edge_left_line);
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
		var _this = this;

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
		// 主要是尺寸和位置
		
		var effective_style = getEffectStyle(_style);

		// 把属性单独存数据库如何？
		// 
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
			return {
				min: {
					x: 0,
					y: 0
				},
				max: {
					x: 45,
					y: 89
				}
			}
		};

		// 所占的区域：返回一个路径
		this.area = function(){
			
		};

		// 参数是一个点
		// 判断该点是否在这个div区域内
		// 用以确定事件是否在该div区域内
		this.pointInArea = function(x, y){
			var _path = new DivPath(USER_CASE.ctx, effective_style);

			// 创建路径
			// 创建背景区域
			_path.createPath();

			if(USER_CASE.ctx.isPointInPath(x, y)){
				return true;
			}else{
				return false;
			}
		};

		// function 

		// 绘制这个div
		this.draw = function(){
			// 准备工作结束以后
			// 将这个div绘制出来
			var _DRAW = new DRAW(effective_style);

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

		// 在该元素上添加事件相关方法
		AddEventMethod(_this);
		
		function getEffectStyle(_style){
			var effective_style = {
				width: _style['width'],
				height: _style['height'],
				left: _style['left'],
				top: _style['top'],
				// borderWidth: _style['borderWidth'],// 影响尺寸
				// borderRadius: _style['borderRadius'],// 影响样式
				// padding: _style['padding'],// 影响尺寸
			};

			// 基本位置
			var w = _style.width;
			var h = _style.height;
			var x = _style.left;
			var y = _style.top;

			var radius = _style['borderRadius'] || 0;

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

			_style['borderRadius'] = radius;
			effective_style['borderRadius'] = radius;

			var borderWidth = _style['borderWidth'] || 0;
			_style['borderWidth'] = borderWidth;
			effective_style['borderWidth'] = borderWidth;

			if(_style['padding'] < 0){
				_style['padding'] = 0;
				effective_style['padding'] = 0;
			}

			return effective_style;
		}
	}

	// 构造函数
	function DOM(canvas){
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.width = canvas.width;
		this.height = canvas.height;

		// 开始时间
		this.start_time = (new Date()).getTime();

		// 截止到现在，运行了多长时间
		this.sofar = function(){
			return (new Date()).getTime() - this.start_time;
		};

		// 当运行milisec的时候执行函数fn
		this.when = function(fn, milisec){

		};

		// 全局动画

		// 在canvas上添加事件
		ELEM_ADD_EVENT(this.canvas);

		// 用户实例
		USER_CASE = this;

		USER_A.start();

		this.div = function(obj, txt){
			var _div = new DIV(obj, txt);

			// 向数据库中加入这个元素
			USER_DB.element.add(_div);

			// obj是css样式，txt是innerText，div的文字
			// var _div = new DIV(obj, txt);
			return _div;
		};

		// 创建无序列表
		this.ul = function(obj){};

		// 有序列表
		this.ol = function(obj){};

		// 图片元素
		this.img = function(src){};

		// 快照：目前仅仅支持保存一张图片
		// 理想情况，不仅保存图片，还能保存获取快照的时刻所有元素的内容
		// 在内部数据库中深克隆用户数据库
		// 在用户数据库中保存内部数据库内容
		this.snapshoot = function(){
			var snap = new SnapShoot();

			return snap;
		};

		// 清空画布
		this.clear = function(){
			this.canvas.clearRect(0, 0, this.width, this.height);
		};
	}

	// 单纯的画一个div
	function DRAW(_base_info){
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

			// 相对于父元素
			var base = _base_info;

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
			if(original_data && !_G_TYPE.isEmptyObject(original_data)){
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

		this.getResult = function(){
			var _base = this.base();
			var _box_shadow = this.boxShadow();
			var _background = this.background();
			var _border = this.border();
			var _outline = this.outline();
			var _text = this.text();

			// 合并这几个样式
			return _G_TOOL.combineObject(_base, _box_shadow, _background, _border, _outline, _text);
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

		if(obj && _G_TYPE.isObject(obj)){
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
	window.user_db = USER_DB;
})();