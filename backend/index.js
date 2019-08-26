'use strict';

const requestHandlers = require('./request-handlers');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser());
const DbHelper = require('./helpers/db-helper');
let dbHelper = new DbHelper();

app.post('/register', function (req, res) {
    const body = req.body;
    requestHandlers.registerOwner(body, dbHelper, (err, data) => {
        if (err) {
            res.status(200).send('ERROR request can not be completed due to error: ' + err);
            return;
        };
        res.status(200).send('register request completed successfully, please keep the following data secret:\n\n' + JSON.stringify(data));
    });
});

app.post('/getOrders', function (req, res) {
    const body = req.body;
    requestHandlers.getOrders(body, dbHelper, (err, rows) => {
        if (err) {
            res.status(200).send('ERROR request can not be completed due to error: ' + err);
            return;
        }
        res.status(200).send(rows);
    });
});

app.post('/createOrder', function (req, res) {
    const body = req.body;
    requestHandlers.createOrder(body, dbHelper, (err,result) => {
        if (err) {
            res.status(200).send('ERROR request can not be completed due to error: ' + err);
            return;
        };
        res.status(200).send('order has been sent to coffee shop, orderId is: ' + result);
    });
});

app.post('/deleteOrder', function (req, res) {
    res.status(200).send('delete order');
});

app.listen(3000, () => {
    console.log('app listening at port 3000');
});
