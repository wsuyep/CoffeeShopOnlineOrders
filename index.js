'use strict';

const requestHandlers = require('./request-handlers');
const config = require('./config');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser());
const DbHelper = require('./helpers/db-helper');
let dbHelper = new DbHelper();

//endpoint for shopOwners to register their shops
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

//endpoint for shops to fetch all available orders from their customers
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

//endpoint for customers to create orders for shops
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

//endpoint for BOTH customers and shops to close orders
app.post('/deleteOrder', function (req, res) {
    const body = req.body;
    requestHandlers.deleteOrder(body, dbHelper, (err) => {
        if (err) {
            res.status(200).send('ERROR request can not be completed due to error: ' + err);
            return;
        };
        res.status(200).send('order is successfully closed');
    });
});

app.listen(config.port, () => {
    console.log(`app listening at port ${config.port}`);
});
