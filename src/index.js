//package&import
const execute = require('./utils/business-logic');
const print = require('./utils/prints');

// lotto game
const game = async () => {
	//bill generator
	const bills = await execute.billsGenerator();
	console.log(print.printBills(bills));

	//lotto extraction generator
	const lotto = execute.lottoExtraction();
	console.log(print.printLottoExtraction(lotto));

	//check and print win and loose bills
	const results = execute.checkWinBill(bills, lotto);
	console.log(print.printResultBills(results));

	//end-restart game
	return execute.play(game);
};

game();
