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
├── server                   // node.js后端代码
    ├── api                  // 各种api文件
    ├── temp                 // 暂时存放上传的图片
    ├── DBHelper.js          // 连接MySQL数据库
    ├── index.js             // 主配置文件
    └── sqlMap.js            // 数据库语句
├── src                      // 生产目录(着重说明)
    ├── components           // vue组件
    ├── config               // 基本配置
    ├── images               // 各种图片
    ├── pages                // 业务页面
    ├── router               // 路由配置
    ├── store                // vuex的状态管理
    ├── style                // 样式文件
    ├── App.vue              // 项目原始根组件
    └── main.js              // 项目入口文件
    └── tim.js               // 腾讯即时通讯文件
|—— static                   //存放静态资源
    └── uploads              // 上传的图片
├── .babelrc                 // babel工具配置
├── .editorconfig            // 编码风格配置(不太影响开发)
├── .gitignore               // git项目忽略上传的文件/文件夹配置
├── .project                 // 我编辑器生成的，对项目无用
├── README.md                // 说明文档
├── _config.yml              // git pages选择风格生成的
├── package.json             // 项目依赖配置信息
|—— index.html               //首页文件
