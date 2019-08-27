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
                'Cookie': 'lastCity=101010100; _uab_collina=156663187471034079645301; __zp_stoken__=ad347L8iMSVWsTQYhhy0MOZd5p0jEw6x5EMftzA95SwxtVrLbrsfF3ioZYDPHAecm87HT8hSyoms0PzVHq6Vfj3JGw%3D%3D; __c=1566805047; __g=-; Hm_lvt_194df3105ad7148dcf2b98a91b5e727a=1566631874,1566784972,1566805049; __l=l=%2Fwww.zhipin.com%2F&r=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DUYOqLcn_NeNOk-Vcu6TF6y-u-qZOPRo0Qk0mQsV1ynvjitB7UNiiOs3e0Mut4Q84%26wd%3D%26eqid%3Dfbe7381200032f30000000045d638ca8&friend_source=0&friend_source=0; __a=68878998.1566631873.1566784971.1566805047.15.3.4.15; Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a=1566805189'
            });
        },
        getDetailJobInfo({ jobUrl }) { //获取某工作详情
            return zp_request.get(`${jobUrl}`, {}, { //伪造cookie
                'Cookie': '_uab_collina=156663187471034079645301; __zp_stoken__=ad347L8iMSVWsTQYhhy0MOZd5p0jEw6x5EMftzA95SwxtVrLbrsfF3ioZYDPHAecm87HT8hSyoms0PzVHq6Vfj3JGw%3D%3D; lastCity=101190100; sid=sem_pz_bdpc_dasou_title; Hm_lvt_194df3105ad7148dcf2b98a91b5e727a=1566631874,1566784972,1566805049,1566892014; __c=1566892017; __g=-; __l=l=%2Fwww.zhipin.com%2Fc101190100-p100199%2F&r=https%3A%2F%2Fwww.zhipin.com%2F%3Fsid%3Dsem_pz_bdpc_dasou_title&friend_source=0&friend_source=0; __a=68878998.1566631873.1566805047.1566892017.56.4.2.56; Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a=1566892038'
            });
        }
    }
};

export { api }