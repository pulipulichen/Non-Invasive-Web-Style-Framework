var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', function (req, res) {
  var fileDir = "../css-framework/semantic-ui/"
  
  var cssReset = fs.readFileSync(fileDir + "semantic.reset.css", "utf8")
  var cssSemantic = fs.readFileSync(fileDir + "semantic.css", "utf8")
  
  var data = cssReset + cssSemantic
  res.send(data);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
