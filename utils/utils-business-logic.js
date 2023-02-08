////package &import
const {cities,maxExtractedNum,minExtractedNum}  = require('./utils-global-variable');
const Bill  = require('../bill');
const inquirer = require('inquirer');

/**
 * func to determine how many bills the user want to generate
 * @returns {Number} number of bills
 */
// 
const howManyBills = async() =>{
    const minNum = 0
    const maxNum = 5
    const answer = await inquirer
    .prompt([
        {
            type: 'input',
            name: 'number',
            message: 'Please enter the number of Bills you want to play (1-5, 0 to exit)',
            validate: function(input) {
                const number = parseInt(input);
                if (number >= minNum && number <= maxNum && (/\D+/).test(input)===false) {
                    return true;
                }
                return 'Please enter a integer number between 1 and 5';
            }
        }
        
    ])
    if (answer.number === 0) {
        return;
    }
    return answer.number
}

/**
 * func to initializate the bills exe: [{id:1,numbers:[1,2,3],typeAndBet:ambo: 10, ambata: 50},{...}]
 * @param {Number} billsNumber how many bills to initialize
 * @returns {Array of Object}
 */
const initializeUserBills = async(billsNumber) => {
        const billsWithContent = []
        if (isNaN(billsNumber)||billsNumber===0){ 
            console.log('There was no initialization of bills.') 
        }
        else{
            for(i=1;i<=billsNumber;i++){
                const id = i
                const numbers = await Bill.selectNumbers(id)
                const typeAndBet = await Bill.selectType(numbers.length)
                const city = await Bill.selectCity()
                billsWithContent.push(new Bill(id, numbers,typeAndBet,city))
            }
            return(billsWithContent)
        }
}

/**
 * Function to print in nice format my objects of bills
 * @param {Array of Object} bills array of bills exe: [{id:1,numbers:[1,2,3],typeAndBet:ambo: 10, ambata: 50},{...}]
 * @returns {String} string with nice format
 */
const printBills = async(bills) => {
    const arrayOfbillsString = []
    bills.forEach(bill => {
        arrayOfbillsString.push(bill.print())     
    });
    const output = `$\n${arrayOfbillsString.join('\n')}\n`
    return output
}

/**
 * 
 * @returns 
 */
const billsGenerator = async() =>{
    const numbills = await howManyBills()
    const userBills = await initializeUserBills(numbills)
    const printedBills = await printBills(userBills)
    return printedBills
}

/**
 * function to check all the winning bills that the user decided to play and calculate prize
 * @param {*} extraction is an object composed of cityName: [n1,n2,n3,n4,5] exe: {Roma: [4,5,22,56,76,90], ...} 
 * @param {*} bills array of bills exe: [{name:1,city:'Roma',type:'ambo',numbers:'1,4,66,76,32,90'},{...}]
 * @returns {String} nice formatted string
 */
