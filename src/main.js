import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import zhaopin from './router/zhaopin.js'
import { api } from './utils/api.js'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.resolve('./'))); // 将/作为静态资源根目录
app.use('/zhaopin', zhaopin);

(async ()=>{
    try{
        const [{ zpData: { cityList }}, { zpData: position}] = await Promise.all([api.zhaopin.getCity(), api.zhaopin.getPosition()]);
        console.log(cityList, position)
    }catch(err){
        console.log(err);
    }
})()

app.listen(8666, ()=> {
    console.log('Your server listening at port 8666');
});
