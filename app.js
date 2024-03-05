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
app.use(express.static("/CRUD with MSQL/public"));


// Template Files [what is the use of this]
const handlebars = exphbs.create({
    extname: ".hbs"
});
app.engine('hbs', handlebars.engine);
app.set('view engine', "hbs");


// Routes
app.get("/", (req, res) => {
    res.render("home");
})



app.listen(port, () => {
    console.log(`Listing in the port no: http://localhost:${port}`);
});