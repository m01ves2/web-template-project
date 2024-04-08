import webpack from 'webpack-stream'; //для подключения ES6-модулей используем webpack

export const js = () => {
	return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev }) //файл стилей собираем один, из запчастей, создаем карту исходников для отслеживания ошибок - потому используем sourcemap для режима разработки
		.pipe(app.plugins.plumber( //обработка ошибок при компиляции добавим и в обработку scss
			app.plugins.notify.onError({ //уведомления об ошибках
				title: 'JS',
				message: 'Error: <%= error.message %>'
			}))
		)
		.pipe(webpack({
			mode: app.isBuild ? 'production' : 'development', //режим работы webpack - для продакшна и разработки
			output: {
				filename: 'app.min.js', //минифицированный результат
			}
		}))
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browsersync.stream());
}
