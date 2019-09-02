import fs from 'fs'
import path from 'path'

export default class USER {
	login = async (req, res)=> { //登录
        try{
            let { user_account='', user_psd='' } = req.query;
            let user = await readFile();
            if(user.userInfo.some(item=> (item.user_account == user_account && item.user_psd == user_psd))){
                res.send({code: 0, msg: '登陆成功！'});
            }else{
                res.send({code: -2, msg: '账号不存在或密码错误！'});
            }
        }catch(err){
            res.send({code: -1, msg: err});
        }
    }
    regist = async (req, res)=> { //注册
        try{
            let { user_account='', user_psd='', user_name='', user_age='', user_adress='', user_email='' } = req.query;
            let user = await readFile();
            if(user.userInfo.some(item=> item.user_account == user_account)){
                res.send({code: -2, msg: '帐号已存在！'});
            }else{
                user.userInfo = [ ...user.userInfo, { user_account, user_psd, user_name, user_age, user_adress, user_email } ];
                await writeFile(user);
                res.send({code: 0, msg: '注册成功！'});
            }
        }catch(err){
            res.send({code: -1, msg: err});
        }
    }
    modifyPsd = async (req, res)=> { //修改密码
        try{
            let { user_account='', user_psd='', new_psd='', type='0' } = req.query;
            let user = await readFile();
            if(user.userInfo.some(item=> item.user_account == user_account && item.user_psd == user_psd)){
                user.userInfo.forEach(val=> {
                    if(val.user_account == user_account){
                        val.user_psd = new_psd;
                    }
                });
                await writeFile(user);
                res.send({code: 0, msg: '密码修改成功！'});
            }else{
                res.send({code: -2, msg: '账号不存在或密码错误！'});
            }
        }catch(err){
            res.send({code: -1, msg: err});
        }
    }
}

function readFile() {
    return new Promise((resolve, reject)=> {
        fs.readFile(path.resolve(__dirname, '../', './database/user.json'), 'utf8', (err, data)=> {
            if(err) reject(err);
            let res = JSON.parse(data);
            resolve(res);
        });
    });
}

function writeFile(data) {
    return new Promise((resolve, reject)=> {
        fs.writeFile(path.resolve(__dirname, '../', './database/user.json'), JSON.stringify(data, null, '\t'), err=>{
            if(err) reject(err);
            resolve('write file success~');
        });
    });
}