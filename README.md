# gulp-es6-sass

An easy-to-use module to compile your *.es6 and *.sass files. Support watch changes and instantly compile them.

## Install

```
npm install gulp-es6-sass
```

## Usage

```js
var gulp    = require('gulp'),
    options = {
       src: './src'
    };

require('gulp-es6-sass')(gulp, options);
```

There are few tasks added in your gulp:

 + `compile-es6` : Compile all of the *.es6 files under the `options.src` and output to the same directory.
 + `compile-sass`：Compile all of the *.scss files under the `options.src` and output to the same directory.
 + `compile` : It's run `compile-es6` and `compile-sass` parallel.
 + `watch-es6-sass`：Watch files changes and compile them instantly.
 
Now use them like this!

```
gulp compile
gulp watch-es6-sass
```

You may need [gulp-compress](https://www.npmjs.com/package/gulp-compress) else :)
 
## Options

All options and its default value are list on [here](https://github.com/lmk123/gulp-es6-sass/blob/master/index.js#L8). It's really self-explanation.

## License
MIT
