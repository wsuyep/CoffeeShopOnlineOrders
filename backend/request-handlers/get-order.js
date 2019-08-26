'use strict';

const getOrders = (request, dbHelper, cb) => {
    const {shopId, apiToken} = request;
    const findApiTokenSql = `SELECT * FROM shops WHERE shopId="${shopId}" AND api_token="${apiToken}"`;
    dbHelper.getRecords(findApiTokenSql,(rows)=>{
        if(rows && rows.length ===1){
            const sql = `SELECT * FROM orders WHERE shopId="${shopId}";`;
            dbHelper.getRecords(sql,cb);
        }else{
            cb('no records found',null);
        }
    });
};

module.exports = getOrders;