const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const Bundler = require("parcel-bundler");
const cors = require("cors");

const bundler = new Bundler('./src/index.html');

server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use(bundler.middleware());
server.use(express.static('./dist'));

server.get('/', function (req, res) {
    res.sendFile('./dist/index.html');
});

server.listen(3000, err => {
    if (err) {
        console.error(err);
        process.exit(-1)
    }
    console.log('Application is running on port 3000');
});

