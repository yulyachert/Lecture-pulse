const express = require('express');
const ws = require('ws');
const path = require('path');
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const emogies = [];
const statistics = [];
const multer  = require('multer');
const upload = multer();
const uuidv1 = require('uuid/v1');

const event_keys = new Set(['123']);

const connections = {};

const app = express();
app.use(express.static(path.join(process.cwd(), 'client')));

const server = app.listen(port);

const wss = new ws.Server({noServer: true});

app.use(bodyParser.json());
lect_pull = {};

app.post("/formPage.html", upload.none(), (req, res) => {
    let result = req.body;
    console.log(result);

    const code = uuidv1();
    event_keys.add(code);
    lect_pull[code] = result;

    console.log(`for lect ${result.lecture} generated code ${code}`);

    res.redirect(`./codePage.html?code=${code}`);
});


server.on('upgrade', (req, socket, head) => {
    const url = new URL(req.url, req.headers.origin);
    const eventKey = url.searchParams.get('eventKey');
    //Проверка
    console.log(eventKey);
    if (!event_keys.has(eventKey)) {
        console.log('sdkfm');
        //socket.close(new Error('Wrong eventKey'));
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

