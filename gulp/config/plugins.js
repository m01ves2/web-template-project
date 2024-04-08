import replace from 'gulp-replace'; //поиск и замена
import plumber from 'gulp-plumber'; //обработка ошибок
import notify from 'gulp-notify'; //сообщения (подсказки)
import browsersync from 'browser-sync'; //локальный сервер. открывается страница в браузере, обновляется автоматически при изменениях
import newer from 'gulp-newer'; //проверка что изображения обновились, и ими нужно заниматься
import ifPlugin from 'gulp-if'; //условие ветвления - для режима разработки и продакшна

export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer : newer,
	if: ifPlugin
};
