'use strict';

const uuid = require('uuid/v4');
const hat = require('hat');

// requet conatin fields: shopName, address,phone
const registerOwner = (body, dbHelper) => {
    console.log('request received: ' + JSON.stringify(body));
    const{shopName, address, phone} = body;
    const shopId = uuid();
    const apiToken = hat();
    const query = `INSERT INTO shops VALUES("${shopId}","${shopName}","${apiToken}","${phone}","${address}")`;
    dbHelper.updateTable(query);
};

module.exports = registerOwner;