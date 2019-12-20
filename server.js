const express = require('express');

const app = express();
const port = 3000;


app.use(express.static('static'));

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});

animal_questions = [
    {
        'question': 'Какой тигр самый крупный?',
        'variants': ["Амурский", 'Малазийский', 'Индийский', 'Сумматранский'],
        'answer': 'Амурский',
        'picture': '/static/tiger.jpg'
    },
    {
        'question': 'Что говорит кошечка?',
        'variants': ["Мяу", 'Гав', 'Кукареку', 'Хрю'],
        'answer': 'Мяу',
        'picture': '/static/cat.webp'
    },
    {
        'question': 'Что говорит собачка?',
        'variants': ["Мяу", 'Гав', 'Кукареку', 'Хрю'],
        'answer': 'Гав',
        'picture': '/static/dog.webp'
    }
];

app.get('/quiz/animals', (request, response) => {
    const to_send = {'items': []};
    for (const item of animal_questions) {
        to_send['items'].push({
            'question': item['question'],
            'variants': item['variants'],
            'picture': item['picture']
        })
    }
    response.json(to_send);
});

app.post('/quiz/animals', (request, response) => {
    console.log(request);
});

app.get('/orgsList', (request, response) => {
    response.json(ORGS_LIST);
});