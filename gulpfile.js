import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSprive } from './gulp/tasks/svgSprive.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js'; //отправка сборки на ftp

global.app = {
	isBuild: process.argv.includes('--build'), //режим продакшна, реализуем через передачу параметра --build
	isDev: !process.argv.includes('--build'), //режим разработки, в остальных случаях
	path: path,
	gulp: gulp,
	plugins: plugins,
}

//функция-наблюдатель за изменениями в файлах
function watcher(){
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	//gulp.watch(path.watch.html, gulp.series(html, ftp));
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
}
//если хотим, чтобы изменения html сразу летели на FTP-сервер, корректируем watcher
// function watcher(){
// 	gulp.watch(path.watch.files, gulp.series(copy, ftp));
// 	gulp.watch(path.watch.html, gulp.series(html, ftp));
// 	gulp.watch(path.watch.scss, gulp.series(scss, ftp));
// 	gulp.watch(path.watch.js, gulp.series(js, ftp));
// 	gulp.watch(path.watch.images, gulp.series(images, ftp));
// }

export { svgSprive }; //не нужно здесь постоянно запускать. для единовременного запуска из другого места - в package.json создадим   "scripts": { "svgSprite": "gulp svgSprite" }. теперь запускаем через npm run svgSprite

//последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//задача по копированию файлов, состоит из параллельно выполняемых задач copy и html
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

//построение сценариев выполнения задач
//сначала копируем файлы, потом включаем наблюдатель
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

 //какие задачи в режиме продакшна - ни наблюдатель, ни запуск сервера нам здесь не нужен!!!
const build = gulp.series(reset, mainTasks);

const deployZIP = gulp.series(reset, mainTasks, zip); //зипируем нагенерированное в режиме продакшна для последующей отправки на ftp

const deployFTP = gulp.series(reset, mainTasks, ftp); //отправляем наш билд на удалённый FTP сервер, с реквизитами из конфига

export {dev};
export {build};
export {deployZIP};
export {deployFTP};

//выполенение сценария по умолчанию - То, что записано в dev
gulp.task('default', dev);
