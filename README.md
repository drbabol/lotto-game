# Italian lotto game

This is a software to simulate the Italian lotto game.

## How to play

Once the game start the user is able to choose how many bills (ticket) he want to play, with the maximum amount of 5.
For each bills he will choose the quantity of numbers to play, the type of bet he want to do with those numbers, the bet on the selected type and at the end select the cities rappresenting the wheels.
The numbers the user is playing are choosen **randomly**.

## Useful links

- [How to play lotto](https://www.sisal.it/lotto/come-si-gioca)
- [Extraction's example](https://www.servizitelevideo.rai.it/televideo/pub/pagina.jsp?p=786&s=0&r=Nazionale&idmenumain=0)
- [Prizes calculation](https://www.estrazionedellotto.it/prontuario-vincite-lotto)

## Requirement & installation process

- Node JS, if you do not have it, install from this link: https://nodejs.org/en/download/current/
- Download the game from Github > green button in the respository of the game, "Download ZIP"
- From the terminal ```npm install```, this will install all the dependencies of the project presents in the package.json
- Now you can start to play: from the root folder, terminal ```node src/index.js``` or enter the src folder ```cd src``` + ```node index.js```

## Repository Structure
![image](https://user-images.githubusercontent.com/35449770/218473525-faf60cab-b730-4afb-b385-9081e103a6d6.png)

### bill.js 
In this file, there is the class to create the the user bill, in particular you find the follow:
  - constructor 
      - id
      - numbers
      - type/s and bet/s
      - city/s
   - methods
      - select numbers (static)
      - select type/s and bet/s (static)
      - select city/s (static)
      - print bill
      - check win of the bill
      - print bill result (win or loose)
### business-logic
This file is in the utils folder and includes all the most relevant logics of the game.
  - function play to be able to restart the game.
  - function billsGenerator to create the bill of the user that contain:
      - function howManyBills to be able to input the number of bills the user want to play. The user is able to choose a number between 0-5, if the the input is 0 the game stop.
      - function initilizeBills to be able to inizialize the object with the calss bill and user input.
  - function lottoExtraction create a random extraction for all the cities of the game. Every city has 5 numbers between 1 and 90.
  - function printLottoExtraction to be able to print the extraction in a presentable output.
  - function printResultBills to be able to print all the bills user result in a presentable output.

### functionals
This file includes some function that simplify the business logic code
  - function currencyToNumber to be able to transform a formatted number (string) to a number.
  - function numberToCurrency is the opposite of the above function and give a formatted string as an output (with €).
  - function arrayCurrencytoNumber ha the same concept, but for all the element of the array.
  - function nChooeK to be able to have the number of combination of an array with n element and k element together.
  - function calculateNetPrize to be able to calculate the net prize of a bill considerting the lotto rules.

### global-variable
This file present the variable that are fixed with the ruels of the game
  - cities 
  - types
  - prizes

### index
This is the file to play the game! let's start!

## Example of game
```node src/index.js```

```? Please enter the number of Bills you want to play (1-5, 0 to exit)```

user choose 1

```
? Please enter the number of Bills you want to play (1-5, 0 to exit) 1

You are selecting data for Bill number 1
? Please enter the quanty of numbers to play (1-10)
```

user choose 10

```
? Please enter the quanty of numbers to play (1-10) 10
? Please select types: (Use arrow keys)
> Ambata
  Ambo
  Terno
  Quaterna
  Cinquina
```

User press on "Ambata"

```
? Please select types: Ambata
? Please bet on the selected type:
```

User choose 10

```
? Please bet on the selected type: 10
? Do you want to add another type? (Y/n)
```

User chooe No

```
? Please select cities: (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
>( ) Bari
 ( ) Cagliari
 ( ) Firenze
 ( ) Genova
 ( ) Milano
 ( ) Napoli
 ( ) Palermo
(Move up and down to reveal more choices)
```

User choose "Tutte" (the list it is loop)
Output:

``` 
┌───────────────────────────────────┐
│      ◇◇◇◇ ID BILL: #1 ◇◇◇◇    │
╞═══════════════════════════════════╡
│   11,13,15,22,42,44,52,58,72,79   │
│───────────────────────────────────│
│ Ambata                 10,00 €    │
│───────────────────────────────────│
│ Bari, Cagliari, Firenze           │
│ Genova, Milano, Napoli            │
│ Palermo, Roma, Torino             │
│ Venezia                           │
│───────────────────────────────────│
│ Total bet              10,00 €    │
└───────────────────────────────────┘

Extractions:
┌──────────┬────────────────┐
│ City     │ Numbers        │
├──────────┼────────────────┤
│ Bari     │ 47,54,75,85,87 │
│ Cagliari │ 18,32,43,53,69 │
│ Firenze  │ 14,27,59,66,76 │
│ Genova   │ 19,22,24,49,72 │
│ Milano   │ 6,23,31,63,74  │
│ Napoli   │ 33,40,45,46,86 │
│ Palermo  │ 13,42,48,52,61 │
│ Roma     │ 2,5,12,26,28   │
│ Torino   │ 8,65,68,81,88  │
│ Venezia  │ 25,29,30,50,51 │
│ Tutte    │                │
└──────────┴────────────────┘

$
┌───────────────────────────────────┐
│ BILL #1 WIN!                      │
╞═══════════════════════════════════╡
│ Genova WIN with:  ✔               │
│ Types   →  Ambata                 │
│ Numbers →  22, 72                 │
│ Prize   →  2,00 €                 │
│                                   │
│ Palermo WIN with:  ✔              │
│ Types   →  Ambata                 │
│ Numbers →  13, 42, 52             │
│ Prize   →  3,00 €                 │
│                                   │
│ Total prize = 5,00 €              │
└───────────────────────────────────┘
```

```? Do you want to play again? (Y/n)```

You can choose if you want to play again





