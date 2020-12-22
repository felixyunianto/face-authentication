require("dotenv").config();
const express = require('express')
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const mainRouter = require('./src/routes/index');
const app = express();
const port = 8080;

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(cors())

app.use('/', mainRouter);

