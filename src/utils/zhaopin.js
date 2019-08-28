import { api } from './api.js'

export default class ZP {
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
			res.send({code: -500, msg: '工作详情获取失败，请稍后再试~'});
		}
	}
	getCompanyInfo = async (req, res)=> { //获取公司详情
		let { companyUrl='/gongsi/5de4b5a6b720a92003J82Ny_.html' } = req.query;
		try{
			let response = await api.zhaopin.getCompanyInfo({ companyUrl });
			let $ = cheerio.load(response, {decodeEntities: false});
			let info = {
				company_logo: $('.company-banner').find('.info-primary').eq(0).find('img').attr('src'),
				company_name: $('.company-banner').find('.info-primary').eq(0).find('.info').find('.name').text(),
				company_type: $('.company-banner').find('.info-primary').eq(0).find('.info').find('p').text(),
				company_intro_list: (()=>{
					let arr = [];
					$('.company-banner').find('.info-primary').eq(0).find('.info').find('.job-tags').find('span').each((index, value)=>{
						arr.push({ title: $(value).text()} )
					});
					return arr;
				})(),
				host_lists: (()=>{
					let arr = [];
					$('.company-hotjob ').find('ul').find('li').each((index, value)=>{
						arr.push({
							detail_url: $(value).find('a').attr('href'),
							detail_condition: $(value).find('.gray').text(),
							detail_salary: $(value).find('.salary').text(),
							detail_title: $(value).find('.name').find('b').text()
						});
					});
					return arr;
				})(),
				position_list_url: $('.company-banner').find('.company-tab').find('a').eq(1).attr('href'),
				company_info: $('.job-detail').find('.job-sec').eq(0).find('.fold-text').text(),
				company_detail: (()=>{
					let arr = [];
					$('.business-detail').find('ul').find('li').each((index, value)=>{
						arr.push({
							list: $(value).find('span').text() + ' ' + $(value).text()
						});
					});
					return arr;
				})(),
				company_adress: (()=>{
					let arr = [];
					$('.job-location').find('.location-item').each((index, value)=>{
						arr.push({
							adress: $(value).find('.location-address').text(),
							img: $(value).find('img').attr('src')
						});
					});
				})(),
				recommend_companys: (()=>{
					let arr = [];
					$('.job-detail').find('.links').find('.links-item').eq(0).find('a').each((index, value)=>{
						arr.push({
							company_url: $(value).attr('href'),
							company_name: $(value).text()
						});
					});
					return arr;
				})()
			};
			res.send({code: 0, msg: "success", data: info});
		}catch(err){
			res.send({code: -500, msg: '公司招聘职位列表获取失败，请稍后再试~'});
		}
	}
	getCompanyPositionList = async (req, res)=> { //获取公司招聘列表
		let { companyPositionUrl='/gongsir/5de4b5a6b720a92003J82Ny_.html', ka='', page='1' } = req.query;
		try{
			let response = await api.zhaopin.getCompanyPositionList({ companyPositionUrl });
			let $ = cheerio.load(response, {decodeEntities: false});
			let info = {
				company_logo: $('.company-banner').find('.info-primary').eq(0).find('img').attr('src'),
				company_name: $('.company-banner').find('.info-primary').eq(0).find('.info').find('.name').text(),
				company_type: $('.company-banner').find('.info-primary').eq(0).find('.info').find('p').text(),
				company_intro_list: (()=>{
					let arr = [];
					$('.company-banner').find('.info-primary').eq(0).find('.info').find('.job-tags').find('span').each((index, value)=>{
						arr.push({ title: $(value).text()} )
					});
					return arr;
				})(),
				company_intro_url: $('.company-banner').find('.company-tab').find('a').eq(0).attr('href'),
				position_types: (()=>{
					let arr = [];
					$('.company-banner').next().find('.job-category-items').eq(0).find('a').each((index, value)=>{
						arr.push({
							type: $(value).text(),
							url: $(value).attr('href'),
							ka: $(value).attr('ka')
						});
					});
					return arr;
				})(),
				position_lists: (()=>{
					let arr = [];
					$('.job-list').find('ul').find('li').each((index, value)=>{
						arr.push({
							title: $(value).find('.job-title').text(),
							salary: $(value).find('.red').text(),
							condition: $(value).find('.info-primary').find('p').text(),
							publisher_img: $(value).find('.info-publis').find('img').attr('src'),
							publisher_name: $(value).find('.info-publis').find('.name').text()
						});
					});
					return arr;
				})(),
				publish_time: $('.update-time').text(),
				related_companys: (()=>{
					let arr = [];
					$('.update-time').next().find('.links-item').eq(0).find('a').each((index, value)=>{
						arr.push({
							title: $(value).text(),
							url: $(value).attr('href')
						});
					});
					return arr;
				})(),
				position_number: $('.company-banner').find('.company-stat').eq(0).find('a').find('b').text(),
				boss_number: $('.company-banner').find('.company-stat').eq(0).find('span').eq(1).find('b').text()
			};
			res.send({code: 0, msg: "success", data: info});
		}catch(err){
			res.send({code: -500, msg: '传统行业信息获取失败，请稍后再试~'});
		}
	}
}