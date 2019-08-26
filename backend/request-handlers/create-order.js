'use strict';

const uuid = require('uuid/v4');

/*
 * createOrder
 * create a new order record and save it in db
 * @param - {Object} request, the object containing { shopName, orderDetail, customerPhone, pickupTime }
 * @param - {Object} dbHelper, the db class instance used to communicate with db
 * @param - {function} cb, function that will be called after getting data from db
 * @throw  - nothing, errs will be handled by cb
 * @return - nothing if successful
 */
const createOrder = (request, dbHelper, cb) => {
    console.log('createOrder request received: ' + JSON.stringify(request));
    const { shopName, orderDetail, customerPhone, pickupTime } = request;
    const findShopSql = `SELECT * FROM shops WHERE shop_name="${shopName}"`;
    dbHelper.getRecords(findShopSql, (err, rows) => {
        if (err) {
            cb(err, null);
            return;
        }
        if (rows && rows.length === 1) {
            const orderId = uuid();
            const sql = `INSERT INTO orders VALUES("${orderId}","${shopName}","${orderDetail}","${customerPhone}","${pickupTime}","created")`;
            dbHelper.updateTable(sql, (err) => {
                if (err) {
                    cb(err,null);
                    return;
                };
                cb(null,orderId);
            });
        } else {
            cb(`no records found for shopName: ${shopName}`);
        }
    });
};

module.exports = createOrder;