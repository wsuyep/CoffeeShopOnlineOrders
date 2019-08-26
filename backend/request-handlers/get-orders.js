'use strict';

const getOrders = (request, dbHelper, cb) => {
    const {shopId, apiToken} = request;
    const findApiTokenSql = `SELECT * FROM shops WHERE shop_id="${shopId}" AND api_token="${apiToken}";`;
    dbHelper.getRecords(findApiTokenSql,(err,rows)=>{
        if(err){
            cb(err,null);
            return;
        };
        if(rows && rows.length ===1){
            const sql = `SELECT * FROM orders WHERE shop_id="${shopId}";`;
            dbHelper.getRecords(sql,cb);
        }else{
            cb('no records found',null);
        };
    });
};

module.exports = getOrders;