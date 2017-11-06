# canvas_base

canvas基本知识，涉及如下内容

* 平面直角坐标系
* 角度和弧度转换
* 颜色的使用
* 点的相关操作
* 线段的相关操作
* 平面的相关内容
* 基本形状的绘制
* ......
* 不断完善中

## html文件代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>canvas基础</title>
</head>
<body>
	<canvas id="c" width="500" height="500"></canvas>

	<script type="text/javascript" src='./draw.js'></script>
	<script type="text/javascript">
		let c = document.getElementById('c');
		let ctx = c.getContext('2d');

		// 初始化一个点
		let d = new Dot(50, 50);

		// 初始化一个线段
		let l = new Line(40, 40, 200, 250);

		// 将这条线段画出来
		l.draw(ctx);

		// 取得这条线段的中点
		let m = l.middle();

		// 将这条线向左移动30个像素
		l.toLeft(30);

		// 将移动后的线段画出来
		l.draw(ctx);

		// 将线段重置到初始的位置
		l.reset();
	</script>
</body>
</html>
```


# 相关对象说明

## 点

```javascript
// 传递一个坐标，表示这个点的位置
let d = new Dot(50, 50);


```
