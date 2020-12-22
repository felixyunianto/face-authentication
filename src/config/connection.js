const mysql = require('mysql');

const { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;
console.log(process.env);

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE
});

db.connect((err) => {
    if(err) throw err;
    console.log("Connection is successful");
})

module.exports = db;