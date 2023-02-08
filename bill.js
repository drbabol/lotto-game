//package & import
const {currencyToNumber,numberToCurrency,nChooseK}  = require('./utils/utils-formatting-print');
const {cities,typeOfBills,objTypeOfBills,objPrizeTableGross,maxExtractedNum,minExtractedNum, maxPlayedNum}  = require('./utils/utils-global-variable');
const inquirer = require('inquirer');

/**
 * class to generate a bill object with the following structure: 
 * Bill{name: @{Number}, type: @{String}, numbers: @{String}, city: @{String}}
 * type: @{String} > one of 'ambata','ambo','terno','quaterna','cinquina'
 * numbers: n random numbers, n is defined by the user
 * city: one of > 'Bari','Cagliari','Firenze','Genova','Milano','Napoli','Palermo','Roma','Torino','Venezia'
 */
class Bill {
    constructor(id,numbers,typeAndBet,city){
        this.id = id // number
        this.numbers = numbers // list  of random numbers [n1,n2,..,n10]
        this.typeAndBet = typeAndBet // obj {type: bet, type2: bet2, ...}
        this.city = city //list of cities ['city1' ,'city2', ...]    
    }
    static async selectNumbers(id){
        console.log(`\nYou are selecting data for Bill number ${id}`)
        const numbersArry = new Set()
        const answer = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'number',
                message: 'Please enter the quanty of numbers to play (1-10)',
                validate: function(input) {
                    const number = parseInt(input);
                    if (number >= 1 && number <= 10 && (/\D+/).test(input)===false) {
                        return true;
                    }
                    return 'Please enter a integer number between 1 and 10';
                }
            }
        ])
        while (numbersArry.size!=answer.number){
                const randomNum = Math.floor(Math.random()*maxExtractedNum)+minExtractedNum
                numbersArry.add(randomNum)
            }
        return [...numbersArry].sort((a,b)=>{return a-b});
    }
    static async selectType(numbersPlayed){
        const objTypeBet = {}
        const minBet = 1
        let maxBet = 200
        let totalBet = 0
        const possibleTypeOfBills = typeOfBills.slice(0,numbersPlayed)
        let answerContinue = true
        let checkPossibleType = true
        
        while (answerContinue != false && checkPossibleType != false && maxBet!=0){ //
            const answer = await inquirer
            .prompt([
                {
                type: 'list',
                name: 'types',
                message: 'Please select types:',
                choices: possibleTypeOfBills.filter(type => !Object.keys(objTypeBet).includes(type))
                },
                {
                type: 'input',
                name: 'bet',
                message: 'Please bet on the selected type:',
                validate: function(input) {
                        const bet = parseFloat(input);
                        const floatRegex = /^[0-9]+(\.([5]0|[5]))?$/;
                        if (bet >= minBet && bet <= maxBet && floatRegex.test(input)===true) {
                            return true;
                        }
                        return `Please enter a integer number between 1 and ${maxBet} with possible step of 0.50€.\nYou can not bet more than 200€ for one Bill, already played ${totalBet}€`;
                    }
                },
                {
                type: 'confirm',
                name: 'continue',
                message: 'Do you want to add another type?',
                }
            ])

            objTypeBet[answer.types] =  parseFloat(answer.bet)

            if (answer.continue){answerContinue = true}else{answerContinue = false}
            if (possibleTypeOfBills.filter(type => !Object.keys(objTypeBet).includes(type)).length===0){checkPossibleType = false,console.log(`all the possible types have been played`)}

            totalBet = (Object.values(objTypeBet)).reduce((accumulator, currValue) => accumulator+currValue,0)
            maxBet = 200-totalBet              
            
        }
        return objTypeBet
    }
    static async selectCity(){
        const answers = await inquirer
        .prompt([
            {
            type: 'checkbox',
            name: 'cities',
            message: 'Please select cities:',
            choices: cities,
            validate: function(answer){
                if (answer.length>=1){
                    return true
                }else{
                    return `Please select at least 1 city`
                }
            }
            }
        ])
        if(answers.cities.includes('Tutte')){return cities.filter(city=>city!='Tutte')}
        return answers.cities
        
        // let city = prompt(`Please enter a city for the bill: `,'')
        // while (cities.includes(city)!=true){
        //     city = prompt(`Please enter a VALID city for the bill from the following list: ${cities.join(', ')}.`,'')
        // }
        // return city
    }
    /**
     * method to print one line bill parameters
     * @param {Number} maxBillNChar max number of characters in the column of "Bill n°"
     * @param {Number} maxCityCharmax number of characters in the column of "City"
     * @param {Number} maxTypeChar number of characters in the column of "Type"
     * @param {Number} maxNumbersChar number of characters in the column of "Numbers"
     * @returns {String} the single bill string in a nice template
     */// temp maxBillNChar,maxCityChar,maxTypeChar,maxNumbersChar,maxBetChar
    print(){

        const maxWidthPrint = 36
        const strongDelimitation = ''.padStart(maxWidthPrint+2,`~`)
        const delimitation = ''.padStart(maxWidthPrint+2,`-`)
        
        const idTitle = `<<<< ID BILL: ${this.id.toString()} >>>>`
        const billIdString = `¦${(idTitle.padStart((maxWidthPrint - idTitle.length + 1) / 2 + idTitle.length, ' ')).padEnd(maxWidthPrint,' ')}¦`;
        
        const numberTitle = this.numbers.join(',')
        const numbersString =`¦${(numberTitle.padStart((maxWidthPrint - numberTitle.length) / 2 + numberTitle.length, ' ')).padEnd(maxWidthPrint,' ')}¦`;
        
        const stringsTypeAndBet = []
        Object.keys(this.typeAndBet).forEach(type => {
            stringsTypeAndBet.push(`¦${(type.padStart(type.length+1, ' ')+(numberToCurrency(this.typeAndBet[type])).padStart(30-type.length, ' ')).padEnd(maxWidthPrint,' ')}¦`)
        });
        const typeAndBetString = stringsTypeAndBet.join('\n')

        const group3Cities = []
        for (let i = 0; i < this.city.length; i += 3) {
            group3Cities.push(`¦${(this.city.slice(i, i + 3).join(', ')).padStart(this.city.slice(i, i + 3).join(', ').length+1,' ').padEnd(maxWidthPrint,' ')}¦`);
        }
        const cityString = group3Cities.join(' \n')

        const totalBet = Object.values(this.typeAndBet).reduce((accumulator,currentValue) => accumulator+currentValue,0)
        const totalBetTitle = `Total bet`
        const totalBetString = `¦${(totalBetTitle.padStart(totalBetTitle.length+1,' ')+numberToCurrency(totalBet).padStart(30-totalBetTitle.length,' ')).padEnd(maxWidthPrint,' ')}¦`

        const totalString = `${strongDelimitation}\n${billIdString}\n${strongDelimitation}\n${numbersString}\n${delimitation}\n${typeAndBetString}\n${delimitation}\n${cityString}\n${delimitation}\n${totalBetString}\n${delimitation}`
        return totalString
    }
    /**
     * Method to check the win bill compared to a random total extraction 
     * @param {Object} totalExtraction is an object composed of cityName: [n1,n2,n3,n4,5] exe: {Roma: [4,5,22,56,76,90], ...} 
     * @returns {Object or Boolean} If not won return false else won exe obj: 
     * {Venezia:{numbers:[1,2,3,4],types:['Ambata','Quaterna'],prize: 120000},Bari:{numbers:[1,3],types:['Ambata'],prize: 22.46}}
     */
    checkWin(totalExtraction){
        const winningCityNum = {}
        //check for every city played if there is commons numbers
        this.city.forEach(city => {
            let winningBet = []
            let prize = []
            for (const bet in this.typeAndBet) { 
                const thisTypeConverted = objTypeOfBills[bet]
                const commonNumPerCity = totalExtraction[city].filter(num=>this.numbers.includes(num))
                if(commonNumPerCity.length>=thisTypeConverted){
                    winningBet.push(bet)
                    const typeValue = objTypeOfBills[bet]
                    const nCombination = nChooseK(commonNumPerCity.length,typeValue)//n choose k = n! to fine the n combination of an array
                    prize.push(objPrizeTableGross[bet][this.numbers.length]*nCombination)
                    winningCityNum[city]={'numbers':commonNumPerCity,'types':winningBet,'prize':Math.round(prize.reduce((acc,curr)=>acc+curr,0))}
                }
            }
        })
        if (Object.keys(winningCityNum).length === 0 && winningCityNum.constructor === Object) {
            return false
        }
        return winningCityNum
    }

    /**
     * method to calculate the gross prize. The calculation is made it considering the win of the bill 
     * @param {Object} grossTablePrize is an object of object where to find the gross value prize of the winning bill
     * @returns {String} 00.00 €
     */
    calculatePrize(winningCityNum){

        if (winningCityNum === false){return}

        for (const city in winningCityNum){
            city[types].forEach(type => {

            })
        }



        // const arrayNumbers =  this.numbers.split(',').map(n=>+n)
        // const grossPrize = grossTablePrize[this.type][arrayNumbers.length] * currencyToNumber(this.bet)
        // const formattedGrossPrize = numberToCurrency(grossPrize)
        // return formattedGrossPrize 
    }
}

// async function main() {
//     const selectNumbers = await Bill.selectNumbers()
//     const selectTypes = await Bill.selectType(selectNumbers.length)
//     const selectedCities = await Bill.selectCity();

//     const bill = new Bill(1,selectNumbers,selectTypes,selectedCities)
//     return bill
// }

// main().then(bill=> console.log(bill.print()))


// const billTest = new Bill(1,[1,2,3,4],{'Quaterna':1,'Ambo':1},['Roma','Venezia','Bari'])
// const exampleLotto = {'Roma': [2,3,4,7,1],'Venezia':[13,25,33,44,55],'Bari':[52,34,8,23,64]}

// console.log(billTest.checkWin(exampleLotto))


module.exports = Bill
