const { calculateNetPrize } = require('../utils/functionals');

describe('function functionals', () => {
	test('calculateNetPrize: should return the 8% less value after tay', () => {
		const expected = '920,00\u00A0€';
		const actual = calculateNetPrize(1000);

		expect(actual).toBe(expected);
	});
});
