//formatting between string currency <=> number
const currencyToNumber = (string) => {return parseFloat(string.replace('.', '').replace(',', '.').replace(' €', ''))}
const numberToCurrency = (num) => {return num = num.toLocaleString('it-IT', {style: 'currency', currency: 'EUR'})}
const arrayCurrencyToNumber = (arrayString) => {return arrayString.map(n=>parseFloat(n.replace('.', '').replace(',', '.').replace(' €', '')))}

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
}

module.exports = {
    currencyToNumber,
    numberToCurrency,
    arrayCurrencyToNumber,
    nChooseK
}