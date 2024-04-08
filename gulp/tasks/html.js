import fileinclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg'; //для превращения картинок в оптимизированный формат webp (здесь только пути, сами картинки нужно конвертировать отдельно)
import versionNumber from 'gulp-version-number'; //позволяет избежать кеширования файлов, когда они поменялись (добавляется ключ)

export const html = () => {
	return app.gulp.src(app.path.src.html)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(fileinclude()) //эта фигня вставляет html-файлы в общий index.html через директивы @@include
		.pipe(app.plugins.replace(/@img\//g, 'img/')) //для замены @img в html-файлах на путь к картинкам img/
		.pipe(
			app.plugins.if(app.isBuild,
				webpHtmlNosvg()
			)
		) //работает, если мы в режиме подакшна
		.pipe(app.plugins.if(app.isBuild,
			versionNumber({
				'value': '%DT%', //просто к ссылкам добавляем параметр с датой, чтобы ссылка (картинка) не кешировалась
				'append': {
					'key': '_v',
					'cover': 0,
					'to': ['css', 'js',]
				},
				'output': {
					'file': 'gulp/version.json' //ключ храним в этом отдельном файле
				}
			}))
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browsersync.stream()); //настройка синхронизации - браузер обновляет страницу при изменении в html
};
