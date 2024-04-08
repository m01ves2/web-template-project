import { deleteAsync } from 'del';
import zipPlugin from 'gulp-zip';

//задача архивирования нашего сайта
export const zip = () => {
	deleteAsync(`./${app.path.rootFolder}.zip`); // удаляем существующий zip-архив, если он есть

	return app.gulp.src(`${app.path.buildFolder}/**/*.*`,{})
		.pipe(app.plugins.plumber( //обработка ошибок при компиляции добавим и в обработку scss
			app.plugins.notify.onError({ //уведомления об ошибках
				title: 'ZIP',
				message: 'Error: <%= error.message %>'
			}))
		)
		.pipe(zipPlugin(`${app.path.rootFolder}.zip`))
		.pipe(app.gulp.dest('./'));
}
