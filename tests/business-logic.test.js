const inquirer = require('inquirer');
const Bill = require('../src/bill/bill');
const { howManyBills, lottoExtraction, checkWinBill } = require('../src/utils/business-logic');

jest.mock('inquirer');

describe('function from business-logic', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test('howManyBills: should return a valid integer between 1 and 5', async () => {
		inquirer.prompt.mockResolvedValueOnce({ number: '3' });
		const result = await howManyBills();
		expect(result).toBe(3);
	});

	test('howManyBills: should return 0 if user input is 0', async () => {
		inquirer.prompt.mockResolvedValueOnce({ number: '0' });
		const result = await howManyBills();
		expect(result).toBe(false);
	});

	test('lottoExtraction: should return an object of cities and numbers', () => {
		const result = lottoExtraction();
		expect(Object.keys(result).length).toBe(10); //all the cities and 'Tutti'
		for (const city in result) {
			expect(result[city]).toHaveLength(5);
		}
	});

	test('checkWinBill: should return the results of the played bills compared with the lotto', () => {
		const bills = [new Bill(1, [23, 26, 31, 41, 47, 58, 60, 75, 78, 87], { Ambata: 10 }, ['Bari', 'Roma']), new Bill(2, [1, 15, 30, 35, 44], { Cinquina: 10 }, ['Roma'])];
		const lotto = { Bari: [28, 31, 40, 56, 79], Roma: [16, 18, 20, 22, 75] };

		const expected = [{ Bari: { id: 1, numbers: [31], types: ['Ambata'], prize: 1.0 }, Roma: { id: 1, numbers: [75], types: ['Ambata'], prize: 1.0 } }, false];
		const actual = checkWinBill(bills, lotto);
		expect(actual).toEqual(expected);
		expect(actual).toHaveLength(2);
	});
});
