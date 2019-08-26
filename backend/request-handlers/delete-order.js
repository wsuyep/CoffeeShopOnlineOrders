'use strict';

const deleteOrder = (body, dbHelper, cb) => {
    console.log('DeleteOrder request received: ' + JSON.stringify(body));
    const { orderId, apiToken } = body;
    const findOrderSql = `SELECT * FROM orders WHERE order_id="${orderId}"`;
    dbHelper.getRecords(findOrderSql, (err, rows) => {
        if (err) {
            cb(err);
            return;
        };
        if (rows && rows.length === 1) {
            //we found the record here
            if (apiToken) {
                const verifyShopSql = `SELECT * FROM shops WHERE api_token="${apiToken}" AND shop_name="${rows[0].shop_name}"`;
                dbHelper.getRecords(verifyShopSql, (err, records) => {
                    if (err) {
                        return cb(err);
                    };
                    if (records && records.length === 1) {
                        const deleteOrderSql = `UPDATE orders SET status="closed_by_shop" WHERE order_id="${orderId}"`;
                        dbHelper.updateTable(deleteOrderSql, (err) => {
                            if (err) {
                                return cb(err);
                            }
                            cb(null);
                        });
                    } else {
                        cb(`no records found for api_token: ${apiToken}`);
                    };
                });
            } else {
                const deleteOrderSql = `UPDATE orders SET status="closed_by_customer" WHERE order_id="${orderId}"`;
                dbHelper.updateTable(deleteOrderSql, (err) => {
                    if (err) {
                        cb(err);
                        return;
                    }
                    cb(null);
                });
            };
        } else {
            cb(`no records found for order_id: ${orderId}`);
        }
    });
};

module.exports = deleteOrder;