const mysql = require('mysql2/promise');
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees'
};

async function init(){
    const connection = await mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    await connection.query(`USE ${dbConfig.database}`);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS EmployeeExample(
            Employee_id INT AUTO_INCREMENT PRIMARY KEY,
            Name VARCHAR(255),
            Age INT, 
            Position VARCHAR(255)
        )
    `);
    await connection.end();
}
const pool = mysql.createPool(dbConfig);
module.exports = {init, pool};