/*проверка поддержки webp картинок, добавление класса webp или no-webp для HTML*/
export function isWebp() {
	//проверка поддержки webp
	function testWebP(callback) {
		let WebP = new Image();
		WebP.onload = WebP.onerror = function(){
			callback(WebP.height == 2); //проверка что маленькое изображение создалось в браузере, 2х2 (px)
		};
		WebP.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4TBcAAAAvAUAAABfw1v237r91f/4D73CEhIj+RwA="; //взяли крохотное изображение 2x2, перевели в base64
	}

	//добавление класса _webp или _no-webp для HTML
	testWebP(function(support){
		let className = support == true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}
