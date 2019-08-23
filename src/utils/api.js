import Request from './request.js'

const request = Request.getInstance(); //实例化请求类

const api = {
    getIndex() {
        return request.get('/');
    }
};

export default api;