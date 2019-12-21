const express = require('express');
const ws = require('ws');
const path = require('path');
const bodyParser = require("body-parser");
const port = 3000;
const emogies = [];
const statistics = [];
const multer  = require('multer');
const upload = multer();

const event_keys = new Set(['123']);

const connections = {};

const app = express();
app.use(express.static(path.join(process.cwd(), 'client')));

const server = app.listen(port);

const wss = new ws.Server({noServer: true});

app.use(bodyParser.json());


app.post("/formPage.html", upload.none(), (req, res) => {
    let result = req.body;
    console.log(result);


    res.redirect('./codePage.html?code=12345');
});


server.on('upgrade', (req, socket, head) => {
    const url = new URL(req.url, req.headers.origin);
    const eventKey = url.searchParams.get('eventKey');
    //Проверка
    console.log(eventKey);
    if (!event_keys.has(eventKey)) {
        console.log('sdkfm');
        socket.close(new Error('Wrong eventKey'));
    } else {
        wss.handleUpgrade(req, socket, head, ws => {
                wss.emit('connection', ws, req);
                if (!(eventKey in connections)) {
                    connections[eventKey] = [ws];
                } else {
                    connections[eventKey].add(ws);
                }
            }
        );
    }
});

