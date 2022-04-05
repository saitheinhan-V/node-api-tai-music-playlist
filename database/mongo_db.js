const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://root:dxL1x9nKG215FRVG@test.kjph9.mongodb.net/test?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true,});
  
let dbConnection;

              module.exports = {
                connectToServer:  function (callback) {
                    return new Promise((resolve, reject) => {
                        client.connect(function (err, db) {
                            if (err || !db) {
                                console.log("Error connecting to Mongo ",err.errmsg);
                            //   return callback(err);
                                reject(callback(""));
                            }else{
                                dbConnection = db.db("tai_music_playlist");//sample_airbnb
                                console.log("Successfully connected to MongoDB.");
                      
                                resolve(callback(dbConnection));
                            }
                          });
                    })
                },
              
                getDb: function () {
                  return dbConnection;
                }
              };  
              // var conn = async function() {
              //   return await connectToServer(getDb);
              // }
              // console.log("MongoConnect >",conn);
              // module.exports = conn;


