const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

exports.view = async (req, res) => {
    let rows; // Define rows variable here
    try {
        const connection = await pool.getConnection();
        [rows, fields] = await connection.query("SELECT * FROM product");
        connection.release();
        console.log("Database query successful");
    } catch (error) {
        console.error("Error executing query: ", error.message);
    }
    res.render("home", {
        rows
    });
};