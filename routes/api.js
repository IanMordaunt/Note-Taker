const router = require("express").Router();
const db = require("../db");

// GET

router.get("/notes", (req, res) => {
  db.readNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.json(err));
});

// POST
router.post("/notes", (req, res) => {
  db.createNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.json(err));
});

// Delete Note
// app.delete

module.exports = router;
