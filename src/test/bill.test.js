const Bill = require('../bill/bill');

describe('chech methos from a test bill', () => {
	const id = 1;
	const numbers = [1, 12, 23, 34, 45, 55, 66, 77, 88, 90];
	const typeAndBet = { Ambata: 10, Ambo: 20 };
	const city = ['Bari', 'Roma'];
	const billTest = new Bill(id, numbers, typeAndBet, city);

	test('checkWin method: should return the information of winning bill', () => {
		const lottoExtraction = { Bari: [11, 12, 13, 14, 15], Roma: [1, 2, 3, 4, 5] };

		const expected = {
			Bari: { id: 1, numbers: [12], types: ['Ambata'], prize: 1 },
			Roma: { id: 1, numbers: [1], types: ['Ambata'], prize: 1 },
		};
		const actual = billTest.checkWin(lottoExtraction);

		expect(actual).toStrictEqual(expected);
	});

	test('calculateTotalBet method and this.totalBet: should return total bet of the test bill', () => {
		const expected = 30;
		const actual = billTest.calculateTotalBet();
		const actualThis = billTest.totalBet;

		expect(actual).toBe(expected);
		expect(actualThis).toBe(expected);
	});

	// \u00A0 = non-breaking space
	test('test printBill method', () => {
		const expected = `┌───────────────────────────────────┐
│      ◇◇◇◇ ID BILL: #1 ◇◇◇◇        │
╞═══════════════════════════════════╡
│    1,12,23,34,45,55,66,77,88,90   │
│───────────────────────────────────│
│ Ambata                 10,00\u00A0€    │
│ Ambo                   20,00\u00A0€    │
│───────────────────────────────────│
│ Bari, Roma                        │
│───────────────────────────────────│
│ Total bet              30,00\u00A0€    │
└───────────────────────────────────┘`;

		const actual = billTest.printBill();
		expect(actual).toBe(expected);
	});

	test('test printResult method win no taxes e not too width', () => {
		const lottoExtraction = { Bari: [11, 12, 23, 14, 15], Roma: [1, 2, 3, 4, 5] };

		const expected = `┌───────────────────────────────────┐
│ BILL #1 WIN!                      │
╞═══════════════════════════════════╡
│ Bari WIN with:  ✔                 │
│ Types   →  Ambata, Ambo           │
│ Numbers →  12, 23                 │
│ Prize   →  8,00\u00A0€                 │
│                                   │
│ Roma WIN with:  ✔                 │
│ Types   →  Ambata                 │
│ Numbers →  1                      │
│ Prize   →  1,00\u00A0€                 │
│                                   │
│ Total prize = 9,00\u00A0€              │
└───────────────────────────────────┘`;
		const checkWinBill = billTest.checkWin(lottoExtraction);
		actual = Bill.printResult(checkWinBill, 1);
		expect(actual).toBe(expected);
	});

	test('test printResult method win taxes e not too width', () => {
		const lottoExtraction = { Bari: [11, 12, 23, 14, 15], Roma: [1, 2, 3, 4, 5] };

		const id = 1;
		const numbers = [1, 11, 12, 23, 14, 15, 55, 66, 77, 88];
		const typeAndBet = { Ambata: 10, Ambo: 20, Terno: 10, Quaterna: 10, Cinquina: 10 };
		const city = ['Bari', 'Roma'];
		const billTest2 = new Bill(id, numbers, typeAndBet, city);

		const expected = `┌────────────────────────────────────────────────────┐
│ BILL #1 WIN!                                       │
╞════════════════════════════════════════════════════╡
│ Bari WIN with:  ✔                                  │
│ Types   →  Ambata, Ambo, Terno, Quaterna, Cinquina │
│ Numbers →  11, 12, 23, 14, 15                      │
│ Prize   →  27.103,00\u00A0€                             │
│                                                    │
│ Roma WIN with:  ✔                                  │
│ Types   →  Ambata                                  │
│ Numbers →  1                                       │
│ Prize   →  1,00\u00A0€                                  │
│                                                    │
│ Total prize -8% = 24.935,68\u00A0€                      │
└────────────────────────────────────────────────────┘`;
		const checkWinBill = billTest2.checkWin(lottoExtraction);
		actual = Bill.printResult(checkWinBill, 1);
		expect(actual).toBe(expected);
	});
});
