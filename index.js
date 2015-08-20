var fs    = require( 'fs' ) ,
    sass  = require( 'gulp-sass' ) ,
    babel = require( 'gulp-babel' ) ,
    watch = require( 'gulp-watch' ); // gulp.watch 不能监视 新建的 和 删除的 文件，所以换成了这个模块

module.exports = main;

main.sass = sass;
main.babel = babel;
main.watch = watch;

/**
 * @params {Gulp} gulp - 要附加任务的 gulp 对象，例如 require('gulp')
 * @params {Object} [options] - 设置
 * @params {String} [options.src] - 根目录
 *
 * @params {String[]} [options.es6Files] - glob 数组，用于匹配要处理的 es6 文件
 * @params {String[]} [options.sassFiles] - glob 数组，用于匹配要处理的 sass 文件
 * @params {String[]} [options.es6AndSassFiles] - glob 数组，用于匹配要监听的 es6 与 sass 文件
 *
 * @params {String|Boolean} [options.watchTaskName] - 监听文件变化的任务的名字。设为 false 则不会创建任务。
 * @params {String|Boolean} [options.es6TaskName] - 转换 es6 文件的任务的名字。设为 false 则不会创建任务。
 * @params {String|Boolean} [options.sassTaskName] - 转换 scss 文件的任务的名字。设为 false 则不会创建任务。
 *
 * @params {Function} [options.logError] - 用于输出错误消息的函数
 */
function main( gulp , options ) {
    var options         = options || {} ,
        SRC             = options.src || '.' ,
        es6Path         = options.es6Files || [ SRC + '/**/*.es6' ] ,
        sassPath        = options.sassFiles || [ SRC + '/**/*.scss' ] ,
        es6AndSassPath  = options.es6AndSassFiles || es6Path.concat( sassPath ) ,

        watchTaskName   = options.watchTaskName || 'watch-es6-sass' ,
        es6TaskName     = options.es6TaskName || 'compile-es6' ,
        sassTaskName    = options.sassTaskName || 'compile-sass' ,
        compileTaskName = options.compileTaskName || 'compile' ,

        logError        = options.logError || function ( err ) {
                console.error( err );
            };

    /**
     * 监视所有以 .es6 .scss 为后缀的文件，并在文件改动时自动转换成正常的 .js .css 文件
     */
    watchTaskName && gulp.task( watchTaskName , function ( done ) { // 带上这个 done 参数，控制台里就不会显示 Finished — 不带上其实任务也仍然在 watch 中
        watchChange();
    } );

    es6TaskName && gulp.task( es6TaskName , function () {
        return compileEs6();
    } );

    sassTaskName && gulp.task( sassTaskName , function () {
        return compileSass();
    } );

    compileTaskName && es6TaskName && sassTaskName && gulp.task( compileTaskName , [ es6TaskName , sassTaskName ] );

    /**
     * 监听文件变化并自动编译
     */
    function watchChange( path ) {
        watch( path || es6AndSassPath , function ( e ) {
            var fileFullPath = e.path ,
                isScss       = '.scss' === e.extname ,
                isUnder      = '_' === e.basename[ 0 ];

            switch ( e.event ) {
                case 'change':
                    var dest = fileFullPath.slice( 0 , fileFullPath.lastIndexOf( '\\' ) );

                    // scss 比较特殊，如果改动的是以下划线（_）开头的文件，就全部编译一次
                    if ( isScss ) {
                        if ( isUnder ) {
                            console.warn( '检测到更改了以下划线开头的 scss 文件（' + e.basename + '），正在重新编译整个项目……' );
                            compileSass()
                                .on( 'finish' , function () {
                                    console.log( '编译完成。' );
                                } ); // 这个操作可能会触发此 watch
                        } else {
                            compileSass( fileFullPath , dest );
                        }
                    } else {
                        compileEs6( fileFullPath , dest );
                    }
                    break;
                case 'unlink':
                    if ( isScss && isUnder ) { return; }
                    var path = fileFullPath.slice( 0 , fileFullPath.lastIndexOf( '.' ) ) + (isScss ? '.css' : '.js');
                    fs.unlink( path/* , function () {
                     console.log( 'Deleted file:' + path );
                     }*/ );
                    break;
                case 'add':
                    //console.log( 'Added:' + fileFullPath );
                    break;
            }

        } );
    }

    /**
     * 将指定 .es6 文件转换成 .js 文件
     * @params {String} [path]
     * @params {String} [dest]
     */
    function compileEs6( path , dest ) {
        return gulp.src( path || es6Path )
            .pipe( babel().on( 'error' , logError ) )
            .pipe( gulp.dest( dest || SRC ) );
    }

    /**
     * 将指定 .scss 文件转换成 .css 文件
     * @params {String} [path]
     * @params {String} [dest]
     */
    function compileSass( path , dest ) {
        return gulp.src( path || sassPath )
            .pipe( sass().on( 'error' , logError ) )
            .pipe( gulp.dest( dest || SRC ) );
    }

    return {
        compileEs6 : compileEs6 ,
        compileSass : compileSass ,
        compile : function ( cb ) {
            parallel( [ compileEs6 , compileSass ] , cb );
        } ,
        watchChange : watchChange
    };
}

/**
 * 平行执行多个任务
 * @param {Function[]} tasks - 任务数组
 * @param {Function} [cb] - 全部任务都完成的回调函数，可选。
 */
function parallel( tasks , cb ) {
    var count = 0 , all = tasks.length;

    tasks.forEach( function ( func ) {
        func().on( 'finish' , done );
    } );

    function done() {
        count += 1;
        if ( count === all ) {
            cb && cb();
        }
    }
}
