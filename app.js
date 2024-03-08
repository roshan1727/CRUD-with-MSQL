const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise"); // Using mysql2/promise for async/await syntax
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Serve static files such as css, img, js files
app.use(express.static(__dirname + "/public"));

// Template engine setup
const handlebars = exphbs.create({
    extname: ".hbs"
});
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");

// MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Check database connection
pool.getConnection()
    .then(connection => {
        console.log("Database connection successful");
        connection.release(); // Release the connection
    })
    .catch(error => {
        console.error("Error connecting to database: ", error.message);
    });

// Routes
app.get("/", (req, res) => {
    res.render("home");
});

// Start server
app.listen(port, () => {
    console.log(`Listening on port: http://localhost:${port}`);
});