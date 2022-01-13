
// Dependencies
const express = require('express');
const fs = require('fs');
const db = require('./Develop/db/db.json');
const { v4: uuidv4 } = require('uuid');

const path = require('path');
const { brotliDecompress } = require('zlib');
const PORT = process.env.port || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

// GET
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('/api/notes', (req, res) => res.json(db));

// POST
app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4();
    db.push(req.body);
    fs.writeFileSync('./db/db,json', JSON.stringify(db, null, '\t'))
    res.json(db)
});

// randome heroku check
// second heroku test