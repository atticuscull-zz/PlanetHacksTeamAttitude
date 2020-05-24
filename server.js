const express = require('express')
const app = express();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)


db.defaults({points:[]}).write();

db.get('points')

app.get("/", (req, res) => {
    res.sendFile(__dirname + '\bruh.html')
  })

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});