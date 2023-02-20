//package &import
const { cities, maxExtractedNum, minExtractedNum } = require('./global-variable');
const Bill = require('../bill/bill');
const inquirer = require('inquirer');

/**
 * function to manage the ending of the game, with the possibility to restart
 * @param {function name} game this is the main function name that is going to be called if re-start game
 * @returns 'end of the game' or fucntion game()
 */
const play = async (game) => {
	const answer = await inquirer.prompt([
		{
			type: 'confirm',
			name: 'playAgain',
			message: 'Do you want to play again?',
		},
	]);
	if (answer.playAgain) {
		return game();
	}
	{
		return console.log('The end!');
	}
};

/**
 * function to determine how many bills the user want to generate
 * @returns {Number} number of bills
 */
const howManyBills = async () => {
	const minNum = 0;
	const maxNum = 5;
	const answer = await inquirer.prompt([
		{
			type: 'input',
			name: 'number',
			message: 'Please enter the number of Bills you want to play (1-5, 0 to exit)',
			validate: function (input) {
				const number = parseInt(input);
				if (number >= minNum && number <= maxNum && /\D+/.test(input) === false) {
					return true;
				}
				return 'Please enter a integer number between 1 and 5';
			},
		},
	]);
	if (answer.number === '0') {
		return false;
	}
	return parseInt(answer.number);
};

/**
 * function to initializate the bills exe: [{id:1,numbers:[1,2,3],typeAndBet:ambo: 10, ambata: 50},{...}]
 * @param {Number} billsNumber how many bills to initialize
 * @returns {Array of Object} array of bills
 */
const initializeUserBills = async (billsNumber) => {
	const billsWithContent = [];
	for (i = 1; i <= billsNumber; i++) {
		const id = i;
		const numbers = await Bill.selectNumbers(id);
		const typeAndBet = await Bill.selectType(numbers.length);
		const city = await Bill.selectCity();
		billsWithContent.push(new Bill(id, numbers, typeAndBet, city));
	}
	return billsWithContent;
};

/**
 * generate bills
 * @returns {Array of Object} array of bills
 */
const billsGenerator = async () => {
	const numBills = await howManyBills();
	if (!numBills) {
		return false;
	} else {
		const userBills = await initializeUserBills(numBills);
		return userBills;
	}
};

/**
 * function to create a random object of the extraction of all the cities
 * @returns {Object} objLotto is an object composed {city: [n1,n2,n3,n4,n5]}
 */
const lottoExtraction = () => {
	const extractedNumbers = new Set(); //set of all the numbers for all the cities
	let startIndexArray = 0;
	const numberExtractedForCity = 5;
	const totalNumberExtracted = numberExtractedForCity * (cities.length - 1); //50
	const objLotto = {};

	while (extractedNumbers.size != totalNumberExtracted) {
		const randomNumber = Math.floor(Math.random() * maxExtractedNum) + minExtractedNum;
		extractedNumbers.add(randomNumber);
	}
	const arrayExtractedNumbers = [...extractedNumbers];
	const citiesNoTutti = cities.filter((noTutti) => cities.includes(noTutti));
	citiesNoTutti.forEach((city) => {
		objLotto[city] = arrayExtractedNumbers.slice(startIndexArray, startIndexArray + numberExtractedForCity);
		objLotto[city].sort((a, b) => {
			return a - b;
		});
		startIndexArray += 5;
	});
	return objLotto;
};

/**
 * function to check an array of bill, each bill compared with the lotto extraction
 * @param {Arary of Object} bills array of bills exe: [{id:1,numbers:[1,2,3],typeAndBet:ambo: 10, ambata: 50},{...}]
 * @param {Object} lotto objLotto is an object composed {city: [n1,n2,n3,n4,n5]}
 * @returns If not won return false else won exe obj:
 * [false,{Venezia:{numbers:[1,2,3,4],types:['Ambata','Quaterna'],prize: 120000},Bari:{numbers:[1,3],types:['Ambata'],prize: 22.46}},...]
 */
const checkWinBill = (bills, lotto) => {
	const arrayOfbills = [];
	bills.forEach((bill) => {
		arrayOfbills.push(bill.checkWin(lotto));
	});
	return arrayOfbills;
};

module.exports = {
	play,
	howManyBills, //-
	initializeUserBills, //-
	billsGenerator, //collect howManyBills,initalizeUserBills
	lottoExtraction,
	checkWinBill,
};
