const express = require('express');

var datetime = require('node-datetime');
var dt = datetime.create();
var formatted = dt.format('Y-m-d H:M:S');

module.exports = formatted