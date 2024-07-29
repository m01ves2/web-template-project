import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const images = () => {
	return app.gulp.src(app.path.src.images, {encoding: false}) // создаем карту исходников для отслеживания ошибок - потому используем sourcemap
		.pipe(app.plugins.plumber( //обработка ошибок при компиляции
			app.plugins.notify.onError({ //уведомления об ошибках
				title: 'IMAGES',
				message: 'Error: <%= error.message %>'
			}))
		)
		.pipe(app.plugins.newer(app.path.build.images)) //newer - отсеивает только изменившиеся изображения, чтобы работать только с ними
		.pipe(webp())
		.pipe(app.gulp.dest(app.path.build.images)) //выгрузка результатов

		.pipe(app.gulp.src(app.path.src.images, {encoding: false})) //опять смотрим на исходники
		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(imagemin({ //сжатие картинок
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			interlaced: true,
			optimizationLevel: 3 //from 0 to 7
		}))
		.pipe(app.gulp.dest(app.path.build.images)) // записываем в результат

		// .pipe(app.gulp.src(app.path.src.svg, {encoding: false})) //получаем svg-картинки
		// .pipe(app.gulp.dest(app.path.build.images)) //записываем их в результат
		.pipe(app.plugins.browsersync.stream());
}
