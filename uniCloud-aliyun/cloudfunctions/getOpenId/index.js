'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let appid = 'wxbaa53b8fef4bd326'; //小程序appid
	//小程序secret
	let secret = '4652a8871974dbe60737b405856054c4'; //小程序secret

	//登录的code
	let js_code = event.code

	const openidUrl = 'https://api.weixin.qq.com/sns/jscode2session'

	const registerUrl = 'http://10.10.17.243:9091/openid/registerOpenId'

	let res = await uniCloud.httpclient.request(openidUrl, {
		data: {
			appid: appid,
			secret: secret,
			js_code: js_code,
			grant_type: 'authorization_code'
		},
		dataType: 'json'
	})
	uniCloud.logger.error(res)
	let result = await uniCloud.httpclient.request(registerUrl, {
		method:'POST',
		data: {
			openid:'1245',
			nickname:event.nickName
		},
		dataType: 'json'
	})


	return result

	//返回数据给客户端

};
