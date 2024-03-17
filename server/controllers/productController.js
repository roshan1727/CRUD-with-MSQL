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

exports.addproduct = async (req, res) => {
    res.render("addproduct");
}

exports.saveRecord = async (req, res) => {
    let rows; // Define rows variable here
    const {
        name,
        Price,
        Location
    } = req.body;
    try {
        const connection = await pool.getConnection();
        [rows, fields] = await connection.query("insert into product (NAME,price,location) values (?,?,?)", [name, Price, Location]);
        connection.release();
        console.log("Database query successful");
        res.render("addproduct", {
            msg: "User Details Added Success"
        });
    } catch (error) {
        console.error("Error executing query: ", error.message);
        res.render("addproduct", {
            msg: "Error adding user details"
        });
    }
}


exports.editProduct = async (req, res) => {
    let rows; // Define rows variable here
    let id = req.params.id;
    try {
        const connection = await pool.getConnection();
        [rows, fields] = await connection.query("SELECT * FROM product where id=?", [id]);
        connection.release();
        console.log("Database query successful");
    } catch (error) {
        console.error("Error executing query: ", error.message);
    }
    res.render("home", {
        rows
    });
    res.render("edProduct");
}
// exports.deleteProduct = async (req, res) => {
//     res.render("deletemsg");
// }