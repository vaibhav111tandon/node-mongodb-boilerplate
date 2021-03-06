const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, {useUnifiedTopology: true, useNewUrlParser: true}, (err, database) => {
    if(err) return console.log(err);
    require('./app/routes')(app, database);
    app.listen(PORT, () => {
        console.log("Listening on port " + PORT);
    });
        
})