var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Client = require('mariasql');

var db = new Client({
  host: '127.0.0.1',
  user: 'root',
  password: 'Feb101992',
  db: 'test'
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.set('port', 5000);

app.get('/test', function(req, res){
  db.query('SELECT *  FROM `weapon`', function(err, results){
    if (err){
      return res.send(err);
    }
    else {
      return res.json({
        data: results
      })
    }
    
  })
});

app.post('/test', function(req, res){
  db.query('SELECT name FROM `weapon` WHERE weapon_class = ?', 
    [req.body.class], function(err, results, fields){
    if(err){
      return res.send(err);
    }
    else {
      return res.json({
        data: results
      })
    }
  })
});


app.listen(app.get('port'), function(){
  console.log('Express started on port:' + app.get('port') + '; press Ctrl-C to terminate.');
});
