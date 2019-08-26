'use strict';

const uuid = require('uuid/v4');

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