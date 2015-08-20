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

## API

```js
var gulp = require('gulp'),
     Compile = require('gulp-es6-sass'),
     cpe = Compile(gulp);
```

### Compile.sass
Equal to `require('gulp-sass')`. See more info at [gulp-sass](https://www.npmjs.com/package/gulp-sass).

### Compile.babel
Equal to `require('gulp-babel')`. See more info at [gulp-babel](https://www.npmjs.com/package/gulp-babel).

### Compile.watch
Equal to `require('gulp-watch')`. See more info at [gulp-watch](https://www.npmjs.com/package/gulp-watch).

### cpe.compileEs6([globs,dest])

Compile *.es6 files from `globs` to `dest`.

 + `globs` {String|String[]} - Default value is `options.es6Files`
 + `dest` {String} - Default value is `options.src`
 
### cpe.compileSass([globs,dest])

Compile *.scss files from `globs` to `dest`.

 + `globs` {String|String[]} - Default value is `options.sassFiles`
 + `dest` {String} - Default value is `options.src`
  
### cps.compile([callback])

Equal to `gulp compile`.

 + `callback` {Function}
 
### cpe.watchChange([globs])

Watch files change and compile them instantly.

 + `globs` {String|String[]} - Default value is `options.es6AndSassFiles`

## License
MIT
