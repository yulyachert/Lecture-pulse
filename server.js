const express = require('express');
const ws = require('ws');
const path = require('path');

const port = 3000;
const emogies = [];
const statistics = [];
const event_keys = new Set();
const connections = [];

const app = express();
app.use(express.static(path.join(process.cwd(), 'client')));

const server = app.listen(port);

const wss = new ws.Server({noServer: true});


server.on('upgrade', (req, socket, head) => {
    const url = new URL(req.url, req.headers.origin);
    console.log(url);
    const eventKey = url.searchParams.get('eventKey');
    //Проверка
    console.log(eventKey);

});
