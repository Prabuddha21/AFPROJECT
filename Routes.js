const express = require('express');
const Router = express.Router();

const AdminRoute = require('./public/Admin/Admin.Route');

Router.use('/administer/', AdminRoute);

Router.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

// Router.get('/admin', function (req, res) {
//     res.sendFile(__dirname + '/dist/index.html');
// });

module.exports = Router;