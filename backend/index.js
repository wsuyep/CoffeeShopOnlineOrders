'use strict';

const requestHandlers = require('./request-handlers');

const express = require('express');
const app = express();
 
app.post('/register', function (req, res) {
    requestHandlers.registerOwner(req);
    res.send('register request');
});

app.post('/getOrders', function (req, res) {
    res.send('get orders');
});

app.post('/createOrder', function (req, res) {
    res.send('create order');
});

app.post('/deleteOrder', function (req, res) {
    res.send('delete order');
});
 
app.listen(3000,()=>{
    console.log('app listening at port 3000');
});
