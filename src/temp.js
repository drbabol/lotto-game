//class lotto wheels
// class LottoWheels {
//     constructor(cityName){
//         //arguments
//         if (this.#validationCityName(cityName) === false){
//             throw new Error(`the city name choosen is not valid please chouse one from the valid list`)
//         }
//         this.name = cityName
//     }
//     //methods
//     #validationCityName(cityName){
//         const validCityNames = ['Bari','Cagliari','Firenze','Genova','Milano','Napoli','Palermo','Roma','Torino','Venezia']
//         return validCityNames.includes(cityName)
//     }
//     extractedNumberArray(){
//         const minNum = 1
//         const maxNum = 90
//         let numEtraction = 5
//         const numbersArry = new Set() //unique values

//         while (numEtraction!=0 && numbersArry.size != 6 ){
//             const randomNum = Math.floor(Math.random()*maxNum)+1
//             numbersArry.add(randomNum)
//             numEtraction--
//         }
//         return numbersArry
//     }
//     extractedNumberCityString(){return `${this.name} ${[...this.extractedNumberArray()].join(',')}`}

// }