class Color{
	constructor(){
		this.aliceblue = '#F0F8FF';
		this.antiquewhite = '#FAEBD7';
		this.aqua = '#00FFFF';
		this.aquamarine = '#7FFFD4';
		this.azure = '#F0FFFF';
		this.beige = '#F5F5DC';
		this.bisque = '#FFE4C4';
		this.black = '#000000';
		this.blanchedalmond = '#FFEBCD';
		this.blue = '#0000FF';
		this.blueviolet = '#8A2BE2';
		this.brown = '#A52A2A';
		this.burlywood = '#DEB887';
		this.cadetblue = '#5F9EA0';
		this.chartreuse = '#7FFF00';
		this.chocolate = '#D2691E';
		this.coral = '#FF7F50';
		this.cornflowerblue = '#6495ED';
		this.cornsilk = '#FFF8DC';
		this.crimson = '#DC143C';
		this.cyan = '#00FFFF';
		this.darkblue = '#00008B';
		this.darkcyan = '#008B8B';
		this.darkgoldenrod = '#B8860B';
		this.darkgray = '#A9A9A9';
		this.darkgreen = '#006400';
		this.darkkhaki = '#BDB76B';
		this.darkmagenta = '#8B008B';
		this.darkolivegreen = '#556B2F';
		this.darkorange = '#FF8C00';
		this.darkorchid = '#9932CC';
		this.darkred = '#8B0000';
		this.darksalmon = '#E9967A';
		this.darkseagreen = '#8FBC8F';
		this.darkslateblue = '#483D8B';
		this.darkslategray = '#2F4F4F';
		this.darkturquoise = '#00CED1';
		this.darkviolet = '#9400D3';
		this.deeppink = '#FF1493';
		this.deepskyblue = '#00BFFF';
		this.dimgray = '#696969';
		this.dodgerblue = '#1E90FF';
		this.feldspar = '#D19275';
		this.firebrick = '#B22222';
		this.floralwhite = '#FFFAF0';
		this.forestgreen = '#228B22';
		this.fuchsia = '#FF00FF';
		this.gainsboro = '#DCDCDC';
		this.ghostwhite = '#F8F8FF';
		this.gold = '#FFD700';
		this.goldenrod = '#DAA520';
		this.gray = '#808080';
		this.green = '#008000';
		this.greenyellow = '#ADFF2F';
		this.honeydew = '#F0FFF0';
		this.hotpink = '#FF69B4';
		this.indianred = '#CD5C5C';
		this.indigo = '#4B0082';
		this.ivory = '#FFFFF0';
		this.khaki = '#F0E68C';
		this.lavender = '#E6E6FA';
		this.lavenderblush = '#FFF0F5';
		this.lawngreen = '#7CFC00';
		this.lemonchiffon = '#FFFACD';
		this.lightblue = '#ADD8E6';
		this.lightcoral = '#F08080';
		this.lightcyan = '#E0FFFF';
		this.lightgoldenrodyellow = '#FAFAD2';
		this.lightgrey = '#D3D3D3';
		this.lightgreen = '#90EE90';
		this.lightpink = '#FFB6C1';
		this.lightsalmon = '#FFA07A';
		this.lightseagreen = '#20B2AA';
		this.lightskyblue = '#87CEFA';
		this.lightslateblue = '#8470FF';
		this.lightslategray = '#778899';
		this.lightsteelblue = '#B0C4DE';
		this.lightyellow = '#FFFFE0';
		this.lime = '#00FF00';
		this.limegreen = '#32CD32';
		this.linen = '#FAF0E6';
		this.magenta = '#FF00FF';
		this.maroon = '#800000';
		this.mediumaquamarine = '#66CDAA';
		this.mediumblue = '#0000CD';
		this.mediumorchid = '#BA55D3';
		this.mediumpurple = '#9370D8';
		this.mediumseagreen = '#3CB371';
		this.mediumslateblue = '#7B68EE';
		this.mediumspringgreen = '#00FA9A';
		this.mediumturquoise = '#48D1CC';
		this.mediumvioletred = '#C71585';
		this.midnightblue = '#191970';
		this.mintcream = '#F5FFFA';
		this.mistyrose = '#FFE4E1';
		this.moccasin = '#FFE4B5';
		this.navajowhite = '#FFDEAD';
		this.navy = '#000080';
		this.oldlace = '#FDF5E6';
		this.olive = '#808000';
		this.olivedrab = '#6B8E23';
		this.orange = '#FFA500';
		this.orangered = '#FF4500';
		this.orchid = '#DA70D6';
		this.palegoldenrod = '#EEE8AA';
		this.palegreen = '#98FB98';
		this.paleturquoise = '#AFEEEE';
		this.palevioletred = '#D87093';
		this.papayawhip = '#FFEFD5';
		this.peachpuff = '#FFDAB9';
		this.peru = '#CD853F';
		this.pink = '#FFC0CB';
		this.plum = '#DDA0DD';
		this.powderblue = '#B0E0E6';
		this.purple = '#800080';
		this.red = '#FF0000';
		this.rosybrown = '#BC8F8F';
		this.royalblue = '#4169E1';
		this.saddlebrown = '#8B4513';
		this.salmon = '#FA8072';
		this.sandybrown = '#F4A460';
		this.seagreen = '#2E8B57';
		this.seashell = '#FFF5EE';
		this.sienna = '#A0522D';
		this.silver = '#C0C0C0';
		this.skyblue = '#87CEEB';
		this.slateblue = '#6A5ACD';
		this.slategray = '#708090';
		this.snow = '#FFFAFA';
		this.springgreen = '#00FF7F';
		this.steelblue = '#4682B4';
		this.tan = '#D2B48C';
		this.teal = '#008080';
		this.thistle = '#D8BFD8';
		this.tomato = '#FF6347';
		this.turquoise = '#40E0D0';
		this.violet = '#EE82EE';
		this.violetred = '#D02090';
		this.wheat = '#F5DEB3';
		this.white = '#FFFFFF';
		this.whitesmoke = '#F5F5F5';
		this.yellow = '#FFFF00';
		this.yellowgreen = '#9ACD32';
	}

