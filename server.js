const express = require('express');
const path = require('path');
const { notes } = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes/notes');
// const htmlRoutes = require('./routes/htmlRoutes');
const fs = require('fs');
const db = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);




function createNewNote(body, noteArr) {
    const newNote = body;
    noteArr.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: noteArr }, null, 2)
    );
    app.post("/api/notes", (req, res) => {
        let results = newNote;
        res.json(results);
    })

    return newNote;

}

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

app.get("/", (req, res) => {
    res.json(db.json);

})

app.get("/notes", (req, res) => {
    res.json(db.json);
    console.log(db.json);
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
    
});


app.get("/api/notes", (req, res) => {
    let results = notes;
    res.json(results);
  
  });

  app.post("/api/notes", (req, res) => {
    req.body.id = notes.length.toString();
  
    const note = createNewNote(req.body, notes);
    res.json(note);
  });

  
// router.post("/notes", (req, res) => {
// res.sendFile(path.join(__dirname, "/public/notes.html"));  
// })


