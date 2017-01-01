/* jshint node:true */
'use strict';

var gulp = require('gulp');
var karma = require('karma').server;
var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')();

gulp.task('styles', function() {
  return gulp.src('app/styles/main.less')
    .pipe($.plumber())
    .pipe($.less())
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('jshint', function() {
  return gulp.src[('app/scripts/**/*.js','server/*.js')]
    .pipe($.jshint())
    //.pipe($.jshint.reporter('jshint-stylish'))
    //.pipe($.jshint.reporter('fail'));
});

gulp.task('jscs', function() {
  return gulp.src[('app/scripts/**/*.js', 'server/*.js')]
    .pipe($.jscs());
});

gulp.task('html', ['styles'], function() {
  var lazypipe = require('lazypipe');
  var cssChannel = lazypipe()
    .pipe($.csso)
    .pipe($.replace, 'bower_components/bootstrap/fonts', 'fonts');

  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('app/**/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.ngAnnotate()))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', cssChannel()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    // .pipe($.cache($.imagemin({
    //   progressive: true,
    //   interlaced: true
    // })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function() {
  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*')
    .concat('bower_components/bootstrap/fonts/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe(gulp.dest('.tmp/fonts'));
});

gulp.task('extras', function() {
  return gulp.src([
    'app/*.*',
	'server/*.*',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('connect', ['styles'], function() {
	 // modules =================================================
	var serveStatic = require('serve-static');
	var express        = require('express');
	var app            = express();
	var bodyParser     = require('body-parser');
	var methodOverride = require('method-override');

	// configuration ===========================================
		
	// config files

	var port = process.env.PORT || 9000; // set our port
	// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

	// get all data/stuff of the body (POST) parameters
	app.use(bodyParser.json()); // parse application/json 
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
	app.use(serveStatic('.tmp'));
    app.use(serveStatic('app'));
	app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
	app.use(express.static(__dirname + 'public')); // set the static files location /public/img will be /img for users
	app.use('/bower_components', serveStatic('bower_components'));
	
	// routes ==================================================
	require('./app/routes')(app); // pass our application into our routes

	// start app ===============================================
	app.listen(port);	
	console.log('Magic happens on port ' + port); 			// shoutout to the user
	exports = module.exports = app; 						// expose app

});

gulp.task('serve', ['wiredep', 'connect', 'fonts', 'watch'], function() {
  if (argv.open) {
    require('opn')('http://localhost:9000');
  }
});

gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done);
});

// inject bower components
gulp.task('wiredep', function() {
  var wiredep = require('wiredep').stream;
  var exclude = [
    'bootstrap',
    'jquery',
    'es5-shim',
    'json3',
    'angular-scenario'
  ];

  gulp.src('app/styles/*.less')
    .pipe(wiredep())
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({exclude: exclude}))
    .pipe(gulp.dest('app'));

  gulp.src('test/*.js')
    .pipe(wiredep({exclude: exclude, devDependencies: true}))
    .pipe(gulp.dest('test'));
});

gulp.task('watch', ['connect'], function() {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
	'server/*.js',
    'app/**/*.html',
    '.tmp/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/images/**/*'
  ]).on('change', $.livereload.changed);

  gulp.watch('app/styles/**/*.less', ['styles']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('builddist', ['jshint', 'jscs', 'html', 'images', 'fonts', 'extras'],
  function() {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('build', ['clean'], function() {
  gulp.start('builddist');
});

gulp.task('docs', [], function() {
  return gulp.src[('app/scripts/**/**', 'server/*.js')]
    .pipe($.ngdocs.process())
    .pipe(gulp.dest('./docs'));
});
