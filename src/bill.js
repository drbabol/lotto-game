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
    static selectQuantity(){
        const minNum = 1
        const maxNum = 10
        let quantity = +parseInt(prompt('Please enter the number of numbers you want to play between 1 and 10: ',0))
        while((quantity<minNum || quantity>maxNum) || isNaN(quantity)){
            quantity = +parseInt(prompt('Please enter a number between 1 and 10: ',0))
        }
        return quantity
    }
    static selectNumbers(){
        const maxNum = 90
        let numExtraction = this.selectQuantity()
        const numbersArry = new Set() //unique values

        while (numExtraction!=0){
            const randomNum = Math.floor(Math.random()*maxNum)+1
            numbersArry.add(randomNum)
            numExtraction--
        }
        return [...numbersArry].join(',')
    }
    /**
     * method to print bills
     * @param {Array of Object} bills 
     * @returns {String} console.log the final result in a nice template
     */
    static printBill(bills){
        if(bills === undefined){return  `Please restart the software and select the number of bills you want to play.`}

        //max number of characters consider in the print in each sections
        const maxBillNChar = 12 
        const maxCityChar = 10
        const maxTypeChar = 10
        const maxNumbersChar = 31
    
        const header = `
+------------+----------+----------+-------------------------------+
¦   Bill n°  ¦   City   ¦   Type   ¦            Numbers            ¦
+------------+----------+----------+-------------------------------+`
        const footer = `+------------+----------+----------+-------------------------------+`
    
        const arrayOfString = []
        bills.forEach(bill => {
    
            const billNameString =`¦` + bill['name'].toString().padStart(maxBillNChar/2,' ') + `¦`.padStart((maxBillNChar/2)+1,' ')
            const cityNameString = bill['city'].toString().padStart(bill['city'].toString().length + 1,' ') + `¦`.padStart(maxCityChar-bill['city'].toString().length,' ')
            const typeNameString = bill['type'].toString().padStart(bill['type'].toString().length + 1,' ') + `¦`.padStart(maxTypeChar-bill['type'].toString().length,' ')
            const numbersNameString = bill['numbers'].toString().padStart(bill['numbers'].toString().length + 1,' ') + `¦`.padStart(maxNumbersChar-bill['numbers'].toString().length,' ')
    
            const totalString = billNameString + cityNameString + typeNameString + numbersNameString
            arrayOfString.push(`${totalString}`)
        });
        const output = `${header}\n${arrayOfString.join('\n')}\n${footer}`
        return output
    }
}

module.exports = Bill