import { configFTP } from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

export const ftp = () => {
	configFTP.log = util.log;
	const ftpConnect = vinylFTP.create(configFTP); //создаём подключение

	return app.gulp.src(`${app.path.buildFolder}/**/*.*`,{}) //все файлы билда...
		.pipe(app.plugins.plumber( //обработка ошибок при компиляции добавим и в обработку scss
			app.plugins.notify.onError({ //уведомления об ошибках
				title: 'FTP',
				message: 'Error: <%= error.message %>'
			}))
		)
		.pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`)); //...отправляем по пути через коннект
}
