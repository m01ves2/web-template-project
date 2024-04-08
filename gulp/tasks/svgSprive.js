import svgSprite from "gulp-svg-sprite";

export const svgSprive = () => {
	return app.gulp.src(app.path.src.svgicons, {})
		.pipe(app.plugins.plumber( //обработка ошибок при компиляции добавим и в обработку scss
			app.plugins.notify.onError({ //уведомления об ошибках
				title: 'SVG',
				message: 'Error: <%= error.message %>'
			}))
		)
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: `../icons/icons.svg`,
					//создавать страницу с перечнем иконок
					example: true
				}
			}
		}))
		.pipe(app.gulp.dest(app.path.build.images));
}
