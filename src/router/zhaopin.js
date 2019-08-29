import express from 'express'
import ZP from '../utils/zhaopin.js'
let router = express.Router();
let zp = new ZP();

//解决跨域
router.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');1
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	if (req.method == 'OPTIONS') {
		res.send(200); //让options请求快速返回
	} else {
		next();
	}
});

router.get('/city', zp.getCity);
router.get('/position', zp.getPosition);
router.get('/oldIndustry', zp.getOldIndustry);
router.get('/localPositionList', zp.getLocalPositionList);
router.get('/detailJobInfo', zp.getDetailJobInfo);
router.get('/companyInfo', zp.getCompanyInfo);
router.get('/companyPositionList', zp.getCompanyPositionList);

export default router;