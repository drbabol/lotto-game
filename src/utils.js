////package &import
const {cities}  = require('./utils-global-variable');
const Bill  = require('./bill');
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
 * func to initializate the bills exe: [{1,'Roma','ambata',[1,2,3,4,5],10.00€},{...}]
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
            const numbers = Bill.selectNumbers(type)
            const bet = Bill.selectBet()
            billsWithContent.push(new Bill(name,city,type,numbers,bet))
        }
        return billsWithContent
    }
}

/**
 * function to create a random object of the extraction of all the cities
 * @returns {Object} objCity is an object composed {city: [n1,n2,n3,n4,n5]}
 */
const lottoExtraction = () => {

    const extractedNumbers = new Set() //set of all the numbers for all the cities
    //const cities = ['Bari','Cagliari','Firenze','Genova','Milano','Napoli','Palermo','Roma','Torino','Venezia']
    let startIndexArray = 0
    const numberExtractedForCity = 5
    const totalNumberExtracted = numberExtractedForCity * cities.length //50
    const maxNum = 90
    const objCity = {}

    while (extractedNumbers.size!=totalNumberExtracted){
        const randomNumber = Math.floor(Math.random()*maxNum)+1
        extractedNumbers.add(randomNumber)
    }
    const arrayExtractedNumbers = [...extractedNumbers]
    
    cities.forEach(city => {
        objCity[city] = arrayExtractedNumbers.slice(startIndexArray,startIndexArray+numberExtractedForCity)
        objCity[city].sort((a,b)=>{return a-b})
        startIndexArray += 5
    })
    return objCity
}



const calculateNetPrize = (grossPrize) => {
    let netPrize = 0
    grossPrize > 500 ? netPrize += (grossPrize- (grossPrize*(8/100))) : netPrize=grossPrize
    const formattedNetPrize = (netPrize).toLocaleString('it-IT', {style: 'currency', currency: 'EUR'})
    return formattedNetPrize
}


module.exports = {
    howManyBills, 
    initializeUserBills, 
    lottoExtraction, 
    calculateNetPrize,
}