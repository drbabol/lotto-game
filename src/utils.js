//import
const Bill  = require('./bill');

//package
const prompt = require('prompt-sync')();

/**
 * func to determine how many bills the user want to generate
 * @returns {Number} number of bills
 */
// 
const howManyBills = () =>{
    const minNum = 0
    const maxNum = 5
    let userNumber = parseInt(prompt('Please enter the number of bills you want to play between 1 and 5 (0 to exit): ',0))

    while((userNumber<minNum || userNumber>maxNum) || isNaN(userNumber)){
        userNumber = +parseInt(prompt('Please enter a number between 1 and 5 (0 to exit): ',0))
    }
    if (userNumber===0){console.log(`The request has been stoped.`)}
    return userNumber
}
/**
 * func to initializate the bills
 * @param {Number} billsNumber 
 * @returns {Array of Object}
 */
const initializeUserBills = billsNumber => {
    const billsWithContent = []
    if (isNaN(billsNumber)||billsNumber===0){ console.log('There was no initialization of bills.') }
    else{
        for(i=1;i<=billsNumber;i++){
            const name = i
            const city = Bill.selectCity()
            const type = Bill.selectType()
            const numbers = Bill.selectNumbers()
            billsWithContent.push(new Bill(name,city,type,numbers))
        }
        return billsWithContent
    }
}
module.exports = {howManyBills, initializeUserBills}