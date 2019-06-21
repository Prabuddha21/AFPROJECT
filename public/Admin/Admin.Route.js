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

admin.post('/profile', (req, res) => {
    AdminController.select(req.body).then(data => {
        res.status(data.status).send(data.data);
    }).catch(err => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
});

admin.put('/update', (req, res) => {
    AdminController.update(req.body).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.post('/instructor/register', (req, res) => {
    AdminController.insertInstructor(req.body).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.put('/instructor/update', (req, res) => {
    AdminController.updateInstructor(req.body).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.post('/instructor/profile', (req, res) => {
    AdminController.selectInstructor(req.body).then(data => {
        res.status(data.status).send(data.data);
    }).catch(err => {
        console.log(err);
        res.status(err.status).send(err.message);
    })
});

admin.post('/addnotice', (req, res) => {
    AdminController.addNotice(req.body).then(data => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

admin.get('/getnotices', (req, res) => {
    AdminController.getNotice(req.body).then(data => {
        res.status(data.status).send(data.data);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

module.exports = admin;