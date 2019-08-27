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
		let { city='', position='', page='' } = req.query;
		try{
			let response = await api.zhaopin.getLocalPositionList({ city, position, page });
			let $ = cheerio.load(response, {decodeEntities: false});
			let jobList = [];
			$('.job-list').find('ul').find('li').each((index, value)=>{
				jobList.push({
					title: $(value).find('.info-primary').find('.name').find('.job-title').text(),
					salary: $(value).find('.info-primary').find('.name').find('.red').text(),
					jobExtra: $(value).find('.info-primary').find('p').text(),
					company: $(value).find('.company-text').find('.name').find('a').text(),
					companyExtra: $(value).find('.company-text').find('p').text(),
					headImg: $(value).find('.info-publis').find('.name').find('img').attr('src'),
					personExtra: $(value).find('.info-publis').find('.name').text(),
					jobUrl: $(value).find('.info-primary').find('.name').find('a').attr('href'),
					companyUrl: $(value).find('.company-text').find('.name').find('a').attr('href'),
				});
			});
			res.send({code: 0, msg: "success", data: jobList});
		}catch(err){
			res.send({code: -500, msg: '当前地区职位信息列表获取失败，请稍后再试~'});
		}
	}
	getDetailJobInfo = async (req, res)=> { //获取工作详情
		let { jobUrl='/job_detail/7a33d7dadc6d07f003R93t26F1I~.html' } = req.query;
		try{
			let response = await api.zhaopin.getDetailJobInfo({jobUrl});
			let $ = cheerio.load(response, {decodeEntities: false});
			let detail = {
				job_status: $('.job-status').text(),
				job_title: $('.job-status').next().find('h1').text(),
				job_salary: $('.job-status').next().find('.salary').text(),
				job_condition: $('.job-status').next().next().text(),
				job_welfare: (()=>{
					let arr = [];
					$('.detail-box').find('.tag-container').find('.tag-more').find('.tag-all').find('span').each((index, value)=> {
						arr.push({ welfare: $(value).text() });
					});
					return arr;
				})(),
				person_img: $('.detail-figure').find('img').attr('src'),
				person_name: $('.detail-figure').next().text(),
				person_time: $('.detail-figure').next().next().text(),
				job_desc: $('.detail-content').find('.text').text(),
				company_introduce: $('.detail-content').find('.company-info').find('.text').text(),
				company_name: $('.detail-content').find('.prop-item').next().find('.name').text(),
				company_legal: $('.detail-content').find('.prop-item').next().find('.level-list').find('li').eq(0).text(),
				company_register_money: $('.detail-content').find('.prop-item').next().find('.level-list').find('li').eq(1).text(),
				company_time: $('.detail-content').find('.prop-item').next().find('.level-list').find('li').eq(2).text(),
				company_type: $('.detail-content').find('.prop-item').next().find('.level-list').find('li').eq(3).text(),
				company_state: $('.detail-content').find('.prop-item').next().find('.level-list').find('li').eq(4).text(),
				company_adress: $('.location-address').text(),
				company_adress_img: $('.location-address').next().find('img').attr('src')
			};
			res.send({code: 0, msg: "success", data: detail});
		}catch(err){
			res.send({code: -500, msg: '传统行业信息获取失败，请稍后再试~'});
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
router.get('/detailJobInfo', zp.getDetailJobInfo);

export default router;