(function(){
	// 说明：
	// 【____性能____】：与性能有关的标签，有进一步优化的空间
	// _G_：表示‘全局’变量

	// 全局变量
	// 会一直使用的变量

	// 数据类型
	var _G_TYPE = new TYPE();

	// 工具
	var _G_TOOL = new Tools();

	// 样式表
	var _G_DIV_STYLE = _G_TOOL.style;

	// 唯一的键
	var _G_KEY = new KEY();

	// 动画曲线
	var _G_EASE = new EaseEffectLine();

	// 用户实例
	var USER_CASE = null;

	// 用户的动画循环
	var USER_A = new Animation();

	// 用户数据库
	var USER_DB = new DATABASE();

	var USER_WIDTH, USER_HEIGHT;

	// var sqrt = Math.sqrt;// 开方
	// var abs = Math.abs;// 绝对值
	// var sin = Math.sin;
	// var cos = Math.cos;
	// var tan = Math.tan;

	// 初始化用户数据表
	// animate是保存动画队列的表
	// event是保存事件堆栈的表
	// element是保存所有的元素
	// snapshoot是保存系统快照的表
	// style是每个元素绘制时候依赖的样式表【绘制该元素时候依赖的样式表属性】
	// attribute表是保存每个元素的属性表，对应元素的属性操作相关内容。【元素属性可以保存附加数据内容】
	USER_DB.init(['animate', 'event', 'element', 'snapshoot', 'style', 'attribute']);

	// 内部使用的数据库，暂时没有用到
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

		// 是否是闰年
		this.isLeap = function(y){
			if(y && this.isCanCalculateNumber(y) && y > 0){
    			if(y%100 === 0){
    				// 能被100整除
    				if(y%400 === 0){
    					return true;
    				}else{
    					return false;
    				}
    			}else{
    				if(y%4 === 0){
    					return true;
    				}else{
    					return false;
    				}
    			}
    		}else{
    			return false;
    		}
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

		// 合并数组
		this.combineArray = function(){
			var len = arguments.length;
			var _arr = [];
			var temp_arr = null;
			for(var j = 0; j < len; j++){
				temp_arr = arguments[j];
				_arr = _arr.concat(temp_arr);
			}

			return _arr;
		};

		// 获取当前的时间戳
		this.timeStamp = function(){
			return (new Date()).getTime();
		};
		

		// 距离start_time, 持续了多久
		this.continued = function(start_time){
			return this.timeStamp() - start_time;
		};

		this.randomBetween = function(min, max){
			min = min || 0;

			return Math.random() * (max - min) + min;
		};

		this.randomBetweenInt = function(min, max){
			return (this.randomBetween(min, max) | 0);
		};

		// 随机的颜色值
		this.randomColor = function(){
			var r = this.randomBetweenInt(0, 255);
			var g = this.randomBetweenInt(0, 255);
			var b = this.randomBetweenInt(0, 255);
			var a = Math.random();

			return 'rgba('+ r +', '+ g +', '+ b +', '+ a +')';
		};

		// 驼峰命名：background-color=>backgroundColor
		this.camelString = function(str){
			if(str.indexOf('-') > 0){
				var _arr = str.split('-');
				var len = _arr.length;

				if(len > 1){
					var _str = _arr[0];

					for(var i = 1; i < len; i++){
						_str = _str + this.captilizeLetterOne(_arr[i]);
					}

					return _str;
				}else{
					return str;
				}
			}else{
				return str;
			}
		};

		// 字符串首字母大写：
		// 'abcdefg'=>Abcdefg,'hello'=>'Hello'
		this.captilizeLetterOne = function(str){
			if(_G_TYPE.isString(str) && isNaN(str/1)){
				var str0 = str[0];
				var len = str.length;
				var strWithOutStr0 = str.substring(1, len);
				return str0.toUpperCase() + strWithOutStr0;
			}
		};

		// Fibonacci
		// 斐波那契数列
		this.fib = function(len){
			var arr = [];
			var arr_len = 0;
			for(var i = 0; i < len; i++){
				if(i <= 1){
					arr.push(i);
				}else{
					arr_len = arr.length;
					arr.push(arr[arr_len - 2] + arr[arr_len - 1]);
				}
			}

			return arr;
		};

		this.offsetCanvas = function(w, h){
			return new OffsetCanvas(w, h);
		};

		this.loadImgs = function(imgSrcList, fn){
			loadAllImg(imgSrcList, fn);
		};

		// 每度的弧度值
		this.deg = Math.PI/180;

		// 绝对值
		this.abs = Math.abs;

		// 随机数
		this.random = Math.random;

		this.pi = Math.PI;

		// 毫秒数
		this.milisec = {
			second: 1000,				// 一秒
			minute: 1000 * 60,			// 一分钟
			hour: 1000 * 60 * 60,		// 一小时
			day: 1000 * 60 * 60 * 12	// 一天
		};

		// 可能涉及到的样式表内容
		this.style = {
			animate: ['animation-name','animation-duration','animation-timing-function','animation-delay','animation-iteration-count','animation-direction','animation-play-state'],
			background: ['background-attachment','background-color','background-image','background-position','background-repeat','background-clip','background-origin','background-size'],
			border: ['border-bottom','border-bottom-color','border-bottom-style','border-bottom-width','border-color','border-left','border-left-color','border-left-style','border-left-width','border-right','border-right-color','border-right-style','border-right-width','border-style','border-top','border-top-color','border-top-style','border-top-width','border-width','border-bottom-left-radius','border-bottom-right-radius','border-image','border-image-outset','border-image-repeat','border-image-slice','border-image-source','border-image-width','border-radius','border-top-left-radius','border-top-right-radius'],
			outline: ['outline-color','outline-style','outline-width'],
			box: ['box-shadow'],
			color: ['opacity'],
			padding: ['padding-bottom','padding-left','padding-right','padding-top'],
			size: ['height','width'],
			font: ['font-family','font-size','font-style','font-variant','font-weight','font-size-adjust','font-stretch'],
			margin: ['margin-bottom','margin-left','margin-right','margin-top'],
			position: ['bottom','clear','clip','cursor','display','float','left','overflow','position','right','top','visibility','z-index'],
			text: ['color','direction','letter-spacing','line-height','text-align','text-decoration','text-indent','text-transform','unicode-bidi','vertical-align','white-space','word-spacing','text-emphasis','hanging-punctuation','punctuation-trim','text-align-last','text-justify','text-outline','text-overflow','text-shadow','text-wrap','word-break','word-wrap'],
			transition: ['transition-property','transition-duration','transition-timing-function','transition-delay']
		};

		// 离屏canvas
		function OffsetCanvas(w, h){
			var o_canvas = _G_TOOL.createCanvas(w, h);
			var o_ctx = o_canvas.getContext('2d');

			this._canvas = o_canvas;
			this._ctx = o_ctx;
			this._width = o_canvas.width;
			this._height = o_canvas.height;

			this.saveImg = function(type, quality){
				var typeVal = type || 'image/png';
				var qualityVal = quality || 1;
				return this._canvas.toDataURL(typeVal, qualityVal);
			};

			this.draw = function(fn){
				if(_G_TYPE.isFunction(fn)){
					fn(this._ctx);
				}
			};

			return this;
		}

		// 加载所有的图片
		/**
		 * [loadAllImg description]
		 * @param  {[array]}   imgSrcList [图片链接的地址集]
		 * @param  {Function} fn         [回调函数，当所有的图片都加载好了后调用]
		 * @return {[undefined]}              [没有返回值]
		 */
		function loadAllImg(imgSrcList, fn){
			var srcList = _G_TYPE.isArray(imgSrcList) ? imgSrcList : [imgSrcList];
			
			var useFul = 0;
			var loadCount = 0;
			var useFulList = [];

			function dealWithItem(item, index, arr){
				if(_G_TYPE.isString(item)){
					useFul = useFul + 1;
					useFulList.push(item);

					var img = new Image();
					img.src = item;
					img.onload = function(e){
						loadCount = loadCount + 1;

						if(loadCount >= useFul){
							console.log('全部加载成功');
							if(_G_TYPE.isFunction(fn)){
								fn(useFulList);
							}
						}
					};
				}
			}

			srcList.forEach(dealWithItem);
		}
	}

	// DOM元素方法
	function Elem(ele){
		// var doc = window && window.document;

		// 获取元素，类，ID，名字
		// this.get = function(str){};

		// 创建一个DOM元素
		// this.create = function(elemName){
		// 	return doc.createElement(elemName);
		// };
		
		var elem = ele || null;

		// css方法，设置和获取
		this.css = function(cssObject){

		};

		// 属性方法，设置和获取
		this.attr = function(attrObject){

		};

		// 插入子元素
		this.append = function(elem){

		};

		this.text = function(){
			// 如果有参数，设置该元素的text
			// 如果没有参数，返回
		};

		// 内部HTML 字符串
		this.html = function(){

		};

		// 添加一个class
		this.addClass = function(str){

		};

		// 移除一个class
		this.removeClass = function(str){

		};

		// 移除一个属性
		this.removeAttr = function(str){

		};

		// 从DOM中删除这个元素
		this.remove = function(){

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
			return type + '_' + _G_TOOL.timeStamp() + '_' + this.getLetters(6);			
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
			var _id = ('id' in data) && data['id'].length > 0 && data['id'] || false;
			var id = null;

			if(_id){
				id = _id;

				// 如果从记录中找到了该 id的记录，则不添加，直接返回ID
				if(this.has(id)){
					return id;
				}
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

		// 是否存在id为id的数据
		this.has = function(id){
			// 如果找到了id的记录
			return !!this.getById(id);
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
			var callbacks = (USER_DB.event.getById(item))['callback'];

			for(var name in callbacks){
				var elem_id = name;

				var elem_obj = USER_DB.element.getById(elem_id);
				var fn_list = callbacks[name]['fns'];

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

					if(elem_obj.pointInArea(x, y)){
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
	function AddEventMethod(){
		var _this = this;
		
		// 事件
		this.on = function(type, fn){
			// 添加事件
			// _this[type]
			if(_G_TYPE.isEventName(type)){
				// 如果是事件的名字
				if(fn && _G_TYPE.isFunction(fn)){
					this[type](fn);
				}
			}
		};
		

		// 事件函数
		var event_list = EVENT_LIST();
		var obj_event = event_list['elem_event'];
		var global_event = event_list['doc_event'];

		function dealWithItem(item, index, arr){
			addElemEventMethod(item);
		}

		obj_event.forEach(dealWithItem);

		global_event.forEach(dealWithItem);


		function addElemEventMethod(item){
			_this[item] = function(fn){
				console.log('好吧');
				if(fn && _G_TYPE.isFunction(fn)){
					var _id = _this.id;

					addEventFns(item, _id, fn);
				}
			};
		}

		return this;
	}

	function addEventFns(event_type, elem_id, fn){
		// ((USER_DB.event.getById(item))['callback'])[_id]['fns'];
		// 事件列表
		var callback_list = (USER_DB.event.getById(event_type))['callback'];
		if(elem_id in callback_list){
			callback_list[elem_id]['fns'].push(fn);
		}else{
			callback_list[elem_id] = {
				id: elem_id,
				fns: [fn]
			};
		}
	}

	// 事件处理结束
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
    // 时间相关
    function Current(){
        var _date = new Date();

        // 重新设置时间对象
        this.reset = function(timestamp){
        	_date = new Date(timestamp);
        };

        // 时间戳
        this.timestamp = function(){
            return _date.getTime();
        };

        // 年
        this.year = function(){
            return _date.getFullYear();
        };

        // 月
        this.month = function(){
            return _date.getMonth();
        };

        // 日
        this.date = function(){
            return _date.getDate();
        };

        // 时
        this.hour = function(){
            return _date.getHours();
        };

        // 分
        this.minute = function(){
            return _date.getMinutes();
        };

        // 秒
        this.second = function(){
            return _date.getSeconds();
        };

        // 星期
        this.week = function(){
            return _date.getDay();
        };

        // 年月日
        this.ymd = function(connect){
            var patter = /[-\/,]/;
            var y = this.year();
            var m = this.month();
            var d = this.date();

            m = m < 10 ? '0' + m : m;
            d = d < 10 ? '0' + d : d;

            // 只有一个字符串：-,/,,横杠，斜线，逗号
            if(connect && connect.length === 1 && patter.test(connect)){
                return y + connect + m + connect + d;
            }else{
                return '' + y + '-' + m + '-' + d;
            }
        };

        // 时分秒
        this.his = function(connect){
            var h = this.hour();
            var i = this.minute();
            var s = this.second();

            h = h < 10 ? '0' + h : h;
            i = i < 10 ? '0' + i : i;
            s = s < 10 ? '0' + s : s;

            var patter = /[:-\/]/;
            if(connect && connect.length === 1 && patter.test(connect)){
                return '' + h + connect + i + connect + s;
            }else{
                return '' + h + ':' + i + ':' + s;
            }
        };
    }

    // 时间计算
    // 上一秒，下一秒，前x秒，后x秒
    // 上一分钟，下一分钟，前x分钟，后x分钟
    // 上一小时，下一小时，前x小时，后x小时
    // 前一天，后一天，前x天，后x天
    function TimeCalc(timestamp){
    	var per = _G_TOOL.milisec;

    	this.timestamp = timestamp || new Date().getTime();

    	var _date = new Date(this.timestamp);

    	this.second = _date.getSeconds();
    	this.minute = _date.getMinutes();
    	this.hour = _date.getHours();
    	this.date = _date.getDate();
    	this.month = _date.getMonth();
    	this.year = _date.getFullYear();

    	var _this = this;
    	
    	var function_list = ['Second', 'Minute', 'Hour', 'Day'];

    	function_list.forEach(dealWithItem);

    	function dealWithItem(item, index, arr){

    		// 下一分钟、小时、秒
    		_this['next' + item] = function(){
    			var _val = item.toLowerCase();
    			return _this.timestamp + per[_val];
    		};

    		// 上一分钟、小时、秒
    		_this['pre' + item] = function(){
    			var _val = item.toLowerCase();
    			return _this.timestamp - per[_val];
    		};

    		// 后x小时，分钟，秒
    		_this['after' + item + 's'] = function(count){
    			if(_G_TYPE.isCanCalculateNumber(count)){
    				// 可以计算的值
    				var _val = item.toLowerCase();
    				return _this.timestamp + per[_val] * count;
    			}else{
    				return _this.timestamp;
    			}
    		};

    		// 前x小时、分钟、秒
    		_this['before' + item + 's'] = function(count){
    			if(_G_TYPE.isCanCalculateNumber(count)){
    				// 可以计算的值
    				var _val = item.toLowerCase();
    				return _this.timestamp - per[_val] * count;
    			}else{
    				return _this.timestamp;
    			}
    		};
    	}

    	
    }

    // 今年
    // 是否闰年
    // 总天数
    // 每月天数
    function ThisYear(){
    	var _date = new Date();
    	var year = _date.getFullYear();

    	// 是否闰年
    	var is_leap = _G_TYPE.isLeap(year);

    	// 时间戳
    	this.timestamp = _date.getTime();

    	// 闰年
    	this.isLeap = is_leap;

    	// 总天数
    	this.totalDay = this.isLeap ? 366 : 365;

    	// 该月有多少天
    	this.monthDayTotal = function(m){
    		m = m/1;

    		var total = [31,28,31,30,31,60,31,31,30,31,30,31];

    		// 如果是闰年，2月则有29天
    		if(is_leap){
    			total[1] = 29;
    		}

    		if(_G_TYPE.isCanCalculateNumber(m) && m > 0 && m < 13){
    			return total[m/1 - 1];
    		}else{
    			return -1;
    		}
    	};
    }

    // 时间差
    function DateDiff(timestamp1, timestamp2){
    	if(timestamp1 && timestamp2 && _G_TYPE.isCanCalculateNumber(timeStamp1) && _G_TYPE.isCanCalculateNumber(timestamp2)){

	    	var per = _G_TOOL.milisec;
	    	var minus = Math.abs(timestamp2 - timestamp1);

	    	// 相差多少天
	    	this.dateDiff = function(){
	    		return Math.ceil(minus/per.day);
	    	};

	    	// 相差多少小时
	    	this.hourDiff = function(){
	    		return Math.ceil(minus/per.hour);
	    	};

	    	// 相差多少分钟
	    	this.minuteDiff = function(){
	    		return Math.ceil(minus/per.minute);
	    	};

	    	// 相差多少秒
	    	this.secondDiff = function(){
	    		return Math.ceil(minus/per.second);
	    	};

	    	// 相差多少毫秒
	    	this.milisecDiff = function(){
	    		return minus;
	    	};
    	}
    }

    // 定时事件：当在xxx点，触发事件
    function clockEvent(){
    	var _timer = setInterval(function(){

    	}, 1000);

    	// 秒，分钟，小时，日期，月份，星期，年
    	var eventList = ['second', 'minute', 'hour', 'date', 'month', 'week', 'year'];

    	// 整点事件
    	this.onHour = function(h, fn){

    	};

    	// 分钟事件
    	/**
    	 * [onMinute description]
    	 * @param  {[number]} i [0-59，分钟数，每小时的这分钟都会触发事件]
    	 * @return {[type]}   [description]
    	 */
    	this.onMinute = function(i, fn){

    	};

    	// 秒事件
    	this.onSecond = function(s, fn){

    	};

    	// 日期事件
    	this.onDate = function(d, fn){};

    	// 星期事件
    	this.onWeek = function(w, fn){};

    	this.on = function(datetime, fn){};
    }
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
		var pause_animate = false;// 表示不暂停，为true表示暂停

		var pause_time = 0;
		var restart_time = 0;

		// 动画初始化的时间
		var initial_time = _G_TOOL.timeStamp();

		this.frame_counter = 0;

		// 动画实际运行的时间
		// 不包括暂停的时间
		this.realTime = function(){
			var cur = _G_TOOL.timeStamp();

			if(!pause_animate){
				return pause_time - this.initial_time;
			}else{
				return cur - this.initial_time;
			}
		};

		function animationQueue(){
			if(!pause_animate){
				animation_id = requestAnimationFrame(animationQueue);
			}

			console.log('hello animate');

			_this.frame_counter++;

			// 清空画布
			USER_CASE.clear();

			// 更新元素属性

			// 遍历所有元素，并重新绘制
			var list = USER_DB.element.all();

			for(name in list){
				var is_root = !list[name].parent;
				// 如果是根元素，才画出来
				// 如果不是根元素，则不画,在根元素的绘制方法里面，已经调用了子元素的绘制方法
				// 如果是根元素，并且没有隐藏，则绘出来
				if(is_root && !list[name].isHidden()){
					list[name].draw();
				}
			}
		}

		// 开始执行动画
		this.start = function(){
			// 开始
			animationQueue();
		};

		// 停止动画
		this.stop = function(){
			cancelAnimationFrame(animation_id);
		};

		// 动画翻转
		this.reverse = function(){
			// 全局翻转？不科学
		};

		// 动画暂停
		// 时间，初始位置，结束位置，
		// 当前位置
		// 根据时间、初始位置和结束位置计算加速度
		this.pause = function(){
			if(pause_animate){
				// 如果已经是暂停状态，则返回
				return;
			}

			// 暂停的时间
			pause_time = _G_TOOL.timeStamp();
			pause_animate = true;
		};

		// 重新开始
		this.resume = function(){
			// 如果是正在运行的状态，则不能重新开始
			if(!pause_animate){
				return;
			}

			pause_animate = false;
			// 重新开始的时间
			restart_time = _G_TOOL.timeStamp();
			this.start();
		};
	}

	// 
	// 针对单个值的变化
	/**
	 * [TweenLine description]
	 * @param {[number]} start_value [初始值]
	 * @param {[number]} end_value   [结束值]
	 * @param {[timestamp]} start_time  [开始的时间戳]
	 * @param {[milisecond]} during_time   [持续的时间]
	 */
	function TweenLine(start_value, end_value, start_time, during_time){
		var _this = this;

		var sofar_time = _G_TOOL.continued(start_time);
		var change_value = end_value - start_value;

		function useTweenLine(fn){
			if(sofar_time > during_time){
				return end_value;
			}else{
				return fn(sofar_time, start_value, change_value, during_time);
			}
		}

		var arr = [
			'easeInQuad',
			'easeOutQuad',
			'easeInOutQuad',
			'easeInCubic',
			'easeOutCubic',
			'easeInOutCubic',
			'easeInQuart',
			'easeOutQuart',
			'easeInOutQuart',
			'easeInQuint',
			'easeOutQuint',
			'easeInOutQuint',
			'easeInSine',
			'easeOutSine',
			'easeInOutSine',
			'easeInExpo',
			'easeOutExpo',
			'easeInOutExpo',
			'easeInCirc',
			'easeOutCirc',
			'easeInOutCirc',
			'easeInElastic',
			'easeOutElastic',
			'easeInOutElastic',
			'easeInBack',
			'easeOutBack',
			'easeInOutBack',
			'easeInBounce',
			'easeOutBounce',
		];

		arr.forEach(function(item, index, arr){
			_this[item] = function(){
				useTweenLine(_G_EASE[item]);
			};
		});
	}

	// 动画曲线，ease效果
	// * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
	// https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
	// http://gsgd.co.uk/sandbox/jquery/easing/
	// http://api.jqueryui.com/easings/
	// ease效果
	// t: current time, b: begInnIng value, c: change In value, d: duration
	// --------------------------------------------------------------------
	// t: 当前时间
	// b: 初始值
	// c: 值的变化（差值，最终值和初始值之间的差）
	// d: 持续时间
	function EaseEffectLine(){
		this.easeInQuad = function (t, b, c, d) {
			return c*(t/=d)*t + b;
		};

		this.easeOutQuad = function (t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		};

		this.easeInOutQuad = function (t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		};

		this.easeInCubic = function (t, b, c, d) {
			return c*(t/=d)*t*t + b;
		};

		this.easeOutCubic = function (t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		};

		this.easeInOutCubic = function (t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		};

		this.easeInQuart = function (t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		};

		this.easeOutQuart = function (t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		};

		this.easeInOutQuart = function (t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		};

		this.easeInQuint = function (t, b, c, d) {
			return c*(t/=d)*t*t*t*t + b;
		};

		this.easeOutQuint = function (t, b, c, d) {
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		};

		this.easeInOutQuint = function (t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		};

		this.easeInSine = function (t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		};

		this.easeOutSine = function (t, b, c, d) {
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		};

		this.easeInOutSine = function (t, b, c, d) {
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		};

		this.easeInExpo = function (t, b, c, d) {
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		};

		this.easeOutExpo = function (t, b, c, d) {
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		};

		this.easeInOutExpo = function (t, b, c, d) {
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		};

		this.easeInCirc = function (t, b, c, d) {
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		};

		this.easeOutCirc = function (t, b, c, d) {
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		};

		this.easeInOutCirc = function (t, b, c, d) {
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		};

		this.easeInElastic = function (t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		};

		this.easeOutElastic = function (t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		};

		this.easeInOutElastic = function (t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		};

		this.easeInBack = function (t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		};

		this.easeOutBack = function (t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		};

		this.easeInOutBack = function (t, b, c, d, s) {
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		};

		this.easeInBounce = function (t, b, c, d) {
			return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
		};

		this.easeOutBounce = function (t, b, c, d) {
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		};
	}
	// 
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	

	// 单个快照
	// 放在这里只用声明一次
	// 如果放在dom的方法里面，则每次调用都需要重新声明一次
	function SnapShoot(){
		var a_snap_shoot = _G_TOOL.offsetCanvas(USER_CASE.width, USER_CASE.height);

		a_snap_shoot._ctx.drawImage(USER_CASE.canvas, 0, 0, USER_CASE.width, USER_CASE.height);

		// 创建快照的时间
		this.time = _G_TOOL.timeStamp();
		this.snapData = a_snap_shoot;// 快照就是这个离屏canvas
		this.id = _G_KEY.getKey('snapshoot');
		this.width = a_snap_shoot._width;
		this.height = a_snap_shoot._height;

		// 将快照生成图片
		this.img = function(type){
			var _type_val = 'image/' + type;
			return a_snap_shoot._canvas.toDataURL();
		}


		// 向数据库中保存快照：只一个图？
		// 可以保存状态，所有的内容
		// 包括当前canvas中的元素
		USER_DB.snapshoot.add(a_snap_shoot);
	}

	// 
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	// 初步想法：
	// 离屏div
	// 通过给离屏div设置样式，然后根据dom方法，获取到已经设置的样式
	// 这样少写了很多代码
	// -----------------------------
	// 经过测试，这种方法不合适
	// html元素必须显示在页面上后，才会经过计算，如果是没有在页面上显示的话，
	// 就不会有计算后的值，所有的属性值都是空的
	// -----------------------------
	// 该思路失败，以下OffsetDiv是个无效方法
	// --------------------------------------
	// 如果将元素插入DOM，但是display设置为none的话，则是可以获取到计算后的css值的
	function OffsetDiv(cssObj){
		var elem = document.createElement('div');

		cssObj = cssObj || {};

		var count = 0;
		if(cssObj && _G_TYPE.isObject(cssObj)){
			count++;
			for(var name in cssObj){				
				elem.style[name] = cssObj[name];
			}
		}

		var originDisplay = cssObj['display'];
		cssObj['display'] = 'none';

		// 样式表过滤
		function styleFileter(cssObj){
			var obj = {};

			for(var _name in cssObj){
				if(_G_TOOL.isCanCalculateNumber(_name)){
					continue;
				}
				
				obj[_name] = cssObj[_name];	
			}

			return obj;
		}

		// 获取计算后的css样式表
		// 将样式表应用在隐藏的div上，然后再获取这个div的样式
		// 获取到计算后的样式之后，移除这个样式
		// 【因为这里涉及到DOM，所以这里的性能可能会有问题】
		// 【____性能____】
		function getStyleValues(){
			var _body = document.body;
			_body.appendChild(elem);

			for(var _name in cssObj){
				elem.style[_name] = cssObj[_name];	
			}

			// 获取已经应用的css值
			var applyedCss = window.getComputedStyle(elem, null);

			// 移除这个离屏div
			_body.removeChild(elem);

			return applyedCss;
		};

		// 获取css样式表内容
		this.getCss = function(){
			if(count === 0){
				return {};
			}

			var s = getStyle();
			s['display'] = originDisplay;

			// 过滤后的样式
			return styleFileter(s);
		};
	}

	// 创建内部可用的css对象
	// 根据_G_DIV_STYLE生成的
	// 过滤掉用不到的css属性
	function buildInnerCss(css){
		var tempObjArr,
			tempLength;

		var realObject = {};

		for(var name in _G_DIV_STYLE){
			
			tempObjArr = _G_DIV_STYLE[name];
			tempLength = tempObjArr.length;

			for(var i = 0; i < tempLength; i++){
				var curVal = tempObjArr[i];// 形如：'background-color'
				var curRealVal = _G_TOOL.camelString(curVal);// 处理后的结果：形如：backgroundColor
				realObject[curRealVal] = css[curRealVal];
			}
		}

		return realObject;
	}
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

		// 顶部横线
		var topLine = function(){
			_ctx.moveTo(edge_top_line.left.x, edge_top_line.left.y);
			_ctx.lineTo(edge_top_line.right.x, edge_top_line.right.y);
		};

		// 右上角圆角
		var topRightRadius = function(){
			var dot = vertex.top_right;
			_ctx.arcTo(dot.x, dot.y, edge_right_line.top.x, edge_right_line.top.x, radius);
		};
		
		// 右边竖线
		var rightLine = function(){
			_ctx.lineTo(edge_right_line.bottom.x, edge_right_line.bottom.y);
		};
		
		// 右下角圆角
		var bottomRightRadius = function(){
			var dot = vertex.bottom_right;
			_ctx.arcTo(dot.x, dot.y, edge_bottom_line.right.x, edge_bottom_line.right.y, radius);
		};
		
		// 底边横线
		var bottomLine = function(){
			_ctx.lineTo(edge_bottom_line.left.x, edge_bottom_line.left.y);
		};
		
		// 左下角圆角
		var bottomLeftRadius = function(){
			var dot = vertex.bottom_left;
			_ctx.arcTo(dot.x, dot.y, edge_left_line.bottom.x, edge_left_line.bottom.y, radius);
		};
		
		// 左边竖线
		var leftLine = function(){
			_ctx.lineTo(edge_left_line.top.x, edge_left_line.top.y);
		};
		
		// 左上角圆角
		var topLeftRadius = function(){
			var dot = vertex.top_left;
			_ctx.arcTo(dot.x, dot.y, edge_top_line.left.x, edge_top_line.left.y, radius);
		};

		// 创建路径
		this.createPath = function(){
			// 开始路径
			_ctx.beginPath();

			topLine();
			topRightRadius();
			rightLine();
			bottomRightRadius();
			bottomLine();
			bottomLeftRadius();
			leftLine();
			topLeftRadius();

			// 结束路径
			_ctx.closePath();
		};

		// 顶点坐标
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
	function DIV(cssObj, show_text){
		// ----------------------------------
		// ----------------------------------
		// ----------------------------------
		// ----------------------------------
		var _cur_div_hide = false;

		this.hide = function(){
			_cur_div_hide = true;
			return this;
		};

		this.show = function(){
			_cur_div_hide = false;
			return this;
		};

		// 是否隐藏
		this.isHidden = function(){
			return _cur_div_hide;
		};

		// ----------------------------------
		// ----------------------------------
		// ----------------------------------
		// ----------------------------------


		var _this = this;

		var _id_value = _G_KEY.getKey('element');

		// 把属性单独存数据库
		// 属性相关内容
		var _attr = USER_DB.attribute.add({
			id: _id_value
		});

		// 操作属性
		// 一个或者两个参数
		// 一个字符串参数表示获取属性值
		// 一个对象参数表示设置属性值
		this.attr = function(){
			var len = arguments.length;
			var attr_obj = USER_DB.attribute.getById(_id_value);

			if(len === 0){
				return this;
			}

			if(len <= 2){
				if(len === 1){
					if(_G_TYPE.isString(arguments[0])){
						// 读取属性
						if(arguments[0] in attr_obj){
							return attr_obj[arguments[0]];
						}else{
							return this;
						}
					}else if(_G_TYPE.isObject(arguments[0])){
						// 设置属性

						for(name in arguments[0]){
							attr_obj[name] = arguments[0][name];
						}

						return this;
					}
				}else if(len === 2){
					if(_G_TYPE.isString(arguments[0])){
						// 设置属性
						attr_obj[arguments[0]] = arguments[1];

						return this;
					}else{
						return this;
					}
				}
			}
		};

		// ----------------------------------
		// ----------------------------------
		// ----------------------------------
		// ----------------------------------
		
		// 位置参考点为左上角
		// 旋转，缩放参考点为矩形中心点
		
		// 用户传递进来的样式表内容
		// 可能有不能用的值，乱七八糟的值，无效的值
		// 【____性能____】
		// 因为这里过滤了两次，而且每次都会过滤有200多个属性的对象，可能引起性能问题
		// 第一次过滤，这里返回已经计算好的值了，应用在DOM上后再获取
		var _obj = (new OffsetDiv(cssObj)).getStyleValues();

		// 第二次过滤，解析成可用的值
		// 只包括_G_DIV_STYLE中属性相关的值
		var realStyle = buildInnerCss(_obj);

		// 格式化后的css属性数据
		this.style = realStyle;

		// 影响整个div的样式属性
		// 主要是尺寸和位置
		
		var effective_style = getEffectStyle(_style);

		this.id = _id_value;
		this.klass = '';
		this.innerText = show_text || '';

		// 层级
		this.layer = 1;

		// 父元素
		this.parent = null;

		// 子元素
		this.children = [];

		// 兄弟元素
		this.siblings = [];

		// 该元素的绝对位置：相对于canvas左上角的位置
		this.absolute = function(){
			var _parent = this.parent && this.parent.absolute() || {
				left: 0,
				top: 0
			};

			return {
				left: _parent.left + this.style.left,
				top: _parent.top + this.style.top
			};
		};

		// 该元素的相对位置：相对父元素的位置
		this.relative = function(){
			return {
				left: this.style.left,
				top: this.style.top
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

		// 绘制这个div
		this.draw = function(){
			if(!_cur_div_hide){
				var _inner_text = show_text || '';

				// 准备工作结束以后
				// 将这个div绘制出来
				var _DRAW = new DRAW(effective_style);

				// 画出来
				_DRAW.render(this.style, _inner_text);

				var child_arr = _this.children;
				var child_len = child_arr.length;

				// 将div画在离屏canvas上
				// 然后再将离屏canvas的内容画在当前canvas上

				// 画完了，确定子元素
				if(child_len !== 0){
					// 根据层次排序
					child_arr.sort(function(a, b){
						return a.layer - b.layer;
					});

					child_arr.forEach(function(item, index, arr){
						// 将子元素绘出来
						item.draw();
					});
				}
			}

			return this;
		};

		this.append = function(other_div){
			// 在这个元素下加入另外一个元素
			this.children.push(other_div);

			// 设置这个元素的父元素
			other_div.parent = this;

			var len = this.children.length;
			var temp_div = null;

			// 正常情况下，层次是按照顺序来的
			// 兄弟元素有几个，层级就是几
			other_div.layer = len;

			// 在子元素的兄弟元素中加入这个元素
			for(var i = 0; i < len; i++){
				temp_div = this.children[i];
				temp_div.siblings.push(other_div);
				
				// 向这个元素的兄弟元素中加入已经存在的其他兄弟元素
				other_div.siblings.push(temp_div);
			}

			return this;
		};

		this.remove = function(){
			// 移除当前这个div
			// 从数据库中删除该div
			var new_sibilngs = [];
			this.siblings.forEach(function(item, index, arr){
				if(item.id !== _id_value){
					new_sibilngs.push(item);
				}
			});

			this.siblings = new_sibilngs();

			// 删除父元素中这个子元素
			var parent_children = this.parent.children;
			var new_parent_children = [];

			parent_children.forEach(function(item, index, arr){
				if(item.id !== _id_value){
					new_parent_children.push(item);
				}
			});

			this.parent.children = new_parent_children;

			USER_DB.element.del(_id_value);

			return this;
		};

		// this.css = function(cssObj){
		// 	// 更新属性
		// 	// 重新绘制
		// 	// 设置这个div的css样式
		// 	// 重新绘制在canvas上
		// };

		// 移动
		this.to = function(x_dis, y_dis, miliSec){};

		// 动画
		this.animate = function(cssObj, miliSec, fn){

		};

		// 在该元素上添加事件相关方法
		AddEventMethod.call(_this);
		
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
		var _this = this;

		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.width = canvas.width;
		this.height = canvas.height;

		USER_WIDTH = this.width;
		USER_HEIGHT = this.height;

		// 开始时间
		this.start_time = (new Date()).getTime();

		// 截止到现在，运行了多长时间
		this.sofar = function(){
			return (new Date()).getTime() - this.start_time;
		};

		// 当运行milisec的时候执行函数fn
		// this.when = function(fn, milisec){

		// };

		this.div = function(obj, txt){
			var _div = new DIV(obj, txt);

			// 向数据库中加入这个元素
			USER_DB.element.add(_div);

			// obj是css样式，txt是innerText，div的文字
			// var _div = new DIV(obj, txt);
			return _div;
		};

		// // 创建无序列表
		// this.ul = function(obj){};

		// // 有序列表
		// this.ol = function(obj){};

		// // 图片元素
		// this.img = function(src){};

		// 快照：目前仅仅支持保存一张图片
		// 理想情况，不仅保存图片，还能保存获取快照的时刻所有元素的内容
		// 在内部数据库中深克隆用户数据库
		// 在用户数据库中保存内部数据库内容
		this.snapshoot = function(){
			var snap = new SnapShoot();

			return snap;
		};

		// 粒子系统
		this.particle = function(num, type){
			
		};

		// 清空画布
		this.clear = function(){
			_this.ctx.clearRect(0, 0, this.width, this.height);
		};


		// 在canvas上添加事件
		ELEM_ADD_EVENT(this.canvas);

		// 用户实例
		USER_CASE = this;

		// 全局动画
		USER_A.start();
	}

	// ------------------------------------------------------------
	// ------------------------------------------------------------
	// ------------------------------------------------------------
	// ------------------------------------------------------------

	// 粒子：球形粒子
	function ParticleBall(r, color, max_x, max_y){
		var _r = r || 1;
		var _x = _G_TOOL.randomBetweenInt(0, max_x);
		var _y = _G_TOOL.randomBetweenInt(0, max_y);
		var _color = color || _G_TOOL.randomColor();

		this.setX = function(x){
			_x = x || _x;
		};

		this.setY = function(y){
			_y = y || _y;
		};

		this.setColor = function(color){
			_color = color || _color;
		};

		this.randomX = function(max_x){
			_x = _G_TOOL.randomBetweenInt(0, max_x);
		};

		this.randomY = function(max_y){
			_y = _G_TOOL.randomBetweenInt(0, max_y);
		};

		this.draw = function(ctx){
			ctx.save();
			ctx.fillStyle = _color;
			ctx.arc(_x, _y, _r, 0, Math.PI * 2, false);
			ctx.fill();
			ctx.resotore();
		};
	}

	// 线性粒子
	/**
	 * [ParticleLine description]
	 * @param {[type]} w       [线宽]
	 * @param {[type]} min_len [线的最小长度]
	 * @param {[type]} max_len [线的最大]
	 */
	function ParticleLine(w, min_len, max_len){

	}

	// 矩形粒子
	/**
	 * [ParticleRect description]
	 */
	function ParticleRect(w){

	}

	// ----------------------------------------------------------
	// ----------------------------------------------------------
	// ----------------------------------------------------------
	// ----------------------------------------------------------
	// 轨迹方程
	// 根据x的值，获取y的值
	// 动画的时候只需要计算x的值，然后根据轨迹方程，确定y的值，就好了
	function TrailFunction(){
		// 直线轨迹
		// 直线方程：y = ax + b
		this.line = function(x, obj){
			var _obj = {
				a: 4, // 斜率
				b: 9
			};

			var _a = obj.a || 1;
			var _b = obj.b || 0;

			return _a * x + _b;
		};

		// 抛物线方程
		// 贝塞尔曲线方程
		// 双曲线方程
		// 波浪线方程

		// 圆的轨迹方程
		this.circle = function(x, obj){
			var _obj = {
				x: 0, // 圆心x
				y: 0, // 圆心y
				r: 30 // 圆半径
			};

			var x_a = x - (obj.x || 0);
			var y_b = y - (obj.y || 0);
			var _r = obj.r || 0;

			if(_r === 0){
				return;
			}

			// x_a * x_a + y_b * y_b = _r * _r;

			var _y = Math.sqrt(_r * _r - x_a * x_a) + b;

			return _y;
		};
		
	}
	// ----------------------------------------------------------
	// ----------------------------------------------------------
	// 单个点
	// 坐标点的变化
	function XY(x, y){
		var _x = x;
		var _y = y;

		this.init = function(){
			return {
				x: _x,
				y: _y
			};
		};

		this.to = function(x_dis, y_dis){
			return {
				x: _x + x_dis,
				y: _y + y_dis
			};
		};

		this.toLeft = function(dis){
			return {
				x: _x - dis,
				y: _y
			};
		};

		this.toRight = function(dis){
			return {
				x: _x + dis,
				y: _y
			};
		};

		this.toTop = function(dis){
			return {
				x: _x,
				y: _y - dis
			};
		};

		this.toBottom = function(dis){
			return {
				x: _x,
				y: _y + dis
			};
		};
	}

	// 两个点
	function TwoPoints(x1, y1, x2, y2){
		var p1 = new XY(x1, y1);
		var p2 = new XY(x2, y2);

		var x_dis = x2 - x1;
		var y_dis = y2 - y1;

		this.distance = Math.sqrt(x_dis * x_dis + y_dis * y_dis);

		function getMidPoint(x1, y1, x2, y2){
			return {
				x: x1 + (x2 - x1)/2,
				y: y1 + (y2 - y1)/2
			};
		}

		// 中点
		this.middlePoint = getMidPoint(x1, y1, x2, y2);

		// 移动后，需要重新计算中点
		
	}

	// ---------------------------------------------------
	// ---------------------------------------------------

	// 单纯的画一个div，带圆角的
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
				function shadowCallback(item, index, arr){
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
				}

				shadow_properties.forEach(shadowCallback);

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

			// 先分析是否有图片需要加载
			// 如果有需要加载的图
			// 先加载图，再绘制
			// 如果在过程中变化了样式呢？

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

		// 数组转成对象
		function arrToObj(arr){
			var obj = {};
			if(_G_TYPE.isArray(arr)){
				arr.forEach(function(item, index, arr){
					obj[item + ''] = '';
				});
			}
			return obj;
		}

		// 获取样式表结果
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
			var base_obj = ['width','height','left','top'];

			return deal(this.list, arrToObj(base_obj));
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
			var background_obj = _G_DIV_STYLE['background'];

			return deal(this.list, arrToObj(background_obj));
		}

		// 边框样式
		this.border = function(){
			var border_obj = _G_DIV_STYLE['border'];

			return deal(this.list, arrToObj(border_obj));
		}

		// 获取与文字相关的css样式内容
		this.text = function(){
			var text_obj = _G_DIV_STYLE['text'];

			return deal(this.list, arrToObj(text_obj));
		}

		// 轮廓样式
		this.outline = function(){
			var outline_obj = _G_DIV_STYLE['outline'];

			return deal(this.list, arrToObj(outline_obj));
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

		// 尺寸和位置
		// 颜色和样式
		// 动画

		// 动画
		// 背景
		// 边框和轮廓
		// 颜色：opacity
		// 盒子
		// 颜色
		// 内边距
		// 媒体页面内容属性
		// 尺寸
		// 弹性盒子
		// 字体
		// 网格
		// 线框
		// 列表
		// 外边距
		// 多列
		// 定位
		// 分页
		// ruby
		// 语音
		// 表格
		// 文本
		// 2d/3d
		// 过度
		// 用户外观
		// 
		// 
	}

	function CSS2CanvasProperties(){}

	// ----------------------------------------------------------------
	// ----------------------------------------------------------------
	// ----------------------------------------------------------------
	// ----------------------------------------------------------------
	// ----------------------------------------------------------------
	
	// ----------------------------------------------------------------
	// ----------------------------------------------------------------
	function checkCssImages(){
		// 遍历css属性中的与图片属性有关的内容
		// backgroundImage
		// borderImage
		// list-style-image
	}
	// ----------------------------------------------------------------
	// ----------------------------------------------------------------
	// ----------------------------------------------------------------

	window.DOM = DOM;
	window.user_db = USER_DB;

	// 动画循环的兼容方案
	// 来源：HTML5+JavaScript动画基础 page 17
	if(!window.requestAnimationFrame){
		window.requestAnimationFrame = (window.webkitReqestAnimationFrame || 
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame || 
			window.msRequestAnimationFrame ||
			function(callback){
				return window.setTimeout(callback, 1000/60);
			});
	}
})();