import Request from './request.js'

const zp_request = new Request('https://www.zhipin.com', {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
    'Accept-encoding': 'gzip, deflate, br',
    'Accept-language': 'zh-CN,zh;q=0.9',
    'Upgrade-insecure-requests': '1'
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
            return zp_request.get(`/job_detail/`, params, { //伪造cookie
                'Cookie': '_uab_collina=156663187471034079645301; lastCity=101190100; __c=1566954154; __g=-; __l=l=%2Fwww.zhipin.com%2F&r=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DwTg_EzNaZZtOfTJMRFUr3br68ONbwoqlCwq3EoUcbEDXry25AOEddS73WRcTfH00%26wd%3D%26eqid%3D97c91cfc00c17b91000000045d65d30b&friend_source=0&friend_source=0; Hm_lvt_194df3105ad7148dcf2b98a91b5e727a=1566805049,1566892014,1566954158,1566954220; __zp_stoken__=395d1nDRUlT%2BRXhEjhq4tCOnkObmY%2FnV4lQMeasCradpDnofZpvdETMg%2BflqaiS0yLNI75KKpCb9N2CDyERtqvThrQ%3D%3D; __a=68878998.1566631873.1566892017.1566954154.70.5.7.70; Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a=1566954302'
            });
        },
        getDetailJobInfo({ jobUrl }) { //获取某工作详情
            return zp_request.get(`${jobUrl}`, {}, { //伪造cookie
                'Cookie': '_uab_collina=156663187471034079645301; lastCity=101190100; __c=1566954154; __g=-; __l=l=%2Fwww.zhipin.com%2F&r=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DwTg_EzNaZZtOfTJMRFUr3br68ONbwoqlCwq3EoUcbEDXry25AOEddS73WRcTfH00%26wd%3D%26eqid%3D97c91cfc00c17b91000000045d65d30b&friend_source=0&friend_source=0; Hm_lvt_194df3105ad7148dcf2b98a91b5e727a=1566805049,1566892014,1566954158,1566954220; __zp_stoken__=395d1nDRUlT%2BRXhEjhq4tCOnkObmY%2FnV4lQMeasCradpDnofZpvdETMg%2BflqaiS0yLNI75KKpCb9N2CDyERtqvThrQ%3D%3D; __a=68878998.1566631873.1566892017.1566954154.73.5.10.73; Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a=1566955680'
            });
        },
        getCompanyInfo({ companyUrl }) { //获取公司详情
            return zp_request.get(`${companyUrl}`, {}, { //伪造cookie
                'Cookie': '_uab_collina=156663187471034079645301; lastCity=101190100; __c=1566954154; __g=-; __l=l=%2Fwww.zhipin.com%2F&r=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DwTg_EzNaZZtOfTJMRFUr3br68ONbwoqlCwq3EoUcbEDXry25AOEddS73WRcTfH00%26wd%3D%26eqid%3D97c91cfc00c17b91000000045d65d30b&friend_source=0&friend_source=0; Hm_lvt_194df3105ad7148dcf2b98a91b5e727a=1566805049,1566892014,1566954158,1566954220; __zp_stoken__=395d1nDRUlT%2BRXhEjhq4tCOnkObmY%2FnV4lQMeasCradpDnofZpvdETMg%2BflqaiS0yLNI75KKpCb9N2CDyERtqvThrQ%3D%3D; __a=68878998.1566631873.1566892017.1566954154.74.5.11.74; Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a=1566955780'
            });
        },
        getCompanyPositionList({ companyPositionUrl, ka, page }) { //获取公司招聘列表
            return zp_request.get(`${companyPositionUrl}`, { ka, page }, { //伪造cookie
                'Cookie': '_uab_collina=156663187471034079645301; lastCity=101190100; __c=1566954154; __g=-; __l=l=%2Fwww.zhipin.com%2F&r=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DwTg_EzNaZZtOfTJMRFUr3br68ONbwoqlCwq3EoUcbEDXry25AOEddS73WRcTfH00%26wd%3D%26eqid%3D97c91cfc00c17b91000000045d65d30b&friend_source=0&friend_source=0; Hm_lvt_194df3105ad7148dcf2b98a91b5e727a=1566805049,1566892014,1566954158,1566954220; __zp_stoken__=395d1nDRUlT%2BRXhEjhq4tCOnkObmY%2FnV4lQMeasCradpDnofZpvdETMg%2BflqaiS0yLNI75KKpCb9N2CDyERtqvThrQ%3D%3D; __a=68878998.1566631873.1566892017.1566954154.74.5.11.74; Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a=1566955780'
            });
        }
    }
};

export { api }