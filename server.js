const express = require('express')
const app = express();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const bodyParser = require('body-parser')

const adapter = new FileSync('.data/db.json')
const db = low(adapter)

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

const groupByUser = groupBy("id");

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('simulatedPoints'));

db.defaults({points:[]}).write();

function getUniqueLocations(){
  var locationsByUser = groupByUser(getLocations());
  console.log(locationsByUser);
  return Object.keys(locationsByUser).map(key => locationsByUser[key][locationsByUser[key].length - 1])
}

function appendLocation(location){
  db.get('points').push(location).write();
}

function getLocations(){
  return db.get('points').value();
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/bruh.html')
  })

app.get("/rest/locations", (req, res) => {
  var locations = getUniqueLocations();
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