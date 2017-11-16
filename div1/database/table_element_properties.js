var obj = {
	properties_8342678462384_fdsdfa: {
		id: 'properties_8342678462384_fdsdfa',
		w: 200, // 宽度
		h: 200, // 高度
		x: 100, // x
		y: 100, // y
		vx: 12,
		vy: 34,
		ax: 34,
		ay: 34

	}
};





var USER_DB = new DATABASE();

	// 初始化用户数据表
	USER_DB.init(['animate', 'event', 'element', 'snapshoot']);

	// 数据库
	var DB = new DATABASE();

	// 初始化数据库
	DB.init(['animate', 'event', 'element', 'snapshoot']);