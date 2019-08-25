import express from 'express'
import cheerio from 'cheerio'
import { api } from '../utils/api.js'
let router = express.Router();

class ZP {
	getCity = async (req, res)=> { //获取城市信息
		try{
			let response = await api.zhaopin.getCity();
			res.send({code: 0, msg: "success", data: response});
		}catch(err){
			res.send({code: -500, msg: '城市信息获取失败，请稍后再试~'});
		}
	}
	getPosition = async (req, res)=> { //获取职位信息
		try{
			let response = await api.zhaopin.getPosition();
			res.send({code: 0, msg: "success", data: response});
		}catch(err){
			res.send({code: -500, msg: '职位信息获取失败，请稍后再试~'});
		}
	}
	getOldIndustry = async (req, res)=> { //获取传统行业信息
		try{
			let response = await api.zhaopin.getOldIndustry();
			res.send({code: 0, msg: "success", data: response});
		}catch(err){
			res.send({code: -500, msg: '传统行业信息获取失败，请稍后再试~'});
		}
	}
	getLocalPositionList = async (req, res)=> { //获取当前某地区某职业信息的列表
		let param = {
			city: '101190100',
			position: '100199',
			page: '1'
		};
		try{
			let response = await api.zhaopin.getLocalPositionList(param);
			res.send({code: 0, msg: "success", data: response});
		}catch(err){
			res.send({code: -500, msg: '当前地区职位信息列表获取失败，请稍后再试~'});
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

router.get('/city', zp.getCity);
router.get('/position', zp.getPosition);
router.get('/oldIndustry', zp.getOldIndustry);
router.get('/localPositionList', zp.getLocalPositionList);

export default router;