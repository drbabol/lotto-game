//global variable based on Lotto rules

const cities = ['Bari','Cagliari','Firenze','Genova','Milano','Napoli','Palermo','Roma','Torino','Venezia']
const typeOfBills = ['ambata','ambo','terno','quaterna','cinquina']
const objType = {'ambata':1,'ambo':2,'terno':3,'quaterna':4,'cinquina':5}

const prizeTable = () => {
    const objPrizeTableGross = {
        'ambata': { 
            1: 11.23,
            2: 5.61,
            3: 3.74,
            4: 2.80,
            5: 2.24,
            6: 1.87,
            7: 1.60,
            8: 1.40,
            9: 1.24,
            10: 1.12
        },
        'ambo': {   
            2: 250,
            3: 83.33,
            4: 41.66,
            5: 25,
            6: 16.66,
            7: 11.90,
            8: 8.92,
            9: 6.94,
            10: 5.55
        },
        'terno': {  
            3: 4500,
            4: 1125,
            5: 450,
            6: 225,
            7: 128.57,
            8: 80.35,
            9: 53.57,
            10: 37.50
        },
        'quaterna':{
            4: 120_000,
            5: 24_000,
            6: 8000,
            7: 3428.57,
            8: 1714.28,
            9: 952.38,
            10: 571.42
        },
        'cinquina':{
            5: 6_000_000,
            6: 1_000_000,
            7: 285_714.28,
            8: 107_142.85,
            9: 47_619.04,
            10: 23_809.52
        }
    }
    return objPrizeTableGross
}

module.exports = {
    cities,
    typeOfBills,
    objType,
    prizeTable, 
}