var express = require('express');
var fs = require('fs');
var app = express();

app.get('/jquery.js', function (req, res) {
  var fileName = "vender/jquery/jquery-3.3.1.min.js"
  var data = fs.readFileSync(fileName, "utf8")
  res.send(data);
})

app.get('/semantic.js', function (req, res) {
  var fileName = "css-framework/semantic-ui/semantic.min.js"
  var data = fs.readFileSync(fileName, "utf8")
  res.send(data);
})

app.get('/semantic.css', function (req, res) {
  var fileName = "css-framework/semantic-ui/semantic.min.css"
  var data = fs.readFileSync(fileName, "utf8")
  res.send(data);
})

app.get('/raw.html', function (req, res) {
  var fileDir = "html-template/"
  var fileList = [
    "header-1.html",
    "header-2.html",
    "main.html",
    "footer.html"
  ]
  var data = []
  for (var i = 0; i < fileList.length; i++) {
    data.push(fs.readFileSync(fileDir + fileList[i], "utf8"))
  }
  res.send(data);
})

app.get('/style.css', function (req, res) {
  var fileDir = "css-framework/semantic-ui/"
  
  var cssReset = fs.readFileSync(fileDir + "semantic.reset.css", "utf8")
  var cssSemantic = fs.readFileSync(fileDir + "semantic.css", "utf8")
  
  var data = cssReset + cssSemantic
  res.send(data);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
