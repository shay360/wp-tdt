const { removeLastCommma } = require('../cli/models/json-string-tools');

test('removeLastCommma', () => {
	const result = removeLastCommma('comma removed,');
	expect(result).toBe('comma removed');
});
