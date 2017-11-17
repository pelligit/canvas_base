var obj = {
	// 动画循环遍历这些动画队列
	div_73846283389247_fdsf: {
		id: 'div_73846283389247_fdsf',
		queue: [// 动画队列
			{
				params: [],
				fn_name: 'toLeft', // 直接调用
				start_time_stamp: 7438297489,
				will_last: 3000// 将会持续
			}, {
				params: [],
				fn_name: // 直接调用
			}
		]
	}

};

// 时间
// 
// 
// 


this.timeStamp = function(){
	return (new Date()).getTime();
};


// 距离start_time, 持续了多久
var continued = function(start_time){
	return (new Date()).getTime() - start_time;
};



function TweenLine(start_value, end_value, start_time, last_time){
	var continued = function(start_time){
		return (new Date()).getTime() - start_time;
	};

	// 返回当前时间应该所在的位置
	var cur_value;
	// 距离现在已经持续的时间
	var sofar_time = continued(start_time);
	
	var tween_value = end_value - start_value;

	// 变化的速度
	var speed = tween_value/last_time;

	cur_value = sofar_time * speed;
	return cur_value;
}