const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// use the static files such as css,img,js file
app.use(express.static('public'))


app.listen(port, () => {
    console.log("Listing in the port no: ", port);
});