# gulp-es6-sass

一个集成了 *.es6 与 *.scss 文件转换功能的模块。支持监听文件变化并实时转换。

# 安装与使用

通过 npm 安装：

```
npm install gulp-es6-sass
```

然后在代码里使用：

```js
var gulp    = require('gulp'),
    options = {
       src: './src'
    };

require('gulp-es6-sass')(gulp, options);
```

这样就有三个任务添加到了你的 gulp 中：

 + `compile-es6` : 将指定的 *.es6 文件转换成 *.js 文件并输出到同级目录
 + `compile-sass`：将指定的 *.scss 文件转换成 *.css 文件并输出到同级目录
 + `watch-es6-sass`：这是一个持续执行的任务，除非你手动终结。监听目录下 *.es6 与 *.scss 文件的变化并实时自动进行转换。
 
## 设置项
 
 所有设置项及其默认值都在[这里](https://github.com/lmk123/app-another-one/blob/master/index.js#L8)

## 许可
MIT
