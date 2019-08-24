import Request from './request.js'

const zp_request = new Request('https://www.zhipin.com'); //实例化招聘请求类

const api = {
    zhaopin: {
        getIndex() { //获取首页信息
            return zp_request.get('/');
        }
    }
};

export {
    api
}