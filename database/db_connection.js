const mysql = require('mysql');

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

const pool = mysql.createPool(
    {
        host: "localhost",
        user: "root",
        password: "password",
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