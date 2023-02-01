//package & import
const {currencyToNumber,numberToCurrency}  = require('./utils-formatting');
const {cities,typeOfBills,objType}  = require('./utils-global-variable');
const prompt = require('prompt-sync')();

/**
 * class to generate a bill object with the following structure: 
 * Bill{name: @{Number}, type: @{String}, numbers: @{String}, city: @{String}}
 * type: @{String} > one of 'ambata','ambo','terno','quaterna','cinquina'
 * numbers: n random numbers, n is defined by the user
 * city: one of > 'Bari','Cagliari','Firenze','Genova','Milano','Napoli','Palermo','Roma','Torino','Venezia'
 */
class Bill {
    constructor(billNumber,city,type,numbers,bet){
        this.name = billNumber
        this.city = city
        this.type = type
        this.numbers = numbers
        this.bet = bet
    }
    static selectCity(){
        //const cities = ['Bari','Cagliari','Firenze','Genova','Milano','Napoli','Palermo','Roma','Torino','Venezia']
        let city = prompt(`Please enter a city for the bill: `,'')
        while (cities.includes(city)!=true){
            city = prompt(`Please enter a VALID city for the bill from the following list: ${cities.join(', ')}.`,'')
        }
        return city
    }
    static selectType(){
        //const typeOfBills = ['ambata','ambo','terno','quaterna','cinquina']
        let type = prompt(`Please enter a type for the bill: `,'')
        while (typeOfBills.includes(type)!=true){
            type = prompt(`Please enter a VALID type for the bill from the following list: ${typeOfBills.join(', ')}. `,'')
        }
        return type
    }
    static selectQuantity(type){
        //const objType = {'ambata':1,'ambo':2,'terno':3,'quaterna':4,'cinquina':5}
        const minNum = objType[type]
        const maxNum = 10
        let quantity = +parseInt(prompt('Please enter the number of numbers you want to play between 1 and 10: ',0))
        while(quantity<minNum || quantity>maxNum || isNaN(quantity)){
            quantity = +parseInt(prompt(`Please enter a number between ${minNum} and 10: `,0))
        }
        return quantity
    }
    static selectNumbers(type){
        const maxNum = 90
        let numExtraction = this.selectQuantity(type)
        const numbersArry = new Set() //unique values
    
        while (numbersArry.size!=numExtraction){
            const randomNum = Math.floor(Math.random()*maxNum)+1
            numbersArry.add(randomNum)
        }
        return [...numbersArry].sort((a,b)=>{return a-b}).join(',')
    }
    /**
     * method to ask the bet of the bill
     * @return {String} 00.00 €
     */
    static selectBet(){
        let bet = +parseFloat(prompt('Please enter the bet in € you want to make for this Bill: ',0.00))
        while(isNaN(bet) || bet<0){
            bet = +parseFloat(prompt(`Please enter a valide € value: `,0.00))
        }
        const formattedBetToCurrency = numberToCurrency(bet)
        return formattedBetToCurrency
    }
    /**
     * method to print one line bill parameters
     * @param {Number} maxBillNChar max number of characters in the column of "Bill n°"
     * @param {Number} maxCityCharmax number of characters in the column of "City"
     * @param {Number} maxTypeChar number of characters in the column of "Type"
     * @param {Number} maxNumbersChar number of characters in the column of "Numbers"
     * @returns {String} the single bill string in a nice template
     */
    print(maxBillNChar,maxCityChar,maxTypeChar,maxNumbersChar,maxBetChar){

        const billNameString =`¦` + this.name.toString().padStart(maxBillNChar/2,' ') + `¦`.padStart((maxBillNChar/2)+1,' ')
        const cityNameString = this.city.toString().padStart(this.city.toString().length + 1,' ') + `¦`.padStart(maxCityChar-this.city.toString().length,' ')
        const typeNameString = this.type.toString().padStart(this.type.toString().length + 1,' ') + `¦`.padStart(maxTypeChar-this.type.toString().length,' ')
        const numbersNameString = this.numbers.toString().padStart(this.numbers.toString().length + 1,' ') + `¦`.padStart(maxNumbersChar-this.numbers.toString().length,' ')
        const betNameString = this.bet.toString().padStart(this.bet.toString().length + 1,' ') + `¦`.padStart(maxBetChar-this.bet.toString().length,' ')

        const totalString = billNameString + cityNameString + typeNameString + numbersNameString + betNameString
        
        return totalString
    }
    /**
     * Method to check the win bill compared to a random total extraction 
     * @param {Object} totalExtraction is an object composed of cityName: [n1,n2,n3,n4,5] exe: {Roma: [4,5,22,56,76,90], ...} 
     * @returns {Boolean} True if the bill is a WIN bill otherwise false
     */
    checkWinBill(totalExtraction){
        //const objType = {'ambata':1,'ambo':2,'terno':3,'quaterna':4,'cinquina':5}
        const thisTypeConverted = objType[this.type]
        const arrayNumbers =  this.numbers.split(',').map(n=>+n)
        const filterdArrayCommonNumbers =  totalExtraction[this.city].filter(number=>arrayNumbers.includes(number))
        if(filterdArrayCommonNumbers.length>=thisTypeConverted){return true}
        else return false
    }
    /**
     * method to calculate the gross prize. The calculation is made it considering the win of the bill 
     * @param {Object} grossTablePrize is an object of object where to find the gross value prize of the winning bill
     * @returns {String} 00.00 €
     */
    calculatePrize(grossTablePrize){
        const arrayNumbers =  this.numbers.split(',').map(n=>+n)
        const grossPrize = grossTablePrize[this.type][arrayNumbers.length] * currencyToNumber(this.bet)
        const formattedGrossPrize = numberToCurrency(grossPrize)
        return formattedGrossPrize 
    }
}

module.exports = Bill