//package
const prompt = require('prompt-sync')();
/**
 * class to generate a bill object with the following structure: 
 * Bill{name: @{Number}, type: @{String}, numbers: @{String}, city: @{String}}
 * type: @{String} > one of 'ambata','ambo','terno','quaterna','cinquina'
 * numbers: n random numbers, n is defined by the user
 * city: one of > 'Bari','Cagliari','Firenze','Genova','Milano','Napoli','Palermo','Roma','Torino','Venezia'
 */
class Bill {
    constructor(billNumber,city,type,numbers){
        this.name = billNumber
        this.city = city
        this.type = type
        this.numbers = numbers
    }
    static selectCity(){
        const cities = ['Bari','Cagliari','Firenze','Genova','Milano','Napoli','Palermo','Roma','Torino','Venezia']
        let city = prompt(`Please enter a city for the bill: `,'')
        while (cities.includes(city)!=true){
            city = prompt(`Please enter a VALID city for the bill from the following list: ${cities.join(', ')}.`,'')
        }
        return city
    }
    static selectType(){
        const typeOfBills = ['ambata','ambo','terno','quaterna','cinquina']
        let type = prompt(`Please enter a type for the bill: `,'')
        while (typeOfBills.includes(type)!=true){
            type = prompt(`Please enter a VALID type for the bill from the following list: ${typeOfBills.join(', ')}. `,'')
        }
        return type
    }
    static selectQuantity(type){
        const objType = {'ambata':1,'ambo':2,'terno':3,'quaterna':4,'cinquina':5}
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
     * method to print one line bill parameters
     * @param {Number} maxBillNChar max number of characters in the column of "Bill n°"
     * @param {Number} maxCityCharmax number of characters in the column of "City"
     * @param {Number} maxTypeChar number of characters in the column of "Type"
     * @param {Number} maxNumbersChar number of characters in the column of "Numbers"
     * @returns {String} the single bill string in a nice template
     */
    print(maxBillNChar,maxCityChar,maxTypeChar,maxNumbersChar){

        const billNameString =`¦` + this.name.toString().padStart(maxBillNChar/2,' ') + `¦`.padStart((maxBillNChar/2)+1,' ')
        const cityNameString = this.city.toString().padStart(this.city.toString().length + 1,' ') + `¦`.padStart(maxCityChar-this.city.toString().length,' ')
        const typeNameString = this.type.toString().padStart(this.type.toString().length + 1,' ') + `¦`.padStart(maxTypeChar-this.type.toString().length,' ')
        const numbersNameString = this.numbers.toString().padStart(this.numbers.toString().length + 1,' ') + `¦`.padStart(maxNumbersChar-this.numbers.toString().length,' ')

        const totalString = billNameString + cityNameString + typeNameString + numbersNameString
        
        return totalString
    }
    /**
     * Method to check the win bill compared to a random total extraction 
     * @param {Object} totalExtraction is an object composed of cityName: [n1,n2,n3,n4,5] exe: {Roma: [4,5,22,56,76,90], ...} 
     * @returns {Boolean} True if the bill is a WIN bill otherwise false
     */
    checkWinBill(totalExtraction){
        const objType = {'ambata':1,'ambo':2,'terno':3,'quaterna':4,'cinquina':5}
        const thisTypeConverted = objType[this.type]
        const arrayNumbers =  this.numbers.split(',').map(n=>+n)
        const filterdArrayCommonNumbers =  totalExtraction[this.city].filter(number=>arrayNumbers.includes(number))
        if(filterdArrayCommonNumbers.length>=thisTypeConverted){return true}
        else return false
    }
}

module.exports = Bill