var express = require('express');
var fs = require('fs');
var app = express();
app.use(express.static('public'));

app.use('/static', express.static(__dirname + '/static'));

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
  res.set('Content-Type', 'text/html')
  res.send(data.join("\n"));
})

app.get('/framework.html', function (req, res) {
  var fileDir = "html-template/"
  var fileList = [
    "header-1.html",
    "style-framework.html",
    "header-2.html",
    "main.html",
    "footer.html"
  ]
  var data = []
  for (var i = 0; i < fileList.length; i++) {
    data.push(fs.readFileSync(fileDir + fileList[i], "utf8"))
  }
  res.set('Content-Type', 'text/html')
  res.send(data.join("\n"));
})

app.get('/style-framework.css', function (req, res) {
  var fileDir = "static/semantic-ui/"
  
  var cssHeader = fs.readFileSync(fileDir + "semantic.header.css", "utf8")
  var cssReset = fs.readFileSync(fileDir + "semantic.reset.css", "utf8")
  var cssSemantic = fs.readFileSync(fileDir + "semantic.main.css", "utf8")
  
  var data = cssHeader + cssReset + cssSemantic
  
  //var data = fs.readFileSync(fileDir + "semantic.raw.css", "utf8")
  res.set('Content-Type', 'text/css')
  res.send(data);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
