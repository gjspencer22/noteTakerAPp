const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes/notes');
// const htmlRoutes = require('./routes/htmlRoutes');
const fs = require('fs');
const db = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

app.get("/", (req, res) => {
    res.json(db.json);
    
})

app.get("/notes", (req, res) => {
    
})


