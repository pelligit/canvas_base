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