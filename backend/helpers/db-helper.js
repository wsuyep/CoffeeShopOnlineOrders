'user strict';

const sqlite3 = require('sqlite3').verbose();

module.exports = class DbHelper {
    constructor() {
        this.connect();
    };

    connect() {
        this._db = new sqlite3.Database(':memory:', (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to in-memory SQlite database.');
        });
    }

    disconnect() {
        this._db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }
};
