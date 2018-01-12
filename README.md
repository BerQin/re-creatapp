## 安装
首先我们可以这样安装：

Using [npm](https://www.npmjs.com/):
```js
  npm install re-creatapp -g
  re-creatapp c projectName
  cd projectName
  npm install
```
之后可以使用npm run start运行就会看到 
holle world
默认是8080端口


## 使用与建议

在一个项目中创建两个路口，建议是关联性强的项目，
如果两者并没有任何关联性，UI也不一样那么我们建议您重新再建立一个项目开发
目录介绍：
-public                                 网页入口文件HTML
-src                                    页面资源入口 包含逻辑层和项目所需的其他资源
  -app                                  项目逻辑层
    -components                         所有项目的公共模块文件夹
    -<分项目名称>                        项目中的某个分项目
      -components                         分项目组件模块
      -serve                              分项目的服务层公用的数据交互模块等
      -views                              分项目的视图层
      index.js                            入口文件
  -images                               图片资源文件夹
  -styles                               css/scss/sass样式资源文件夹
### 在MAC与Linux上的问题与解决

当在linux或mac系统安装插件后无法使用命令的
```js
> $ npm install re-creatapp -g
> $ re-creatapp
env: node\r: No such file or directory
```

你需要解决一下这个小问题，这是因为windows的编码问题

```js
> brew install dos2unix
> find /usr/local/lib/node_modules/re-creatapp -name "*.js" | xargs sudo dos2unix
> re-creatapp

```
大部分的都在 /usr/local/lib/node_modules/re-creatapp 这个目录下
如果自己的不一样请自行替换

开始使用吧！