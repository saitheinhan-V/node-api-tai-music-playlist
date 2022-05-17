const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

// const connection = mysql.createConnection(
//     {
//         host: "localhost",
//         user: "root",
//         password: "password",
//         database: "tai_music_playlist"
//     }
// )

// connection.connect((err) => {
//     if(err){
//         console.log('Error connecting to database' + err.message);
//         return;
//       }
//       console.log('Database Connection established');
// });

const host = process.env.HOST || "localhost"
const user = process.env.USER_NAME || "root"
const password = process.env.PASSWORD || "password"

const pool = mysql.createPool(
    {
        host: "localhost",
        user: user,
        password: "AaBb12@#345",
        database: "tai_music_playlist"
    }
)

pool.getConnection((err,connection) => {
    if(err){
        console.log('Error connecting to database' + err.message);
        return;
      }
      console.log('Database Connection established');
      connection.release;
});

module.exports = pool;