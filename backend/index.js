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
    try {
        requestHandlers.registerOwner(body, dbHelper);
    } catch (err) {
        res.send('ERROR request can not be completed due to error: ' + err);
    }
    res.send('register request completed successfully');
});

app.post('/getOrders', function (req, res) {
    const body = req.body;
    let results = [];
    try {
        requestHandlers.getOrders(body, dbHelper, (rows)=>{
            res.send(rows);
        });
    } catch (err) {
        res.send('ERROR request can not be completed due to error: ' + err);
    };
});

app.post('/createOrder', function (req, res) {
    res.send('create order');
});

app.post('/deleteOrder', function (req, res) {
    res.send('delete order');
});

app.listen(3000, () => {
    console.log('app listening at port 3000');
});
