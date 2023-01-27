//import
const {howManyBills, initializeUserBills, lottoExtraction}  = require('./utils');
const Bill  = require('./bill');

//array of object
const bills = initializeUserBills(howManyBills())
const allCityExtraction = lottoExtraction()

/**
 * Function to print my objects bills
 * @param {Array of Object} bills array of bills exe: [{name:1,city:'Roma',type:'ambo',numbers:'1,4,66,76,32,90'},{...}]
 * @returns {string} string with nice format
 */
const printBills = (bills) => {
    if(bills === undefined){return  `Please restart the software and select the number of bills you want to play.`}

    const maxBillNChar = 12 
    const maxCityChar = 10
    const maxTypeChar = 10
    const maxNumbersChar = 31

    const header = `
+------------+----------+----------+-------------------------------+
¦   Bill n°  ¦   City   ¦   Type   ¦            Numbers            ¦
+------------+----------+----------+-------------------------------+`
    const footer = `+------------+----------+----------+-------------------------------+`

    const arrayOfbillsString = []

    bills.forEach(bill => {
        arrayOfbillsString.push(bill.print(maxBillNChar,maxCityChar,maxTypeChar,maxNumbersChar))     
    });
    const output = `${header}\n${arrayOfbillsString.join('\n')}\n${footer}`
    return output
}
/**
 * function to print in nice format the total extraction
 * @param {Object} extraction is an object composed of cityName: [n1,n2,n3,n4,5] exe: {Roma: [4,5,22,56,76,90], ...} 
 * @returns {String} nice formatted string
 */
const printTotalExtraction = extraction => {
    const header = `
Extractions:
+----------+----------------+
¦ City     ¦ Numbers        ¦
+----------+----------------+`
    const footer = `+----------+----------------+\n\n`
    let output = ''
    const arrayOutput = []
    for (const key in extraction){
        arrayOutput.push(`¦` + key.toString().padStart(key.toString().length + 1,' ') + `¦`.padStart(10-key.toString().length,' ') + extraction[key].toString().padStart(extraction[key].toString().length + 1,' ') + `¦`.padStart(16-extraction[key].toString().length,' '))
    }
    output = header + '\n' + arrayOutput.join('\n') + '\n' + footer
    return output
}
/**
 * function to check all the winning bills that the user decided to play
 * @param {*} extraction is an object composed of cityName: [n1,n2,n3,n4,5] exe: {Roma: [4,5,22,56,76,90], ...} 
 * @param {*} bills array of bills exe: [{name:1,city:'Roma',type:'ambo',numbers:'1,4,66,76,32,90'},{...}]
 * @returns {String} nice formatted string
 */
const checkBillsWinner = (extraction, bills) => {

    if(bills === undefined){return  `Please restart the software and select the number of bills you want to play.`}

    const maxBillNChar = 12 
    const maxCityChar = 10
    const maxTypeChar = 10
    const maxNumbersChar = 31
    const arrayOfResultString = [] 
    const winningBills = []

    bills.forEach(bill => {
        if (bill.checkWinBill(extraction)){
            arrayOfResultString.push(`Bill number ${bill.name} in the city of ${bill.city}  WON!`)
            winningBills.push(bill.print(maxBillNChar,maxCityChar,maxTypeChar,maxNumbersChar))//not necessary in my rappresentation of the winning bills
        }
        else arrayOfResultString.push(`Bill number ${bill.name} in the city of ${bill.city} LOOSE!`)
    })
    //console.log(`winning bills: ${winningBills}`)
    return  '\n' + printTotalExtraction(extraction) + arrayOfResultString.join('\n') + printBills(bills)
}

//personal tests 
//console.log(printBills(bills))
console.log(checkBillsWinner(allCityExtraction,bills))