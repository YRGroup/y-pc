# Project-Y-pc

latest update by Quincy   
2017-07-14 17:43:31


推荐使用[nginx](http://nginx.org/)反向代理  

Win hosts配置项：
```
127.0.0.1   pc.test.com
```

nginx.conf配置项：  
```
server {
    listen  80;
    server_name  pc.test.com;
    location / {
        proxy_pass   http://127.0.0.1:8002;
    }
}
```


## github集合
- [pc端](https://github.com/YRGroup/y-pc)
- [移动端](https://github.com/YRGroup/y)
- [管理后台](https://github.com/YRGroup/y-admin)


## demo
- [pc端](http://testwebsite.zzflgs.cn/web)
- [移动端](http://testwebsite.zzflgs.cn/m)
- [管理后台](http://testwebsite.zzflgs.cn/admin)


## Build Setup

``` 
# 安装依赖项
npm install --registry=https://registry.npm.taobao.org

# 开发模式 localhost:8002
npm run dev

# 推荐使用forever
npm start

# 打包项目
npm run build
```


|  目录          | 说明          | 备注  |
| ------------- |:-------------:| -----:|
| ../static     | 静态资源       |       |
| ../src        | 源码          |       |
| ../src/store  | vuex          |       |
| ../src/server | API           |       |
| ../src/router | vue router    |       |
| ../src/assets  | 资源         |       |
| ../src/components | 组件      |       |
| ../src/style  | 主题样式       |       |
| ../src/pages   | 页面           |       |