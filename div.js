
// backgroundColor
// border
// borderRadius
// borderWidth
// borderStyle
// borderColor
// 盒子模型
// 碰撞检测
// 事件交互
class Box{
	// 画一个div
	constructor(){
		// 父元素
		this.parent = null;

		// 子元素
		this.children = [];

		// 兄弟元素
		this.siblings = [];

		this.id = '';// 根据ID获取元素

		this.className = '';// 根据class获取元素

		this.attr = {};
	}

	get style(){
		// 
	}

	// 画出来
	draw(ctx){
		// 做完操作后立马重新绘制
	}

	css(obj){
		// 设置样式
		{
			width: 12,
			height: 33,
			border: 'splid 1px #ccc',
			backgroundColor: 'red',
			backgroundImage: './fdsj.png';
			backgroundRepeat: 'no-repeat';
			backgroundPosition: '87px 48px',
			position: '',
			display: 'none',
			position: 'absolute',
			left: 34,
			top: 34,
			margin: 89,
			padding: 23,
			lineHeight: 23,
			color: '#ccc',// 可以使用颜色，可以使用渐变，可以使用canvas patter
			fontSize: '14px',
			fontFamily: '微软雅黑',
			letterSpacing: '3px',
			textDecoration: 'underline',
			cursor: 'pointer',// 鼠标移动到这个上面的时候，更改canvas鼠标样式
		}

		return this;
	}

	// id，class
	select(){}

	// 边
	edge(){}

	text(txt){

	}

	// 添加一个元素
	append(box){
		box.parent = this;

		// 设置子元素的兄弟元素
		let len = this.children.length;
		for(let i = 0; i < len; i++){
			box.siblings.push(this.children[i]);
		}

		// 当前元素的子元素
		this.children.push(box);

		return this;
	}

	/**
	 * [移除当前的元素]
	 * @return {[type]} [description]
	 */
	remove(){
		this = null;

		// 画布也要清除内容

		return true;
	}



	// 复制一份
	// 复制子元素和当前元素
	copy(){
		// 深克隆当前元素
		// 最终返回这个元素
		// 更改ID
		// 当前的子元素
		return 
	}

	// 子元素
	// 
}
