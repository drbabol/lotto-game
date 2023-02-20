const Bill = require('../bill/bill');

/**
 * function to print in nice format my objects of bills
 * @param {Array of Object} bills array of bills exe: [{id:1,numbers:[1,2,3],typeAndBet:ambo: 10, ambata: 50},{...}]
 * @returns {String} string with nice format
 */
const printBills = (bills) => {
	if (bills.length != 0) {
		const arrayOfbillsString = [];
		bills.forEach((bill) => {
			arrayOfbillsString.push(bill.printBill());
		});
		const output = `$\n${arrayOfbillsString.join('\n')}\n`;
		return output;
	}
};

/**
 * function to print in nice format the total random extractions
 * @param {Object} extraction is an object composed of cityName: [n1,n2,n3,n4,5] exe: {Roma: [4,5,22,56,76,90], ...}
 * @returns {String} nice formatted string
 */
const printLottoExtraction = (extraction) => {
	if (extraction != undefined) {
		const header = `Extractions:\n┌──────────┬────────────────┐\n│ City     │ Numbers        │\n├──────────┼────────────────┤`;
		const footer = `└──────────┴────────────────┘\n`;
		const arrayOutput = [];
		for (const key in extraction) {
			arrayOutput.push(
				`│${(key.padStart(key.length + 1, ' ') + `│`.padStart(10 - key.length, ' ') + extraction[key].toString().padStart(extraction[key].toString().length + 1, ' ')).padEnd(27, ' ')}│`
			);
		}
		arrayOutput.pop();
		const output = `${header}\n${arrayOutput.join('\n')}\n${footer}`;
		return output;
	}
};

/**
 * function to print all the result of the user bills, winner and looser
 * @param {Array of Object} winnersOrLooser array of bill's results exe:
 * [false,{Venezia:{numbers:[1,2,3,4],types:['Ambata','Quaterna'],prize: 120000},Bari:{numbers:[1,3],types:['Ambata'],prize: 22.46}},...]
 * @returns {String} nice formatted string
 */
const printResultBills = (winnersOrLooser) => {
	const arrayOfbillsString = [];
	for (const [index, winOrLoose] of winnersOrLooser.entries()) {
		arrayOfbillsString.push(Bill.printResult(winOrLoose, index + 1));
	}
	const output = `$\n${arrayOfbillsString.join('\n')}\n`;
	return output;
};

module.exports = {
	printBills,
	printLottoExtraction,
	printResultBills,
};
