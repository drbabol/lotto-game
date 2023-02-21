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
- Now you can start to play: from the root folder, terminal ```npm start``` 

## Repository Structure
![image](https://user-images.githubusercontent.com/35449770/220069357-5a2e79fb-2ddb-496a-b537-659ff9264820.png)


### bill.js 
In this file, there is the class to create the the user bill, in particular you find the follow:
  - constructor 
      - id
      - numbers
      - type/s and bet/s
      - city/s
      - total bet
   - methods
      - select numbers (static)
      - select type/s and bet/s (static)
      - select city/s (static)
      - calculate the total bet
      - print bill
      - check win of the bill
      - print bill result (win or loose)
### business-logic
This file is in the utils folder and includes all the most relevant logics of the game.
  - function play to be able to restart the game.
  - function billsGenerator to create the bill of the user that contain:
      - function howManyBills to be able to input the number of bills the user want to play. The user is able to choose a number between 0-5, if the the input is 0 the game stop.
      - function initilizeBills to be able to inizialize the object with the class bill and user input.
  - function lottoExtraction create a random extraction for all the cities of the game. Every city has 5 numbers between 1 and 90.
  - function checkWintBill to check all the bills initialized and output the object from the class method, comparing with the lotto extraction 
  
  ### prints
  This file includes the function to print in a formatted way all the bills generated with the lotto extraction and the results.
  - function printBills to be able to print all the bills played in a presentable output.
  - function printLottoExtraction to print the extraction in a presentable output.
  - function printResultBills to print all the bills user result in a presentable output.

### functionals
This file includes some function that simplify the business logic code
  - function currencyToNumber to be able to transform a formatted number (string) to a number.
  - function numberToCurrency is the opposite of the above function and give a formatted string as an output (with €).
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
```npm start```

```? Please enter the number of Bills you want to play (1-5, 0 to exit)```

user choose 2

```
? Please enter the number of Bills you want to play (1-5, 0 to exit) 2

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

User choose "Tutte" (the list it's a loop)

```
? Please select cities: Tutte
```

Now start the selecting data for the second Bill

```
You are selecting data for Bill number 2
? Please enter the quanty of numbers to play (1-10)
```

user choose 5

```
? Please enter the quanty of numbers to play (1-10) 10
? Please select types: (Use arrow keys)
> Ambata
  Ambo
  Terno
  Quaterna
  Cinquina
```

User press on "Cinquina"

```
? Please select types: Cinquina
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

User choose "Roma" (the list it's a loop)

```
? Please select cities: Roma
```

Output:

![image](https://user-images.githubusercontent.com/35449770/220072821-cca73a62-af87-465a-90e8-395182a377b5.png)

![image](https://user-images.githubusercontent.com/35449770/220072904-166f0fd4-68a2-46ec-a82f-3f316843cb5d.png)

![image](https://user-images.githubusercontent.com/35449770/220073031-d291299f-dc1a-48ce-bba5-8ca8235fa255.png)


```? Do you want to play again? (Y/n)```

You can choose if you want to play again.

## Test
This are the results of the jest test implemented
![image](https://user-images.githubusercontent.com/35449770/220310124-faf07559-8e4c-4956-9e94-a1103be5a87b.png)
Note: the function that incorporate the library inquire are not tested.





