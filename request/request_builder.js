const express = require('express');
const router = express.Router();
const conn = require('../database/db_connection');
var dataResponse = {};

module.exports = {
   
    GET : function (query){

        var json = {};
        var code = 'code';
        var message = 'message';
        var data = 'data';
        json[data] = [];

        return new Promise((resolve, reject) => {
            conn.query(query, (err, result) => {
                if(err) {
                    json[code] = 500;
                    json[message] = err.message;
                    json[data] = {};
                    reject(json);
                } else {
                    json[code] = 200;
                    json[message] = "Success";
                    json[data] = result;
                    resolve(json);
                }
            })
        })
        
    },

    INSERT: function(query){

        var json = {};
        return new Promise((resolve, reject) => {
            conn.query(query, (err , result) => {
                if(err){
                    json.code = 500;
                    json.message = err.message
                    reject(json);
                }else{
                    json.code = 200;
                    json.message = "Successfully saved!";
                    resolve(json);
                }
            })
        });
    },

    DELETE: function(query){
        var json = {};
        return new Promise((resolve, reject) => {
            conn.query(query, (err , result) => {
                if(err){
                    json.code = 500;
                    json.message = err.message
                    reject(json);
                }else{
                    json.code = 200;
                    json.message = "Successfully deleted!";
                    resolve(json);
                }
            })
        });
    }

}

