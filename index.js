//package&import
const {howManyBills, initializeUserBills, lottoExtraction, calculateNetPrize}  = require('./utils/utils-business-logic');
const {currencyToNumber,numberToCurrency,arrayCurrencyToNumber}  = require('./utils/utils-formatting-print');
const {objPrizeTableGross}  = require('./utils/utils-global-variable');

//variable from imported functions
const bills = initializeUserBills(howManyBills())
const allCityExtraction = lottoExtraction()

//file variable for printing results
const header = `+------------+----------+----------+-------------------------------+-------------+
¦   Bill n°  ¦   City   ¦   Type   ¦            Numbers            ¦     Bet     ¦
+------------+----------+----------+-------------------------------+-------------+`

const footer = `+------------+----------+----------+-------------------------------+-------------+`
const maxBillNChar = 12 //max characters allowed in the Bill column
const maxCityChar = 10 //max characters allowed in the City column
const maxTypeChar = 10 //max characters allowed in the Type column
const maxNumbersChar = 31 //max characters allowed in the Numbers column
const maxBetChar = 13 //max characters allowed in the Bet column

/**
 * Function to print in nice format my objects of bills
 * @param {Array of Object} bills array of bills exe: [{name:1,city:'Roma',type:'ambo',numbers:'1,4,66,76,32,90'},{...}]
 * @returns {string} string with nice format
 */
const printBills = (bills) => {
    if(bills === undefined){return  `Please restart the software and select the number of bills you want to play.`}
    const arrayOfbillsString = []
    bills.forEach(bill => {
        arrayOfbillsString.push(bill.print(maxBillNChar,maxCityChar,maxTypeChar,maxNumbersChar,maxBetChar))     
    });
    const output = `${header}\n${arrayOfbillsString.join('\n')}\n${footer}`
    return output
}
/**
 * function to print in nice format the total random extractions
 * @param {Object} extraction is an object composed of cityName: [n1,n2,n3,n4,5] exe: {Roma: [4,5,22,56,76,90], ...} 
 * @returns {String} nice formatted string
 */
const printTotalExtraction = extraction => {
    const header = `Extractions:
+----------+----------------+
¦ City     ¦ Numbers        ¦
+----------+----------------+`
    const footer = `+----------+----------------+\n`
    const arrayOutput = []
    for (const key in extraction){
        arrayOutput.push(`¦` + key.toString().padStart(key.toString().length + 1,' ') + `¦`.padStart(10-key.toString().length,' ') + extraction[key].toString().padStart(extraction[key].toString().length + 1,' ') + `¦`.padStart(16-extraction[key].toString().length,' '))
    }
    const output = `${header}'\n'${arrayOutput.join('\n')}\n${footer}`
    return output
}
/**
 * function to check all the winning bills that the user decided to play and calculate prize
 * @param {*} extraction is an object composed of cityName: [n1,n2,n3,n4,5] exe: {Roma: [4,5,22,56,76,90], ...} 
 * @param {*} bills array of bills exe: [{name:1,city:'Roma',type:'ambo',numbers:'1,4,66,76,32,90'},{...}]
 * @returns {String} nice formatted string
 */
const checkBillsWinner = (extraction, bills) => {

    if(bills === undefined){return  `Please restart the software and select the number of bills you want to play.`}

    const arrayOfResultString = [] // array of string to list the number and city played that won and loose, as an infomration output
    const winningBills = [] // array of string to print only the bills that won
    const winningPrizes = [] // array of string ('x.xxx,xx €') of all the winning prize from winning bills 
    const bets = [] // array of string ('x.xxx,xx €') to have a list of all the bets

    bills.forEach(bill => {
        bets.push(bill.bet)
        if (bill.checkWinBill(extraction)){
            arrayOfResultString.push(`Bill number ${bill.name} in the city of ${bill.city}  WON!`)
            winningBills.push(bill.print(maxBillNChar,maxCityChar,maxTypeChar,maxNumbersChar,maxBetChar))
            winningPrizes.push(bill.calculatePrize(objPrizeTableGross))
        }
        else arrayOfResultString.push(`Bill number ${bill.name} in the city of ${bill.city} LOOSE!`)
    })

    //some caluclation for gross, net revenue and profit, changing the format between num and string currency for calculation and rappresantion
    const winningPrizedFormattedNum = arrayCurrencyToNumber(winningPrizes) //array of num
    const betsFormattedNum = arrayCurrencyToNumber(bets) // array of num

    let totalGrossRevenue = winningPrizedFormattedNum.reduce((accumulator,currentValue) => accumulator + currentValue,0) // sum of array element output = num
    const totalNetRevenue = calculateNetPrize(totalGrossRevenue) // output = string currency

    totalGrossRevenue = numberToCurrency(totalGrossRevenue) // output = string currency
    const totalNetRevenueFormatteNum = currencyToNumber(totalNetRevenue)  // output = num

    let totalNetProfit = totalNetRevenueFormatteNum - (betsFormattedNum.reduce((accumulator,currentValue) => accumulator + currentValue,0))
    totalNetProfit = numberToCurrency(totalNetProfit) // output = string currency

    if(winningBills.length > 0) {
        return`\n${printTotalExtraction(extraction)}\n${arrayOfResultString.join('\n')}\n\nAll bills played:\n${printBills(bills)}
        \n\nWinning bills:\n${header}\n${winningBills.join('\n')}\n${footer}
        \n\nTotal gross revenue = ${totalGrossRevenue}\nTotal net revenue = ${totalNetRevenue}\nTotal net profit = ${totalNetProfit}`}
        return`\n${printTotalExtraction(extraction)}\n${arrayOfResultString.join('\n')}\nAll bills played:\n${printBills(bills)}
        \nNo winning bills!`
}


//personal tests 
console.log(checkBillsWinner(allCityExtraction,bills))
