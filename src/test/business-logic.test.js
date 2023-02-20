const inquirer = require('inquirer');
// const { describe } = require('yargs')

// const Bill = require('../bill/bill');
const { howManyBills, lottoExtraction } = require('../utils/business-logic');

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
		console.log(result);
		expect(Object.keys(result).length).toBe(11); //all the cities and 'Tutti'
		for (const city in result) {
			expect(result[city]).toHaveLength(5);
		}
	});
});