	rgb(r, g, b){
		// 返回一个rgb表示的颜色值
		// hsl，十六进制颜色的画
		// 参数：23，4，34// rgb格式颜色
		// 参数：#786677 // 十六进制颜色
		// 参数：8, 78%, 48% // hsl颜色
		return 'rgb('+ r +', '+ g +', '+ b +')';
	}

	rgba(r, g, b, a){
		return 'rgba('+ r +', '+ g +', '+ b +', '+ a +')';
	}

	hsl(h, s, l){
		return 'hsl('+ h +', '+ s +', '+ l +')';
	}

	hsla(h, s, l, a){
		return 'hsl('+ h +', '+ s +', '+ l +', '+ a +')';
	}

	hex(val){
		let len = val.length;

		// #fff
		// aa3422
		// #aa3422
		if(len !== 3 || len !== 6 || len !== 7){
			return '';
		}

		// 如果取值区间不对，则不可以

		// 判断是否是16进制
		// 判断长度是否是6位或者7位
		if(val.indexOf('#') < 0){
			return '#' + val;
		}

		return val;
	}

	// 颜色值转换
	static rgb2hsl(r, g, b){}

	static hsl2rgb(h, s, l){}

	static hex2rgb(val){}

	static rgb2hex(r, g, b){}

	static hex2hsl(val){}

	static hsl2hex(h, s, l){}

	static hsla2rgba(h, s, l, a){}

	static rgba2hsla(r, g, b, a){}
}

class Angle{
	constructor(){
		// 一度 === 这么多弧度
		this.deg = Math.PI * 2/360;

		// 一弧度 === 这么多°
		this.rad = 180/(Math.PI);
	}

	// 参数是角度值，返回一个弧度值,
	degree(val){
		return (Math.PI/180) * val;
	}

	// 参数是角度值，返回弧度值
	// 和上面的一样
	radian(val){
		// val/180 = Math.PI /180;
		return val / (180/Math.PI);
	}
}

// 基本填充图案
class Patter{

}