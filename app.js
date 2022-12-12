const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs")

const path = require('path');

//models
const auth = require('./models/auth');
const plans = require('./models/plans');
const { render } = require("ejs");

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
app.use(express.urlencoded({ extended: 'false' }));
app.use(express.json());




//routing 
app.get("/", async (req, res) => {
    res.render("index", {user: req.session.user});
});

//------------------register routes----------------------------
app.get("/register", async (req, res) => {
    res.render("register");
});




app.post("/auth", async (req, res) => {


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
    if (info === undefined) {
        await auth.addUser(email, username, hashedPassword, weight, target_weight, height, gender, level, birth_date);

        res.redirect("/logIn");
    }else res.render("register", {message: "not unique"})
});




//log in routes
app.get("/logIn", async (req, res) => {
    res.render("logIn");
});


app.post("/", async (req, res) => {
    const logedPassword = req.body.password.toString();
    const email = req.body.email;

    const info = await auth.authLogIn(email)

    if (info.email) {
        //validate password
        bcrypt.compare(logedPassword, info.password, async (err, result) => {
            if (result) {
                id = await auth.getUserID(email);

                req.session.authenticated = true;
                req.session.user = { id, email };
                res.render("index", { user: req.session.user });

            }

        })
    } else res.render("logIn", { message: 'Password is not correct' });

});


//workouts route
app.get("/body-parts", async (req, res) => {
    res.render("body-parts", {user: req.session.user});
});

app.get("/body-parts/:muscle", async (req, res) => {
    const muscle = req.params.muscle;
    res.render("workouts", { workouts: await plans.showExercises(muscle), user: req.session.user });
});

app.get("/body-parts/:muscle/:workout", async (req, res) => {
    // const muscle = req.params.muscle;
    const workout = req.params.workout;
    res.render("description", { workout: await plans.showWorkout(workout), user: req.session.user});
});
app.get("/plans-chooseDay" , async (req, res) => {
    res.render("plans-chooseDay");
});


app.get( "/addExcercise/:day", async (req, res) => {
    const day = req.params.day;
    res.render('addExcercise', {day: day});
});
app.get("/plans-chooseDay" , async (req, res) => {
    res.render("plans-chooseDay");
});


app.get( "/addExcercise/:day", async (req, res) => {
    const day = req.params.day;
    res.render('addExcercise', {day: day});
});


app.listen(3000);