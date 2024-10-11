const mysql = require('mysql2/promise');
const dbConfig = {
   host: process.env.DB_HOST, // Sử dụng biến môi trường
    user: process.env.DB_USER, // Sử dụng biến môi trường
    password: process.env.DB_PASSWORD, // Sử dụng biến môi trường
    database: process.env.DB_NAME, // Sử dụng biến môi trường
    port: process.env.DB_PORT ||  5432// Sử dụng biến môi trường hoặc mặc định là 3306
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