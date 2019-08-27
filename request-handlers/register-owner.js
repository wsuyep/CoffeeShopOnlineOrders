'use strict';

const uuid = require('uuid/v4');
const hat = require('hat');

/*
 * deleteOrder
 * update order status to be 'closed' by either owner, or customer
 * @param - {Object} body, the object containing { shopName, address, phone }
 * @param - {Object} dbHelper, the db class instance used to communicate with db
 * @param - {function} cb, function that will be called after getting data from db
 * @throw  - nothing, errs will be handled by cb
 * @return - {Object} { shopId, apiToken }
 */
const registerOwner = (body, dbHelper, cb) => {
    console.log('registerOwnder request received: ' + JSON.stringify(body));
    const { shopName, address, phone } = body;
    if (!(shopName && address && phone)) {
        cb('Missing parameters');
        return;
    }
    const shopId = uuid();
    const apiToken = hat();
    const shopLookupSql = `SELECT * FROM shops WHERE shop_name="${shopName}"`;
    dbHelper.getRecords(shopLookupSql, (err, rows) => {
        if (err) {
            cb(err, null);
            return;
        }
        if (rows && rows.length === 1) {
            cb('shop name is already registered', null);
            return;
        }
        const query = `INSERT INTO shops VALUES("${shopId}","${shopName}","${apiToken}","${phone}","${address}")`;
        dbHelper.updateTable(query, (err) => {
            if (err) {
                cb(err, null);
                return;
            }
            cb(null, { shopId, apiToken });
        });
    });
};

module.exports = registerOwner;