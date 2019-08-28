# nodejs爬虫
# Tips：仅个人练习使用，请勿用作商业用途，否则后果自负

使用方式：
git下载项目，npm install安装依赖包
开发环境：npm run dev
debugger模式：npm run build-debug打包#source-map模式的源映射文件，可以使用VScode进行debugger断点调试
生产环境：npm run build打包文件，使用pm2启动多线程服务（cd /dist => pm2 start main.js）