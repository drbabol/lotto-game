const { printBills, printLottoExtraction, printResultBills } = require('../src/utils/prints');
const Bill = require('../src/bill/bill');

describe('function prints', () => {
	test('printBills: should return the print of all the bills', () => {
		const bills = [new Bill(1, [23, 26, 31, 41, 47, 58, 60, 75, 78, 87], { Ambata: 10 }, ['Bari', 'Roma']), new Bill(2, [1, 15, 30, 35, 44], { Cinquina: 10 }, ['Roma'])];

		const expected = `
┌───────────────────────────────────┐
│      ◇◇◇◇ ID BILL: #1 ◇◇◇◇        │
╞═══════════════════════════════════╡
│   23,26,31,41,47,58,60,75,78,87   │
│───────────────────────────────────│
│ Ambata                 10,00\u00A0€    │
│───────────────────────────────────│
│ Bari, Roma                        │
│───────────────────────────────────│
│ Total bet              10,00\u00A0€    │
└───────────────────────────────────┘
┌───────────────────────────────────┐
│      ◇◇◇◇ ID BILL: #2 ◇◇◇◇        │
╞═══════════════════════════════════╡
│           1,15,30,35,44           │
│───────────────────────────────────│
│ Cinquina               10,00\u00A0€    │
│───────────────────────────────────│
│ Roma                              │
│───────────────────────────────────│
│ Total bet              10,00\u00A0€    │
└───────────────────────────────────┘
`;

		const actual = printBills(bills);

		expect(actual).toBe(expected);
	});

	test('printLottoExtraction: should return the print of the extraction', () => {
		const lotto = { Bari: [28, 31, 40, 56, 79], Roma: [16, 18, 20, 22, 75] };

		const expected = `Extractions:
┌──────────┬────────────────┐
│ City     │ Numbers        │
├──────────┼────────────────┤
│ Bari     │ 28,31,40,56,79 │
│ Roma     │ 16,18,20,22,75 │
└──────────┴────────────────┘
`;
		const actual = printLottoExtraction(lotto);
		expect(actual).toBe(expected);
	});

	test('printResultBills: should return the print of results of all bills', () => {
		const winnersOrLooser = [false, { Venezia: { numbers: [1, 2, 3, 4], types: ['Ambata', 'Quaterna'], prize: 120000 }, Bari: { numbers: [1, 3], types: ['Ambata'], prize: 22.46 } }];

		const expected = `
┌───────────────────────────────────┐
│ Bill #1 did not win... ✘          │
└───────────────────────────────────┘
┌───────────────────────────────────┐
│ BILL #2 WIN!                      │
╞═══════════════════════════════════╡
│ Venezia WIN with:  ✔              │
│ Types   →  Ambata, Quaterna       │
│ Numbers →  1, 2, 3, 4             │
│ Prize   →  120.000,00\u00A0€           │
│                                   │
│ Bari WIN with:  ✔                 │
│ Types   →  Ambata                 │
│ Numbers →  1, 3                   │
│ Prize   →  22,46\u00A0€                │
│                                   │
│ Total prize -8% = 110.420,66\u00A0€    │
└───────────────────────────────────┘
`;
		const actual = printResultBills(winnersOrLooser);
		expect(actual).toBe(expected);
	});
});
