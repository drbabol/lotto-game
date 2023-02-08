//package&import
const {billsGenerator,lottoExtracrionGenerator}  = require('./utils/utils-business-logic');


const game = async() => {

    //Bill generator
    const bills = await billsGenerator()
    console.log(bills)

    //Lotto extraction generator
    const extraction = await lottoExtracrionGenerator()
    console.log(extraction)

} 

game()











