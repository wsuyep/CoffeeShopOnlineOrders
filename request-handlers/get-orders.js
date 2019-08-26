'use strict';

/*
 * getOrders
 * returns all the available orders to coffee shops
 * @param - {Object} request, the object containing shopId and apiToken
 * @param - {Object} dbHelper, the db class instance used to communicate with db
 * @param - {function} cb, function that will be called after getting data from db
 * @throw  - nothing, errs will be handled by cb
 * @return - array of records will be returned to cb
 */
const getOrders = (request, dbHelper, cb) => {
    console.log('getOrder request received: ' + JSON.stringify(request));
    const {shopId, apiToken} = request;
    const findApiTokenSql = `SELECT * FROM shops WHERE shop_id="${shopId}" AND api_token="${apiToken}";`;
    dbHelper.getRecords(findApiTokenSql,(err,rows)=>{
        if(err){
            cb(err,null);
            return;
        };
        if(rows && rows.length ===1){
            const sql = `SELECT * FROM orders WHERE shop_name="${rows[0].shop_name}" AND status="created" ORDER BY pickup_time ASC;`;
            dbHelper.getRecords(sql,cb);
        }else{
            cb(`no records found for shopId: ${shopId}`,null);
        };
    });
};

module.exports = getOrders;