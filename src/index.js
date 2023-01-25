//import
const {howManyBills, initializeUserBills}  = require('./utils');
const Bill  = require('./bill');


//personal tests 
console.log(Bill.printBill(initializeUserBills(howManyBills())))