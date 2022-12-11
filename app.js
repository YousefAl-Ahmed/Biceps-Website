const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs")

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

//------------------register routes----------------------------
app.get("/register", async (req, res) => {
    res.render("register");
});


app.post("/", async (req, res) => {
    console.log(req.body);

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const weight = req.body.weight;
    const target_weight = req.body.target_weight;
    const height = req.body.height;
    const gender = req.body.gender;
    const level = req.body.level;
    const birth_date = req.body.birth_date;

    let hashedPassword = await bcrypt.hash(password, 8);
    
    const info = await auth.authUser(email, username)
    if (info === undefined){
        auth.addUser(email, username, hashedPassword, weight, target_weight, height, gender, level, birth_date)
    }
    res.render("logIn");
});



//log in routes
app.get("/logIn", async (req, res) => {
    res.render("logIn");
});

//workouts route
app.get("/body-parts", async (req, res) => {
    res.render("body-parts");
});

app.get("/body-parts/:muscle", async (req, res) => {
    const muscle = req.params.muscle;
    res.render("workouts", {workouts: await plans.showExercises(muscle)});
});


app.listen(3000);