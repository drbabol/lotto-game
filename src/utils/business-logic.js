////package &import
const {cities,maxExtractedNum,minExtractedNum}  = require('./global-variable');
const Bill  = require('../bill/bill');
const inquirer = require('inquirer');

/**
 * function to manage the ending of the game, with the possibility to restart
 * @param {function name} game this is the main function name that is going to be called if re-start game
 * @returns 'end of the game' or fucntion game()
 */
const play = async(game) => {
    const answer = await inquirer
    .prompt([
        {
            type: 'confirm',
            name: 'playAgain',
            message: 'Do you want to play again?'
        }
    ])
    if (answer.playAgain){return game()}{return console.log('The end!')}
}

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
                return 'Please enter a integer number between 1 and 5'
            }
        }
    ])
    if (answer.number === '0') {
        return console.log('The game stop, restart the game if wou want to play')
    }
    return parseInt(answer.number)
}

/**
 * func to initializate the bills exe: [{id:1,numbers:[1,2,3],typeAndBet:ambo: 10, ambata: 50},{...}]
 * @param {Number} billsNumber how many bills to initialize
 * @returns {Array of Object} array of bills
 */
const initializeUserBills = async(billsNumber) => {
            const billsWithContent = []
            for(i=1;i<=billsNumber;i++){
                const id = i
                const numbers = await Bill.selectNumbers(id)
                const typeAndBet = await Bill.selectType(numbers.length)
                const city = await Bill.selectCity()
                billsWithContent.push(new Bill(id, numbers,typeAndBet,city))
            }
            return billsWithContent
}
/**
 * Generate bills
 * @returns {Array of Object} array of bills
 */
const billsGenerator = async() =>{
    const numBills = await howManyBills()
    if(isNaN(numBills)){return []}
    else{
        const userBills = await initializeUserBills(numBills)
        return userBills
    }
}

/**
 * Function to print in nice format my objects of bills
 * @param {Array of Object} bills array of bills exe: [{id:1,numbers:[1,2,3],typeAndBet:ambo: 10, ambata: 50},{...}]
 * @returns {String} string with nice format
 */
const printBills = (bills) => {
    if (bills.length!=0){
        const arrayOfbillsString = []
        bills.forEach(bill => {
            arrayOfbillsString.push(bill.printBill())     
        });
        const output = `$\n${arrayOfbillsString.join('\n')}\n`
        return console.log(output)
    }
}

/**
 * function to create a random object of the extraction of all the cities
 * @returns {Object} objLotto is an object composed {city: [n1,n2,n3,n4,n5]}
 */
const lottoExtraction = (bills) => {
    //if the billsWith content = [] meaning howMany() = 0 then don't extract
    if(bills.length!=0){
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
        const citiesNoTutti = cities.filter(noTutti=>cities.includes(noTutti))
        citiesNoTutti.forEach(city => {
            objLotto[city] = arrayExtractedNumbers.slice(startIndexArray,startIndexArray+numberExtractedForCity)
            objLotto[city].sort((a,b)=>{return a-b})
            startIndexArray += 5
        })
        return objLotto
    }
}
/**
 * function to print in nice format the total random extractions
 * @param {Object} extraction is an object composed of cityName: [n1,n2,n3,n4,5] exe: {Roma: [4,5,22,56,76,90], ...} 
 * @returns {String} nice formatted string 
 */
const printLottoExtraction = extraction => {
    if(extraction!=undefined){
        const header = `Extractions:\n┌──────────┬────────────────┐\n│ City     │ Numbers        │\n├──────────┼────────────────┤`
        const footer = `└──────────┴────────────────┘\n`
        const arrayOutput = []
        for (const key in extraction){
            arrayOutput.push(`│${(key.padStart(key.length + 1,' ')+`│`.padStart(10-key.length,' ') + extraction[key].toString().padStart(extraction[key].toString().length + 1,' ')).padEnd(27,' ')}│`)
        }
        arrayOutput.pop()
        const output = `${header}\n${arrayOutput.join('\n')}\n${footer}`
        return console.log(output)
    }
}
/**
 * function to print all the result of the user bills compared with the lotto extracion
 * @param {Array of Object} array of bills
 * @param {Object}  lotto objLotto is an object composed {city: [n1,n2,n3,n4,n5]}
 * @returns 
 */
const printResultBills = (bills,lotto) => {
    if(lotto!=undefined){
        const arrayOfbillsString = []
        bills.forEach(bill => {
            arrayOfbillsString.push(bill.printResult(lotto))
        });
        const output = `$\n${arrayOfbillsString.join('\n')}\n`
        return console.log(output)
    }
}

module.exports = {
    play,
    howManyBills, //-
    initializeUserBills, //-
    printBills, //-
    billsGenerator, //collect howManyBills,initalizeUserBills,pirntBills
    lottoExtraction, //-
    printLottoExtraction, //-
    printResultBills
}
