// import dartSass from 'sass'; //препроцессор sass
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'; //плагин для запуска препроцессора sass
import rename from 'gulp-rename'; //для переименования файлов

import cleanCss from 'gulp-clean-css'; //сжатие css-файлов
import webpcss from 'gulp-webpcss'; //вывод WEBP-изображений. Используем именно этот плагин, а не gulp-webp-css,
// потому что gulp-webp-css не работает в Safari(его медиа запросы @supports). gulp-webpcss еще и требует плагин webp-converter@2.2.3
import autoprefixer from 'gulp-autoprefixer'; //добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; //группировка медиа запросов

const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev }) //файл стилей собираем один, из запчастей - потому используем sourcemap - для режима разработчика
		.pipe(app.plugins.plumber( //обработка ошибок при компиляции добавим и в обработку scss
			app.plugins.notify.onError({ //уведомления об ошибках
				title: 'SCSS',
				message: 'Error: <%= error.message %>'
			}))
		)
		.pipe(app.plugins.replace(/@img\//g, '../img/')) //для замены @img в html-файлах на путь к картинкам img/
		.pipe(sass({
			outputStyle: `expanded`
		}))
		.pipe(groupCssMediaQueries())
		.pipe(webpcss({
			webpClass: '.webp', //для браузеров с поддержкой webp
			noWebClass: '.no-webp', //для остальных браузеров
		}))
		.pipe(autoprefixer({
			grid: true, //поддержка autoprefixer гридов
			overrideBrowserslist: ['last 3 versions'],
			cascade: true
		}))
		.pipe(app.gulp.dest(app.path.build.css)) //сохраним несжатый дубль конечного файла стилей, для нашего анализа
		.pipe(cleanCss()) //а вот и само сжатие-минификация css, удаление пробелов
		.pipe(rename({
			extname: '.min.css',
		}))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream());
}
