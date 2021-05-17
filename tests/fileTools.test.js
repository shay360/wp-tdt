const { convertToFileName } = require('../cli/models/file-tools');

test('Convert To File Name', () => {
	let result = convertToFileName('file name');
	expect(result).toBe('file-name');
});
