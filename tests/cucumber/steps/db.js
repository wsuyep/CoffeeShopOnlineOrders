const { Given, When, Then, Before, After } = require('cucumber')
const expect = require('expect');
const requestHandlers = require('../../../request-handlers');
const DbHelper = require('../../../helpers/db-helper');
const handlerMapping = {
    'register': requestHandlers.registerOwner,
    'createOrder': requestHandlers.createOrder,
    'deleteOrder': requestHandlers.deleteOrder,
    'getOrders': requestHandlers.getOrders
};


Given('Database is connected', function () {
    if (!this.dbHelper) {
        this.dbHelper = new DbHelper();
    }
});

Given('A test shop is in the database', function (callback) {
    handlerMapping['register'](this.payload, this.dbHelper, (err, result) => {
        this.payload.shopId = result.shopId;
        this.payload.apiToken = result.apiToken;
        callback();
    });
});

Given('Customer does not have the shops apiToken', function (callback) {
    delete this.payload.apiToken;
    callback();
});

Given('An order is created in the database', function (callback) {
    handlerMapping['createOrder'](this.payload, this.dbHelper, (err, orderId) => {
        this.payload.orderId = orderId;
        callback();
    });
})

When(/^I send (?:a|another) valid (\w+) request$/i, function (input, callback) {
    handlerMapping[input](this.payload, this.dbHelper, (err, resp) => {
        if(err){
            this.error = err;
            this.testResult = false;
        }else{
            this.testResult = true;
        }
        this.response = resp;
        callback();
    })
})

When('I send an invalid {word} request', function (input, callback) {
    this.payload = {};
    handlerMapping[input](this.payload, this.dbHelper, (err, resp) => {
        if(err){
            this.error = err;
            this.testResult = false;
        }else{
            this.testResult = true;
        }
        this.response = resp;
        callback();
    })
})

Then('I get a successful response', function () {
    expect(this.testResult).toEqual(true);
})

Then('The result has exactly {int} record', function (input, callback) {
    this.response.length === input;
    callback();
});

Then('I get an error response with message: {string}',function(input){
    expect(this.testResult).toEqual(false);
    expect(this.error.includes(input)).toEqual(true);
});