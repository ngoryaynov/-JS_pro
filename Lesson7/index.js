const http = require('http');
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();


app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use('/', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/products', (req, res) => {
    fs.readFile('./public/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({ result: 0, text: err }));
            // res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening ${port} port`);
});