/*const http = require('http');
const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const cors = require('cors');
const app = express();


app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use('/', express.static(__dirname + '/public'));
app.use('/api/cart', cartRouter);

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
*/






const express = require('express');
const fs = require('fs');
const app = express();
const handler = require('./handler');
app.use(express.json());
const router = express.Router();
app.use('/', express.static('./public'));

app.get('/api/cart', (req, res) => {
    fs.readFile('./public/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

app.post('/api/cart', (req, res) => {
    handler(req, res, 'add', './public/db/userCart.json');
});

app.put('/api/cart/:id', (req, res) => {
    handler(req, res, 'change', './public/db/userCart.json');
});
/**
 * Добавили роут для удаления товара
 */
app.delete('/api/cart/:id', (req, res) => {
    handler(req, res, 'remove', './public/db/userCart.json');
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