import axios from 'axios'

class Request {
    static getInstance() { //使用单例请求类
        if(!Request.instance){
            Request.instance = new Request();
        }
        return Request.instance;
    }
    constructor() {
        axios.defaults.baseURL = 'https://www.zhipin.com';
        axios.defaults.timeout = 20000;
        // 添加请求拦截器
        axios.interceptors.request.use(config=> {
            return config;
        }, error=> {
            return Promise.reject(error);
        });

        // 添加响应拦截器
        axios.interceptors.response.use(response=> {
            if(response.status == 200){
                return response.data;
            }else{
                return Promise.reject(response);
            }
        }, error=> {
            return Promise.reject(error);
        });
    }
    get(url = '', params = {}) {
        return new Promise((resolve, reject)=> {
            axios.get(url, {
                params: { ...params, timeStamp: new Date().getTime() }
            }).then(res=> {
                resolve(res);
            }).catch(err=> {
                reject(err);
            });
        });
    }
    post(url = '', data = {}) {
        return new Promise((resolve, reject)=> {
            axios.post(url, { ...data, timeStamp: new Date().getTime() }, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then(res=> {
                resolve(res);
            }).catch(err=> {
                reject(err);
            });
        });
    }
}

export default Request;