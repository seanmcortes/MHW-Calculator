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

app.get('/weapon', function(req, res){
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


app.post('/weapon', function(req, res){
  if(req.body.class==0){
    db.query('SELECT * FROM `weapon`', function(err, results){
      if (err){
        return res.send(err);
      }
      else{
        return res.json({ data: results })
      }
    })
  }
  else{
    db.query('SELECT weapon_id, name FROM `weapon` WHERE weapon_class = ?',
      [req.body.class], function(err, results, fields){
        if(err){
          return res.send(err);
        }
        else {
          return res.json({ data: results })
        }
      })
  }
});

app.get('/monster', function(req, res){
  db.query('SELECT * FROM `monster`', function(err, results){
    if(err){
      return res.send(err);
    }
    else{
      return res.json({ data: results })
    }
  })
})


app.post('/hitzone', function(req, res){
  // console.log(req.body)
  var context={}
  db.query('SELECT * FROM `monster` WHERE name = ?',
    [req.body.name], function(err, results){
      if(err){
        return res.send(err);
      }
      else{
        return res.json({
          data: results
        })
      }
    })
})

app.listen(app.get('port'), function(){
  console.log('Express started on port:' + app.get('port') + '; press Ctrl-C to terminate.');
});
