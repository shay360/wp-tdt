const { removeLastCommma } = require('../cli/models/json-string-tools');

test('Remove Last Comma From String', () => {
    const result = removeLastCommma('comma removed,');
    expect(result).toBe('comma removed');
});
