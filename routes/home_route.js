const express = require('express');
const router = express.Router();
// const conn = require('../database/db_connection');
const route_url = require('../route_config/route_url');
const requestBuilder = require('../request/request_builder');
const formatted_date = require('../utils/date_time');
const mongoDb = require('../database/mongo_db');
const { getDb } = require('../database/mongo_db');
const Artist = require('../models/artist');
const Playlist = require('../models/playlist');
const Genre = require('../models/genre');

//mongo test
router.get('/mongo/list/artist',  async (req, res) => {

    // var connection = mongoDb.getDb();
    const mongoConn = await mongoDb.connectToServer(getDb);

    console.log("MONGO",mongoConn);
    if(mongoConn != null){
        mongoConn
        .collection("artist")//listingsAndReviews
        .find({}).limit(50)
        .toArray(function (err, result) {
          if (err) {
            res.status(400).send("Error fetching listings!");
         } else {
             var arr = [];
             result.forEach(element => {
                 var artist = new Artist(element['artistId'],element['artistName'],element['artistProfile'],element['rankOrder']);
                 arr.push(artist);
             });
            res.json({
                code: 200,
                message: "Success",
                data: arr
            });
          }
        });
    }else{
        res.status(500).send('Mongo DB connection is empty');
    }
   
})

//mongo test get playlist
router.get('/mongo/list/playlist', async (req, res) => {

    var mongoConn = await mongoDb.connectToServer(getDb);

    if(mongoConn == null){
        res.status(500).send('Mongo DB connection is empty');
    }else{
        mongoConn
        .collection('playlist')
        .find({}).limit(50)
        .toArray(function (err, result){
            if(err){
                res.status(400).send("Error fetching listings!");
            }else{
                var arr = [];
                result.forEach(element => {
                    var playlist = new Playlist(element['playlistId'],element['userId'],element['songIdList'],element['playlistName'],element['createdDate']);
                    arr.push(playlist);
                })
                
                res.json({
                    code: 200,
                    message: "Success",
                    data: arr
                })
            }
        })
    }
})

//mongo test get genre list
router.get('/mongo/list/genre', async (req, res) => {

    var mongoConn = await mongoDb.connectToServer(getDb);

    if(mongoConn == null){
        res.status(500).send('Mongo DB connection is empty');
    }else{
        mongoConn.collection('genre')
        .find({}).limit(50)
        .toArray(function (err, result){
            if(err) res.status(400).send("Error fetching data");
            else{
                var arr = [];
                result.forEach(element => {
                    var genre = new Genre(element['genreId'],element['genreName'],element['genreProfile'],element['rankOrder']);
                    arr.push(genre);
                });

                res.json({
                    code: 200,
                    message: "Success",
                    data: arr
                })
            }
        })
    }
})



//get artist list
router.get(route_url.GET_ARTIST_LIST, async (req, res) => {
    
    try {
        var query = "select * from artist order by rankOrder";    

        var data = await requestBuilder.GET(query);

        res.json(data);
    } catch (error) {
        console.log(error.stack);
    }
    
});

//get all playlist
router.get(route_url.GET_ALL_PLAYLIST, async (req, res) => {
    var query = "select * from playlist";

    var data = await requestBuilder.GET(query);
    res.json(data);
});

//save new playlist
router.post(route_url.SAVE_NEW_PLAYLIST, async (req, res) => {
    var playlistName = req.query.playlistName

    if(playlistName == null){
        res.json({
            code: 500,
            message: 'Name required!',
        })
    }else{
        var query = "insert into playlist(userId,songIdList,playlistName,createdDate) Values(1,'','" + playlistName + "','" + formatted_date + "')";

        var data = await requestBuilder.INSERT(query);
    
        res.json(data);
    }
    
})

//delete playlist
router.post(route_url.REMOVE_PLAYLIST, async (req, res) => {
    var id = req.query.playlistId

    if( id == null){
        res.json({
            code: 500,
            message: 'Id required!',
        })
    }else{
        var query = "delete from playlist where playlistId =" + id;

        var data = await requestBuilder.DELETE(query);

        res.json(data);
    }
})

//get all genres
router.get(route_url.GET_ALL_GENRE, async (req, res) => {

    var query = "select * from genre";

    var data = await requestBuilder.GET(query);

    res.json(data);
})


module.exports = router


