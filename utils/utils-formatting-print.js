//formatting between string currency <=> number
const currencyToNumber = (string) => {return parseFloat(string.replace('.', '').replace(',', '.').replace(' €', ''))}
const numberToCurrency = (num) => {return num = num.toLocaleString('it-IT', {style: 'currency', currency: 'EUR'})}
const arrayCurrencyToNumber = (arrayString) => {return arrayString.map(n=>parseFloat(n.replace('.', '').replace(',', '.').replace(' €', '')))}

//printing format and variable




module.exports = {
    currencyToNumber,
    numberToCurrency,
    arrayCurrencyToNumber
}