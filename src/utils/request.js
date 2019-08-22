import axios from 'axios'

class Request {
    constructor({ url= '', params= {}, data= {}, timeout= 10000} = {}) {
        this.url = url;
        this.params = {...params, timeStamp: new Date().getTime()};
        this.data = {...data, timeStamp: new Date().getTime()};
        this.timeout = timeout;
    }
    
}