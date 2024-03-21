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
    res.render("edProduct", {
        rows
    });
    // res.render("edProduct");
}


// save and update the record
exports.edit = async (req, res) => {
    let rows, fields; // Define rows and fields variables here
    let id = req.params.id;
    const {
        name,
        Price,
        Location
    } = req.body;
    try {
        const connection = await pool.getConnection();
        [rows, fields] = await connection.query("update product SET NAME=?, price=?, location=? WHERE ID=?", [name, Price, Location, id]);
        connection.release();
        try {
            const connection = await pool.getConnection();
            [rows, fields] = await connection.query("SELECT * FROM product where id=?", [id]);
            connection.release();
            console.log("Database query successful");
        } catch (error) {
            console.error("Error executing query: ", error.message);
        }
        res.render("edProduct", {
            rows,
            msg: "User Details Updated Successfully"
        });
    } catch (error) {
        console.error("Error executing query: ", error.message);
        res.render("edProduct", {
            msg: "Error updating user details"
        });
    }
}


exports.delete = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        let id = req.params.id;
        await connection.query("DELETE FROM product WHERE ID=?", [id]);
        connection.release();
        console.log("Product deleted successfully");
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting product: ", error.message);
        res.render("home", {
            msg: "Error deleting product"
        });
    }
}