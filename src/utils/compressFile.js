
const compressFile = (file, fieldName) => {
	return new Promise((res, rej) => {

		const formData = new FormData();
		const img = new Image();
		const reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onload = async function (e) {
			img.src = e.target.result;
		};

		img.onload = function () {
			const canvas = document.createElement('canvas');
			let width = img.width;
			let height = img.height;

			const ctx = canvas.getContext('2d');
			canvas.width = width;
			canvas.height = height;
			ctx.drawImage(img, 0, 0);

			canvas.toBlob(
				function (blob) {
					const newFile = new File([blob], `${file.name}`, { type: 'image/jpeg' });
					formData.append(fieldName, newFile);

					res(formData);
				},
				'image/jpeg',
				0.2);
		}
		img.onerror = function () {
			rej('Помилка завантаження файла')
		}
	})
}


export default compressFile;
