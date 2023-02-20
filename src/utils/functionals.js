//formatting between string currency <=> number
const currencyToNumber = (string) => {
	return parseFloat(string.replace('.', '').replace(',', '.').replace(' €', ''));
};
const numberToCurrency = (num) => {
	return (num = num.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }));
};

//calculate the n possibile combination within an array elemnts
const nChooseK = (n, k) => {
	let numerator = 1;
	let denominator = 1;
	for (let i = n - k + 1; i <= n; i++) {
		numerator *= i;
	}
	for (let i = 1; i <= k; i++) {
		denominator *= i;
	}
	return numerator / denominator;
};
//calculate net prize based on lotto rules 8% taxes of 500€
const calculateNetPrize = (grossPrize) => {
	let netPrize = 0;
	grossPrize > 500 ? (netPrize += grossPrize - grossPrize * (8 / 100)) : (netPrize = grossPrize);
	const formattedNetPrize = netPrize.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
	return formattedNetPrize;
};

module.exports = {
	currencyToNumber,
	numberToCurrency,
	nChooseK,
	calculateNetPrize,
};
