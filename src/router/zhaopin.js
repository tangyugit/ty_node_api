import express from 'express'
import cheerio from 'cheerio'
import iconv from 'iconv-lite'
import { api } from '../utils/api.js'
let router = express.Router();

class ZP {
	iconvLite(response) {
		return iconv.decode(response, 'utf-8');
	}
	async getIndex(req, res) { //获取首页信息
		try{
			let response = await api.zhaopin.getIndex();
			let $ = cheerio.load(this.iconvLite(response));
			res.send({code: 0, msg: response});
		}catch(err){
			res.send({code: 500, msg: err});
		}
	}
}

let zp = new ZP();

//解决跨域
router.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	if (req.method == 'OPTIONS') {
		res.send(200); //让options请求快速返回
	} else {
		next();
	}
});

router.get('/index', zp.getIndex); 

export default router;