const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 3333;
const server = app.listen(port, listening);


function listening() {
  console.log('server running');
  console.log(`running on localhost: ${port}`);
}

let projectData = [];

app.get('/getInfo', function(req, res){
  res.send(projectData);
})


app.post('/addInfo', function(req, res){
  let newObj = {};
  newObj.CompanySymbol = req.body.symbol;
  newObj.price = req.body.price;
  newObj.shareNum = req.body.shareNum;
  projectData.push(newObj);
  console.log("POST received");
})