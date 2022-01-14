
// Dependencies
const express = require('express');
const fs = require('fs');
const db = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

const path = require('path');
const app = express();


// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());


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

// Delete Note
// app.delete


// Static folder
app.use(express.static('public'));

const PORT = process.env.PORT || 3001;


app.listen(PORT, () =>
console.log(`Listening at https://localhost:${PORT}`));

