const {
	properCase,
	toCamelCase,
	pascalCase,
	replaceAccents,
} = require('../cli/models/generic-tools');

test('Convert To Proper Case', () => {
	const word = 'word';
	expect(properCase(word)).toBe('Word');
});

test('Convert To Camel Case From Dash', () => {
	const testString = 'this-is-dashed';
	expect(toCamelCase(testString)).toBe('thisIsDashed');
});

test('Convert To Camel Case From Space', () => {
	const testString = 'this is spaced';
	expect(toCamelCase(testString)).toBe('thisIsSpaced');
});

test('Convert To Camel Case With First Upper Case', () => {
	const testString = 'camel case with first upper';
	expect(pascalCase(testString)).toBe('CamelCaseWithFirstUpper');
});