const checkBillsWinner = (extraction, bills) => {

    // if(bills === undefined){return  `Please restart the software and select the number of bills you want to play.`}

    // const arrayOfResultString = [] // array of string to list the number and city played that won and loose, as an infomration output
    // const winningBills = [] // array of string to print only the bills that won
    // const winningPrizes = [] // array of string ('x.xxx,xx €') of all the winning prize from winning bills 
    // const bets = [] // array of string ('x.xxx,xx €') to have a list of all the bets

    // bills.forEach(bill => {
    //     bets.push(bill.bet)
    //     if (bill.checkWinBill(extraction)){
    //         arrayOfResultString.push(`Bill number ${bill.name} in the city of ${bill.city}  WON!`)
    //         winningBills.push(bill.print(maxBillNChar,maxCityChar,maxTypeChar,maxNumbersChar,maxBetChar))
    //         winningPrizes.push(bill.calculatePrize(objPrizeTableGross))
    //     }
    //     else arrayOfResultString.push(`Bill number ${bill.name} in the city of ${bill.city} LOOSE!`)
    // })

    // //some caluclation for gross, net revenue and profit, changing the format between num and string currency for calculation and rappresantion
    // const winningPrizedFormattedNum = arrayCurrencyToNumber(winningPrizes) //array of num
    // const betsFormattedNum = arrayCurrencyToNumber(bets) // array of num

    // let totalGrossRevenue = winningPrizedFormattedNum.reduce((accumulator,currentValue) => accumulator + currentValue,0) // sum of array element output = num
    // const totalNetRevenue = calculateNetPrize(totalGrossRevenue) // output = string currency

    // totalGrossRevenue = numberToCurrency(totalGrossRevenue) // output = string currency
    // const totalNetRevenueFormatteNum = currencyToNumber(totalNetRevenue)  // output = num

    // let totalNetProfit = totalNetRevenueFormatteNum - (betsFormattedNum.reduce((accumulator,currentValue) => accumulator + currentValue,0))
    // totalNetProfit = numberToCurrency(totalNetProfit) // output = string currency

    // if(winningBills.length > 0) {
    //     return`\n${printTotalExtraction(extraction)}\n${arrayOfResultString.join('\n')}\n\nAll bills played:\n${printBills(bills)}
    //     \n\nWinning bills:\n${header}\n${winningBills.join('\n')}\n${footer}
    //     \n\nTotal gross revenue = ${totalGrossRevenue}\nTotal net revenue = ${totalNetRevenue}\nTotal net profit = ${totalNetProfit}`}
    //     return`\n${printTotalExtraction(extraction)}\n${arrayOfResultString.join('\n')}\nAll bills played:\n${printBills(bills)}
    //     \nNo winning bills!`
}

const calculateNetPrize = (grossPrize) => {
    let netPrize = 0
    grossPrize > 500 ? netPrize += (grossPrize- (grossPrize*(8/100))) : netPrize=grossPrize
    const formattedNetPrize = (netPrize).toLocaleString('it-IT', {style: 'currency', currency: 'EUR'})
    return formattedNetPrize
}

const printWinBills = async() => {}

/**
 * function to create a random object of the extraction of all the cities
 * @returns {Object} objLotto is an object composed {city: [n1,n2,n3,n4,n5]}
 */
const lottoExtraction = () => {

    const extractedNumbers = new Set() //set of all the numbers for all the cities
    let startIndexArray = 0
    const numberExtractedForCity = 5
    const totalNumberExtracted = numberExtractedForCity * (cities.length-1) //50
    const objLotto = {}

    while (extractedNumbers.size!=totalNumberExtracted){
        const randomNumber = Math.floor(Math.random()*maxExtractedNum)+minExtractedNum
        extractedNumbers.add(randomNumber)
    }
    const arrayExtractedNumbers = [...extractedNumbers]
    cities.pop()
    cities.forEach(city => {
        objLotto[city] = arrayExtractedNumbers.slice(startIndexArray,startIndexArray+numberExtractedForCity)
        objLotto[city].sort((a,b)=>{return a-b})
        startIndexArray += 5
    })
    return objLotto
}
/**
 * function to print in nice format the total random extractions
 * @param {Object} extraction is an object composed of cityName: [n1,n2,n3,n4,5] exe: {Roma: [4,5,22,56,76,90], ...} 
 * @returns {String} nice formatted string
 */
const printLottoExtraction = extraction => {
    const header = `Extractions:\n+----------+----------------+
¦ City     ¦ Numbers        ¦
+----------+----------------+`
    const footer = `+----------+----------------+\n`
    const arrayOutput = []
    for (const key in extraction){
        arrayOutput.push(`¦${(key.padStart(key.length + 1,' ')+`¦`.padStart(10-key.length,' ') + extraction[key].toString().padStart(extraction[key].toString().length + 1,' ')).padEnd(27,' ')}¦`)
    }
    const output = `${header}\n${arrayOutput.join('\n')}\n${footer}`
    return output
}
const lottoExtracrionGenerator = async() => {
    const extraction = printLottoExtraction(lottoExtraction())
    return extraction
}

module.exports = {
    howManyBills, //-
    initializeUserBills, //-
    printBills, //-
    billsGenerator, //collect howManyBills,initalizeUserBills,pirntBills
    calculateNetPrize,
    printWinBills,
    lottoExtraction, //-
    printLottoExtraction, //-
    lottoExtracrionGenerator // collect lottroExtraction,printLottoExtraction
}