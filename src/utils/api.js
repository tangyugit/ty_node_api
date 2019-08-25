import Request from './request.js'

const zp_request = new Request('https://www.zhipin.com', {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
    'Accept-encoding': 'gzip, deflate, br',
    'Accept-language': 'zh-CN,zh;q=0.9',
    'Upgrade-insecure-requests': '1',
}); //实例化招聘请求类

const api = {
    zhaopin: {
        getCity() { //获取城市信息
            return zp_request.get('/wapi/zpCommon/data/city.json');
        },
        getPosition() { //获取职位信息
            return zp_request.get('/wapi/zpCommon/data/position.json');
        },
        getOldIndustry() { //获取传统行业信息
            return zp_request.get('/wapi/zpCommon/data/oldindustry.json');
        },
        getLocalPositionList(params) { //获取当前某地区某职业信息的列表
            return zp_request.get(`/job_detail/`, params);
        }
    }
};

export { api }