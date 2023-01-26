//import
const {howManyBills, initializeUserBills}  = require('./utils');
const Bill  = require('./bill');

//array of object
const bills = initializeUserBills(howManyBills())

/**
 * Function to print my objects bills
 * @param {Array of Object} bills array of bills
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

//personal tests 
console.log(printBills(bills))