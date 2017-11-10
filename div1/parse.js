
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
