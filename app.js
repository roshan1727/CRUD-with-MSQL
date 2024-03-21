const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

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



// Routes
const routes = require("./server/routes/product");
app.use('/', routes);

// Start server
app.listen(port, () => {
    console.log(`Listening on port: http://localhost:${port}`);
});