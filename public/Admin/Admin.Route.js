const express = require('express');
const admin = express.Router();
const AdminController = require('./Admin.Controller');

admin.post('/login', (req, res) => {
   AdminController.selectForLogin(req.body).then(data => {
       res.status(data.status).send(data.data);
   }).catch(err => {
       res.status(err.status).send(err.message);
   })
});

admin.post('/register', (req, res) => {
    AdminController.insert(req.body).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.get('/profile', (req, res) => {
    AdminController.select(req).then(data => {
        res.status(data.status).send(data.data);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

module.exports = admin;