const { convertToFileName } = require('../cli/models/file-tools');

test('convertToFileName', () => {
	let result = convertToFileName('file name');
	expect(result).toBe('file-name');
});
