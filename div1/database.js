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
