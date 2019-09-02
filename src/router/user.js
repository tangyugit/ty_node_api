import express from 'express'
import USER from '../utils/user.js'
let router = express.Router();
let user = new USER();

//解决跨域
router.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');1
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	if (req.method == 'OPTIONS') {
		res.send(200); //让options请求快速返回
	} else {
		next();
	}
});

router.get('/login', user.login);
router.get('/regist', user.regist);
router.get('/modifyPsd', user.modifyPsd);

export default router;