import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.resolve('./'))); // 将/作为静态资源根目录

app.listen(8666, ()=> {
    console.log('Your server listening at port 8666');
});
