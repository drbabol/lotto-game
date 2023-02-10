//package & import
const {currencyToNumber,numberToCurrency,nChooseK,calculateNetPrize}  = require('../utils/functionals');
const {cities,typeOfBills,objTypeOfBills,objPrizeTableGross,maxExtractedNum,minExtractedNum, maxPlayedNum, minPlayedNum}  = require('../utils/global-variable');
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
    /**
     * select the quantity of numbers to play
     * @param {Number} id the reference of the number of the bill the user is playing
     * @returns {Array} list  of random numbers [n1,n2,..,n10]
     */
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
                    if (number >= minPlayedNum && number <= maxPlayedNum && (/\D+/).test(input)===false) {
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
    /**
     * select the type the user want to play and hoe much want to bet on it
     * @param {Number} numbersPlayed the length of the random numbers played 
     * @returns {Object} obj {type: bet, type2: bet2, ...}
     */
    static async selectType(numbersPlayed){
        const objTypeBet = {}
        const minBet = 1
        let maxBet = 200
        let totalBet = 0
        const possibleTypeOfBills = typeOfBills.slice(0,numbersPlayed)
        let answerContinue = true
        let checkPossibleType = true
        
        while (answerContinue!=false && checkPossibleType!=false && maxBet!=0){ //
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
                message: 'Do you want to add another type?'
                }
            ])

            objTypeBet[answer.types] =  parseFloat(answer.bet)

            if (answer.continue){answerContinue = true}else{answerContinue = false}
            if (possibleTypeOfBills.filter(type => !Object.keys(objTypeBet).includes(type)).length===0){
                checkPossibleType = false
                console.log(`all the possible types have been played`)
            }

            totalBet = (Object.values(objTypeBet)).reduce((accumulator, currValue) => accumulator+currValue,0)
            maxBet = 200-totalBet              
            
        }
        return objTypeBet
    }
    /**
     * select the city/cities the user want to play
     * @returns {Array} list of cities [city1, city2,...]
     */
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
        if(answers.cities.includes('Tutte')){
            const allcities =  cities.filter(city=>city!='Tutte')
            return allcities
        }
        return answers.cities
    }
    /**
     * method to print one line bill parameters
     * @returns {String} the single bill string in a nice template
     */// temp maxBillNChar,maxCityChar,maxTypeChar,maxNumbersChar,maxBetChar
    printBill(){

        const maxWidthPrint = 36
        const strongDelimitation = `╞${'╡'.padStart(maxWidthPrint,`═`)}`
        const delimitation = `│${'│'.padStart(maxWidthPrint,`─`)}`
        const header = `┌${'┐'.padStart(maxWidthPrint,`─`)}`
        const footer = `└${'┘'.padStart(maxWidthPrint,`─`)}`
        
        const idTitle = `◇◇◇◇ ID BILL: #${this.id.toString()} ◇◇◇◇`
        const billIdString = `│${(idTitle.padStart((maxWidthPrint - idTitle.length) / 2 + idTitle.length-1,' ')).padEnd(maxWidthPrint-1,' ')}│`;
        
        const numberTitle = this.numbers.join(',')
        const numbersString =`│${(numberTitle.padStart((maxWidthPrint - numberTitle.length) / 2 + numberTitle.length, ' ')).padEnd(maxWidthPrint-1,' ')}│`;
        
        const stringsTypeAndBet = []
        Object.keys(this.typeAndBet).forEach(type => {
            stringsTypeAndBet.push(`│${(type.padStart(type.length+1, ' ')+(numberToCurrency(this.typeAndBet[type])).padStart(30-type.length, ' ')).padEnd(maxWidthPrint-1,' ')}│`)
        });
        const typeAndBetString = stringsTypeAndBet.join('\n')

        const group3Cities = []
        for (let i = 0; i < this.city.length; i += 3) {
            group3Cities.push(`│${(this.city.slice(i, i + 3).join(', ')).padStart(this.city.slice(i, i + 3).join(', ').length+1,' ').padEnd(maxWidthPrint-1,' ')}│`);
        }
        const cityString = group3Cities.join(' \n')

        const totalBet = Object.values(this.typeAndBet).reduce((accumulator,currentValue) => accumulator+currentValue,0)
        const totalBetTitle = `Total bet`
        const totalBetString = `│${(totalBetTitle.padStart(totalBetTitle.length+1,' ')+numberToCurrency(totalBet).padStart(30-totalBetTitle.length,' ')).padEnd(maxWidthPrint-1,' ')}│`

        const totalString = `${header}\n${billIdString}\n${strongDelimitation}\n${numbersString}\n${delimitation}\n${typeAndBetString}\n${delimitation}\n${cityString}\n${delimitation}\n${totalBetString}\n${footer}`
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
    printResult(totalExtraction){
        const winnBill = this.checkWin(totalExtraction)
        let width = 36

        if (winnBill === false){
            const output = `${'┌'.padEnd(width,'─')}┐\n${`│ Bill #${this.id} did not win... ✘`.padEnd(width,' ')}│\n${'└'.padEnd(width,'─')}┘`
            return output
        }else{
            const citisPrint = []
            for (const city in winnBill){

                if(winnBill[city]['types'].join(', ').length + 12 > 36){width = winnBill[city]['types'].join(', ').length + 14 }
                
                const emptyLine = `${'│'.padEnd(width,' ')}│`
                citisPrint.push(`${(`│ ${city} WIN with:  ✔`).padEnd(width,' ')}│\n${(`${`│ Types`.padEnd(10,' ')}→  ${winnBill[city]['types'].join(', ')}`).padEnd(width,' ')}│\n${(`│ Numbers →  ${winnBill[city]['numbers'].join(', ')} `).padEnd(width,' ')}│\n${(`${`│ Prize`.padEnd(10,' ')}→  ${numberToCurrency(winnBill[city]['prize'])} `).padEnd(width,' ')}│\n${emptyLine}`)
            }
            const totalPrize = numberToCurrency(Object.values(winnBill).reduce((acc,curr)=>acc + curr['prize'],0))
            const totalNetPrize = calculateNetPrize(currencyToNumber(totalPrize))

            if (totalPrize===totalNetPrize){
                const output = `${'┌'.padEnd(width,'─')}┐\n${(`│ BILL #${this.id.toString()} WIN!`).padEnd(width,' ')}│\n${'╞'.padEnd(width,'═')}╡\n${citisPrint.join(`\n`)}\n${`│ Total prize = ${totalPrize}`.padEnd(width,' ')}│\n${'└'.padEnd(width,'─')}┘`
                return output
            }else{
                const output = `${'┌'.padEnd(width,'─')}┐\n${(`│ BILL #${this.id.toString()} WIN!`).padEnd(width,' ')}│\n${'╞'.padEnd(width,'═')}╡\n${citisPrint.join(`\n`)}\n${`│ Total prize -8% = ${totalNetPrize}`.padEnd(width,' ')}│\n${'└'.padEnd(width,'─')}┘`
                return output
            }
        }
    }
}

module.exports = Bill
