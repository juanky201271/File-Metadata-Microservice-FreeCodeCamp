'use strict';

var express = require('express');
var cors = require('cors');
var multer = require("multer");

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

var up = multer({d: 'ups/'});
app.post('/api/fileanalyse', up.single("upfile"), function(req,res,next) {
  var upFile = req.file;
  if (typeof upFile === 'undefined') {
    res.json({error: "File not found"});
  } else {
    res.json({name: upFile.originalname, type: upFile.mimetype, size: upFile.size});
  }
  next();
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
