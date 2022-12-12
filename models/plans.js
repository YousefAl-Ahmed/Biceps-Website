const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')



const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'albayat.db',
        driver: sqlite3.Database
    })
}


const showExercises = async (muscle) => {
    const db = await getDbConnection();
    const exercises = await db.all(`SELECT * FROM exercices WHERE muscle = '${muscle}'`);
    await db.close();
    return exercises;
}
const showWorkout = async (workout) => {
    const db = await getDbConnection();
    const exercises = await db.all(`SELECT * FROM exercices WHERE name = '${workout}'`);
    await db.close();
    return exercises;
}
const getUserPlans = async (user_id) => {
    const db = await getDbConnection();
    const exercises = await db.all(`SELECT * FROM plan WHERE user_id = ${user_id}`);
    await db.close();
    return exercises;
}

//getExercise, all exercise for a plan in a specific day (get request)
const getPlanExercises = async (plan_id, dayName) => {
    const db = await getDbConnection();
    const exercices = await db.all(`SELECT DISTINCT e.Ename, e.exercise_id FROM user_plan_day_exercise u 
    INNER JOIN exercise e ON e.exercise_id = u.exercise_id where u.dayName = ${dayName} and u.plan_id = ${plan_id}`);
    await db.close();
    return exercices;
}

// addExerciseToPlan (post request)
const addExerciseToPlan = async (user_id, plan_id, dayName, exercise_id) => {
    const db = await getDbConnection();
    const meta = await db.run(`insert into user_plan_day_exercise ('user_id', 'plan_id', 'dayName','exercise_id') values (${user_id}, ${plan_id}, '${dayName}', ${exercise_id})`);
    await db.close();
    return meta;
}

module.exports = { showExercises, getUserPlans, getPlanExercises, addExerciseToPlan, showWorkout };






