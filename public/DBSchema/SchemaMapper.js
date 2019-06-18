const mongoose = require('mongoose');
const Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost:27017/afproject', { useNewUrlParser: true}, err => {
    if(err){
        console.log(err);
        process.exit(-1);
    }
    console.log('Connected to the database');
});

module.exports = mongoose;