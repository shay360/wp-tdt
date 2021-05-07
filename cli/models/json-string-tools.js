exports.removeLastCommma = (jsonString) => {
	return jsonString.replace(/,\s*$/, '');
};
