'use strict';

const getOrders = (request, dbHelper, cb) => {
    const sql = `SELECT * FROM shops;`;
    dbHelper.getRecords(sql,cb);
};

module.exports = getOrders;