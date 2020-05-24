const express = require('express')
const app = express();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const bodyParser = require('body-parser')

const adapter = new FileSync('db.json')
const db = low(adapter)

app.use(bodyParser.json());

db.defaults({points:[]}).write();

function appendLocation(location){
  db.get('points').push(location).write();
}

function getLocations(){
  return db.get('points').value();
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/bruh.html')
  })

app.get("/rest/locations", (req, res) => {
  var locations = getLocations();
  console.log("GET /locations =>" + JSON.stringify(locations));
  res.json(locations);
});

app.post("/rest/location", (req, res) => {
  var location = req.body;
  appendLocation(location);
  console.log("POST /location => " + JSON.stringify(location));
  res.sendStatus(200)
  res.end()
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});