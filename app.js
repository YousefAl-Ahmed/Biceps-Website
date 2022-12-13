const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs")

const path = require('path');

//models
const auth = require('./models/auth');
const plans = require('./models/plans');
const { render } = require("ejs");
const { resolveSoa } = require("dns");

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
    res.render("index", { user: req.session.user });
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
    const birth_date = req.body.date


    let hashedPassword = await bcrypt.hash(password, 8);

    const info = await auth.authUser(email, username)
    if (info === undefined) {
        await auth.addUser(email, username, hashedPassword, weight, target_weight, height, gender, level, birth_date);

        res.redirect("/logIn");
    } else res.render("register", { message: "not unique" })
});




//log in routes
app.get("/logIn", async (req, res) => {
    res.render("logIn");
});


app.post("/", async (req, res) => {
    const logedPassword = req.body.password.toString();
    const email = req.body.email;

    const info = await auth.authLogIn(email)

    if (typeof info === "undefined"){
        res.render("logIn", { message: 'Password is not correct' });
    }

    else if (info.email) {
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
    res.render("body-parts", { user: req.session.user });
});

app.get("/body-parts/:muscle", async (req, res) => {
    const muscle = req.params.muscle;
    res.render("workouts", { workouts: await plans.showExercises(muscle), user: req.session.user });
});

app.get("/body-parts/:muscle/:workout", async (req, res) => {
    // const muscle = req.params.muscle;
    const workout = req.params.workout;
    res.render("description", { workout: await plans.showWorkout(workout), user: req.session.user });
});


//plans route
app.get("/plans", async (req, res) => {
    const id = req.session.user.id.user_id;
    res.render("plans", { plans: await plans.getUserPlans(id), user: req.session.user });
});


app.get("/plans/:name/:id", async (req, res) => {
    const name = req.params.name;
    const plan_id = req.params.id;

    res.render("plans-chooseDay", { name: name, plan_id: plan_id, user: req.session.user });
});

app.post("/plans-chooseDay", async (req, res) => {
    const name = req.body.planNameValue;
    const id = req.session.user.id.user_id;


    // plans.createPlan(id, name);
    const meta = await plans.createPlan(id, name)
    const plan_id = meta.lastID;

    res.redirect(`/plans/${name}/${plan_id}`)
    // res.render("plans-chooseDay", {name: name, plan_id: plan_id, user: req.session.user});
});


app.get("/plans/:name/:id/:day", async (req, res) => {
    const info = req.params;

    const execrices = await plans.getPlanExercises(info.id, info.day)

    const chestExecrices = await plans.showExercises("chest");
    const backExecrices = await plans.showExercises("back");
    const bicepsExecrices = await plans.showExercises("biceps");
    const tricepsExecrices = await plans.showExercises("triceps");
    const forearmsExecrices = await plans.showExercises("forearms");
    const shoulderExecrices = await plans.showExercises("shoulder");
    const absExecrices = await plans.showExercises("abs");
    const legsExecrices = await plans.showExercises("legs");

    const allExecrices = [chestExecrices, backExecrices, bicepsExecrices, tricepsExecrices, forearmsExecrices, shoulderExecrices, absExecrices, legsExecrices];

    res.render('addExcercise', { execrices: execrices, allExecrices: allExecrices, day: info.day, plan_id: info.id, name: info.name, user: req.session.user });
});


app.post("/plans/:name/:id/:day", async (req, res) => {

    const selectedArray = req.body;
    const user_id = req.session.user.id.user_id;
    const info = req.params;


    await selectedArray.forEach(async exercise_id => {
        await plans.addExerciseToPlan(user_id, info.id, info.day, exercise_id);

    });

    const execrices = await plans.getPlanExercises(info.id, info.day)
    // console.log(execrices)

    const chestExecrices = await plans.showExercises("chest");
    const backExecrices = await plans.showExercises("back");
    const bicepsExecrices = await plans.showExercises("biceps");
    const tricepsExecrices = await plans.showExercises("triceps");
    const forearmsExecrices = await plans.showExercises("forearms");
    const shoulderExecrices = await plans.showExercises("shoulder");
    const absExecrices = await plans.showExercises("abs");
    const legsExecrices = await plans.showExercises("legs");

    const allExecrices = [chestExecrices, backExecrices, bicepsExecrices, tricepsExecrices, forearmsExecrices, shoulderExecrices, absExecrices, legsExecrices];


    res.redirect(req.get('referer'));
})


//profile routes
app.get("/profile/:id", async (req, res) => {

    const user_id = req.params.id;
    const userInfo = await auth.getUserNutritions(user_id);
    // res.json(userInfo);


    //calculate BMI and daily Protien
    const heightInMeters = userInfo.height * 0.01;
    const BMI = (userInfo.weight / (heightInMeters * heightInMeters)).toFixed(2);
    const protien = userInfo.weight * 1.5;
    let calories;



    let birthDate = new Date(userInfo.birth_date);

    //calculate month difference from current date in time  
    const age = Math.floor((new Date() - new Date(birthDate)) / 31557600000)

    //daily calories
    if (userInfo.gender === "male")
        calories = 66.47 + (13.75 * userInfo.weight) + (5.003 * userInfo.height) - (6.755 * age) + 200;
    else
        calories = 655.1 + (9.563 * userInfo.weight) + (1.850 * userInfo.height) - (4.675 * age) + 200;

    const nutritions = { BMI, protien, calories };

    res.render("profile", { userInfo: userInfo, age: age, nutritions: nutritions, user: req.session.user });
});


app.post("/profile/:id", async (req, res) => {

    const data = req.body;

    for (const key in data) {
        try {
            if (data[key] && (key == 'username' || key == "level"))
                await auth.updateString(req.params.id, key, data[key])
            else if (data[key])
                await auth.update(req.params.id, key, data[key])
        } catch (error) { 
            return res.json(0)
        }
    }

    res.json(1);

})

app.get("/profile/:id/update", async (req, res) => {

    const user_id = req.params.id;
    const userInfo = await auth.getUserNutritions(user_id);
    res.json(userInfo);
})


//log out
app.get("/log-out", async (req, res) => {
    req.session.destroy();
    res.render("index");
})




app.listen(3000);