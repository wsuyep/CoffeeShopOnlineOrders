'user strict';

const sqlite3 = require('sqlite3').verbose();

module.exports = class DbHelper {
    constructor() {
        this._db_status = false;
        this.connect();
        this._createTables();
    };

    //connects to db
    connect() {
        if (this._db_connected) {
            console.log('Db already connected');
            return;
        }
        // since we are using in memory db, everytime server runs will be a new db
        this._db = new sqlite3.Database(':memory:', (err) => {
            if (err) {
                return console.error(err.message);
            }
            this._db_connected = true;
            console.log('Connected to in-memory SQlite database.');
        });
    };

    //disconnect from db
    disconnect() {
        if (!this._db_connected) return;
        this._db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            this._db_connected = false;
            console.log('Close the database connection.');
        });
    };

    //get current db connection status
    getDbStatus() {
        return this._db_status;
    };

    // create the two tables needed for the system
    _createTables() {
        const createShopsTablesSql = `
        CREATE TABLE shops(
            shop_id UUID NOT NULL, 
            shop_name TEXT UNIQUE NOT NULL, 
            api_token UUID NOT NULL UNIQUE,
            phone TEXT NOT NULL, 
            address TEXT NOT NULL
        );`;
        const createOrdersTableSql = `
        CREATE TABLE orders(
            order_id UUID NOT NULL, 
            shop_name TEXT NOT NULL,
            order_detail TEXT NOT NULL,
            customer_phone TEXT NOT NULL, 
            pickup_time DATETIME NOT NULL,
            status TEXT NOT NULL,
            FOREIGN KEY (
                shop_name
            )
            REFERENCES shops (shop_name)
        );`;
        this._db.serialize(() => {
            this._db.run(createShopsTablesSql);
            this._db.run(createOrdersTableSql);
        });
    };

    // updates tables
    // returns err if there is any
    updateTable(query, cb) {
        this._db.serialize(() => {
            var stmt = this._db.prepare(query);
            stmt.run();
            stmt.finalize((err) => {
                if (err) {
                    cb(err);
                    return;
                }
                cb(null);
            });
        });
    };

    // reads records from db
    // returns array of objects
    getRecords(query, cb) {
        this._db.all(query, (err, rows) => {
            if (err) {
                cb(err, null);
            }
            cb(null, rows);
        });
    }
};
