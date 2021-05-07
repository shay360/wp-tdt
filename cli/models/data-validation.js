exports.convertSupportOptionsToBooleans = (supportOptions) => {
	for (let option in supportOptions) {
		if (supportOptions[option] === 'true') {
			supportOptions[option] = true;
		} else {
			supportOptions[option] = false;
		}
	}
	return supportOptions;
};
