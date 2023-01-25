const {Bill, howManyBills, initializeBills, printBills}  = require('./utils');

//const prompt = require('prompt-sync')();


describe('UnitTests', () => {
    test('howManyBills() returns 0 when the user enters 0', () => {
        const howManyBills = jest.fn().mockReturnValue(0);           
        expect(howManyBills()).toBe();
    });

});