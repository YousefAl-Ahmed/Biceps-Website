const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')



const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'albayat.db3',
        driver: sqlite3.Database
    })
}


//this method will be called for the useres who wants to register, 
// after ensuring that the email is unique
const addUser = async (email, username, password, weight, targetWeight, height, gender, level, birthDate) =>{
    const db = await getDbConnection();
    const sql = `INSERT INTO users 
    ('email', 'userName', 'password', 'weight', 'targetWeight', 'height', 'gender', 'level', 'birthDate') 
    VALUES (${email}, '${username}', '${password}', ${weight}, ${targetWeight}, ${height}, '${gender}', '${level}', '${birthDate}')`;

    await db.run(sql);
    await db.close();
    return 1; //1 means that the user has registered successfully
}


//this query will check if the user has an account (call this method after the user clicks on "log in")
//compare hashed passwords
const authUser = async (email, username, password) =>{
    const db = await getDbConnection();
    const sql = `SELECT email, userName, password FROM users WHERE (email = '${email}' AND password = '${password}') OR (username = '${username}' AND password = '${password}')`;
    const user = await db.run(sql);
    await db.close();   
    return user;  //if the returned value (user) is empty, then there is no account with this information and the user cannot log in
}


// do it later
const changeUserName = async (email, username, password) =>{
    const db = await getDbConnection();
    await db.close();   
}

// do it later
const changePassword = async (email, username, password) =>{
    const db = await getDbConnection();
    await db.close();   
}




module.exports = {addUser, authUser, changeUserName, changePassword};




