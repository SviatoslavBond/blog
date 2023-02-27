export const formatDate = (date) => {
	const data = new Date(date);
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	return data.toLocaleDateString('uk-UA', options);
}
