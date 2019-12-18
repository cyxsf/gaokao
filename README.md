# 介绍

> 高考志愿填报咨询系统

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 目录结构 ##

```pre

├── build                    // webpack打包配置（不说明它下面的文件）
├── config                   // webpack环境配置（不说明它下面的文件）
├── dist                     // 运行build后生成目录(存放需要的发布代码)
├── src                      // 生产目录(着重说明)
│   ├── assets               // 静态资源(css,font,img)
│   ├── components           // vue组件
│   ├── config               // Vue全局方法/过滤器
│   ├── data                 // 数据文件(json)
│   ├── pages                // 业务页面
│   ├── main.js              // 项目入口文件
│   ├── router               // 路由配置
    └── App.vue              // 项目原始根组件
├── .babelrc                 // babel工具配置
├── .editorconfig            // 编码风格配置(不太影响开发)
├── .gitignore               // git项目忽略上传的文件/文件夹配置
├── .project                 // 我编辑器生成的，对项目无用
├── README.md                // 说明文档
├── _config.yml              // git pages选择风格生成的
├── package.json             // 项目依赖配置信息
|—— index.html               //首页文件
|—— static                   //存放静态资源