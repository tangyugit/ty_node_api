import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import api from './utils/api.js'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.resolve('./'))); // 将/作为静态资源根目录

//解决跨域
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	if (req.method == 'OPTIONS') {
		res.send(200); //让options请求快速返回
	} else {
		next();
	}
});

app.get('/index', async (req, res)=> {
	try{
		let res = await api.getIndex();
		console.log(res)
	}catch(err){
		console.log(err)
	}
})

app.listen(8666, ()=> {
    console.log('Your server listening at port 8666');
});
