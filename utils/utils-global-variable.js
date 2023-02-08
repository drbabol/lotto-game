//global variable based on Lotto rules
const cities = ['Bari','Cagliari','Firenze','Genova','Milano','Napoli','Palermo','Roma','Torino','Venezia', 'Tutte']
const typeOfBills = ['Ambata','Ambo','Terno','Quaterna','Cinquina']
const objTypeOfBills = {'Ambata':1,'Ambo':2,'Terno':3,'Quaterna':4,'Cinquina':5}

//possible numbers to be extracted are between 1 and 90
const maxExtractedNum = 90
const minExtractedNum = 1

//possible numbers to be played on one Bill
const maxPlayedNum = 10

const objPrizeTableGross = {
    'Ambata': { 
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
    'Ambo': {   
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
    'Terno': {  
        3: 4500,
        4: 1125,
        5: 450,
        6: 225,
        7: 128.57,
        8: 80.35,
        9: 53.57,
        10: 37.50
    },
    'Quaterna':{
        4: 120_000,
        5: 24_000,
        6: 8000,
        7: 3428.57,
        8: 1714.28,
        9: 952.38,
        10: 571.42
    },
    'Cinquina':{
        5: 6_000_000,
        6: 1_000_000,
        7: 285_714.28,
        8: 107_142.85,
        9: 47_619.04,
        10: 23_809.52
    }
}

module.exports = {
    cities,
    typeOfBills,
    objTypeOfBills,
    objPrizeTableGross, 
    maxExtractedNum,
    minExtractedNum,
    maxPlayedNum
}