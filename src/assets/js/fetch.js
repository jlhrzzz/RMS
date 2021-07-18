/*
    这个fetch.js不具备通用性，只针对此项目
 */

export default function request(options) {
	//容错处理
	options.data = options.data || {};
	options.headers = options.headers || {};

	//设置默认的请求头
	const defaultHeaders = {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('order:token'), //获取用户的token,token会在登录与注册成功后存储到本地
	};

	//真正发头的请求头
	const requestHeaders = {
		method: options.method || 'GET',
		headers: Object.assign(options.headers, defaultHeaders), //合并对象
	}

	//处理请求的数据
	if (requestHeaders.method == 'GET') {
		//get请求要求参数必需要拼到URL上：'/auth/user?username="kaivon"&password=123'
		const esc = encodeURIComponent; //把字符串进行编码（十六进制）
		const queryParams = Object.keys(options.data).map(item => `${esc(item)}=${options.data[item]}`).join('&');
		/*
			Object.keys(options.data)       ['username','password']
			Object.keys(options.data).map   ['username="kaivon"','password=123']
		 */

		if (queryParams) {
			options.url += `?${queryParams}`
		}
	} else {
		//其它请求，数据要放在body属性里
		requestHeaders.body = JSON.stringify(options.data);
	}

	return fetch('http://order-api.chenxuehui.com' + options.url, requestHeaders).then(res => res.json());
}

/* request({
	url: '/auth/user',
	method: 'POST',
	data: {
		username: 'kaivon',
		password: "123"
	},
	headers: {

	},
})
	.then(res => {
		console.log(res);
	})
	.catch(res => {
		console.log(res);
	}) */