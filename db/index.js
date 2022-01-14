const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const util = require("util");

const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);

class Notes {
  read() {
    return readAsync("db/db.json", "utf-8");
  }

  write(note) {
    return writeAsync("db/db.json", JSON.stringify(note));
  }

  readNotes() {
    return this.read().then((notes) => {
      let allNotes;

      try {
        allNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        allNotes = [];
      }
      return allNotes;
    });
  }

  createNote(note) {
    const { title, text } = note;

    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    return this.readNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes));
  }

  deleteNote(id) {
    return this.readNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((updatedNotes) => this.write(updatedNotes));
  }
}

module.exports = new Notes();
