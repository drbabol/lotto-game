//package&import
const execute  = require('./utils/utils-business-logic');

// Lotto game
const game = async() => {

    //Bill generator
    const bills = await execute.billsGenerator()
    execute.printBills(bills)
    //Lotto extraction generator
    const lotto = execute.lottoExtraction(bills)
    execute.printLottoExtraction(lotto)
    
    //print win and loose bills
    execute.printResultBills(bills,lotto)

    //end-restart game
    return execute.play(game)
} 
game()







