const express = require("express");
const session = require("express-session");
const nunjucks= require("nunjucks");
const path = require('path');

//models
const auth = require('./models/auth');
const plans = require('./models/plans');

//express app
const app = express();

//view engine
app.set("view engine", "ejs");

//session
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

//middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({extended: 'false'}));
app.use(express.json());




//routing 
app.get("/", async (req, res) => {
    res.render("index");
});

//sign up routes
app.get("/register", async (req, res) => {
    res.render("register");
});

//log in routes
app.get("/logIn", async (req, res) => {
    res.render("logIn");
});


app.listen(3000);