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