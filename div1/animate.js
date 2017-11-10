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
