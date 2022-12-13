const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')



const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'albayat.db',
        driver: sqlite3.Database
    })
}


//this method will be called for the useres who wants to register, 
// after ensuring that the email is unique
const addUser = async (email, username, password, weight, targetWeight, height, gender, level, birthDate) => {
    const db = await getDbConnection();
    const sql = `INSERT INTO users 
    ('email', 'username', 'password', 'weight', 'target_weight', 'height', 'gender', 'level', 'birth_date') 
    VALUES ('${email}', '${username}', '${password}', ${weight}, ${targetWeight}, ${height}, '${gender}', '${level}', '${birthDate}')`;

    await db.run(sql);
    await db.close();
    return 1; //1 means that the user has registered successfully
}


//this query will check if the user has an account (call this method after the user clicks on "log in")
//compare hashed passwords
const authUser = async (email, username) => {
    const db = await getDbConnection();
    const sql = `SELECT email, username FROM users WHERE (email = '${email}') OR (username = '${username}')`;
    const user = await db.get(sql);
    await db.close();
    return user;  //if the returned value (user) is empty, then there is no account with this information and the user cannot log in
}

const authLogIn = async (email, password) => {
    const db = await getDbConnection();
    const sql = `SELECT email, password FROM users WHERE email = '${email}'`;
    const user = await db.get(sql);
    await db.close();
    return user;  //if the returned value (user) is empty, then there is no account with this information and the user cannot log in
}


const getUserID = async (email) => {
    const db = await getDbConnection();
    const user_id = await db.get(`SELECT user_id FROM users WHERE email = '${email}'`);
    await db.close();
    return user_id;
}

const getUserNutritions = async (id) => {
    const db = await getDbConnection();
    const user = await db.get(`SELECT * FROM users WHERE user_id = '${id}'`);
    await db.close();
    return user;
}

const changeUserName = async (id, newName) => {
    const db = await getDbConnection();
    await db.run(`UPDATE users SET username = ${newName} WHERE user_id = ${id}`);
    await db.close();
}

const update = async (id, column, newName) => {
    const db = await getDbConnection();
    await db.run(`UPDATE users SET ${column} = ${newName} WHERE user_id = ${id}`);
    await db.close();
}

const updateString = async (id, column, newName) => {
    const db = await getDbConnection();
    await db.run(`UPDATE users SET '${column}' = '${newName}' WHERE user_id = ${id}`);
    await db.close();
}



module.exports = { addUser, authUser, changeUserName, getUserID, authLogIn, getUserNutritions, changeUserName, update, updateString};




